"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreHorizontal, Calendar, DollarSign, Users, Target, Megaphone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  description: string | null;
  status: string;
  platform: string;
  budget: number;
  spent: number;
  startDate: string | null;
  endDate: string | null;
  influencers: {
    id: string;
    status: string;
    fee: number;
    influencer: { id: string; name: string; niche: string };
  }[];
  createdAt: string;
}

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600 border-gray-200",
  outreach: "bg-blue-50 text-blue-700 border-blue-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-violet-50 text-violet-700 border-violet-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
};

const inflStatusColor: Record<string, string> = {
  invited: "bg-blue-50 text-blue-700 border-blue-200",
  negotiating: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined: "bg-red-50 text-red-700 border-red-200",
  completed: "bg-violet-50 text-violet-700 border-violet-200",
};

const platformColor: Record<string, string> = {
  instagram: "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-700 border-pink-200",
  tiktok: "bg-gray-900/5 text-gray-700 border-gray-200",
  youtube: "bg-red-500/10 text-red-700 border-red-200",
  multi: "bg-violet-500/10 text-violet-700 border-violet-200",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    platform: "instagram",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const fetchCampaigns = () => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then(setCampaigns);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async () => {
    await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        budget: parseFloat(form.budget) || 0,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
      }),
    });
    setShowCreate(false);
    setForm({ name: "", description: "", platform: "instagram", budget: "", startDate: "", endDate: "" });
    fetchCampaigns();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/campaigns/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchCampaigns();
    if (selectedCampaign?.id === id) {
      setSelectedCampaign((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const budgetPercent = (c: Campaign) =>
    c.budget > 0 ? Math.min((c.spent / c.budget) * 100, 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your influencer campaigns</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger>
            <Button className="gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-white shadow-md shadow-violet-200 hover:opacity-90">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg">Create Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-xs font-medium text-gray-500">Campaign Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Summer Product Launch"
                  className="mt-1.5 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Campaign details..."
                  className="mt-1.5 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-gray-500">Platform</Label>
                  <Select
                    value={form.platform}
                    onValueChange={(v) => v && setForm((f) => ({ ...f, platform: v }))}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="multi">Multi-Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">Budget ($)</Label>
                  <Input
                    type="number"
                    value={form.budget}
                    onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                    placeholder="10000"
                    className="mt-1.5 rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-gray-500">Start Date</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                    className="mt-1.5 rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">End Date</Label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                    className="mt-1.5 rounded-xl"
                  />
                </div>
              </div>
              <Button
                onClick={handleCreate}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90"
              >
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Campaigns list */}
        <div className="space-y-3 lg:col-span-1">
          {campaigns.map((c) => (
            <Card
              key={c.id}
              className={`cursor-pointer border-0 shadow-sm transition-all duration-200 hover:shadow-md ${
                selectedCampaign?.id === c.id
                  ? "ring-2 ring-violet-500 shadow-md"
                  : ""
              }`}
              onClick={() => setSelectedCampaign(c)}
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{c.name}</h3>
                    <div className="mt-2 flex gap-1.5">
                      <Badge
                        variant="secondary"
                        className={`border text-[11px] ${statusColor[c.status]}`}
                      >
                        {c.status}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`border text-[11px] ${platformColor[c.platform]}`}
                      >
                        {c.platform}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 rounded-lg p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => updateStatus(c.id, "outreach")}>
                        Start Outreach
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(c.id, "active")}>
                        Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(c.id, "paused")}>
                        Pause
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(c.id, "completed")}>
                        Complete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span className="font-medium text-gray-700">
                    ${c.spent.toLocaleString()}
                    <span className="font-normal text-gray-400"> / ${c.budget.toLocaleString()}</span>
                  </span>
                  <span>{c.influencers.length} influencers</span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${budgetPercent(c)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {campaigns.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">
              No campaigns yet. Create your first one!
            </p>
          )}
        </div>

        {/* Campaign detail */}
        <div className="lg:col-span-2">
          {selectedCampaign ? (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedCampaign.name}</CardTitle>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedCampaign.description || "No description"}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`border text-xs ${statusColor[selectedCampaign.status]}`}
                  >
                    {selectedCampaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-4 gap-3">
                  {[
                    { label: "Budget", value: `$${selectedCampaign.budget.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600" },
                    { label: "Spent", value: `$${selectedCampaign.spent.toLocaleString()}`, icon: Target, color: "text-violet-600" },
                    { label: "Platform", value: selectedCampaign.platform, icon: Calendar, color: "text-blue-600", capitalize: true },
                    { label: "Influencers", value: selectedCampaign.influencers.length, icon: Users, color: "text-pink-600" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-center">
                      <item.icon className={`mx-auto mb-2 h-5 w-5 ${item.color}`} />
                      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">{item.label}</p>
                      <p className={`mt-1 text-lg font-bold text-gray-900 ${item.capitalize ? "capitalize" : ""}`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <h4 className="mb-4 text-sm font-semibold text-gray-900">Campaign Influencers</h4>
                {selectedCampaign.influencers.length > 0 ? (
                  <div className="overflow-hidden rounded-xl border border-gray-100">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/80">
                          <TableHead className="text-xs">Influencer</TableHead>
                          <TableHead className="text-xs">Niche</TableHead>
                          <TableHead className="text-xs">Status</TableHead>
                          <TableHead className="text-xs">Fee</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCampaign.influencers.map((ci) => (
                          <TableRow key={ci.id} className="hover:bg-gray-50/50">
                            <TableCell className="text-sm font-medium">
                              {ci.influencer.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="border border-gray-200 text-[11px]">
                                {ci.influencer.niche}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={`border text-[11px] ${inflStatusColor[ci.status]}`}
                              >
                                {ci.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                              ${ci.fee.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
                    <Users className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-400">
                      No influencers assigned yet.
                    </p>
                    <p className="text-xs text-gray-400">
                      Head to Discover to find influencers.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
              <div className="text-center">
                <Megaphone className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-400">
                  Select a campaign to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
