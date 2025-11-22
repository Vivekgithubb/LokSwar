import React from "react";
import { MicIcon } from "../components/MicIcon";
import MetricCard from "../components/MetricCard";

export default function Landing() {
  return (
    <div className="w-full">
      <section className="w-full border-b border-stone-200">
        <div className="max-w-auto mx-auto p-8 grid grid-cols-1 md:grid-cols-10 gap-6 items-start">
          <div className="md:col-span-7">
            <h1 className="text-6xl md:text-7xl font-header text-neutral-900 tracking-tight leading-tight">
              The Disappearing Voice
              <br />
              <span className="text-orange-600">of India</span>
            </h1>

            <p className="mt-6 max-w-3xl font-serif text-lg text-neutral-600">
              Preserving oral traditions, folk tales, and indigenous knowledge
              before they fade into silence. Every voice matters. Every story
              counts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-900 text-white text-sm font-medium">
                <MicIcon className="w-4 h-4 text-white" />
                <span>Start Recording</span>
              </a>
              <a className="inline-flex items-center gap-3 px-6 py-3 border border-neutral-300 text-neutral-900 text-sm font-medium">
                Browse Archive
              </a>
            </div>
          </div>

          <aside className="md:col-span-3 bg-white border border-stone-200 p-6 rounded-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full" />
              <div className="text-xs uppercase tracking-wider text-neutral-500">
                Archive Status
              </div>
            </div>

            <div className="mt-4 text-4xl font-semibold text-neutral-900 mono">
              1,240
            </div>
            <div className="text-xs text-neutral-500">Stories Saved</div>

            <hr className="my-4 border-stone-100" />

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold text-neutral-900">
                  87
                </div>
                <div className="text-xs text-neutral-500 mt-1">Dialects</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-neutral-900">
                  342
                </div>
                <div className="text-xs text-neutral-500 mt-1">Villages</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-auto mx-auto p-0 grid grid-cols-1 md:grid-cols-3 mt-8 border-t border-stone-200">
          <div className="border-r border-stone-100">
            <MetricCard
              icon={
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              }
              value="1,240+"
              label="Dialects Preserved"
            />
          </div>
          <div className="border-r border-stone-100">
            <MetricCard
              icon={
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              }
              value="342"
              label="Villages Mapped"
            />
          </div>
          <div>
            <MetricCard
              icon={
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              }
              value="156"
              label="Active Guardians"
            />
          </div>
        </div>
      </section>

      <section className="w-full border-t border-stone-200">
        <div className="max-w-auto mx-auto p-8">
          <div className="text-xs uppercase tracking-wider text-orange-600 font-medium mb-2">
            Mission
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Why This Matters
          </h2>

          <div className="space-y-4 text-neutral-600 leading-relaxed max-w-4xl">
            <p>
              India's oral traditions carry millennia of wisdom, folklore, and
              cultural identity. Yet with each passing generation, countless
              dialects, songs, and stories disappear without trace. No written
              record. No archive. Just silence.
            </p>

            <p>
              LokSwar is a digital repository built to preserve these vanishing
              voices. We combine modern technology with community participation
              to create a living archive— accessible, searchable, and permanent.
              Before it's too late.
            </p>

            <p className="font-semibold text-neutral-900">
              Every recording is a cultural artifact. Every upload is an act of
              preservation. Join us in safeguarding India's intangible heritage.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-orange-600">
        <div className="max-w-auto mx-auto p-8 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Become a Guardian
          </h2>

          <p className="text-white text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Help preserve your region's oral traditions. Record stories, folk
            songs, or indigenous knowledge from your community.
          </p>

          <a className="inline-flex items-center gap-3 px-8 py-3 bg-white text-terracotta text-sm font-semibold hover:bg-neutral-50 transition-colors">
            <MicIcon className="w-4 h-4" />
            <span>Start Your First Recording</span>
          </a>
        </div>
      </section>
    </div>
  );
}
