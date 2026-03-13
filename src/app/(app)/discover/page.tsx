"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, GitCompareArrows, MapPin } from "lucide-react";

interface InfluencerResult {
  id: string;
  name: string;
  bio: string | null;
  niche: string;
  location: string | null;
  platforms: {
    type: string;
    username: string;
    followers: number;
    engagementRate: number;
    avgLikes: number;
    avgComments: number;
    avgViews: number;
  }[];
}

const NICHES = [
  "all", "fashion", "tech", "beauty", "fitness", "food", "travel", "gaming", "lifestyle",
];

const platformIcon: Record<string, string> = {
  instagram: "IG",
  tiktok: "TT",
  youtube: "YT",
};

const platformStyle: Record<string, { badge: string; bg: string }> = {
  instagram: {
    badge: "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0",
    bg: "bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100",
  },
  tiktok: {
    badge: "bg-gray-900 text-white border-0",
    bg: "bg-gray-50 border-gray-100",
  },
  youtube: {
    badge: "bg-red-500 text-white border-0",
    bg: "bg-red-50 border-red-100",
  },
};

const nicheColors: Record<string, string> = {
  fashion: "bg-pink-50 text-pink-700 border-pink-200",
  tech: "bg-blue-50 text-blue-700 border-blue-200",
  beauty: "bg-purple-50 text-purple-700 border-purple-200",
  fitness: "bg-emerald-50 text-emerald-700 border-emerald-200",
  food: "bg-orange-50 text-orange-700 border-orange-200",
  travel: "bg-cyan-50 text-cyan-700 border-cyan-200",
  gaming: "bg-indigo-50 text-indigo-700 border-indigo-200",
  lifestyle: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function DiscoverPage() {
  const [influencers, setInfluencers] = useState<InfluencerResult[]>([]);
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [minFollowers, setMinFollowers] = useState("");
  const [compareList, setCompareList] = useState<InfluencerResult[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (niche !== "all") params.set("niche", niche);
    if (platform !== "all") params.set("platform", platform);
    if (minFollowers) params.set("minFollowers", minFollowers);

    fetch(`/api/influencers?${params.toString()}`)
      .then((res) => res.json())
      .then(setInfluencers);
  }, [search, niche, platform, minFollowers]);

  const toggleCompare = (inf: InfluencerResult) => {
    setCompareList((prev) =>
      prev.find((i) => i.id === inf.id)
        ? prev.filter((i) => i.id !== inf.id)
        : prev.length < 3
          ? [...prev, inf]
          : prev
    );
  };

  const totalFollowers = (inf: InfluencerResult) =>
    inf.platforms.reduce((sum, p) => sum + p.followers, 0);

  const avgEngagement = (inf: InfluencerResult) => {
    if (inf.platforms.length === 0) return 0;
    return inf.platforms.reduce((sum, p) => sum + p.engagementRate, 0) / inf.platforms.length;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Discover Influencers
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Find the perfect influencers for your campaigns
          </p>
        </div>
        {compareList.length > 0 && (
          <Dialog open={showCompare} onOpenChange={setShowCompare}>
            <DialogTrigger>
              <Button className="gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200 hover:opacity-90">
                <GitCompareArrows className="h-4 w-4" />
                Compare ({compareList.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg">Compare Influencers</DialogTitle>
              </DialogHeader>
              <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
                {compareList.map((inf) => (
                  <Card key={inf.id} className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{inf.name}</CardTitle>
                      <Badge variant="secondary" className={`w-fit border text-[11px] ${nicheColors[inf.niche] || ""}`}>
                        {inf.niche}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-gray-50 p-3 text-center">
                          <p className="text-[11px] text-gray-400">Followers</p>
                          <p className="text-lg font-bold text-gray-900">
                            {(totalFollowers(inf) / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-3 text-center">
                          <p className="text-[11px] text-gray-400">Engagement</p>
                          <p className="text-lg font-bold text-gray-900">
                            {avgEngagement(inf).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      {inf.platforms.map((p) => (
                        <div key={p.type} className={`rounded-xl border p-3 ${platformStyle[p.type]?.bg}`}>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-[10px] ${platformStyle[p.type]?.badge}`}>
                              {platformIcon[p.type]}
                            </Badge>
                            <span className="text-xs font-medium text-gray-700">
                              @{p.username}
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-gray-500">
                            <span>{(p.followers / 1000).toFixed(0)}k followers</span>
                            <span>{p.engagementRate}% eng.</span>
                            <span>{(p.avgLikes / 1000).toFixed(1)}k likes</span>
                            <span>{(p.avgViews / 1000).toFixed(0)}k views</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 rounded-xl border-gray-200 bg-gray-50/80 pl-10 text-sm transition-colors focus:bg-white"
              />
            </div>
            <Select value={niche} onValueChange={(v) => v && setNiche(v)}>
              <SelectTrigger className="w-40 rounded-xl border-gray-200 text-sm">
                <SelectValue placeholder="Niche" />
              </SelectTrigger>
              <SelectContent>
                {NICHES.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n === "all" ? "All Niches" : n.charAt(0).toUpperCase() + n.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={platform} onValueChange={(v) => v && setPlatform(v)}>
              <SelectTrigger className="w-40 rounded-xl border-gray-200 text-sm">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Min followers"
              type="number"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
              className="w-36 rounded-xl border-gray-200 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {influencers.map((inf) => (
          <Card
            key={inf.id}
            className="group border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{inf.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`border text-[11px] ${nicheColors[inf.niche] || ""}`}
                    >
                      {inf.niche}
                    </Badge>
                    {inf.location && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />
                        {inf.location}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant={compareList.find((i) => i.id === inf.id) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => toggleCompare(inf)}
                  title="Add to compare"
                  className={
                    compareList.find((i) => i.id === inf.id)
                      ? "rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                      : "rounded-lg"
                  }
                >
                  <GitCompareArrows className="h-4 w-4" />
                </Button>
              </div>

              {inf.bio && (
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
                  {inf.bio}
                </p>
              )}

              <div className="mt-4 space-y-2">
                {inf.platforms.map((p) => (
                  <div
                    key={p.type}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition-colors ${platformStyle[p.type]?.bg}`}
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={`text-[10px] ${platformStyle[p.type]?.badge}`}>
                        {platformIcon[p.type]}
                      </Badge>
                      <span className="text-xs font-medium text-gray-700">@{p.username}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">{(p.followers / 1000).toFixed(0)}k</span>
                      <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                        {p.engagementRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {(totalFollowers(inf) / 1000).toFixed(0)}k
                  </p>
                  <p className="text-[11px] text-gray-400">total followers</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-600">
                    {avgEngagement(inf).toFixed(1)}%
                  </p>
                  <p className="text-[11px] text-gray-400">avg engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {influencers.length === 0 && (
        <div className="flex h-32 items-center justify-center">
          <p className="text-sm text-gray-400">
            No influencers found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
