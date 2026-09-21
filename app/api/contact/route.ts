import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Helper to escape HTML special characters for safe email rendering
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    const { name, email, message } = body || {};

    // 1. Validate fields server-side
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    const errors: Record<string, string> = {};

    if (!trimmedName) {
      errors.name = "Name is required.";
    } else if (trimmedName.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 100) {
      errors.name = "Name cannot exceed 100 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    } else if (trimmedEmail.length > 150) {
      errors.email = "Email cannot exceed 150 characters.";
    }

    if (!trimmedMessage) {
      errors.message = "Message is required.";
    } else if (trimmedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    } else if (trimmedMessage.length > 3000) {
      errors.message = "Message cannot exceed 3000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: Object.values(errors)[0],
          errors,
        },
        { status: 400 }
      );
    }

    // 2. Verify Resend API Key is configured
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.warn("RESEND_API_KEY environment variable is not configured.");
      return NextResponse.json(
        {
          success: false,
          error: "Email delivery service is currently not configured on the server. Please contact directly at muskankesharwani63@gmail.com.",
        },
        { status: 503 }
      );
    }

    const recipientEmail =
      process.env.CONTACT_EMAIL?.trim() || "muskankesharwani63@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "Portfolio Contact <onboarding@resend.dev>";

    const resend = new Resend(apiKey);

    const escapedName = escapeHtml(trimmedName);
    const escapedEmail = escapeHtml(trimmedEmail);
    const escapedMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br/>");
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailSubject = `New Portfolio Contact — ${trimmedName}`;

    const textContent = `
New Contact Form Submission from Portfolio:

Name: ${trimmedName}
Email: ${trimmedEmail}
Date: ${submittedAt} (IST)

Message:
${trimmedMessage}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050816; color: #F9FAFB; padding: 24px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 24px; color: white; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin-bottom: 4px; font-weight: 600; }
    .value { font-size: 15px; color: #F9FAFB; font-weight: 500; }
    .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #E5E7EB; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #6B7280; text-align: center; }
    .reply-btn { display: inline-block; background: #3B82F6; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
      <p>Received from portfolio contact form</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Sender Name</div>
        <div class="value">${escapedName}</div>
      </div>
      <div class="field">
        <div class="label">Sender Email</div>
        <div class="value"><a href="mailto:${escapedEmail}" style="color: #93C5FD; text-decoration: none;">${escapedEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Sent Date & Time</div>
        <div class="value" style="font-size: 13px; color: #9CA3AF;">${submittedAt} (IST)</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapedMessage}</div>
      </div>
      <div>
        <a href="mailto:${escapedEmail}?subject=Re:%20Portfolio%20Inquiry" class="reply-btn">Reply to ${escapedName}</a>
      </div>
    </div>
    <div class="footer">
      Sent from Muskan Kesharwani Portfolio
    </div>
  </div>
</body>
</html>
    `.trim();

    // 3. Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: trimmedEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Unable to send your message. Please try again or contact me directly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Unhandled error in /api/contact:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send your message. Please try again or contact me directly.",
      },
      { status: 500 }
    );
  }
}
