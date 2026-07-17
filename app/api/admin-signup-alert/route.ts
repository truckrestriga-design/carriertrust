import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const secret = req.headers.get("x-admin-alert-secret");
    if (!secret || secret !== process.env.ADMIN_ALERT_SECRET) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { email, company_name, company_vat, company_country } = body;

    console.log("admin-signup-alert payload:", {
        email,
        company_name,
        company_vat,
        company_country,
      });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMIN_SMTP_USER,
        pass: process.env.ADMIN_SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP verified successfully");

    await transporter.sendMail({
        
      from: `"CarrierTrust" <${process.env.ADMIN_SMTP_USER}>`,
      to: "carriertrust.eu@gmail.com",
      subject: "New company confirmed on CarrierTrust",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">New company confirmed on CarrierTrust</h2>
          <p><strong>Email:</strong> ${email || "—"}</p>
          <p><strong>Company:</strong> ${company_name || "—"}</p>
          <p><strong>VAT:</strong> ${company_vat || "—"}</p>
          <p><strong>Country:</strong> ${company_country || "—"}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin-signup-alert error:", error);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}