import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  activatePublishedBanner,
  deactivatePublishedBanner,
  publishBannerOrder,
  rejectBannerOrder,
  deleteBannerOrder,
} from "./actions";

export const dynamic = "force-dynamic";

type BannerOrder = {
  id: string;
  company_name: string;
  invoice_email: string;
  payment_reference: string | null;
  payment_purpose: string;
  side: string | null;
  placement: string | null;
  target_company_id: string | null;
  target_company_name: string | null;
  period: string;
  period_label: string;
  price: number;
  banner_file_url: string;
  payment_proof_url: string;
  status: string;
  created_at: string;
  published_at: string | null;
  expires_at: string | null;
  published_banner_id: string | null;
};

type PublishedBanner = {
  id: string;
  placement: string | null;
  side: string | null;
  is_active: boolean | null;
  sort_order: number | null;
  expires_at: string | null;
  target_company_name: string | null;
};

async function getOrders(): Promise<BannerOrder[]> {
  const { data, error } = await supabaseAdmin
    .from("banner_orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data || []) as BannerOrder[];
}

async function getPublishedBannersMap(orderIds: string[]) {
  if (orderIds.length === 0) return new Map<string, PublishedBanner>();

  const { data, error } = await supabaseAdmin
  .from("banners")
  .select("id, placement, side, is_active, sort_order, expires_at, target_company_name")
  .in("id", orderIds);

  if (error || !data) {
    return new Map<string, PublishedBanner>();
  }

  return new Map<string, PublishedBanner>(
    data.map((item) => [item.id, item as PublishedBanner])
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    published: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
    deactivated: "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function PlacementBadge({ placement }: { placement: string | null }) {
  const value = placement || "search_left";

  const styles: Record<string, string> = {
    search_left: "bg-cyan-100 text-cyan-700",
    search_right: "bg-blue-100 text-blue-700",
    company_left: "bg-emerald-100 text-emerald-700",
    company_right: "bg-violet-100 text-violet-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        styles[value] || "bg-slate-100 text-slate-700"
      }`}
    >
      {value}
    </span>
  );
}

function isRejected(status: string) {
  return status === "rejected";
}

function isPublished(status: string) {
  return status === "published";
}

export default async function BannerOrdersPage() {
  const orders = await getOrders();

  const publishedIds = orders
    .map((order) => order.published_banner_id)
    .filter(Boolean) as string[];

  const bannersMap = await getPublishedBannersMap(publishedIds);

  return (
    <main className="min-h-screen bg-slate-50 px-6 pt-40 pb-12 text-slate-900">
      <div className="mx-auto max-w-[1600px]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banner Orders</h1>
          <p className="mt-2 text-slate-500">
            Each banner slot is independent. Review requested placement, target page, auto expiry, and publish status.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="overflow-x-auto">
            <table className="min-w-[1580px] w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-4 font-semibold">Banner</th>
                  <th className="px-4 py-4 font-semibold">Company</th>
                  <th className="px-4 py-4 font-semibold">Placement</th>
                  <th className="px-4 py-4 font-semibold">Live Banner</th>
                  <th className="px-4 py-4 font-semibold">Period</th>
                  <th className="px-4 py-4 font-semibold">Auto Expiry</th>
                  <th className="px-4 py-4 font-semibold">Invoice Email</th>
                  <th className="px-4 py-4 font-semibold">Payment Proof</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="px-4 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-slate-500">
                      No banner orders yet
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const publishedBanner = order.published_banner_id
                      ? bannersMap.get(order.published_banner_id)
                      : null;

                    const showPublish = !order.published_banner_id && !isRejected(order.status);
                    const showActivate = !!order.published_banner_id && !publishedBanner?.is_active;
                    const showDeactivate = !!order.published_banner_id && !!publishedBanner?.is_active;
                    const showReject = !isRejected(order.status);

                    return (
                      <tr key={order.id} className="border-t border-slate-100 align-top">
                        <td className="px-4 py-4">
                          <div className="w-[90px]">
                            <div className="h-[220px] w-[66px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                              {order.banner_file_url ? (
                                <img
                                  src={order.banner_file_url}
                                  alt={`${order.company_name} banner`}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center p-2 text-center text-xs text-slate-400">
                                  No preview
                                </div>
                              )}
                            </div>

                            {order.banner_file_url && (
                              <a
                                href={order.banner_file_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 inline-block text-xs font-medium text-emerald-600 hover:underline"
                              >
                                Open
                              </a>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="font-semibold text-slate-900">{order.company_name}</div>
                          {order.target_company_name ? (
                            <div className="mt-2 text-xs text-slate-500">
                              Target: {order.target_company_name}
                            </div>
                          ) : null}
                          {order.payment_reference ? (
                            <div className="mt-2 text-xs text-slate-500">
                              Ref: {order.payment_reference}
                            </div>
                          ) : null}
                        </td>

                        <td className="px-4 py-4">
                          <PlacementBadge placement={order.placement} />
                        </td>

                        <td className="px-4 py-4">
                          {publishedBanner ? (
                            <div className="space-y-2">
                              <div className="text-xs text-slate-600">
                                <span className="font-semibold">Placement:</span>{" "}
                                {publishedBanner.placement || "—"}
                              </div>
                              <div className="text-xs text-slate-600">
                                <span className="font-semibold">Sort:</span>{" "}
                                {publishedBanner.sort_order ?? 0}
                              </div>
                              <div>
                                <span
                                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                    publishedBanner.is_active
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-slate-200 text-slate-700"
                                  }`}
                                >
                                  {publishedBanner.is_active ? "active on site" : "inactive"}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400">Not published</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div>{order.period_label}</div>
                            <div className="text-xs text-slate-500">{order.period}</div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          {order.expires_at ? (
                            <div className="text-sm text-slate-700">
                              {new Date(order.expires_at).toLocaleString("en-GB")}
                            </div>
                          ) : (
                            <span className="text-slate-400">Will be set on publish</span>
                          )}
                        </td>

                        <td className="px-4 py-4 break-all">{order.invoice_email}</td>

                        <td className="px-4 py-4">
                          {order.payment_proof_url ? (
                            <a
                              href={order.payment_proof_url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-emerald-600 hover:underline"
                            >
                              Open proof
                            </a>
                          ) : (
                            <span className="text-slate-400">No proof</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={order.status} />
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex min-w-[220px] flex-col gap-2">
                            {showPublish && (
                              <form action={publishBannerOrder}>
                                <input type="hidden" name="orderId" value={order.id} />
                                <button
                                  type="submit"
                                  className="flex h-10 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                  Publish
                                </button>
                              </form>
                            )}

                            {showActivate && (
                              <form action={activatePublishedBanner}>
                                <input type="hidden" name="orderId" value={order.id} />
                                <button
                                  type="submit"
                                  className="flex h-10 w-full items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                  Activate
                                </button>
                              </form>
                            )}

                            {showDeactivate && (
                              <form action={deactivatePublishedBanner}>
                                <input type="hidden" name="orderId" value={order.id} />
                                <button
                                  type="submit"
                                  className="flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                  Deactivate
                                </button>
                              </form>
                            )}

                            {showReject && (
                              <form action={rejectBannerOrder}>
                                <input type="hidden" name="orderId" value={order.id} />
                                <button
                                  type="submit"
                                  className="flex h-10 w-full items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                                >
                                  Reject
                                </button>
                              </form>
                            )}

                            <form action={deleteBannerOrder}>
                              <input type="hidden" name="orderId" value={order.id} />
                              <button
                                type="submit"
                                className="flex h-10 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}