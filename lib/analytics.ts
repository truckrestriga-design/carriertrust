export type AnalyticsEventPayload = {
    event_type: "page_view" | "company_view" | "search" | "banner_click";
    page_path?: string;
    page_url?: string;
    referrer?: string;
    source?: string;
    medium?: string;
    campaign?: string;
    session_id?: string;
    visitor_id?: string;
    company_id?: string;
    company_name?: string;
    search_query?: string;
    banner_id?: string;
    banner_placement?: string;
  };
  
  function getOrCreateStorageValue(key: string) {
    if (typeof window === "undefined") return "";
  
    let value = localStorage.getItem(key);
    if (!value) {
      value = crypto.randomUUID();
      localStorage.setItem(key, value);
    }
    return value;
  }
  
  function getOrCreateSessionId() {
    if (typeof window === "undefined") return "";
  
    let value = sessionStorage.getItem("site_session_id");
    if (!value) {
      value = crypto.randomUUID();
      sessionStorage.setItem("site_session_id", value);
    }
    return value;
  }
  
  function parseUtm() {
    if (typeof window === "undefined") {
      return { source: "", medium: "", campaign: "" };
    }
  
    const params = new URLSearchParams(window.location.search);
  
    return {
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
    };
  }
  
  export async function trackEvent(payload: AnalyticsEventPayload) {
    if (typeof window === "undefined") return;
  
    const visitor_id = getOrCreateStorageValue("site_visitor_id");
    const session_id = getOrCreateSessionId();
    const { source, medium, campaign } = parseUtm();
  
    const finalPayload: AnalyticsEventPayload = {
      page_path: window.location.pathname + window.location.search,
      page_url: window.location.href,
      referrer: document.referrer || "",
      source,
      medium,
      campaign,
      visitor_id,
      session_id,
      ...payload,
    };
  
    try {
      await fetch("/api/track-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
        keepalive: true,
      });
    } catch {
      // ignore analytics errors
    }
  }