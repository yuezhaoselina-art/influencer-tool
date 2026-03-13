import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a default user
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@brand.com",
      password: "demo123",
      company: "Acme Brand Co.",
      role: "brand",
    },
  });

  // Create influencers
  const influencers = await Promise.all([
    prisma.influencer.create({
      data: {
        name: "Emma Rodriguez",
        email: "emma@creator.com",
        bio: "Fashion & lifestyle creator sharing daily outfit inspiration and sustainable fashion tips.",
        niche: "fashion",
        location: "Los Angeles, CA",
        platforms: {
          create: [
            { type: "instagram", username: "emmarod_style", followers: 520000, engagementRate: 4.2, avgLikes: 21840, avgComments: 890, avgViews: 185000 },
            { type: "tiktok", username: "emmarod", followers: 1200000, engagementRate: 6.8, avgLikes: 81600, avgComments: 3200, avgViews: 450000 },
          ],
        },
      },
    }),
    prisma.influencer.create({
      data: {
        name: "Jake Chen",
        email: "jake@techguru.com",
        bio: "Tech reviewer and gadget enthusiast. Honest reviews on the latest consumer tech.",
        niche: "tech",
        location: "San Francisco, CA",
        platforms: {
          create: [
            { type: "youtube", username: "JakeTechReviews", followers: 890000, engagementRate: 3.5, avgLikes: 31150, avgComments: 2100, avgViews: 320000 },
            { type: "instagram", username: "jakechentech", followers: 245000, engagementRate: 2.8, avgLikes: 6860, avgComments: 420, avgViews: 95000 },
          ],
        },
      },
    }),
    prisma.influencer.create({
      data: {
        name: "Sofia Nguyen",
        email: "sofia@beauty.co",
        bio: "Beauty & skincare expert. Helping you find the perfect routine for glowing skin.",
        niche: "beauty",
        location: "New York, NY",
        platforms: {
          create: [
            { type: "instagram", username: "sofiabeauty", followers: 780000, engagementRate: 5.1, avgLikes: 39780, avgComments: 1560, avgViews: 290000 },
            { type: "youtube", username: "SofiaNguyenBeauty", followers: 450000, engagementRate: 4.0, avgLikes: 18000, avgComments: 1200, avgViews: 210000 },
            { type: "tiktok", username: "sofiabeautytips", followers: 2100000, engagementRate: 7.2, avgLikes: 151200, avgComments: 5600, avgViews: 890000 },
          ],
        },
      },
    }),
    prisma.influencer.create({
      data: {
        name: "Marcus Williams",
        email: "marcus@fitlife.com",
        bio: "Fitness coach & nutrition expert. Transform your body and mind with science-backed methods.",
        niche: "fitness",
        location: "Miami, FL",
        platforms: {
          create: [
            { type: "instagram", username: "marcusfitlife", followers: 650000, engagementRate: 4.8, avgLikes: 31200, avgComments: 1800, avgViews: 240000 },
            { type: "youtube", username: "MarcusFitLife", followers: 380000, engagementRate: 3.9, avgLikes: 14820, avgComments: 980, avgViews: 175000 },
          ],
        },
      },
    }),
    prisma.influencer.create({
      data: {
        name: "Lily Park",
        email: "lily@foodie.com",
        bio: "Food blogger & home chef. Easy recipes for busy people who love great food.",
        niche: "food",
        location: "Chicago, IL",
        platforms: {
          create: [
            { type: "tiktok", username: "lilyeats", followers: 3500000, engagementRate: 8.5, avgLikes: 297500, avgComments: 12000, avgViews: 1200000 },
            { type: "instagram", username: "lilyparkfood", followers: 420000, engagementRate: 5.5, avgLikes: 23100, avgComments: 1100, avgViews: 160000 },
          ],
        },
      },
    }),
    prisma.influencer.create({
      data: {
        name: "Alex Moreau",
        email: "alex@wanderlust.com",
        bio: "Travel photographer capturing the world's most beautiful destinations.",
        niche: "travel",
        location: "London, UK",
        platforms: {
          create: [
            { type: "instagram", username: "alexwanderlust", followers: 920000, engagementRate: 4.5, avgLikes: 41400, avgComments: 1650, avgViews: 340000 },
            { type: "youtube", username: "AlexMoreauTravel", followers: 560000, engagementRate: 3.2, avgLikes: 17920, avgComments: 890, avgViews: 280000 },
          ],
        },
      },
    }),
    prisma.influencer.create({
      data: {
        name: "Ryan Kim",
        email: "ryan@gamezone.com",
        bio: "Pro gamer & streamer. FPS specialist with tournament experience.",
        niche: "gaming",
        location: "Seoul, KR",
        platforms: {
          create: [
            { type: "youtube", username: "RyanKimGaming", followers: 1500000, engagementRate: 4.1, avgLikes: 61500, avgComments: 4200, avgViews: 620000 },
            { type: "tiktok", username: "ryankimplays", followers: 800000, engagementRate: 6.0, avgLikes: 48000, avgComments: 2800, avgViews: 350000 },
          ],
        },
      },
    }),
    prisma.influencer.create({
      data: {
        name: "Olivia Thompson",
        email: "olivia@lifestyle.co",
        bio: "Lifestyle creator sharing home decor, wellness tips, and daily vlogs.",
        niche: "lifestyle",
        location: "Austin, TX",
        platforms: {
          create: [
            { type: "instagram", username: "oliviathompson", followers: 340000, engagementRate: 5.8, avgLikes: 19720, avgComments: 980, avgViews: 130000 },
            { type: "tiktok", username: "olivialifestyle", followers: 680000, engagementRate: 7.0, avgLikes: 47600, avgComments: 2100, avgViews: 310000 },
            { type: "youtube", username: "OliviaThompsonVlogs", followers: 190000, engagementRate: 3.6, avgLikes: 6840, avgComments: 540, avgViews: 85000 },
          ],
        },
      },
    }),
  ]);

  // Create campaigns with influencers and metrics
  const campaign1 = await prisma.campaign.create({
    data: {
      name: "Summer Fashion Collection",
      description: "Promote our new summer line across Instagram and TikTok with fashion influencers.",
      status: "active",
      platform: "multi",
      budget: 25000,
      spent: 18500,
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-04-30"),
      userId: user.id,
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      name: "Tech Product Review",
      description: "Get honest reviews from top tech YouTubers for our new smartphone.",
      status: "active",
      platform: "youtube",
      budget: 40000,
      spent: 32000,
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-03-31"),
      userId: user.id,
    },
  });

  const campaign3 = await prisma.campaign.create({
    data: {
      name: "Beauty Brand Awareness",
      description: "Build brand awareness through beauty tutorials and reviews.",
      status: "outreach",
      platform: "instagram",
      budget: 15000,
      spent: 3200,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-05-31"),
      userId: user.id,
    },
  });

  const campaign4 = await prisma.campaign.create({
    data: {
      name: "Fitness App Launch",
      description: "Promote our new fitness tracking app with fitness influencers.",
      status: "completed",
      platform: "multi",
      budget: 20000,
      spent: 19800,
      startDate: new Date("2025-11-01"),
      endDate: new Date("2026-01-31"),
      userId: user.id,
    },
  });

  const campaign5 = await prisma.campaign.create({
    data: {
      name: "Holiday Food Campaign",
      description: "Holiday recipe series featuring our kitchen products.",
      status: "draft",
      platform: "tiktok",
      budget: 12000,
      spent: 0,
      userId: user.id,
    },
  });

  // Link influencers to campaigns
  const ci1 = await prisma.campaignInfluencer.create({
    data: { campaignId: campaign1.id, influencerId: influencers[0].id, status: "accepted", fee: 8000, deliverables: "3 IG posts, 5 TikTok videos" },
  });
  const ci2 = await prisma.campaignInfluencer.create({
    data: { campaignId: campaign1.id, influencerId: influencers[7].id, status: "accepted", fee: 5500, deliverables: "4 IG reels, 3 TikTok videos" },
  });
  const ci3 = await prisma.campaignInfluencer.create({
    data: { campaignId: campaign2.id, influencerId: influencers[1].id, status: "accepted", fee: 15000, deliverables: "2 YouTube reviews, 3 shorts" },
  });
  const ci4 = await prisma.campaignInfluencer.create({
    data: { campaignId: campaign2.id, influencerId: influencers[6].id, status: "negotiating", fee: 12000, deliverables: "1 YouTube review, 2 shorts" },
  });
  const ci5 = await prisma.campaignInfluencer.create({
    data: { campaignId: campaign3.id, influencerId: influencers[2].id, status: "invited", fee: 10000, deliverables: "5 IG posts, 3 reels, 2 YouTube tutorials" },
  });
  const ci6 = await prisma.campaignInfluencer.create({
    data: { campaignId: campaign4.id, influencerId: influencers[3].id, status: "completed", fee: 12000, deliverables: "4 IG posts, 2 YouTube videos, 6 TikToks" },
  });
  const ci7 = await prisma.campaignInfluencer.create({
    data: { campaignId: campaign4.id, influencerId: influencers[7].id, status: "completed", fee: 7800, deliverables: "3 IG reels, 4 TikToks" },
  });

  // Add metrics
  await prisma.metric.createMany({
    data: [
      { campaignInfluencerId: ci1.id, impressions: 450000, reach: 320000, likes: 28000, comments: 1200, shares: 3500, clicks: 8500, conversions: 420, revenue: 12600 },
      { campaignInfluencerId: ci2.id, impressions: 280000, reach: 195000, likes: 18500, comments: 850, shares: 2100, clicks: 5200, conversions: 280, revenue: 8400 },
      { campaignInfluencerId: ci3.id, impressions: 890000, reach: 620000, likes: 42000, comments: 3800, shares: 5200, clicks: 15000, conversions: 750, revenue: 37500 },
      { campaignInfluencerId: ci6.id, impressions: 520000, reach: 380000, likes: 35000, comments: 2200, shares: 4800, clicks: 12000, conversions: 620, revenue: 18600 },
      { campaignInfluencerId: ci7.id, impressions: 310000, reach: 220000, likes: 22000, comments: 1500, shares: 2800, clicks: 7500, conversions: 380, revenue: 11400 },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
