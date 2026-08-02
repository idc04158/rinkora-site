import { google } from "googleapis"

function getAuthClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || ""
  if (!raw) return null
  let creds: Record<string, unknown>
  try {
    const json = Buffer.from(raw, "base64").toString("utf8")
    creds = JSON.parse(json)
  } catch {
    try {
      creds = JSON.parse(raw)
    } catch {
      return null
    }
  }
  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  })
}

export async function fetchGaSummary(propertyId: string, days = 7) {
  const auth = getAuthClient()
  if (!auth || !propertyId) return null
  const analytics = google.analyticsdata("v1beta")
  const end = new Date()
  const start = new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000)
  const startDate = start.toISOString().slice(0, 10)
  const endDate = end.toISOString().slice(0, 10)

  try {
    const res = await analytics.properties.runReport({
      property: `properties/${propertyId}`,
      auth,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: "sessions" },
          { name: "totalUsers" },
          { name: "averageSessionDuration" },
        ],
        metricAggregations: ["TOTAL"],
      },
    })
    const metrics = res.data.totals?.[0]?.metricValues ?? []
    const sessions = Number(metrics[0]?.value ?? 0)
    const totalUsers = Number(metrics[1]?.value ?? 0)
    // averageSessionDuration is already in seconds
    const avgSessionDuration = Number(metrics[2]?.value ?? 0)
    return { sessions, totalUsers, avgSessionDuration }
  } catch {
    return null
  }
}

export async function fetchGscTopQueries(siteUrl: string, days = 7, limit = 10) {
  const auth = getAuthClient()
  if (!auth || !siteUrl) return null
  const searchconsole = google.searchconsole("v1")
  const end = new Date()
  const start = new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000)
  const startDate = start.toISOString().slice(0, 10)
  const endDate = end.toISOString().slice(0, 10)

  try {
    const res = await searchconsole.searchanalytics.query({
      auth,
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: limit,
      },
    })
    const rows = res.data.rows ?? []
    return rows.map((r) => ({
      query: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
    }))
  } catch {
    return null
  }
}
