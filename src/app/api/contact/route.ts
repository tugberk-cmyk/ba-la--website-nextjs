import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Zorunlu alanlar eksik." },
        { status: 400 }
      );
    }

    const emailSubject = subject
      ? `Iletisim Formu: ${subject}`
      : `Iletisim Formu - ${name}`;

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #111; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">Yeni Iletisim Formu Mesaji</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 100px;">Ad Soyad</td>
            <td style="padding: 8px 0; color: #111; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">E-posta</td>
            <td style="padding: 8px 0; color: #111; font-size: 14px;"><a href="mailto:${email}" style="color: #111;">${email}</a></td>
          </tr>
          ${subject ? `<tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Konu</td>
            <td style="padding: 8px 0; color: #111; font-size: 14px;">${subject}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">Mesaj</p>
          <p style="color: #111; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 24px; color: #9ca3af; font-size: 12px;">Bu e-posta baglac.com.tr iletisim formu uzerinden gonderilmistir.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Baglac Iletisim <hey@baglac.com.tr>",
        to: ["info@d-option.com"],
        reply_to: email,
        subject: emailSubject,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: `Resend API error [${res.status}]: ${body}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
