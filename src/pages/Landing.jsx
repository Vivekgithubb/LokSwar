import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  Mic,
  Globe,
  Database,
  ArrowRight,
  Radio,
  Activity,
  Cpu,
  Fingerprint,
  Languages,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-stone-50 selection:bg-orange-100 text-neutral-900 font-sans">
      {/* 1. ARCHITECTURAL HERO SECTION */}
      <section className="w-full border-b border-stone-200 bg-white">
        <div className="max-w-auto mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
          {/* LEFT COLUMN: Narrative (Heavy Typography) */}
          <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200 relative overflow-hidden">
            {/* Background Texture (Subtle Grid) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Top Marker */}
            <div className="flex items-center gap-3 mb-12">
              <span className="px-2 py-1 bg-stone-100 border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                Project LokSwar
              </span>
              <span className="h-px w-12 bg-stone-300"></span>
            </div>

            {/* Main Headline */}
            <div className="relative z-10">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-neutral-900">
                The <br />
                Disappearing <br />
                <span className="text-orange-600 italic font-serif tracking-tight">
                  Voice of India
                </span>
              </h1>

              <p className="max-w-xl text-lg md:text-xl text-stone-600 leading-relaxed font-serif border-l-2 border-orange-600 pl-6 mb-10">
                Preserving oral traditions, folk tales, and indigenous knowledge
                before they fade into silence.
                <span className="block mt-2 text-stone-400 text-sm font-sans uppercase tracking-wider font-bold">
                  /// Archiving Heritage Since 2025
                </span>
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  to="/record"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white text-sm font-bold uppercase tracking-widest overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Mic className="w-4 h-4" /> Start Recording
                  </span>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                </Link>

                <Link
                  to="/stories"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-stone-200 text-neutral-900 text-sm font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors"
                >
                  <span>Browse Archive</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Bottom Decor */}
            <div className="mt-12 flex items-center gap-2 text-stone-300">
              <Activity className="w-12 h-12 opacity-20" />
              <div className="h-px flex-1 bg-stone-100"></div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Data Monitor (The "Instrument") */}
          <div className="lg:col-span-4 bg-stone-50/50 flex flex-col">
            {/* Status Header */}
            <div className="p-6 border-b border-stone-200 bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  System Online
                </span>
              </div>
              <Radio className="w-4 h-4 text-stone-400" />
            </div>

            {/* Main Stat */}
            <div className="flex-1 p-8 flex flex-col justify-center items-center text-center border-b border-stone-200 bg-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Database className="w-32 h-32" />
              </div>
              <div className="text-7xl md:text-8xl font-mono font-bold text-neutral-900 tracking-tighter">
                1,240
              </div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 mt-2">
                Stories Preserved
              </div>
            </div>

            {/* Secondary Stats Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 divide-y lg:divide-y-0 sm:divide-x lg:divide-x-0 divide-stone-200">
              {/* Stat 1 */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors border-b border-stone-200">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Dialects
                  </span>
                  <Mic className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-3xl font-mono font-bold text-neutral-900">
                  087
                </div>
                <div className="w-full bg-stone-100 h-1 mt-4 overflow-hidden">
                  <div className="bg-neutral-900 h-full w-[45%]"></div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Villages Mapped
                  </span>
                  <Globe className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-3xl font-mono font-bold text-neutral-900">
                  342
                </div>
                <div className="w-full bg-stone-100 h-1 mt-4 overflow-hidden">
                  <div className="bg-neutral-900 h-full w-[72%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STRIP BANNER (Connecting Section) */}
      <div className="w-full border-b border-stone-200 bg-neutral-900 text-stone-400 py-3 overflow-hidden">
        <div className="max-w-auto mx-auto px-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
          <span>/// Listening to the past</span>
          <span className="hidden md:inline">
            Frequency: 44.1kHz // Bitrate: 320kbps
          </span>
          <span>Building the future ///</span>
        </div>
      </div>

      {/* 3. FEATURES / MANIFESTO (Replacing MidSection) */}
      <section className="w-full bg-stone-50 border-b border-stone-200">
        <div className="max-w-auto mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {/* Feature 1 */}
          <div className="p-12 group hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-white border border-stone-200 flex items-center justify-center mb-6 group-hover:border-orange-600 transition-colors">
              <Cpu className="w-6 h-6 text-neutral-900" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-3">
              AI Preservation
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Advanced neural networks analyze, transcribe, and categorize oral
              dialects that standard models miss.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-12 group hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-white border border-stone-200 flex items-center justify-center mb-6 group-hover:border-orange-600 transition-colors">
              <Fingerprint className="w-6 h-6 text-neutral-900" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-3">
              Identity Mapping
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Geo-tagging oral histories to their origin villages, creating a
              living, breathing map of cultural memory.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-12 group hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-white border border-stone-200 flex items-center justify-center mb-6 group-hover:border-orange-600 transition-colors">
              <Languages className="w-6 h-6 text-neutral-900" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-3">
              Dialect Rescue
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Specifically trained to identify and archive micro-dialects that
              are at risk of extinction within the next decade.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MINIMALIST FOOTER */}
      <Footer />
      <footer className="bg-white py-12 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="text-2xl font-bold tracking-tighter text-neutral-900 mb-2">
              LOKSWAR.
            </div>
            <div className="text-xs text-stone-500 font-mono uppercase tracking-widest">
              © 2025 National Service Scheme <br />
              NMAM Institute of Technology
            </div>
          </div>

          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
            <a href="#" className="hover:text-orange-600 transition-colors">
              Manifesto
            </a>
            <a href="#" className="hover:text-orange-600 transition-colors">
              Data Policy
            </a>
            <a href="#" className="hover:text-orange-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
