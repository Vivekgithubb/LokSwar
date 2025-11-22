import React, { useState } from "react";
import {
  Trophy,
  Upload,
  Headphones,
  Zap,
  MapPin,
  Search,
  ArrowUpRight,
  Star,
  Shield,
  Crown,
  Filter,
} from "lucide-react";

// --- Mock Data ---
const usersData = [
  {
    id: 1,
    name: "Anita Rao",
    handle: "@anita_r",
    location: "Mumbai, MH",
    uploads: 42,
    listens: 156,
    xp: 8500,
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Rafi Khan",
    handle: "@rafik",
    location: "Jaipur, RJ",
    uploads: 31,
    listens: 89,
    xp: 6200,
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    handle: "@sarahj",
    location: "Bangalore, KA",
    uploads: 28,
    listens: 310,
    xp: 5900,
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Vikram Singh",
    handle: "@vikram_s",
    location: "Delhi, DL",
    uploads: 15,
    listens: 45,
    xp: 3200,
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    name: "Priya Menon",
    handle: "@priya_m",
    location: "Kochi, KL",
    uploads: 12,
    listens: 120,
    xp: 2800,
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: 6,
    name: "Arjun Das",
    handle: "@arjun_d",
    location: "Chennai, TN",
    uploads: 8,
    listens: 200,
    xp: 2400,
    avatar: "https://i.pravatar.cc/150?u=6",
  },
  {
    id: 7,
    name: "Meera Patel",
    handle: "@meera_p",
    location: "Ahmedabad, GJ",
    uploads: 5,
    listens: 30,
    xp: 1100,
    avatar: "https://i.pravatar.cc/150?u=7",
  },
  {
    id: 8,
    name: "Zainab Ali",
    handle: "@zainab_a",
    location: "Hyderabad, TS",
    uploads: 4,
    listens: 22,
    xp: 950,
    avatar: "https://i.pravatar.cc/150?u=8",
  },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("xp");

  // Sort logic
  const sortedData = [...usersData].sort((a, b) => b[activeTab] - a[activeTab]);
  const topThree = sortedData.slice(0, 3);
  const restOfList = sortedData.slice(3);

  // Configuration for Tabs
  const tabs = [
    { id: "xp", label: "Legends", sub: "Total XP", icon: Crown },
    { id: "uploads", label: "Archivists", sub: "Contributions", icon: Upload },
    { id: "listens", label: "Curators", sub: "Engagement", icon: Headphones },
  ];

  const getMetricLabel = () => {
    if (activeTab === "uploads") return "Contributions";
    if (activeTab === "listens") return "Stories Heard";
    return "Experience Points";
  };

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900 font-sans selection:bg-orange-100 flex flex-col">
      {/* 1. Architectural Header */}
      <div className="w-full bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-end justify-between pb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight leading-none">
              Guardian Registry
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-px w-8 bg-orange-600"></div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                Top Contributors • Season 2025
              </span>
            </div>
          </div>

          {/* Personal Stats Widget */}
          <div className="hidden md:flex items-center bg-stone-50 border border-stone-200 rounded-sm px-4 py-2 gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                Current Rank
              </div>
              <div className="text-sm font-mono font-bold text-neutral-900">
                #042
              </div>
            </div>
            <div className="w-px h-8 bg-stone-200"></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                Total XP
              </div>
              <div className="text-sm font-mono font-bold text-orange-600">
                1,240
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-auto mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 2. Control Bar (Filter & Search) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 bg-white p-1 border border-stone-200 shadow-sm">
          {/* Tabs */}
          <div className="flex flex-1 gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                            flex-1 flex items-center justify-center gap-3 px-6 py-3 border transition-all duration-200 min-w-[140px]
                            ${
                              activeTab === tab.id
                                ? "bg-neutral-900 text-white border-neutral-900 shadow-none"
                                : "bg-white text-stone-500 border-transparent hover:bg-stone-50 hover:border-stone-200"
                            }
                        `}
              >
                <tab.icon
                  className={`w-4 h-4 ${
                    activeTab === tab.id ? "text-orange-500" : "text-stone-400"
                  }`}
                />
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {tab.label}
                  </div>
                  <div
                    className={`text-[10px] ${
                      activeTab === tab.id ? "text-stone-400" : "text-stone-300"
                    }`}
                  >
                    {tab.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-80 relative border-l border-stone-200 pl-0 md:pl-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search registry by ID or Name..."
              className="w-full bg-transparent border-none pl-10 pr-4 py-3 text-sm focus:ring-0 placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* 3. The Podium - Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200">
          {/* Rank 2 */}
          <div className="bg-white p-8 flex flex-col items-center text-center relative group hover:bg-stone-50 transition-colors">
            <div className="absolute top-4 left-4 text-4xl font-serif text-stone-200 font-bold group-hover:text-stone-300 transition-colors">
              02
            </div>
            <div className="mb-6 relative">
              <div className="w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-500 rounded-full overflow-hidden border-4 border-stone-100">
                <img
                  src={topThree[1].avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-stone-200 text-stone-600 text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                Silver
              </div>
            </div>
            <h3 className="text-lg font-bold text-neutral-900">
              {topThree[1].name}
            </h3>
            <p className="text-xs text-stone-500 font-mono mb-4">
              {topThree[1].location}
            </p>
            <div className="mt-auto pt-4 w-full border-t border-stone-100">
              <div className="text-2xl font-bold text-neutral-900 font-mono">
                {topThree[1][activeTab]}
              </div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                {getMetricLabel()}
              </div>
            </div>
          </div>

          {/* Rank 1 (Center/Highlight) */}
          <div className="bg-white p-8 flex flex-col items-center text-center relative group hover:bg-stone-50 transition-colors md:-mt-4 md:mb-4 md:shadow-xl md:z-10 border-x-0 md:border-x md:border-stone-200">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-600"></div>
            <div className="absolute top-4 right-4">
              <Crown className="w-6 h-6 text-orange-600" />
            </div>

            <div className="mb-6 mt-4 relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img
                  src={topThree[0].avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-bold px-4 py-1.5 uppercase tracking-widest shadow-md">
                Gold Tier
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mt-4">
              {topThree[0].name}
            </h3>
            <p className="text-sm text-orange-600 font-mono mb-6">
              {topThree[0].handle}
            </p>

            <div className="mt-auto w-full space-y-2">
              <div className="py-3 bg-stone-50 border border-stone-100 rounded-sm">
                <div className="text-3xl font-bold text-neutral-900 font-mono">
                  {topThree[0][activeTab]}
                </div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  {getMetricLabel()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-500">
                <div className="bg-stone-50 py-1 border border-stone-100">
                  Top 1%
                </div>
                <div className="bg-stone-50 py-1 border border-stone-100">
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="bg-white p-8 flex flex-col items-center text-center relative group hover:bg-stone-50 transition-colors">
            <div className="absolute top-4 left-4 text-4xl font-serif text-stone-200 font-bold group-hover:text-stone-300 transition-colors">
              03
            </div>
            <div className="mb-6 relative">
              <div className="w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-500 rounded-full overflow-hidden border-4 border-stone-100">
                <img
                  src={topThree[2].avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-stone-200 text-stone-600 text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                Bronze
              </div>
            </div>
            <h3 className="text-lg font-bold text-neutral-900">
              {topThree[2].name}
            </h3>
            <p className="text-xs text-stone-500 font-mono mb-4">
              {topThree[2].location}
            </p>
            <div className="mt-auto pt-4 w-full border-t border-stone-100">
              <div className="text-2xl font-bold text-neutral-900 font-mono">
                {topThree[2][activeTab]}
              </div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                {getMetricLabel()}
              </div>
            </div>
          </div>
        </div>

        {/* 4. The Registry List (Table) */}
        <div className="border border-stone-200 bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-stone-200 bg-stone-50 text-[10px] font-bold uppercase tracking-widest text-stone-500">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Guardian Identity</div>
            <div className="col-span-4 hidden sm:block">Base of Operations</div>
            <div className="col-span-2 text-right">Performance</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-stone-100">
            {restOfList.map((user, index) => (
              <div
                key={user.id}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-stone-50 transition-colors group"
              >
                {/* Rank */}
                <div className="col-span-1 text-center font-mono text-stone-400 font-bold text-sm">
                  {(index + 4).toString().padStart(2, "0")}
                </div>

                {/* User */}
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div>
                    <div className="text-sm font-bold text-neutral-900">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-stone-500 font-mono">
                      {user.handle}
                    </div>
                  </div>
                </div>

                {/* Region */}
                <div className="col-span-4 hidden sm:flex items-center gap-2 text-xs text-stone-500 font-mono">
                  <MapPin className="w-3 h-3 text-stone-300" />
                  {user.location}
                </div>

                {/* Score */}
                <div className="col-span-2 text-right">
                  <span className="font-mono font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                    {user[activeTab]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="p-3 border-t border-stone-200 bg-stone-50 text-center">
            <button className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-neutral-900 flex items-center justify-center gap-1 transition-colors">
              Load Complete Database <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
