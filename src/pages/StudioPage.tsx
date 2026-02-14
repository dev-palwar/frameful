import { useNavigate } from "react-router";
import { useRecorder } from "../context/RecorderContext";
import {
  ArrowLeft,
  Scissors,
  Type,
  Palette,
  Music,
  Layers,
  Monitor,
} from "lucide-react";

const tools = [
  { icon: Scissors, label: "Trim", description: "Cut and trim clips" },
  { icon: Type, label: "Text", description: "Add text overlays" },
  { icon: Palette, label: "Filters", description: "Apply color filters" },
  { icon: Music, label: "Audio", description: "Add background audio" },
  { icon: Layers, label: "Layers", description: "Manage layers" },
];

export default function StudioPage() {
  const navigate = useNavigate();
  const { videoUrl, discardRecording } = useRecorder();

  const handleGoBack = () => {
    discardRecording();
    navigate("/");
  };

  // No recording available — prompt user to go back
  if (!videoUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 flex items-center justify-center">
            <Monitor className="w-10 h-10 text-violet-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No recording found
            </h2>
            <p className="text-muted-foreground text-sm">
              Looks like you haven't recorded anything yet, or the page was
              refreshed. Recordings are not persisted across reloads.
            </p>
          </div>
          <button
            id="go-back-btn"
            onClick={() => navigate("/")}
            className="group relative px-8 py-3 font-semibold text-white text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Record Something
            </span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Studio Header */}
      <div className="h-14 border-b border-border/50 bg-card/80 backdrop-blur-xl flex items-center px-6 gap-4 shrink-0">
        <button
          id="back-to-home-btn"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="h-5 w-px bg-border" />
        <h1 className="text-sm font-semibold bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          Frameful Studio
        </h1>
      </div>

      {/* Studio Layout — split screen */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Preview */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10 bg-black/[0.02] dark:bg-black/20">
          <div className="w-full max-w-3xl">
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-border/30">
              <video
                id="studio-video-player"
                src={videoUrl}
                controls
                autoPlay
                className="w-full bg-black"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Your recorded screen capture
            </p>
          </div>
        </div>

        {/* Right: Tools Panel */}
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border/50 bg-card/50 backdrop-blur-xl p-6 shrink-0 overflow-y-auto">
          <h2 className="text-sm font-semibold text-foreground mb-1">Tools</h2>
          <p className="text-xs text-muted-foreground mb-6">
            Editing tools coming soon
          </p>

          <div className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-muted/50 transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 flex items-center justify-center group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors shrink-0">
                  <tool.icon className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {tool.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl border border-dashed border-border/70 bg-muted/20">
            <p className="text-xs text-muted-foreground text-center">
              More editing features will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
