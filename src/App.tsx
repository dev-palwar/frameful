import { useRef, useState, useEffect, useCallback } from "react";
import {
  Circle,
  Square,
  Download,
  X,
  Monitor,
  Clock,
  Sparkles,
} from "lucide-react";

type RecordingState = "idle" | "recording" | "preview";

export default function App() {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [blobData, setBlobData] = useState<Blob | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "video/webm",
        });

        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setBlobData(blob);
        setRecordingState("preview");
      };

      // Handle when user stops sharing via browser UI
      stream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };

      recorder.start();
      setRecordingState("recording");
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } catch {
      // User cancelled the screen picker
      console.log("Screen recording cancelled");
    }
  };

  const stopRecording = useCallback(() => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecordingState("preview");
  }, []);

  const discardRecording = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(null);
    setBlobData(null);
    setRecordingState("idle");
    setElapsedTime(0);
  };

  const downloadRecording = () => {
    if (!blobData) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blobData);
    a.download = `frameful-recording-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-linear-to-br from-amber-400 to-orange-500 border-2 border-background" />
            </div>
            <h1
              className="text-3xl font-bold bg-linear-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent"
              style={{
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
            >
              Frameful
            </h1>
          </div>
          <p className="text-muted-foreground text-sm tracking-wide">
            Capture your screen beautifully
          </p>
        </div>

        {/* Recording Card */}
        <div className="w-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/20 p-8">
          {recordingState === "idle" && (
            <div className="flex flex-col items-center gap-6">
              {/* Illustration area */}
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-border/70 bg-muted/30 flex flex-col items-center justify-center gap-3 group hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300 cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="w-8 h-8 text-violet-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground/80">
                    Ready to record
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Screen, window, or tab
                  </p>
                </div>
              </div>

              {/* Start Button */}
              <button
                id="start-recording-btn"
                onClick={startRecording}
                className="group relative w-full py-4 rounded-xl font-semibold text-white text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #8b5cf6 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 3s ease infinite",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Circle className="w-5 h-5 fill-current" />
                  Start Recording
                </span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </button>

              {/* Features hint */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                  HD Quality
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-fuchsia-500" />
                  No time limit
                </span>
              </div>
            </div>
          )}

          {recordingState === "recording" && (
            <div className="flex flex-col items-center gap-6">
              {/* Recording indicator */}
              <div className="w-full aspect-video rounded-xl bg-linear-to-br from-red-500/5 to-red-500/10 dark:from-red-500/10 dark:to-red-500/20 border border-red-500/20 flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-red-500/30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
                  </div>
                  {/* Orbiting ring */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500/50 animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-red-500">
                    Recording in progress
                  </p>
                  <p className="text-3xl font-mono font-bold text-foreground mt-1 tabular-nums">
                    {formatTime(elapsedTime)}
                  </p>
                </div>
              </div>

              {/* Stop Button */}
              <button
                id="stop-recording-btn"
                onClick={stopRecording}
                className="group w-full py-4 rounded-xl font-semibold text-white text-base bg-red-500 hover:bg-red-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2.5">
                  <Square className="w-4 h-4 fill-current" />
                  Stop Recording
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video Preview Modal */}
      {recordingState === "preview" && videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={discardRecording}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-card border border-border/50 shadow-2xl shadow-black/20 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h2
                  className="font-semibold text-foreground"
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  Recording Preview
                </h2>
              </div>
              <button
                id="close-preview-btn"
                onClick={discardRecording}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video */}
            <div className="p-4 bg-black/5 dark:bg-black/20">
              <video
                id="recording-preview-video"
                src={videoUrl}
                controls
                autoPlay
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border/50">
              <button
                id="discard-recording-btn"
                onClick={discardRecording}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer"
              >
                Discard
              </button>
              <button
                id="download-recording-btn"
                onClick={downloadRecording}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
                }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gradient animation keyframes */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
