"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function getPlacementSide(placement: string) {
  if (placement.endsWith("_left")) return "left";
  if (placement.endsWith("_right")) return "right";
  return null;
}

function getExpiresAt(period: string) {
  const now = new Date();

  if (period === "week") {
    now.setDate(now.getDate() + 7);
    return now.toISOString();
  }

  if (period === "month") {
    now.setMonth(now.getMonth() + 1);
    return now.toISOString();
  }

  if (period === "year") {
    now.setFullYear(now.getFullYear() + 1);
    return now.toISOString();
  }

  return null;
}

function getBannerPathFromSignedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const marker = "/storage/v1/object/sign/banner-files/";
    const idx = parsed.pathname.indexOf(marker);

    if (idx === -1) return null;

    const rawPath = parsed.pathname.slice(idx + marker.length);
    return decodeURIComponent(rawPath);
  } catch {
    return null;
  }
}

function isCompanyPlacement(placement: string) {
  return placement === "company_left" || placement === "company_right";
}

async function getNextSortOrder(placement: string, targetCompanyId?: string | null) {
  let query = supabaseAdmin
    .from("banners")
    .select("sort_order")
    .eq("placement", placement)
    .order("sort_order", { ascending: false })
    .limit(1);

  if (isCompanyPlacement(placement)) {
    query = query.is("target_company_id", null);
  } else if (targetCompanyId) {
    query = query.eq("target_company_id", targetCompanyId);
  } else {
    query = query.is("target_company_id", null);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) return 0;
  return (data.sort_order ?? 0) + 1;
}

export async function publishBannerOrder(formData: FormData) {
  const orderId = String(formData.get("orderId") || "").trim();
  if (!orderId) throw new Error("Missing order id");

  const { data: order, error: orderError } = await supabaseAdmin
    .from("banner_orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error("Order not found");
  }

  const placement = order.placement || "search_left";
  const side = getPlacementSide(placement);
  const expiresAt = getExpiresAt(order.period);

  if (!expiresAt) {
    throw new Error("Invalid period");
  }

  if (!order.banner_file_url) {
    throw new Error("Banner file URL is missing");
  }

  const bannerPath = getBannerPathFromSignedUrl(order.banner_file_url);

  if (!bannerPath) {
    throw new Error("Could not extract banner path from signed URL");
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("banner-files").getPublicUrl(bannerPath);

  const imageUrl = publicUrl;

  const publishedTargetCompanyId = isCompanyPlacement(placement)
    ? null
    : order.target_company_id || null;

  const publishedTargetCompanyName = isCompanyPlacement(placement)
    ? null
    : order.target_company_name || null;

  if (order.published_banner_id) {
    const reactivate = await supabaseAdmin
      .from("banners")
      .update({
        is_active: true,
        placement,
        side,
        image_url: imageUrl,
        alt: `${order.company_name} banner`,
        target_company_id: publishedTargetCompanyId,
        target_company_name: publishedTargetCompanyName,
        starts_at: new Date().toISOString(),
        expires_at: expiresAt,
      })
      .eq("id", order.published_banner_id);

    if (reactivate.error) {
      throw new Error(reactivate.error.message);
    }

    const updateOrder = await supabaseAdmin
      .from("banner_orders")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        expires_at: expiresAt,
      })
      .eq("id", orderId);

    if (updateOrder.error) {
      throw new Error(updateOrder.error.message);
    }

    revalidatePath("/admin/banner-orders");
    revalidatePath("/search");
    revalidatePath("/companies/[id]", "page");
    return;
  }

  const nextSortOrder = await getNextSortOrder(
    placement,
    publishedTargetCompanyId
  );

  const insertBanner = await supabaseAdmin
    .from("banners")
    .insert({
      placement,
      side,
      image_url: imageUrl,
      alt: `${order.company_name} banner`,
      is_active: true,
      sort_order: nextSortOrder,
      target_company_id: publishedTargetCompanyId,
      target_company_name: publishedTargetCompanyName,
      starts_at: new Date().toISOString(),
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (insertBanner.error || !insertBanner.data) {
    throw new Error(insertBanner.error?.message || "Failed to publish banner");
  }

  const updateOrder = await supabaseAdmin
    .from("banner_orders")
    .update({
      status: "published",
      published_banner_id: insertBanner.data.id,
      published_at: new Date().toISOString(),
      expires_at: expiresAt,
    })
    .eq("id", orderId);

  if (updateOrder.error) {
    throw new Error(updateOrder.error.message);
  }

  revalidatePath("/admin/banner-orders");
  revalidatePath("/search");
  revalidatePath("/companies/[id]", "page");
}

export async function activatePublishedBanner(formData: FormData) {
  const orderId = String(formData.get("orderId") || "").trim();
  if (!orderId) throw new Error("Missing order id");

  const { data: order, error: orderError } = await supabaseAdmin
    .from("banner_orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error("Order not found");
  }

  if (!order.published_banner_id) {
    throw new Error("Banner is not published yet");
  }

  const expiresAt = getExpiresAt(order.period);
  if (!expiresAt) {
    throw new Error("Invalid period");
  }

  const activateResult = await supabaseAdmin
    .from("banners")
    .update({
      is_active: true,
      starts_at: new Date().toISOString(),
      expires_at: expiresAt,
    })
    .eq("id", order.published_banner_id);

  if (activateResult.error) {
    throw new Error(activateResult.error.message);
  }

  const updateOrder = await supabaseAdmin
    .from("banner_orders")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
      expires_at: expiresAt,
    })
    .eq("id", orderId);

  if (updateOrder.error) {
    throw new Error(updateOrder.error.message);
  }

  revalidatePath("/admin/banner-orders");
  revalidatePath("/search");
  revalidatePath("/companies/[id]", "page");
}

export async function deactivatePublishedBanner(formData: FormData) {
  const orderId = String(formData.get("orderId") || "").trim();
  if (!orderId) throw new Error("Missing order id");

  const { data: order, error: orderError } = await supabaseAdmin
    .from("banner_orders")
    .select("published_banner_id")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error("Order not found");
  }

  if (!order.published_banner_id) {
    revalidatePath("/admin/banner-orders");
    return;
  }

  const deactivateResult = await supabaseAdmin
    .from("banners")
    .update({ is_active: false })
    .eq("id", order.published_banner_id);

  if (deactivateResult.error) {
    throw new Error(deactivateResult.error.message);
  }

  const updateOrder = await supabaseAdmin
    .from("banner_orders")
    .update({ status: "deactivated" })
    .eq("id", orderId);

  if (updateOrder.error) {
    throw new Error(updateOrder.error.message);
  }

  revalidatePath("/admin/banner-orders");
  revalidatePath("/search");
  revalidatePath("/companies/[id]", "page");
}

export async function rejectBannerOrder(formData: FormData) {
  const orderId = String(formData.get("orderId") || "").trim();
  if (!orderId) throw new Error("Missing order id");

  const result = await supabaseAdmin
    .from("banner_orders")
    .update({ status: "rejected" })
    .eq("id", orderId);

  if (result.error) {
    throw new Error(result.error.message);
  }

  revalidatePath("/admin/banner-orders");
}

export async function deleteBannerOrder(formData: FormData) {
  const orderId = String(formData.get("orderId") || "").trim();
  if (!orderId) throw new Error("Missing order id");

  const { data: order, error: orderError } = await supabaseAdmin
    .from("banner_orders")
    .select("published_banner_id")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error("Order not found");
  }

  if (order.published_banner_id) {
    const deleteBannerResult = await supabaseAdmin
      .from("banners")
      .delete()
      .eq("id", order.published_banner_id);

    if (deleteBannerResult.error) {
      throw new Error(deleteBannerResult.error.message);
    }
  }

  const deleteOrderResult = await supabaseAdmin
    .from("banner_orders")
    .delete()
    .eq("id", orderId);

  if (deleteOrderResult.error) {
    throw new Error(deleteOrderResult.error.message);
  }

  revalidatePath("/admin/banner-orders");
  revalidatePath("/search");
  revalidatePath("/companies/[id]", "page");
}