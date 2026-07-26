import HomeClient from "./HomeClient";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

async function getHomeStats() {
  const [companiesResult, reviewsResult] = await Promise.all([
    supabaseServer
      .from("companies")
      .select("id", { count: "exact", head: true }),
    supabaseServer
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
  ]);

  if (companiesResult.error) {
    console.error(
      "Failed to load companies count for the home page:",
      companiesResult.error.message
    );
  }

  if (reviewsResult.error) {
    console.error(
      "Failed to load published reviews count for the home page:",
      reviewsResult.error.message
    );
  }

  return {
    companiesCount:
      typeof companiesResult.count === "number" ? companiesResult.count : 0,
    publishedReviewsCount:
      typeof reviewsResult.count === "number" ? reviewsResult.count : 0,
  };
}

export default async function HomePage() {
  const { companiesCount, publishedReviewsCount } = await getHomeStats();

  return (
    <HomeClient
      initialCompaniesCount={companiesCount}
      initialPublishedReviewsCount={publishedReviewsCount}
    />
  );
}
