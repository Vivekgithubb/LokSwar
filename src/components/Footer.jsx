import { Link } from "react-router-dom";
import { MicIcon } from "./MicIcon";

export default function Footer() {
  return (
    <div>
      <section className="w-full border-t border-stone-200">
        <div className="max-w-auto mx-auto p-8">
          <div className="text-md uppercase tracking-wider text-orange-600 font-medium mb-2">
            Mission
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Why This Matters
          </h2>

          <div className="space-y-4 font-serif text-neutral-600 leading-relaxed max-w-4xl">
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

            <p className="font-semibold text-neutral-900 font-sans">
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

          <Link
            to="/record"
            className="inline-flex items-center gap-3 px-8 py-3 bg-white text-terracotta text-sm font-semibold hover:bg-neutral-50 transition-colors"
          >
            <MicIcon className="w-4 h-4" />
            <span>Start Your First Recording</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
