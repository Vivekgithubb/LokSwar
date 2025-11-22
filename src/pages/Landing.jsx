import React from "react";
import { MicIcon } from "../components/MicIcon";
import MetricCard from "../components/MetricCard";
import Footer from "../components/Footer";
import MidSection from "../components/MidSection";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="w-full flex flex-col gap-10">
      <section className="w-full border-b border-stone-200 py-10">
        <div className="max-w-auto mx-auto mr-11 p-8 grid grid-cols-1 md:grid-cols-10 gap-6 items-start">
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
              <Link
                to="/record"
                className="inline-flex items-center gap-3 px-16 py-3 bg-neutral-900 text-white text-sm font-medium"
              >
                <MicIcon className="w-4 h-4 text-white" />
                <span>Start Recording</span>
              </Link>
              <Link
                to="/stories"
                className="inline-flex items-center gap-3 px-16 py-3 border border-neutral-300 text-neutral-900 text-sm font-medium"
              >
                Browse Archive
              </Link>
            </div>
          </div>

          <aside className="md:col-span-3 text-center bg-white border border-stone-200 p-6 rounded-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full" />
              <div className="text-xs uppercase tracking-wider text-neutral-500">
                Archive Status
              </div>
            </div>

            <div className="mt-4 text-4xl  font-semibold text-neutral-900 mono">
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

      <MidSection />

      <Footer />
    </div>
  );
}
