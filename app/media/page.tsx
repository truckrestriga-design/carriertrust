import type { Metadata } from "next";
import MediaClient from "./MediaClient";

export const metadata: Metadata = {
  title: "CarrierTrust in the Media",
  description:
    "Read selected media coverage and ecosystem recognition of CarrierTrust, the trust infrastructure platform for European logistics.",
  alternates: {
    canonical: "https://www.carriertrust.eu/media",
  },
  openGraph: {
    title: "CarrierTrust in the Media",
    description:
      "Selected media coverage and ecosystem recognition of CarrierTrust across Latvian public media, business news and the startup ecosystem.",
    url: "https://www.carriertrust.eu/media",
    siteName: "CarrierTrust",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarrierTrust in the Media",
    description:
      "Selected media coverage and ecosystem recognition of CarrierTrust.",
  },
};

export default function MediaPage() {
  return <MediaClient />;
}
