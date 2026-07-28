import type { Metadata } from "next";
import MediaClient from "./MediaClient";

export const metadata: Metadata = {
  title: {
    absolute: "CarrierTrust Newsroom & Media Coverage | European Logistics",
  },
  description:
    "Explore media coverage, startup ecosystem recognition and company updates from CarrierTrust, a Latvia-built FreightTech startup developing trust infrastructure for European logistics.",
  alternates: {
    canonical: "https://www.carriertrust.eu/media",
  },
  openGraph: {
    title: "CarrierTrust Newsroom & Media Coverage | European Logistics",
    description:
      "Explore media coverage, startup ecosystem recognition and company updates from CarrierTrust, a Latvia-built FreightTech startup developing trust infrastructure for European logistics.",
    url: "https://www.carriertrust.eu/media",
    siteName: "CarrierTrust",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarrierTrust Newsroom & Media Coverage | European Logistics",
    description:
      "Explore media coverage, startup ecosystem recognition and company updates from CarrierTrust, a Latvia-built FreightTech startup developing trust infrastructure for European logistics.",
  },
};

export default function MediaPage() {
  return <MediaClient />;
}
