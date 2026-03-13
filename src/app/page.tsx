"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Search,
  Megaphone,
  BarChart3,
  ArrowRight,
  Check,
  Star,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Play,
  Instagram,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    description:
      "Find the perfect influencers with advanced filters. Search by niche, platform, follower count, engagement rate, and location.",
    gradient: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50",
  },
  {
    icon: Megaphone,
    title: "Campaign Management",
    description:
      "Create and manage campaigns with a visual workflow. Track status from outreach to completion with budget monitoring.",
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
  },
  {
    icon: BarChart3,
    title: "Analytics & ROI",
    description:
      "Track impressions, engagement, clicks, and conversions. Measure ROI and export detailed reports in CSV.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    title: "Side-by-Side Compare",
    description:
      "Compare up to 3 influencers side by side. Analyze followers, engagement rates, and platform stats at a glance.",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
];

const platforms = [
  { name: "Instagram", color: "from-pink-500 to-purple-600", users: "2B+" },
  { name: "TikTok", color: "from-gray-800 to-gray-900", users: "1.5B+" },
  { name: "YouTube", color: "from-red-500 to-red-700", users: "2.5B+" },
];

const stats = [
  { value: "10K+", label: "Influencers Tracked" },
  { value: "500+", label: "Campaigns Managed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3.2x", label: "Average ROI" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director, StyleCo",
    quote:
      "InfluencerHub transformed how we find and manage influencer partnerships. Our campaign ROI increased by 200% in the first quarter.",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    role: "Brand Manager, TechVibe",
    quote:
      "The analytics dashboard alone is worth it. We can finally see exactly which influencers drive real results for our brand.",
    rating: 5,
  },
  {
    name: "Emily Park",
    role: "CEO, FreshBeauty Agency",
    quote:
      "We manage 50+ campaigns simultaneously with InfluencerHub. The workflow automation saves us 20 hours per week.",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for small brands getting started",
    features: [
      "Up to 50 influencer searches/mo",
      "3 active campaigns",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "For growing brands and small agencies",
    features: [
      "Unlimited influencer searches",
      "15 active campaigns",
      "Advanced analytics & ROI",
      "CSV export",
      "Priority support",
      "Team collaboration (3 seats)",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For agencies managing multiple brands",
    features: [
      "Everything in Professional",
      "Unlimited campaigns",
      "API access",
      "White-label reports",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function LandingPage() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const screenshots = [
    { label: "Dashboard", description: "Get a bird's eye view of all your campaigns and influencer metrics" },
    { label: "Discovery", description: "Find and filter influencers across Instagram, TikTok, and YouTube" },
    { label: "Campaigns", description: "Manage campaigns with visual workflows and budget tracking" },
    { label: "Analytics", description: "Track performance with beautiful charts and export reports" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">InfluencerHub</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              Features
            </a>
            <a href="#platforms" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              Platforms
            </a>
            <a href="#pricing" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Sign In
            </button>
            <Link
              href="/dashboard"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-md shadow-violet-200 transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 opacity-50 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-pink-100 to-rose-100 opacity-40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-violet-600" />
              <span className="text-xs font-medium text-violet-700">
                The #1 Influencer Marketing Platform
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Find, manage &{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                grow
              </span>{" "}
              with influencers
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
              The all-in-one platform for brands and agencies to discover influencers,
              manage campaigns, and track ROI across Instagram, TikTok, and YouTube.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:shadow-xl hover:shadow-violet-300"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
                <Play className="h-4 w-4 text-violet-600" />
                Watch Demo
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              No credit card required. 14-day free trial.
            </p>
          </div>

          {/* App Preview */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-2xl shadow-gray-300/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-1">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span className="text-xs text-gray-300">app.influencerhub.com</span>
                </div>
              </div>
              {/* Screenshot placeholder */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-gray-900">InfluencerHub Dashboard</p>
                    <p className="mt-1 text-sm text-gray-500">Your command center for influencer marketing</p>
                    <Link
                      href="/dashboard"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700"
                    >
                      Open Live App <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats cards */}
            <div className="absolute -left-6 top-1/3 hidden rotate-[-4deg] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Campaign ROI</p>
                  <p className="text-lg font-bold text-gray-900">+245%</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 top-1/4 hidden rotate-[4deg] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                  <Users className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Influencers Found</p>
                  <p className="text-lg font-bold text-gray-900">1,247</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Multi-Platform Support
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              One platform, three networks
            </h2>
            <p className="mt-4 text-base text-gray-500">
              Search, analyze, and manage influencers across all major social platforms from a single dashboard.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-[0.03] transition-opacity group-hover:opacity-[0.06]`} />
                <div className="relative">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} shadow-lg`}>
                    {p.name === "YouTube" ? (
                      <Youtube className="h-7 w-7 text-white" />
                    ) : p.name === "Instagram" ? (
                      <Instagram className="h-7 w-7 text-white" />
                    ) : (
                      <Globe className="h-7 w-7 text-white" />
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{p.users} monthly active users</p>
                  <ul className="mt-5 space-y-2.5">
                    {["Profile analytics", "Engagement tracking", "Audience insights", "Content performance"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Powerful Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Everything you need to scale influencer marketing
            </h2>
            <p className="mt-4 text-base text-gray-500">
              From discovery to reporting, InfluencerHub streamlines your entire influencer marketing workflow.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-[0.02] transition-opacity group-hover:opacity-[0.05]`} />
                <div className="relative">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* App screenshots tabs */}
          <div className="mt-20">
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm border border-gray-100">
              {screenshots.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveScreenshot(i)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                    activeScreenshot === i
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-4xl text-center">
              <p className="text-sm text-gray-500">{screenshots[activeScreenshot].description}</p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                <div className="aspect-[16/9] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{screenshots[activeScreenshot].label}</p>
                    <p className="mt-2 text-sm text-slate-400">Live preview available in the app</p>
                    <Link
                      href={`/${screenshots[activeScreenshot].label.toLowerCase()}`}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      View Live <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Loved by brands and agencies
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-base text-gray-500">
              Start for free, upgrade as you grow.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${
                  plan.highlight
                    ? "border-violet-200 bg-white shadow-lg"
                    : "border-gray-100 bg-white"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1">
                    <span className="text-xs font-medium text-white">Most Popular</span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200 hover:opacity-90"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 px-8 py-20 text-center shadow-2xl">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Ready to supercharge your influencer marketing?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-violet-200">
                Join hundreds of brands and agencies already using InfluencerHub to grow their business.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-violet-700 shadow-lg transition-all hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <button className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">InfluencerHub</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                The all-in-one influencer marketing platform for brands and agencies.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "API"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "GDPR"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 text-center">
            <p className="text-xs text-gray-400">
              &copy; 2026 InfluencerHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
