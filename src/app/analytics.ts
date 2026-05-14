export function isGoogleAnalyticsEnabled(
  gaId: string | undefined,
  nodeEnv = process.env.NODE_ENV,
  vercelEnv = process.env.VERCEL_ENV
): gaId is string {
  return Boolean(gaId) && nodeEnv === "production" && vercelEnv === "production";
}
