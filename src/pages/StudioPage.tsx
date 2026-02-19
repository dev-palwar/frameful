import { useNavigate } from "react-router";
import { ArrowLeft, Monitor, Download } from "lucide-react";
import { useRef, useState } from "react";
import { useRecorder } from "@/hooks/useRecorder";
import ToolBar from "@/components/shared/ToolBar";
import VideoPlayer, {
  type VideoPlayerHandle,
} from "@/components/video/VideoPlayer";

export default function StudioPage() {
  const navigate = useNavigate();
  const { videoUrl, discardRecording } = useRecorder();
  const [background, setBackground] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const videoPlayerRef = useRef<VideoPlayerHandle>(null);

  const handleGoBack = () => {
    discardRecording();
    navigate("/");
  };

  const handleDownload = async () => {
    if (!videoUrl) return;
    setIsDownloading(true);

    try {
      const trimStart = videoPlayerRef.current?.trimStart ?? 0;
      const trimEnd = videoPlayerRef.current?.trimEnd ?? Infinity;

      // ── 1. Off-screen video element ──────────────────────────────────────
      const video = document.createElement("video");
      video.src = videoUrl;
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error("Video load failed"));
        video.load();
      });
      const effectiveTrimEnd = isFinite(trimEnd)
        ? Math.min(trimEnd, video.duration)
        : video.duration;

      // ── 2. Off-screen canvas 1280×720 (16:9) ─────────────────────────────
      const W = 1280,
        H = 720;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;

      // ── 3. Pre-load background image ──────────────────────────────────────
      let bgImg: HTMLImageElement | null = null;
      if (background) {
        bgImg = new Image();
        bgImg.src = background;
        await new Promise<void>((resolve) => {
          bgImg!.onload = () => resolve();
          bgImg!.onerror = () => resolve();
        });
      }

      // ── 4. Set up MediaRecorder (with audio if available) ─────────────────
      const canvasStream = canvas.captureStream(30);
      let recordStream: MediaStream = canvasStream;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const audioCtx = new AudioCtx();
        const source = audioCtx.createMediaElementSource(video);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        if (dest.stream.getAudioTracks().length > 0) {
          recordStream = new MediaStream([
            ...canvasStream.getVideoTracks(),
            ...dest.stream.getAudioTracks(),
          ]);
        }
      } catch {
        // No audio available — export video-only
      }

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";
      const recorder = new MediaRecorder(recordStream, { mimeType });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      const recordingDone = new Promise<Blob>((resolve) => {
        recorder.onstop = () =>
          resolve(new Blob(chunks, { type: "video/webm" }));
      });

      // ── 5. Seek to trim start ─────────────────────────────────────────────
      video.currentTime = trimStart;
      await new Promise<void>((resolve) => {
        video.onseeked = () => resolve();
        if (video.readyState >= 2) resolve();
      });

      // ── 6. rAF loop: draw background + video onto canvas ──────────────────
      const PADDING = Math.round(W * 0.08);

      const renderFrame = () => {
        if (video.currentTime >= effectiveTrimEnd || video.ended) {
          video.pause();
          recorder.stop();
          return;
        }

        ctx.clearRect(0, 0, W, H);

        // Background layer (blurred, scaled 110%, 80% opacity)
        if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
          ctx.save();
          ctx.filter = "blur(1px)";
          ctx.globalAlpha = 0.8;
          const bgR = bgImg.naturalWidth / bgImg.naturalHeight;
          const canR = W / H;
          let bw, bh;
          if (bgR > canR) {
            bh = H * 1.1;
            bw = bh * bgR;
          } else {
            bw = W * 1.1;
            bh = bw / bgR;
          }
          ctx.drawImage(bgImg, (W - bw) / 2, (H - bh) / 2, bw, bh);
          ctx.restore();
        } else {
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, W, H);
        }

        // Video layer (object-contain inside padded area, rounded corners)
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          const vR = video.videoWidth / video.videoHeight;
          const aW = W - PADDING * 2;
          const aH = H - PADDING * 2;
          let vw, vh;
          if (vR > aW / aH) {
            vw = aW;
            vh = aW / vR;
          } else {
            vh = aH;
            vw = aH * vR;
          }
          const vx = (W - vw) / 2;
          const vy = (H - vh) / 2;
          ctx.save();
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(vx, vy, vw, vh, 8);
          } else {
            ctx.rect(vx, vy, vw, vh);
          }
          ctx.clip();
          ctx.drawImage(video, vx, vy, vw, vh);
          ctx.restore();
        }

        requestAnimationFrame(renderFrame);
      };

      recorder.start(100);
      await video.play();
      renderFrame();

      // ── 7. Wait for recording then trigger download ───────────────────────
      const resultBlob = await recordingDone;
      const url = URL.createObjectURL(resultBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `frameful-edited-${new Date().toISOString().slice(0, 10)}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsDownloading(false);
    }
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
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10 bg-black/2 dark:bg-black/20">
          <div className="w-full max-w-4xl">
            {/* Video Player with integrated background */}
            <div className="bg-white/10 dark:bg-black/40 rounded-xl border border-white/20 overflow-hidden flex flex-col gap-8">
              <VideoPlayer
                ref={videoPlayerRef}
                videoUrl={videoUrl}
                background={background}
              />
            </div>
            {/* Download CTA */}
            <button
              id="download-video-btn"
              onClick={handleDownload}
              disabled={isDownloading}
              className="group relative w-full mt-4 py-3.5 font-semibold text-white text-sm overflow-hidden transition-all duration-300 active:scale-[0.99] cursor-pointer shadow-lg shadow-violet-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Download
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDownloading
                      ? "animate-bounce"
                      : "group-hover:translate-y-0.5"
                  }`}
                />
                {isDownloading
                  ? "Exporting edited video..."
                  : "Download Edited Video"}
              </span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-xl" />
            </button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Your recorded screen capture · .webm format
            </p>
          </div>
        </div>

        {/* Right: Tools Panel */}
        <ToolBar onBackgroundSelect={setBackground} />
      </div>
    </div>
  );
}
