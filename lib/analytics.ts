import { BetaAnalyticsDataClient } from "@google-analytics/data";

// 1. Initialize the client securely on the server
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    // The private key from Google Cloud usually contains literal '\n' strings that need to be parsed
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  projectId: process.env.GA_PROJECT_ID,
});

export async function getAnalyticsData() {
  const propertyId = process.env.GA_PROPERTY_ID;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }, { name: "deviceCategory" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
    });

    const rows = response.rows || [];

    let totalPageViews = 0;
    let totalActiveUsers = 0;

    const dateMap = new Map<string, { views: number; users: number }>();
    const deviceMap = new Map<string, number>();

    rows.forEach((row) => {
      const dateStr = row.dimensionValues?.[0]?.value || "";
      const device = row.dimensionValues?.[1]?.value || "Unknown";
      const views = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const users = parseInt(row.metricValues?.[1]?.value || "0", 10);

      totalPageViews += views;
      totalActiveUsers += users;

      // Aggregate by Date
      if (!dateMap.has(dateStr)) {
        dateMap.set(dateStr, { views: 0, users: 0 });
      }
      const dateData = dateMap.get(dateStr)!;
      dateData.views += views;
      dateData.users += users;

      // Aggregate by Device
      const currentDeviceUsers = deviceMap.get(device) || 0;
      deviceMap.set(device, currentDeviceUsers + users);
    });

    const chartData = Array.from(dateMap.entries()).map(([dateStr, data]) => {
      // dateStr format is 'YYYYMMDD'. Format to 'Jan 01'
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const dateObj = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      );
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      return {
        date: formattedDate,
        views: data.views,
        users: data.users,
      };
    });

    // Sort chronologically
    chartData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const deviceCategory = Array.from(deviceMap.entries()).map(
      ([device, users]) => ({
        device,
        users: users.toString(),
      }),
    );

    return {
      pageViews: totalPageViews.toString(),
      activeUsers: totalActiveUsers.toString(),
      chartData,
      deviceCategory,
    };
  } catch (error) {
    console.error("Error fetching Google Analytics data:", error);
    return {
      pageViews: "0",
      activeUsers: "0",
      chartData: [],
      deviceCategory: [],
    };
  }
}
