import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const side = String(formData.get("side") || "").trim().toLowerCase();
    const placement = String(formData.get("placement") || "").trim().toLowerCase();
    const targetCompanyId = String(formData.get("targetCompanyId") || "").trim();
    const targetCompanyName = String(formData.get("targetCompanyName") || "").trim();

    const period = String(formData.get("period") || "").trim();
    const periodLabel = String(formData.get("periodLabel") || "").trim();
    const price = Number(formData.get("price") || 0);

    const companyName = String(formData.get("companyName") || "").trim();
    const invoiceEmail = String(formData.get("invoiceEmail") || "").trim();
    const paymentPurpose = String(formData.get("paymentPurpose") || "").trim();

    const bannerFile = formData.get("bannerFile");
    const paymentProof = formData.get("paymentProof");

    if (
      !side ||
      !placement ||
      !period ||
      !periodLabel ||
      !price ||
      !companyName ||
      !invoiceEmail ||
      !paymentPurpose ||
      !bannerFile ||
      !paymentProof
    ) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    if (!["left", "right"].includes(side)) {
      return NextResponse.json(
        { error: "Invalid side" },
        { status: 400 }
      );
    }

    if (
      ![
        "search_left",
        "search_right",
        "company_left",
        "company_right",
        "risk_left",
        "risk_right",
      ].includes(placement)
    ) {
      return NextResponse.json(
        { error: "Invalid placement" },
        { status: 400 }
      );
    }

    if (
      (placement === "company_left" || placement === "company_right") &&
      !targetCompanyId
    ) {
      return NextResponse.json(
        { error: "Target company is required for company page banners" },
        { status: 400 }
      );
    }

    if (!isValidEmail(invoiceEmail)) {
      return NextResponse.json(
        { error: "Invalid invoice email" },
        { status: 400 }
      );
    }

    if (!(bannerFile instanceof File)) {
      return NextResponse.json(
        { error: "Banner file is invalid" },
        { status: 400 }
      );
    }

    if (!(paymentProof instanceof File)) {
      return NextResponse.json(
        { error: "Payment proof is invalid" },
        { status: 400 }
      );
    }

    const orderId = crypto.randomUUID();

    const bannerExt = bannerFile.name.split(".").pop() || "png";
    const proofExt = paymentProof.name.split(".").pop() || "file";

    const bannerPath = `${orderId}/${Date.now()}-${sanitizeFileName(
      `banner.${bannerExt}`
    )}`;

    const proofPath = `${orderId}/${Date.now()}-${sanitizeFileName(
      `payment-proof.${proofExt}`
    )}`;

    const bannerBuffer = Buffer.from(await bannerFile.arrayBuffer());
    const proofBuffer = Buffer.from(await paymentProof.arrayBuffer());

    const bannerUpload = await supabaseAdmin.storage
      .from("banner-files")
      .upload(bannerPath, bannerBuffer, {
        contentType: bannerFile.type || "application/octet-stream",
        upsert: false,
      });

    if (bannerUpload.error) {
      return NextResponse.json(
        { error: `Banner upload error: ${bannerUpload.error.message}` },
        { status: 500 }
      );
    }

    const proofUpload = await supabaseAdmin.storage
      .from("banner-proofs")
      .upload(proofPath, proofBuffer, {
        contentType: paymentProof.type || "application/octet-stream",
        upsert: false,
      });

    if (proofUpload.error) {
      return NextResponse.json(
        { error: `Payment proof upload error: ${proofUpload.error.message}` },
        { status: 500 }
      );
    }

    const { data: bannerSigned, error: bannerSignedError } =
      await supabaseAdmin.storage
        .from("banner-files")
        .createSignedUrl(bannerPath, 60 * 60 * 24 * 30);

    if (bannerSignedError || !bannerSigned?.signedUrl) {
      return NextResponse.json(
        {
          error: `Banner signed URL error: ${
            bannerSignedError?.message || "Could not create banner URL"
          }`,
        },
        { status: 500 }
      );
    }

    const { data: proofSigned, error: proofSignedError } =
      await supabaseAdmin.storage
        .from("banner-proofs")
        .createSignedUrl(proofPath, 60 * 60 * 24 * 30);

    if (proofSignedError || !proofSigned?.signedUrl) {
      return NextResponse.json(
        {
          error: `Payment proof signed URL error: ${
            proofSignedError?.message || "Could not create payment proof URL"
          }`,
        },
        { status: 500 }
      );
    }

    const bannerFileUrl = bannerSigned.signedUrl;
    const paymentProofUrl = proofSigned.signedUrl;

    const insertResult = await supabaseAdmin.from("banner_orders").insert({
      id: orderId,
      company_name: companyName,
      invoice_email: invoiceEmail,
      payment_reference: null,
      payment_purpose: paymentPurpose,

      side,
      placement,
      target_company_id: targetCompanyId || null,
      target_company_name: targetCompanyName || null,

      period,
      period_label: periodLabel,
      price,

      banner_file_url: bannerFileUrl,
      payment_proof_url: paymentProofUrl,

      status: "pending",
    });

    if (insertResult.error) {
      return NextResponse.json(
        { error: `Database save error: ${insertResult.error.message}` },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    if (!process.env.BANNER_ORDER_TO_EMAIL) {
      return NextResponse.json(
        { error: "Missing BANNER_ORDER_TO_EMAIL" },
        { status: 500 }
      );
    }

    const emailResult = await resend.emails.send({
      from: "Banner Orders <noreply@carriertrust.eu>",
      to: process.env.BANNER_ORDER_TO_EMAIL,
      subject: `New banner order: ${companyName}`,
      html: `
        <h2>New banner order</h2>

        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Invoice email:</strong> ${invoiceEmail}</p>
        <p><strong>Placement:</strong> ${placement}</p>
        <p><strong>Side:</strong> ${side}</p>
        <p><strong>Target company:</strong> ${targetCompanyName || "-"}</p>
        <p><strong>Target company ID:</strong> ${targetCompanyId || "-"}</p>
        <p><strong>Period:</strong> ${periodLabel}</p>
        <p><strong>Price:</strong> €${price}</p>
        <p><strong>Payment purpose:</strong> ${paymentPurpose}</p>
        <p><strong>Banner:</strong> <a href="${bannerFileUrl}" target="_blank">Open banner</a></p>
        <p><strong>Payment proof:</strong> <a href="${paymentProofUrl}" target="_blank">Open proof</a></p>
        <p><strong>Order ID:</strong> ${orderId}</p>
      `,
    });

    if (emailResult.error) {
      return NextResponse.json(
        { error: `Email sending error: ${emailResult.error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        "Banner request sent. The banner is now under moderation, invoice will be sent by email.",
    });
  } catch (error) {
    console.error("banner-order error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}