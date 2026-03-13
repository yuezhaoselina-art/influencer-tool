"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Eye, Heart, MousePointer, Trophy } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AnalyticsData {
  overview: {
    totalImpressions: number;
    totalReach: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    totalClicks: number;
    totalConversions: number;
    totalRevenue: number;
    totalSpent: number;
  };
  campaignPerformance: {
    name: string;
    impressions: number;
    reach: number;
    likes: number;
    comments: number;
    clicks: number;
    conversions: number;
    revenue: number;
    spent: number;
    roi: number;
  }[];
  timeSeriesData: {
    date: string;
    impressions: number;
    engagement: number;
    clicks: number;
  }[];
  topPerformers: {
    name: string;
    platform: string;
    impressions: number;
    engagement: number;
    roi: number;
  }[];
}

const metricCards = [
  {
    key: "impressions" as const,
    label: "Impressions",
    icon: Eye,
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    key: "engagement" as const,
    label: "Total Engagement",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    key: "clicks" as const,
    label: "Clicks",
    icon: MousePointer,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    key: "roi" as const,
    label: "ROI",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
  },
];

const platformColor: Record<string, string> = {
  instagram: "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-700 border-pink-200",
  tiktok: "bg-gray-900/5 text-gray-700 border-gray-200",
  youtube: "bg-red-500/10 text-red-700 border-red-200",
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    fetch(`/api/analytics?period=${period}`)
      .then((res) => res.json())
      .then(setData);
  }, [period]);

  const exportCSV = () => {
    if (!data) return;
    const headers = ["Campaign", "Impressions", "Reach", "Likes", "Comments", "Clicks", "Conversions", "Revenue", "Spent", "ROI"];
    const rows = data.campaignPerformance.map((c) => [
      c.name, c.impressions, c.reach, c.likes, c.comments, c.clicks, c.conversions, c.revenue, c.spent, `${c.roi}%`,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    );
  }

  const roi = data.overview.totalSpent > 0
    ? ((data.overview.totalRevenue - data.overview.totalSpent) / data.overview.totalSpent * 100)
    : 0;

  const metricValues: Record<string, number> = {
    impressions: data.overview.totalImpressions,
    engagement: data.overview.totalLikes + data.overview.totalComments + data.overview.totalShares,
    clicks: data.overview.totalClicks,
    roi,
  };

  const formatMetric = (key: string, value: number) => {
    if (key === "roi") return `${value.toFixed(1)}%`;
    if (value > 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value > 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Track performance and ROI across campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
            <SelectTrigger className="w-36 rounded-xl border-gray-200 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-gray-200 text-sm"
            onClick={exportCSV}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Overview metrics */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => {
          const value = metricValues[card.key];
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
                      {formatMetric(card.key, value)}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}
                  >
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Time series chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Performance Over Time</CardTitle>
          <CardDescription className="text-xs">Impressions, engagement, and clicks trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data.timeSeriesData}>
              <defs>
                <linearGradient id="impressionsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engagementGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  fontSize: 12,
                }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={2} fill="url(#impressionsGrad)" name="Impressions" />
              <Area type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={2} fill="url(#engagementGrad)" name="Engagement" />
              <Area type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={2} fill="url(#clicksGrad)" name="Clicks" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign comparison & top performers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Campaign ROI Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.campaignPerformance} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis dataKey="name" type="category" width={130} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="roi" fill="#8b5cf6" name="ROI %" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top Performers</CardTitle>
            <CardDescription className="text-xs">Best performing influencers by ROI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topPerformers.map((perf, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-200 hover:shadow-sm"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${
                    i === 0
                      ? "bg-gradient-to-br from-amber-400 to-amber-600"
                      : i === 1
                        ? "bg-gradient-to-br from-gray-300 to-gray-500"
                        : "bg-gradient-to-br from-orange-300 to-orange-500"
                  }`}>
                    {i === 0 ? <Trophy className="h-5 w-5" /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{perf.name}</p>
                    <Badge
                      variant="secondary"
                      className={`mt-1 border text-[11px] ${platformColor[perf.platform] || "border-gray-200"}`}
                    >
                      {perf.platform}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">{perf.roi}% ROI</p>
                    <p className="text-xs text-gray-400">
                      {(perf.impressions / 1000).toFixed(0)}k impressions
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
