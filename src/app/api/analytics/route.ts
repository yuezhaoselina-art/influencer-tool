import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const metrics = await prisma.metric.findMany({
    include: {
      campaignInfluencer: {
        include: {
          campaign: true,
          influencer: { include: { platforms: true } },
        },
      },
    },
  });

  const overview = {
    totalImpressions: 0,
    totalReach: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    totalSpent: 0,
  };

  const campaignMap = new Map<
    string,
    {
      name: string;
      impressions: number;
      reach: number;
      likes: number;
      comments: number;
      clicks: number;
      conversions: number;
      revenue: number;
      spent: number;
    }
  >();

  const performerMap = new Map<
    string,
    {
      name: string;
      platform: string;
      impressions: number;
      engagement: number;
      revenue: number;
      fee: number;
    }
  >();

  for (const m of metrics) {
    overview.totalImpressions += m.impressions;
    overview.totalReach += m.reach;
    overview.totalLikes += m.likes;
    overview.totalComments += m.comments;
    overview.totalShares += m.shares;
    overview.totalClicks += m.clicks;
    overview.totalConversions += m.conversions;
    overview.totalRevenue += m.revenue;

    const ci = m.campaignInfluencer;
    const cName = ci.campaign.name;

    if (!campaignMap.has(cName)) {
      campaignMap.set(cName, {
        name: cName,
        impressions: 0,
        reach: 0,
        likes: 0,
        comments: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        spent: ci.campaign.spent,
      });
    }
    const cm = campaignMap.get(cName)!;
    cm.impressions += m.impressions;
    cm.reach += m.reach;
    cm.likes += m.likes;
    cm.comments += m.comments;
    cm.clicks += m.clicks;
    cm.conversions += m.conversions;
    cm.revenue += m.revenue;

    const infName = ci.influencer.name;
    if (!performerMap.has(infName)) {
      const mainPlatform = ci.influencer.platforms[0]?.type || "unknown";
      performerMap.set(infName, {
        name: infName,
        platform: mainPlatform,
        impressions: 0,
        engagement: 0,
        revenue: 0,
        fee: ci.fee,
      });
    }
    const pm = performerMap.get(infName)!;
    pm.impressions += m.impressions;
    pm.engagement += m.likes + m.comments + m.shares;
    pm.revenue += m.revenue;
  }

  const campaigns = await prisma.campaign.findMany();
  overview.totalSpent = campaigns.reduce((s, c) => s + c.spent, 0);

  const campaignPerformance = Array.from(campaignMap.values()).map((c) => ({
    ...c,
    roi: c.spent > 0 ? Math.round(((c.revenue - c.spent) / c.spent) * 100) : 0,
  }));

  const topPerformers = Array.from(performerMap.values())
    .map((p) => ({
      name: p.name,
      platform: p.platform,
      impressions: p.impressions,
      engagement: p.engagement,
      roi: p.fee > 0 ? Math.round(((p.revenue - p.fee) / p.fee) * 100) : 0,
    }))
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 5);

  // Generate time series mock data
  const timeSeriesData = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    timeSeriesData.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      impressions: Math.floor(Math.random() * 50000) + 10000,
      engagement: Math.floor(Math.random() * 5000) + 1000,
      clicks: Math.floor(Math.random() * 2000) + 200,
    });
  }

  return NextResponse.json({
    overview,
    campaignPerformance,
    timeSeriesData,
    topPerformers,
  });
}
