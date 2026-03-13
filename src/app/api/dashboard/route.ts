import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [influencerCount, campaigns, platforms] = await Promise.all([
    prisma.influencer.count(),
    prisma.campaign.findMany({
      include: { influencers: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.platform.findMany(),
  ]);

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalReach = platforms.reduce((sum, p) => sum + p.followers, 0);

  const recentCampaigns = campaigns.slice(0, 5).map((c) => ({
    id: c.id,
    name: c.name,
    status: c.status,
    platform: c.platform,
    budget: c.budget,
    spent: c.spent,
    influencerCount: c.influencers.length,
  }));

  const influencers = await prisma.influencer.findMany({
    include: { platforms: true },
    take: 5,
  });

  const topInfluencers = influencers
    .map((inf) => ({
      id: inf.id,
      name: inf.name,
      niche: inf.niche,
      totalFollowers: inf.platforms.reduce((s, p) => s + p.followers, 0),
      avgEngagement:
        inf.platforms.length > 0
          ? inf.platforms.reduce((s, p) => s + p.engagementRate, 0) /
            inf.platforms.length
          : 0,
      platforms: inf.platforms.map((p) => p.type),
    }))
    .sort((a, b) => b.totalFollowers - a.totalFollowers);

  const platformCounts: Record<string, number> = {};
  platforms.forEach((p) => {
    platformCounts[p.type] = (platformCounts[p.type] || 0) + 1;
  });
  const platformDistribution = Object.entries(platformCounts).map(
    ([name, value]) => ({ name, value })
  );

  const monthlyPerformance = [
    { month: "Oct", reach: 120000, engagement: 8500 },
    { month: "Nov", reach: 185000, engagement: 12000 },
    { month: "Dec", reach: 210000, engagement: 15500 },
    { month: "Jan", reach: 245000, engagement: 18000 },
    { month: "Feb", reach: 310000, engagement: 22000 },
    { month: "Mar", reach: 380000, engagement: 28000 },
  ];

  return NextResponse.json({
    stats: {
      totalInfluencers: influencerCount,
      activeCampaigns,
      totalReach,
      totalSpent,
    },
    recentCampaigns,
    topInfluencers,
    platformDistribution,
    monthlyPerformance,
  });
}
