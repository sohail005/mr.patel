import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { CONTACT_SERVICE_OPTIONS } from '@/data/contactOptions';

export const runtime = 'nodejs';

const MAX_CONTENT_LENGTH = 20_000; // bytes
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Header-bound fields must not contain CR/LF (header/SMTP injection) or other control chars.
const CONTROL_CHARS_PATTERN = /[\x00-\x1f\x7f]/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function pruneRateLimitBuckets(now: number) {
  if (rateLimitBuckets.size < 500) return;
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  pruneRateLimitBuckets(now);

  const bucket = rateLimitBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isTrustedOrigin(req: Request): boolean {
  const host = req.headers.get('host');
  if (!host) return false;

  const origin = req.headers.get('origin');
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  // Browsers omit Origin on some same-origin requests but still send Referer.
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function badRequest(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 });
}

export async function POST(req: Request) {
  try {
    if (!isTrustedOrigin(req)) {
      return NextResponse.json(
        { success: false, error: 'Request origin could not be verified.' },
        { status: 403 }
      );
    }

    const contentLength = Number(req.headers.get('content-length') ?? '0');
    if (contentLength > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        { success: false, error: 'Request body is too large.' },
        { status: 413 }
      );
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return badRequest('Invalid request body.');
    }

    if (typeof body !== 'object' || body === null) {
      return badRequest('Invalid request body.');
    }

    const raw = body as Record<string, unknown>;
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const email = typeof raw.email === 'string' ? raw.email.trim() : '';
    const service = typeof raw.service === 'string' ? raw.service.trim() : '';
    const message = typeof raw.message === 'string' ? raw.message.trim() : '';

    if (!name || !email || !service || !message) {
      return badRequest('Name, email, service, and message are required.');
    }

    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return badRequest('One or more fields exceed the allowed length.');
    }

    if (
      CONTROL_CHARS_PATTERN.test(name) ||
      CONTROL_CHARS_PATTERN.test(email) ||
      CONTROL_CHARS_PATTERN.test(service)
    ) {
      return badRequest('Invalid characters in submitted fields.');
    }

    if (!EMAIL_PATTERN.test(email)) {
      return badRequest('Please provide a valid email address.');
    }

    if (!(CONTACT_SERVICE_OPTIONS as readonly string[]).includes(service)) {
      return badRequest('Please select a valid service.');
    }

    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();

    if (!gmailUser || !gmailAppPassword) {
      console.error('Gmail configuration is missing. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
      return NextResponse.json(
        { success: false, error: 'Email service is not configured.' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      replyTo: email,
      subject: `${service} Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 40px; background-color: #030014; color: #ffffff; border-radius: 20px;">
          <h1 style="color: #6c63ff; margin-bottom: 24px;">New Portfolio Inquiry</h1>
          <div style="background-color: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <p style="margin-bottom: 8px;"><strong style="color: #6c63ff;">Name:</strong> ${safeName}</p>
            <p style="margin-bottom: 24px;"><strong style="color: #6c63ff;">Email:</strong> ${safeEmail}</p>
            <p style="margin-bottom: 24px;"><strong style="color: #6c63ff;">Service:</strong> ${safeService}</p>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.4); text-align: center;">
            Sent from your Next.js Portfolio via Gmail
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to send your message right now.' },
      { status: 500 }
    );
  }
}
