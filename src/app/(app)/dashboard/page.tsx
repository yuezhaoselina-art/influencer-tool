"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Megaphone, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

interface DashboardData {
  stats: {
    totalInfluencers: number;
    activeCampaigns: number;
    totalReach: number;
    totalSpent: number;
  };
  recentCampaigns: {
    id: string;
    name: string;
    status: string;
    platform: string;
    budget: number;
    spent: number;
    influencerCount: number;
  }[];
  topInfluencers: {
    id: string;
    name: string;
    niche: string;
    totalFollowers: number;
    avgEngagement: number;
    platforms: string[];
  }[];
  platformDistribution: { name: string; value: number }[];
  monthlyPerformance: { month: string; reach: number; engagement: number }[];
}

const COLORS = ["#8b5cf6", "#ec4899", "#f43f5e"];

const platformColor: Record<string, string> = {
  instagram:
    "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-700 border-pink-200",
  tiktok: "bg-gray-900/5 text-gray-700 border-gray-200",
  youtube: "bg-red-500/10 text-red-700 border-red-200",
  multi: "bg-violet-500/10 text-violet-700 border-violet-200",
};

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600 border-gray-200",
  outreach: "bg-blue-50 text-blue-700 border-blue-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-violet-50 text-violet-700 border-violet-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
};

const statCards = [
  {
    key: "totalInfluencers" as const,
    label: "Total Influencers",
    icon: Users,
    gradient: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50",
    change: "+12%",
  },
  {
    key: "activeCampaigns" as const,
    label: "Active Campaigns",
    icon: Megaphone,
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    change: "+3",
  },
  {
    key: "totalReach" as const,
    label: "Total Reach",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    format: (v: number) => `${(v / 1_000_000).toFixed(1)}M`,
    change: "+24%",
  },
  {
    key: "totalSpent" as const,
    label: "Total Spent",
    icon: DollarSign,
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    format: (v: number) => `$${(v / 1000).toFixed(0)}k`,
    change: "",
  },
];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your influencer marketing performance
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const val = data.stats[card.key];
          const display = card.format ? card.format(val) : val;
          return (
            <Card
              key={card.key}
              className="group relative overflow-hidden border-0 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-[0.03] transition-opacity group-hover:opacity-[0.06]`} />
              <CardContent className="relative pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      {card.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                      {display}
                    </p>
                    {card.change && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <ArrowUpRight className="h-3 w-3" />
                        {card.change} this month
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}
                    style={{
                      boxShadow: `0 4px 14px 0 rgba(0,0,0,0.1)`,
                    }}
                  >
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Performance</CardTitle>
            <CardDescription className="text-xs">Reach and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.monthlyPerformance} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="reach" fill="#8b5cf6" name="Reach" radius={[6, 6, 0, 0]} />
                <Bar dataKey="engagement" fill="#ec4899" name="Engagement" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Platform Split</CardTitle>
            <CardDescription className="text-xs">Influencers by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.platformDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  dataKey="value"
                  strokeWidth={0}
                  paddingAngle={4}
                >
                  {data.platformDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    fontSize: 12,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent campaigns & top influencers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-200 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {campaign.name}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`border text-[11px] ${statusColor[campaign.status]}`}
                      >
                        {campaign.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`border text-[11px] ${platformColor[campaign.platform]}`}
                      >
                        {campaign.platform}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      ${campaign.spent.toLocaleString()}
                      <span className="font-normal text-gray-400">
                        {" "}/ ${campaign.budget.toLocaleString()}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {campaign.influencerCount} influencers
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top Influencers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topInfluencers.map((influencer, i) => (
                <div
                  key={influencer.id}
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {influencer.name}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <Badge variant="secondary" className="border border-gray-200 text-[11px]">
                        {influencer.niche}
                      </Badge>
                      {influencer.platforms.map((p) => (
                        <Badge
                          key={p}
                          variant="secondary"
                          className={`border text-[11px] ${platformColor[p]}`}
                        >
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {(influencer.totalFollowers / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-gray-400">
                      {influencer.avgEngagement.toFixed(1)}% eng.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
