"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Megaphone,
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  Heart,
  Eye,
  MousePointer,
  ArrowUpRight,
  Check,
  X,
  Star,
  Sparkles,
  Instagram,
  Youtube,
  Globe,
  Zap,
  Trophy,
  MapPin,
} from "lucide-react";
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
  AreaChart,
  Area,
  Legend,
} from "recharts";

const barData = [
  { name: "Oct", reach: 120000, engagement: 8500 },
  { name: "Nov", reach: 185000, engagement: 12000 },
  { name: "Dec", reach: 210000, engagement: 15500 },
  { name: "Jan", reach: 245000, engagement: 18000 },
  { name: "Feb", reach: 310000, engagement: 22000 },
  { name: "Mar", reach: 380000, engagement: 28000 },
];

const pieData = [
  { name: "Instagram", value: 45 },
  { name: "TikTok", value: 35 },
  { name: "YouTube", value: 20 },
];

const areaData = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  impressions: Math.floor(Math.random() * 40000) + 15000,
  engagement: Math.floor(Math.random() * 4000) + 1000,
  clicks: Math.floor(Math.random() * 1500) + 300,
}));

const PIE_COLORS = ["#8b5cf6", "#ec4899", "#f43f5e"];

export default function DesignPage() {
  const [activeTab, setActiveTab] = useState("all");

  const sections = [
    { id: "all", label: "All" },
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "components", label: "Components" },
    { id: "cards", label: "Cards" },
    { id: "charts", label: "Charts" },
    { id: "patterns", label: "Patterns" },
  ];

  const show = (id: string) => activeTab === "all" || activeTab === id;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Design System
            </h1>
            <p className="text-sm text-gray-500">
              InfluencerHub UI/UX component library & visual guide
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeTab === s.id
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ==================== COLORS ==================== */}
      {show("colors") && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Color Palette</h2>
            <p className="text-sm text-gray-500">Primary, accent, and semantic colors used across the app</p>
          </div>

          {/* Primary Gradients */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Brand Gradients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: "Primary", gradient: "from-violet-500 to-indigo-600", hex: "#8b5cf6 → #4f46e5" },
                  { name: "Rose", gradient: "from-pink-500 to-rose-600", hex: "#ec4899 → #e11d48" },
                  { name: "Emerald", gradient: "from-emerald-500 to-teal-600", hex: "#10b981 → #0d9488" },
                  { name: "Amber", gradient: "from-amber-500 to-orange-600", hex: "#f59e0b → #ea580c" },
                ].map((c) => (
                  <div key={c.name} className="text-center">
                    <div className={`h-24 rounded-2xl bg-gradient-to-br ${c.gradient} shadow-lg`} />
                    <p className="mt-2 text-sm font-semibold text-gray-900">{c.name}</p>
                    <p className="text-[11px] text-gray-400">{c.hex}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Solid Colors */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Base Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-3">
                {[
                  { name: "Violet 600", bg: "bg-violet-600", hex: "#7c3aed" },
                  { name: "Indigo 600", bg: "bg-indigo-600", hex: "#4f46e5" },
                  { name: "Pink 500", bg: "bg-pink-500", hex: "#ec4899" },
                  { name: "Rose 500", bg: "bg-rose-500", hex: "#f43f5e" },
                  { name: "Emerald 500", bg: "bg-emerald-500", hex: "#10b981" },
                  { name: "Amber 500", bg: "bg-amber-500", hex: "#f59e0b" },
                  { name: "Red 500", bg: "bg-red-500", hex: "#ef4444" },
                  { name: "Gray 900", bg: "bg-gray-900", hex: "#111827" },
                ].map((c) => (
                  <div key={c.name} className="text-center">
                    <div className={`h-16 rounded-xl ${c.bg}`} />
                    <p className="mt-1.5 text-[11px] font-medium text-gray-600">{c.name}</p>
                    <p className="text-[10px] text-gray-400">{c.hex}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Semantic Colors */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Semantic & Background Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-3">
                {[
                  { name: "Success", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", label: "Active" },
                  { name: "Warning", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Paused" },
                  { name: "Error", bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Declined" },
                  { name: "Info", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", label: "Outreach" },
                  { name: "Neutral", bg: "bg-gray-100", border: "border-gray-200", text: "text-gray-600", label: "Draft" },
                  { name: "Primary", bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", label: "Completed" },
                ].map((c) => (
                  <div key={c.name} className={`rounded-xl border p-4 text-center ${c.bg} ${c.border}`}>
                    <Badge variant="secondary" className={`border text-[11px] ${c.bg} ${c.text} ${c.border}`}>
                      {c.label}
                    </Badge>
                    <p className="mt-2 text-xs font-medium text-gray-600">{c.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ==================== TYPOGRAPHY ==================== */}
      {show("typography") && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Typography</h2>
            <p className="text-sm text-gray-500">Font scale, weights, and text styles</p>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Type Scale</CardTitle>
              <CardDescription className="text-xs">Geist Sans — clean, modern, and highly readable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Display", class: "text-5xl font-bold tracking-tight", text: "Find & grow with influencers" },
                { label: "H1", class: "text-3xl font-bold tracking-tight", text: "Dashboard Overview" },
                { label: "H2", class: "text-2xl font-bold tracking-tight", text: "Campaign Analytics" },
                { label: "H3", class: "text-lg font-bold", text: "Top Performers" },
                { label: "H4 / Card Title", class: "text-base font-semibold", text: "Monthly Performance" },
                { label: "Body", class: "text-sm text-gray-600", text: "Track performance and ROI across Instagram, TikTok, and YouTube campaigns." },
                { label: "Small", class: "text-xs text-gray-500", text: "Last updated 2 hours ago" },
                { label: "Label", class: "text-xs font-medium uppercase tracking-wider text-gray-400", text: "TOTAL INFLUENCERS" },
                { label: "Micro", class: "text-[11px] text-gray-400", text: "avg engagement" },
              ].map((t) => (
                <div key={t.label} className="flex items-baseline gap-6 border-b border-gray-50 pb-4">
                  <span className="w-32 shrink-0 text-[11px] font-medium uppercase tracking-wider text-violet-500">
                    {t.label}
                  </span>
                  <p className={t.class}>{t.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Gradient Text</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                Find, manage &{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  grow
                </span>{" "}
                with influencers
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ==================== COMPONENTS ==================== */}
      {show("components") && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Components</h2>
            <p className="text-sm text-gray-500">Buttons, badges, inputs, and interactive elements</p>
          </div>

          {/* Buttons */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Primary</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-white shadow-md shadow-violet-200 hover:opacity-90">
                    Get Started
                  </Button>
                  <Button className="gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-white shadow-md shadow-violet-200 hover:opacity-90">
                    <Sparkles className="h-4 w-4" /> New Campaign
                  </Button>
                  <Button className="gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-6 text-white shadow-md shadow-pink-200 hover:opacity-90">
                    <Heart className="h-4 w-4" /> Add to Favorites
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Secondary & Outline</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" className="rounded-xl border-gray-200">
                    Cancel
                  </Button>
                  <Button variant="outline" className="gap-2 rounded-xl border-gray-200">
                    <Search className="h-4 w-4" /> Search
                  </Button>
                  <Button variant="ghost" className="rounded-xl">
                    Ghost Button
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" className="rounded-lg bg-violet-600 text-white text-xs">Small</Button>
                  <Button className="rounded-xl bg-violet-600 text-white">Default</Button>
                  <Button size="lg" className="rounded-xl bg-violet-600 text-white text-base px-8">Large</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Status</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="border border-gray-200 bg-gray-100 text-gray-600 text-[11px]">draft</Badge>
                  <Badge variant="secondary" className="border border-blue-200 bg-blue-50 text-blue-700 text-[11px]">outreach</Badge>
                  <Badge variant="secondary" className="border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px]">active</Badge>
                  <Badge variant="secondary" className="border border-amber-200 bg-amber-50 text-amber-700 text-[11px]">paused</Badge>
                  <Badge variant="secondary" className="border border-violet-200 bg-violet-50 text-violet-700 text-[11px]">completed</Badge>
                  <Badge variant="secondary" className="border border-red-200 bg-red-50 text-red-700 text-[11px]">declined</Badge>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Platform</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px]">IG</Badge>
                  <Badge className="border-0 bg-gray-900 text-white text-[10px]">TT</Badge>
                  <Badge className="border-0 bg-red-500 text-white text-[10px]">YT</Badge>
                  <Badge variant="secondary" className="border border-pink-200 bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-700 text-[11px]">instagram</Badge>
                  <Badge variant="secondary" className="border border-gray-200 bg-gray-900/5 text-gray-700 text-[11px]">tiktok</Badge>
                  <Badge variant="secondary" className="border border-red-200 bg-red-500/10 text-red-700 text-[11px]">youtube</Badge>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Niche</p>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { label: "fashion", color: "bg-pink-50 text-pink-700 border-pink-200" },
                    { label: "tech", color: "bg-blue-50 text-blue-700 border-blue-200" },
                    { label: "beauty", color: "bg-purple-50 text-purple-700 border-purple-200" },
                    { label: "fitness", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                    { label: "food", color: "bg-orange-50 text-orange-700 border-orange-200" },
                    { label: "travel", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
                    { label: "gaming", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
                    { label: "lifestyle", color: "bg-amber-50 text-amber-700 border-amber-200" },
                  ].map((n) => (
                    <Badge key={n.label} variant="secondary" className={`border text-[11px] ${n.color}`}>{n.label}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Form Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label className="text-xs font-medium text-gray-500">Search Input</Label>
                  <div className="relative mt-1.5">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search influencers..." className="h-10 rounded-xl border-gray-200 bg-gray-50/80 pl-10 text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">Text Input</Label>
                  <Input placeholder="Campaign name" className="mt-1.5 h-10 rounded-xl border-gray-200 text-sm" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">Select</Label>
                  <Select defaultValue="instagram">
                    <SelectTrigger className="mt-1.5 rounded-xl border-gray-200 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Data Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/80">
                      <TableHead className="text-xs">Influencer</TableHead>
                      <TableHead className="text-xs">Platform</TableHead>
                      <TableHead className="text-xs">Followers</TableHead>
                      <TableHead className="text-xs">Engagement</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Emma Rodriguez", platform: "instagram", followers: "520k", eng: "4.2%", status: "accepted" },
                      { name: "Jake Chen", platform: "youtube", followers: "890k", eng: "3.5%", status: "negotiating" },
                      { name: "Lily Park", platform: "tiktok", followers: "3.5M", eng: "8.5%", status: "invited" },
                    ].map((r) => (
                      <TableRow key={r.name} className="hover:bg-gray-50/50">
                        <TableCell className="text-sm font-medium">{r.name}</TableCell>
                        <TableCell>
                          <Badge className={`border-0 text-[10px] text-white ${r.platform === "instagram" ? "bg-gradient-to-r from-pink-500 to-purple-500" : r.platform === "tiktok" ? "bg-gray-900" : "bg-red-500"}`}>
                            {r.platform === "instagram" ? "IG" : r.platform === "tiktok" ? "TT" : "YT"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{r.followers}</TableCell>
                        <TableCell>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">{r.eng}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`border text-[11px] ${
                            r.status === "accepted" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                            r.status === "negotiating" ? "border-amber-200 bg-amber-50 text-amber-700" :
                            "border-blue-200 bg-blue-50 text-blue-700"
                          }`}>{r.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ==================== CARDS ==================== */}
      {show("cards") && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Card Patterns</h2>
            <p className="text-sm text-gray-500">Stat cards, influencer cards, campaign cards, and more</p>
          </div>

          {/* Stat Cards */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-400">Stat Cards</p>
            <div className="grid grid-cols-4 gap-5">
              {[
                { label: "TOTAL INFLUENCERS", value: "8", icon: Users, gradient: "from-violet-500 to-indigo-600", change: "+12%" },
                { label: "ACTIVE CAMPAIGNS", value: "2", icon: Megaphone, gradient: "from-pink-500 to-rose-600", change: "+3" },
                { label: "TOTAL REACH", value: "16.1M", icon: TrendingUp, gradient: "from-emerald-500 to-teal-600", change: "+24%" },
                { label: "TOTAL SPENT", value: "$74k", icon: DollarSign, gradient: "from-amber-500 to-orange-600", change: "" },
              ].map((s) => (
                <Card key={s.label} className="group relative overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-[0.03] group-hover:opacity-[0.06]`} />
                  <CardContent className="relative pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{s.label}</p>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{s.value}</p>
                        {s.change && (
                          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                            <ArrowUpRight className="h-3 w-3" />{s.change} this month
                          </div>
                        )}
                      </div>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} shadow-lg`}>
                        <s.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Influencer Card */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-400">Influencer Card</p>
            <div className="grid grid-cols-3 gap-5">
              {[
                { name: "Sofia Nguyen", niche: "beauty", location: "New York, NY", bio: "Beauty & skincare expert. Helping you find the perfect routine for glowing skin.", platforms: [
                  { type: "instagram", username: "sofiabeauty", followers: "780k", eng: "5.1%" },
                  { type: "youtube", username: "SofiaNguyenBeauty", followers: "450k", eng: "4.0%" },
                  { type: "tiktok", username: "sofiabeautytips", followers: "2.1M", eng: "7.2%" },
                ], total: "3330k", avgEng: "5.4%" },
              ].map((inf) => (
                <Card key={inf.name} className="group border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{inf.name}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="secondary" className="border border-purple-200 bg-purple-50 text-purple-700 text-[11px]">{inf.niche}</Badge>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <MapPin className="h-3 w-3" />{inf.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">{inf.bio}</p>
                    <div className="mt-4 space-y-2">
                      {inf.platforms.map((p) => (
                        <div key={p.type} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                          p.type === "instagram" ? "border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50" :
                          p.type === "tiktok" ? "border-gray-100 bg-gray-50" :
                          "border-red-100 bg-red-50"
                        }`}>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-[10px] border-0 text-white ${
                              p.type === "instagram" ? "bg-gradient-to-r from-pink-500 to-purple-500" :
                              p.type === "tiktok" ? "bg-gray-900" : "bg-red-500"
                            }`}>
                              {p.type === "instagram" ? "IG" : p.type === "tiktok" ? "TT" : "YT"}
                            </Badge>
                            <span className="text-xs font-medium text-gray-700">@{p.username}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="font-semibold text-gray-700">{p.followers}</span>
                            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-emerald-600">{p.eng}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{inf.total}</p>
                        <p className="text-[11px] text-gray-400">total followers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">{inf.avgEng}</p>
                        <p className="text-[11px] text-gray-400">avg engagement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Campaign Card */}
              <Card className="border-0 shadow-sm transition-all hover:shadow-md">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Summer Fashion Collection</h3>
                      <div className="mt-2 flex gap-1.5">
                        <Badge variant="secondary" className="border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px]">active</Badge>
                        <Badge variant="secondary" className="border border-violet-200 bg-violet-500/10 text-violet-700 text-[11px]">multi</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-gray-500">
                    <span className="font-medium text-gray-700">$18,500<span className="font-normal text-gray-400"> / $25,000</span></span>
                    <span>2 influencers</span>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: "74%" }} />
                  </div>
                </CardContent>
              </Card>

              {/* Top Performer Card */}
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Top Performer</p>
                  <div className="mt-4 flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-white">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">Olivia Thompson</p>
                      <Badge variant="secondary" className="mt-1 border border-pink-200 bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-700 text-[11px]">instagram</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">260% ROI</p>
                      <p className="text-xs text-gray-400">590k impressions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* ==================== CHARTS ==================== */}
      {show("charts") && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Charts & Data Viz</h2>
            <p className="text-sm text-gray-500">Recharts-powered visualizations with custom styling</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-0 shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Bar Chart — Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={barData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 12 }} />
                    <Bar dataKey="reach" fill="#8b5cf6" name="Reach" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="engagement" fill="#ec4899" name="Engagement" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Donut Chart — Platform Split</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="45%" innerRadius={60} outerRadius={90} dataKey="value" strokeWidth={0} paddingAngle={4}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 12 }} />
                    <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Area Chart — Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 12 }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={2} fill="url(#grad1)" name="Impressions" />
                  <Area type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={2} fill="url(#grad2)" name="Engagement" />
                  <Area type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={2} fill="url(#grad3)" name="Clicks" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ==================== PATTERNS ==================== */}
      {show("patterns") && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">UI Patterns</h2>
            <p className="text-sm text-gray-500">Layout patterns, empty states, and interactive elements</p>
          </div>

          {/* Empty State */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Empty State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-dashed border-gray-200 py-12 text-center">
                <Users className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-400">No influencers assigned yet</p>
                <p className="text-xs text-gray-400">Head to Discover to find influencers.</p>
                <Button className="mt-4 gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm shadow-md shadow-violet-200">
                  <Search className="h-4 w-4" /> Find Influencers
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Loading States</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                  <p className="mt-2 text-xs text-gray-400">Spinner</p>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded-lg bg-gray-200" />
                  <p className="text-xs text-gray-400">Skeleton loader</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Dot */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Micro Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100">
                    <Megaphone className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Animated dot</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-40 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500" style={{ width: "74%" }} />
                    </div>
                    <span className="text-xs font-medium text-gray-500">74%</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Progress bar</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5">
                    <Zap className="h-3.5 w-3.5 text-violet-600" />
                    <span className="text-xs font-medium text-violet-700">Pro Feature</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Pill badge</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Dark Sidebar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-hidden rounded-2xl border border-gray-200 shadow-lg" style={{ height: 360 }}>
                <div className="flex w-[220px] shrink-0 flex-col bg-gradient-to-b from-slate-900 to-slate-950 p-4">
                  <div className="flex items-center gap-2.5 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">InfluencerHub</span>
                  </div>
                  <p className="mt-5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Menu</p>
                  <div className="mt-2 space-y-1">
                    {[
                      { label: "Dashboard", icon: BarChart3, active: true },
                      { label: "Discover", icon: Search, active: false },
                      { label: "Campaigns", icon: Megaphone, active: false },
                      { label: "Analytics", icon: BarChart3, active: false },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium ${
                        item.active ? "bg-white/10 text-white" : "text-slate-400"
                      }`}>
                        <item.icon className={`h-4 w-4 ${item.active ? "text-violet-400" : "text-slate-500"}`} />
                        {item.label}
                        {item.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto rounded-xl border border-white/5 bg-white/5 p-3">
                    <p className="text-[11px] font-medium text-slate-300">Need help?</p>
                    <button className="mt-2 w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-[10px] font-medium text-white">View Docs</button>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 p-5">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="mt-1 h-3 w-48 rounded bg-gray-100" />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="h-3 w-20 rounded bg-gray-100" />
                        <div className="mt-2 h-6 w-12 rounded bg-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
