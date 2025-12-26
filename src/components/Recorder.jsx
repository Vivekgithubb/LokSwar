import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";

export default function Recorder() {
  const waveformRef = useRef(null);
  const wsRef = useRef(null);
  const recordPluginRef = useRef(null); // Ref to store the record plugin
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (waveformRef.current) {
      // 1. Initialize WaveSurfer
      wsRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#d6d3d1", // Stone-300 (Subtle background wave)
        progressColor: "#ea580c", // Orange-600 (Active wave)
        cursorColor: "#ea580c",
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height: 60, // Fixed height
        normalize: true,
        minPxPerSec: 50, // Ensures the wave isn't too squashed
      });

      // 2. Initialize Record Plugin
      const record = wsRef.current.registerPlugin(
        RecordPlugin.create({
          scrollingWaveform: true, // Creates the "moving" effect
          renderRecordedAudio: false, // We handle this manually
        })
      );

      recordPluginRef.current = record;

      // 3. Handle Recording End
      record.on("record-end", (blob) => {
        setAudioBlob(blob);
        setHasRecording(true);
        // Load the recorded audio into the player for review
        wsRef.current.loadBlob(blob);
      });
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.destroy();
        wsRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // This starts the microphone AND the visualizer
      await recordPluginRef.current.startMic();
      await recordPluginRef.current.startRecording();
      setIsRecording(true);
      setHasRecording(false);
    } catch (err) {
      console.error("Mic Error:", err);
      alert("Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (recordPluginRef.current) {
      recordPluginRef.current.stopRecording();
      recordPluginRef.current.stopMic();
      setIsRecording(false);
    }
  };

  const togglePlay = () => {
    if (!wsRef.current) return;
    wsRef.current.playPause();
  };

  const clearAudio = () => {
    if (wsRef.current) {
      wsRef.current.empty(); // Clear waveform
      setAudioBlob(null);
      setHasRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* VISUALIZER BOX 
        - Removed 'flex' and 'items-center' to fix the "single bar" glitch.
        - Added 'pt-8' to push the wave down visually to the center.
      */}
      <div className="w-full h-32 bg-stone-50 border border-stone-200 rounded-sm mb-4 overflow-hidden relative">
        {/* The Waveform Container */}
        <div
          ref={waveformRef}
          className="w-full h-full pt-8 px-4" // Padding puts wave in vertical center
        />

        {/* Live Indicator Overlay */}
        {isRecording && (
          <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/80 backdrop-blur px-2 py-1 rounded-sm border border-red-100">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
              Live Input
            </span>
          </div>
        )}
      </div>

      {/* CONTROLS */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-sm transition-all ${
              isRecording
                ? "bg-red-600 hover:bg-red-700"
                : "bg-neutral-900 hover:bg-neutral-800"
            }`}
          >
            {isRecording ? (
              <>
                <div className="w-2.5 h-2.5 bg-white rounded-sm" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <span>Start Recording</span>
              </>
            )}
          </button>

          {hasRecording ? (
            <div className="flex gap-2">
              <button
                onClick={togglePlay}
                className="flex-1 bg-white border border-stone-200 text-neutral-900 text-sm font-medium rounded-sm hover:bg-stone-50"
              >
                Play / Pause
              </button>
              <button
                onClick={clearAudio}
                className="px-4 bg-white border border-stone-200 text-red-600 text-sm font-medium rounded-sm hover:bg-red-50"
              >
                Clear
              </button>
            </div>
          ) : (
            <button
              disabled
              className="flex-1 bg-stone-100 border border-stone-200 text-stone-400 text-sm font-medium rounded-sm cursor-not-allowed"
            >
              Play Preview
            </button>
          )}
        </div>

        <button
          disabled={!hasRecording}
          onClick={() => navigate("/translate")}
          className={`w-full px-6 py-2 text-white text-sm font-medium rounded-sm transition-colors uppercase tracking-wide ${
            hasRecording
              ? "bg-orange-700 hover:bg-orange-800 cursor-pointer"
              : "bg-stone-300 cursor-not-allowed"
          }`}
        >
          continue
        </button>
      </div>
    </div>
  );
}
