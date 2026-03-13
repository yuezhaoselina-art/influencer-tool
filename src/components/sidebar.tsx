"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Megaphone,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/discover", label: "Discover", icon: Search },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] flex-col bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="flex h-[72px] items-center gap-3 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">
          InfluencerHub
        </span>
      </div>

      <div className="px-3 pt-2 pb-3">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white shadow-sm backdrop-blur-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] transition-colors",
                  isActive
                    ? "text-violet-400"
                    : "text-slate-500 group-hover:text-slate-400"
                )}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-3 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-xs font-medium text-slate-300">Need help?</p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          Check our docs for API setup guides
        </p>
        <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90">
          View Docs
        </button>
      </div>

      <div className="border-t border-white/5 p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-400 transition-all hover:bg-white/5 hover:text-slate-200"
        >
          <Settings className="h-[18px] w-[18px] text-slate-500" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
