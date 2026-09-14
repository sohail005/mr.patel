import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

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
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 40px; background-color: #030014; color: #ffffff; border-radius: 20px;">
          <h1 style="color: #6c63ff; margin-bottom: 24px;">New Portfolio Inquiry</h1>
          <div style="background-color: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <p style="margin-bottom: 8px;"><strong style="color: #6c63ff;">Name:</strong> ${safeName}</p>
            <p style="margin-bottom: 24px;"><strong style="color: #6c63ff;">Email:</strong> ${safeEmail}</p>
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
