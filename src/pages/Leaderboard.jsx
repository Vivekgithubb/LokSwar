import React from "react";

const rows = [
  {
    rank: "01",
    name: "Anita Rao",
    contrib: 42,
    loc: "19.0760,72.8777",
    badge: "[GOLD]",
  },
  {
    rank: "02",
    name: "Rafi Khan",
    contrib: 31,
    loc: "26.9124,75.7873",
    badge: "[PIONEER]",
  },
];

export default function Leaderboard() {
  return (
    <div className="max-w-auto mx-auto p-8">
      <h1 className="text-2xl font-header text-neutral-900">
        Guardian Registry
      </h1>
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-full border border-stone-200">
          <div className="flex p-3 border-b border-stone-200 text-xs uppercase tracking-wider text-neutral-600">
            <div className="w-16">Rank</div>
            <div className="flex-1">User</div>
            <div className="w-32">Contribution</div>
            <div className="w-40">Location</div>
          </div>
          <div>
            {rows.map((r) => (
              <div
                key={r.rank}
                className="flex items-center p-3 border-b border-stone-200 text-sm"
              >
                <div className="w-16 mono text-neutral-700">{r.rank}</div>
                <div className="flex-1">
                  {r.name}{" "}
                  <span className="text-xs text-neutral-500 ml-2">
                    {r.badge}
                  </span>
                </div>
                <div className="w-32">{r.contrib}</div>
                <div className="w-40 mono text-xs text-neutral-500">
                  {r.loc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
