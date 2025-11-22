import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function Recorder() {
  const waveformRef = useRef(null);
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // create wavesurfer instance
    if (waveformRef.current) {
      wsRef.current = WaveSurfer.create({
        container: waveformRef.current,
        backend: "WebAudio",
        height: 80,
        waveColor: "#111827",
        progressColor: "#111827",
        cursorWidth: 0,
        normalize: true,
      });

      wsRef.current.on("ready", () => {
        setStatus("Ready");
        setProgress(100);
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setStatus("Processing Audio...");
        setProgress(5);
        // load blob into wavesurfer
        if (wsRef.current) {
          wsRef.current.loadBlob(blob);
        }
        setHasRecording(true);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("Recording");
      setProgress(0);
    } catch (err) {
      console.error(err);
      setStatus("Microphone denied");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      // stop tracks
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
  };

  const togglePlay = () => {
    if (!wsRef.current) return;
    wsRef.current.playPause();
  };

  const clearAudio = () => {
    if (hasRecording && wsRef.current) {
      wsRef.current.empty(); // removes audio buffer & visual waveform
      setHasRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={waveformRef}
        className="w-full bg-stone-50 border border-stone-200 rounded-sm mb-3 sm:mb-4 flex-1"
      />

      <div className="space-y-2 sm:space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-terracotta text-white text-xs sm:text-sm font-medium rounded-sm hover:bg-orange-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
              <path
                d="M19 11v1a7 7 0 0 1-14 0v-1"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
              />
              <path
                d="M12 19v3"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
              />
            </svg>
            <span className="hidden sm:inline">
              {isRecording ? "Stop" : "Start Recording"}
            </span>
            <span className="sm:hidden">{isRecording ? "Stop" : "Record"}</span>
          </button>
          {hasRecording && <button onClick={togglePlay}>Play</button>}
          {hasRecording && <button onClick={clearAudio}>Clear</button>}

          <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 border border-stone-200 text-neutral-900 text-xs sm:text-sm font-medium rounded-sm hover:bg-stone-50 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="hidden sm:inline">Upload File</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </div>

        <button className="w-full px-4 sm:px-6 py-2 bg-stone-600 text-white text-xs sm:text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors">
          Submit to Archive
        </button>
      </div>
    </div>
  );
}
