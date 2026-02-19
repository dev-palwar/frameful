import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Timeline from "./Timeline";
import { Play, Pause } from "lucide-react";

export interface VideoPlayerHandle {
  trimStart: number;
  trimEnd: number;
}

interface VideoPlayerProps {
  videoUrl: string;
  background?: string;
  className?: string;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer({ videoUrl, background = "", className = "" }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Video state
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Trim state
    const [trimStart, setTrimStart] = useState<number>(0);
    const [trimEnd, setTrimEnd] = useState<number>(0);

    // Expose trim values to parent for export
    useImperativeHandle(ref, () => ({ trimStart, trimEnd }), [
      trimStart,
      trimEnd,
    ]);

    // Extract duration when video metadata loads
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedMetadata = () => {
        const videoDuration = video.duration;
        setDuration(videoDuration);
        setTrimStart(0);
        setTrimEnd(videoDuration);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () =>
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, [videoUrl]);

    // Handle playback and auto-stop at trim end
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        const current = video.currentTime;
        setCurrentTime(current);

        // Auto-stop at trim end
        if (current >= trimEnd) {
          video.pause();
          setIsPlaying(false);
          video.currentTime = trimStart; // Reset to trim start
        }
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }, [trimStart, trimEnd]);

    const handlePlayPause = () => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
        video.pause();
      } else {
        // Start from trim start if not within trim range
        if (video.currentTime < trimStart || video.currentTime >= trimEnd) {
          video.currentTime = trimStart;
        }
        video.play();
      }
    };

    return (
      <>
        {/* 16:9 Cinematic Preview - Video + Background Composition */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          {/* Blurred Background Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 blur-[1px] opacity-80 rounded-lg"
            style={{
              backgroundImage: background ? `url(${background})` : "none",
            }}
          />

          {/* Video Layer */}
          <div
            className={`absolute inset-0 flex items-center justify-center p-8 ${className}`}
          >
            <video
              ref={videoRef}
              id="studio-video-player"
              src={videoUrl}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Controls Section - Separate Below */}
        <div className="space-y-5 p-6 bg-linear-to-b from-transparent to-black/5">
          {/* Timeline */}
          {duration > 0 && (
            <Timeline
              duration={duration}
              trimStart={trimStart}
              trimEnd={trimEnd}
              currentTime={currentTime}
              setTrimStart={setTrimStart}
              setTrimEnd={setTrimEnd}
            />
          )}

          {/* Play/Pause Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="group relative px-8 py-3.5 font-semibold text-white text-sm overflow-hidden transition-all duration-300 cursor-pointer shadow-lg shadow-violet-500/20"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" fill="currentColor" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" fill="currentColor" />
                    Play Trimmed
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </>
    );
  },
);

export default VideoPlayer;
