import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const niche = searchParams.get("niche") || "";
  const platform = searchParams.get("platform") || "";
  const minFollowers = parseInt(searchParams.get("minFollowers") || "0");

  const where: Record<string, unknown> = {};

  if (search) {
    where.name = { contains: search };
  }
  if (niche) {
    where.niche = niche;
  }
  if (platform) {
    where.platforms = { some: { type: platform } };
  }

  let influencers = await prisma.influencer.findMany({
    where,
    include: {
      platforms: {
        select: {
          type: true,
          username: true,
          followers: true,
          engagementRate: true,
          avgLikes: true,
          avgComments: true,
          avgViews: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (minFollowers > 0) {
    influencers = influencers.filter((inf) => {
      const total = inf.platforms.reduce((s, p) => s + p.followers, 0);
      return total >= minFollowers;
    });
  }

  return NextResponse.json(influencers);
}
