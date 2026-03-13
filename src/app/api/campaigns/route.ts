import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      influencers: {
        include: {
          influencer: {
            select: { id: true, name: true, niche: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Use first user as default (simplified - no auth yet)
  const user = await prisma.user.findFirst();
  if (!user) {
    return NextResponse.json({ error: "No user found" }, { status: 400 });
  }

  const campaign = await prisma.campaign.create({
    data: {
      name: body.name,
      description: body.description || null,
      platform: body.platform,
      budget: body.budget || 0,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      userId: user.id,
    },
    include: {
      influencers: {
        include: {
          influencer: { select: { id: true, name: true, niche: true } },
        },
      },
    },
  });

  return NextResponse.json(campaign);
}
