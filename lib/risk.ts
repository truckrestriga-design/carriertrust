export type SharedRiskLevel = "high" | "medium" | "low" | null;

export type RiskReviewInput = {
  rating: number | null;
  status?: string | null;
};

export function getRiskLevelFromReviews(
  reviews: RiskReviewInput[]
): SharedRiskLevel {
  const published = reviews.filter((r) => r.status === "published");

  if (published.length === 0) {
    return null;
  }

  const ratings = published
    .map((r) => (typeof r.rating === "number" ? r.rating : null))
    .filter((v): v is number => v !== null);

  if (ratings.length === 0) {
    return null;
  }

  const avgRating = ratings.reduce((sum, n) => sum + n, 0) / ratings.length;

  if (avgRating < 2.5) return "high";
  if (avgRating < 3.5) return "medium";
  return "low";
}