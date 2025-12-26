import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import Footer from "../components/Footer";
import {
  Mic,
  MapPin,
  Clock,
  FileText,
  Activity,
  Cpu,
  CheckCircle,
  Radio,
  Globe,
  Languages,
  User,
  Calendar,
} from "lucide-react";

export default function AiTranslating() {
  const waveformRef = useRef(null);
  const wsRef = useRef(null);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [processingStage, setProcessingStage] = useState("Analyzing audio...");

  // Mock data - replace with actual data from your ML model
  const [storyData, setStoryData] = useState({
    title: "The Legend of Jheel Tal",
    location: "Nainital, Uttarakhand",
    dialect: "Kumaoni",
    narrator: "Ramesh Pandey, 67",
    category: "Folk Tale",
    recordedDate: "November 23, 2025",
    duration: "3:45",
    transcription: `Long ago, in the heart of the Kumaon hills, there lived a beautiful princess named Jheel. She was known throughout the land for her kindness and wisdom. One day, while wandering in the forest, she encountered a sage who was meditating by a small pond.

The sage blessed her and said, "Your compassion will create something eternal." Years passed, and when the princess grew old, she chose to merge with the waters of that very pond, transforming it into a magnificent lake that would bring prosperity to the region.

The people named it Jheel Tal in her honor, and to this day, the lake is said to carry her spirit. During full moon nights, locals claim to see ripples forming in the shape of a dancing figure, believed to be Princess Jheel watching over her beloved land.`,
    summary:
      "A folk tale about Princess Jheel who transformed into a sacred lake in Nainital, bringing prosperity to the Kumaon region. The story explains the origin of Jheel Tal (Naini Lake) and its spiritual significance to the local community.",
    keywords: [
      "Princess Jheel",
      "Kumaon folklore",
      "Sacred lake",
      "Nainital origin story",
    ],
    culturalSignificance:
      "This tale represents the deep connection between nature and spirituality in Kumaoni culture, emphasizing themes of sacrifice, transformation, and eternal guardianship.",
  });

  useEffect(() => {
    // Simulate processing stages
    const stages = [
      "Analyzing audio...",
      "Detecting dialect...",
      "Transcribing speech...",
      "Generating summary...",
      "Extracting metadata...",
      "Complete",
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setProcessingStage(stages[currentStage]);
      } else {
        setIsProcessing(false);
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (waveformRef.current && !isProcessing) {
      // Initialize WaveSurfer for playback visualization
      wsRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#d6d3d1",
        progressColor: "#ea580c",
        cursorColor: "#ea580c",
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height: 80,
        normalize: true,
        responsive: true,
      });

      // Load audio blob if available (from previous recording)
      // For demo, we'll create a simple visualization
      // In production, load the actual recorded audio blob
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.destroy();
      }
    };
  }, [isProcessing]);

  const togglePlay = () => {
    if (wsRef.current) {
      wsRef.current.playPause();
    }
  };

  if (isProcessing) {
    return (
      <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="relative flex h-16 w-16 mx-auto mb-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-16 w-16 bg-orange-500 items-center justify-center">
              <Cpu className="w-8 h-8 text-white animate-pulse" />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Processing Your Recording
          </h2>
          <p className="text-sm font-mono text-stone-500 uppercase tracking-widest">
            {processingStage}
          </p>
          <div className="w-full bg-stone-200 h-1 mt-6 overflow-hidden rounded-full">
            <div
              className="bg-orange-600 h-full animate-pulse"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-stone-50 selection:bg-orange-100 text-neutral-900 font-sans">
      {/* 1. HERO SECTION WITH WAVEFORM */}
      <section className="w-full border-b border-stone-200 bg-white">
        <div className="max-w-auto mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT COLUMN: Story Info */}
          <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200 relative overflow-hidden">
            {/* Background Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Top Marker */}
            <div className="flex items-center gap-3 mb-8">
              <span className="px-2 py-1 bg-green-50 border border-green-200 text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-2">
                <CheckCircle className="w-3 h-3" />
                Processing Complete
              </span>
              <span className="h-px w-12 bg-stone-300"></span>
            </div>

            {/* Story Title */}
            <div className="relative z-10 mb-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6 text-neutral-900">
                {storyData.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-orange-600 italic font-serif tracking-tight">
                  {storyData.title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>{storyData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Languages className="w-4 h-4 text-orange-600" />
                  <span>{storyData.dialect}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>{storyData.duration}</span>
                </div>
              </div>

              <p className="max-w-xl text-base text-stone-600 leading-relaxed font-serif border-l-2 border-orange-600 pl-6">
                {storyData.summary}
              </p>
            </div>

            {/* Waveform Visualization */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Audio Waveform
                </span>
                <button
                  onClick={togglePlay}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors"
                >
                  Play / Pause
                </button>
              </div>
              <div className="w-full bg-stone-50 border border-stone-200 p-4">
                <div ref={waveformRef} className="w-full"></div>
              </div>
            </div>

            {/* Bottom Decor */}
            <div className="mt-8 flex items-center gap-2 text-stone-300">
              <Activity className="w-12 h-12 opacity-20" />
              <div className="h-px flex-1 bg-stone-100"></div>
            </div>
          </div>

          {/* RIGHT COLUMN: Metadata */}
          <div className="lg:col-span-4 bg-stone-50/50 flex flex-col">
            {/* Status Header */}
            <div className="p-6 border-b border-stone-200 bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Analysis Complete
                </span>
              </div>
              <Radio className="w-4 h-4 text-stone-400" />
            </div>

            {/* Metadata Cards */}
            <div className="flex-1 flex flex-col divide-y divide-stone-200">
              {/* Narrator Info */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Narrator
                  </span>
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  {storyData.narrator}
                </div>
              </div>

              {/* Category */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Category
                  </span>
                  <FileText className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  {storyData.category}
                </div>
              </div>

              {/* Date */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Recorded
                  </span>
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  {storyData.recordedDate}
                </div>
              </div>
              {/* Actions */}
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-4 p-8">
                  Next Steps
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-6 py-3 bg-neutral-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Save to Archive
                  </button>
                  <button className="w-full px-6 py-3 border border-stone-200 text-neutral-900 text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors">
                    Download Transcription
                  </button>
                  <button
                    onClick={() => navigate("/record")}
                    className="w-full px-6 py-3 border border-stone-200 text-neutral-900 text-sm font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    Record Another
                  </button>
                </div>
              </div>
              {/* Keywords */}
              <div className="p-8 bg-white hover:bg-stone-50 transition-colors flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Keywords
                  </span>
                  <Globe className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {storyData.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-stone-100 border border-stone-200 text-xs text-neutral-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STRIP BANNER */}
      <div className="w-full border-b border-stone-200 bg-neutral-900 text-stone-400 py-3 overflow-hidden">
        <div className="max-w-auto mx-auto px-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
          <span>/// AI-Powered Transcription</span>
          <span className="hidden md:inline">
            Accuracy: 98.7% // Dialect: {storyData.dialect}
          </span>
          <span>Speech-to-Text Complete ///</span>
        </div>
      </div>

      {/* 3. FULL TRANSCRIPTION SECTION */}
      <section className="w-full bg-white border-b border-stone-200">
        <div className="max-w-auto mx-auto p-8 md:p-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-2 py-1 bg-stone-100 border border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Full Transcription
            </span>
            <span className="h-px flex-1 bg-stone-200"></span>
          </div>

          <div className="prose prose-stone max-w-none">
            {storyData.transcription.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className="text-lg leading-relaxed text-neutral-700 font-serif mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CULTURAL SIGNIFICANCE */}
      <section className="w-full bg-stone-50 border-b border-stone-200">
        <div className="max-w-auto mx-auto p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Cultural Context */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-orange-600" />
                Cultural Significance
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {storyData.culturalSignificance}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
