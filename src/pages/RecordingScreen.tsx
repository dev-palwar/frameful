import { useRecorder } from "../context/RecorderContext";
import { Circle, Square, Monitor, Clock, Sparkles } from "lucide-react";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

export default function RecordingScreen() {
  const { recordingState, elapsedTime, startRecording, stopRecording } =
    useRecorder();

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
            <h1 className="text-3xl font-bold bg-linear-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparentz">
              Frameful
            </h1>
          </div>
          <p className="text-muted-foreground text-sm tracking-wide">
            Capture your screen beautifully
          </p>
        </div>

        {/* Recording Card */}
        <div className="w-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/20 p-8">
          {recordingState !== "recording" && (
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
                className="group relative w-full py-4 font-semibold text-white text-base overflow-hidden transition-all duration-300 cursor-pointer animate-gradient-shift"
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #8b5cf6 100%)",
                  backgroundSize: "200% 200%",
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
                className="group w-full py-4 font-semibold text-white text-base bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/25 cursor-pointer"
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

      {/* Gradient animation keyframes */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
