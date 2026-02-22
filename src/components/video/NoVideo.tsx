import { ArrowLeft, Monitor } from "lucide-react";
import { useNavigate } from "react-router";

const NoVideo = () => {
  const navigate = useNavigate();
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
          onClick={() => navigate("/record")}
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
};

export default NoVideo;
