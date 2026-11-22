export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexisfitness.com";
  return value.replace(/\/$/, "");
}
