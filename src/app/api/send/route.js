import { NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

export async function POST(request) {
  try {
    const { name, email, message, honeypot } = await request.json();

    // Honeypot bot protection
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY || process.env.BREVO_API_KEYO;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }

    const brevo = new BrevoClient({ apiKey });

    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Aziz Reja",
        email: "rejaaziz686@gmail.com",
      },
      to: [
        {
          email: "rejaaziz686@gmail.com",
          name: "Aziz Reja",
        },
      ],
      replyTo: {
        email: email,
        name: name,
      },
      subject: `New message from ${name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Portfolio Contact</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p style="white-space: pre-wrap;">
            ${message}
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Brevo error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to send email",
      },
      { status: 500 }
    );
  }
}