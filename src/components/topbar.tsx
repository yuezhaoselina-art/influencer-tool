"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Topbar() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search influencers, campaigns..."
          className="h-10 rounded-xl border-gray-200 bg-gray-50/80 pl-10 text-sm transition-colors focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 ring-2 ring-violet-100">
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-semibold text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Brand Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
