import React from "react";
import Recorder from "../components/Recorder";

export default function Recording() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-stone-200 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
          Recording Studio
        </h1>
        <p className="mt-2 text-[12px] sm:text-sm text-neutral-600">
          Capture and preserve oral traditions with precision
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-3 py-4 sm:py-6">
        <div className="border border-stone-200 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-full">
          {/* Left Column - Input Data */}
          <div className="p-4 sm:p-6 lg:p-3 lg:border-r border-stone-200">
            <div className="mb-4">
              <div className="text-[12px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                INPUT DATA
              </div>
              <div className="text-[12px] text-neutral-500">
                Provide context for this recording
              </div>
            </div>

            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="text-[12px] uppercase tracking-wider font-semibold text-neutral-700 mb-2 block">
                  Story Title
                </label>
                <input
                  name="title"
                  placeholder="e.g., The Legend of Jheel Tal"
                  className="w-full bg-white border border-stone-200 px-3 py-2 text-sm rounded-sm placeholder-neutral-400"
                />
              </div>

              <div>
                <label className="text-[12px] uppercase tracking-wider font-semibold text-neutral-700 mb-2 block">
                  Location
                </label>
                <input
                  name="location"
                  placeholder="Village, District, State"
                  className="w-full bg-white border border-stone-200 px-3 py-2 text-sm rounded-sm placeholder-neutral-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[12px] uppercase tracking-wider font-semibold text-neutral-700 mb-2 block">
                    Dialect
                  </label>
                  <select
                    name="dialect"
                    className="w-full bg-white border border-stone-200 px-3 py-2 text-sm rounded-sm text-neutral-700"
                  >
                    <option value="">Select</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12px] uppercase tracking-wider font-semibold text-neutral-700 mb-2 block">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full bg-white border border-stone-200 px-3 py-2 text-sm rounded-sm text-neutral-700"
                  >
                    <option value="">Select</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[12px] uppercase tracking-wider font-semibold text-neutral-700 mb-2 block">
                  Narrator Information
                </label>
                <input
                  name="narrator"
                  placeholder="Name, Age (optional)"
                  className="w-full bg-white border border-stone-200 px-3 py-2 text-sm rounded-sm placeholder-neutral-400"
                />
              </div>

              <div>
                <label className="text-[12px] uppercase tracking-wider font-semibold text-neutral-700 mb-2 block">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief context or summary..."
                  rows="4"
                  className="w-full bg-white border border-stone-200 px-3 py-2 text-sm rounded-sm placeholder-neutral-400"
                />
              </div>
            </form>
          </div>

          {/* Right Column - Recorder */}
          <div className="p-4 sm:p-6 lg:p-5 flex flex-col min-h-96 lg:min-h-auto">
            <div className="mb-4">
              <div className="text-[13px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                RECORDER
              </div>
              <div className="text-[12px] text-neutral-500">
                Audio capture interface
              </div>
            </div>

            <div className="flex flex-col">
              <Recorder />
              <div className="text-[12px] text-neutral-500 mt-3 sm:mt-4">
                <span className="inline-block w-2 h-2 bg-stone-300 rounded-full align-middle mr-2" />
                STATUS: <span className="font-mono">STANDBY</span>
                <span className="float-right">
                  <span className="inline-block w-2 h-2 bg-neutral-300 rounded-full align-middle mr-2" />
                  READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
