import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Create a Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
        // From name is User's name, but "From Email" must be your GMAIL_USER (authenticated)
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: 'sohail345patel@gmail.com', // Your target inbox
        replyTo: email, // So you can reply directly to the visitor
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
        <div style="font-family: sans-serif; padding: 40px; background-color: #030014; color: #ffffff; border-radius: 20px;">
          <h1 style="color: #6c63ff; margin-bottom: 24px;">New Portfolio Inquiry</h1>
          <div style="background-color: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <p style="margin-bottom: 8px;"><strong style="color: #6c63ff;">Name:</strong> ${name}</p>
            <p style="margin-bottom: 24px;"><strong style="color: #6c63ff;">Email:</strong> ${email}</p>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.4); text-align: center;">
            Sent from your Next.js Portfolio via Gmail
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
