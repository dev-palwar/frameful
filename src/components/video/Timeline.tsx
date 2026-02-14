import { useRef, useState, useEffect, useCallback } from "react";

interface TimelineProps {
  duration: number;
  trimStart: number;
  trimEnd: number;
  currentTime: number;
  setTrimStart: (time: number) => void;
  setTrimEnd: (time: number) => void;
}

const MIN_TRIM_DURATION = 1; // seconds

export default function Timeline({
  duration,
  trimStart,
  trimEnd,
  currentTime,
  setTrimStart,
  setTrimEnd,
}: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"start" | "end" | null>(null);

  // Convert pixel position to time (seconds)
  const pixelToTime = useCallback(
    (pixel: number): number => {
      if (!trackRef.current) return 0;
      const trackWidth = trackRef.current.offsetWidth;
      const rect = trackRef.current.getBoundingClientRect();
      const relativeX = pixel - rect.left;
      const clampedX = Math.max(0, Math.min(relativeX, trackWidth));
      return (clampedX / trackWidth) * duration;
    },
    [duration],
  );

  const handleMouseDown = (handle: "start" | "end") => {
    setDragging(handle);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newTime = pixelToTime(e.clientX);

      if (dragging === "start") {
        // Prevent start handle from crossing end handle (maintain minimum duration)
        const maxStart = trimEnd - MIN_TRIM_DURATION;
        const clampedStart = Math.max(0, Math.min(newTime, maxStart));
        setTrimStart(clampedStart);
      } else if (dragging === "end") {
        // Prevent end handle from crossing start handle (maintain minimum duration)
        const minEnd = trimStart + MIN_TRIM_DURATION;
        const clampedEnd = Math.max(minEnd, Math.min(newTime, duration));
        setTrimEnd(clampedEnd);
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    dragging,
    trimStart,
    trimEnd,
    duration,
    setTrimStart,
    setTrimEnd,
    pixelToTime,
  ]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startPercent = (trimStart / duration) * 100;
  const endPercent = (trimEnd / duration) * 100;
  const playheadPercent = (currentTime / duration) * 100;

  return (
    <div className="w-full space-y-3">
      {/* Time Labels */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono">{formatTime(trimStart)}</span>
        <span className="text-[10px] opacity-60">
          Duration: {formatTime(trimEnd - trimStart)}
        </span>
        <span className="font-mono">{formatTime(trimEnd)}</span>
      </div>

      {/* Timeline Track */}
      <div
        ref={trackRef}
        className="relative h-12 bg-muted/30 rounded-lg overflow-visible cursor-pointer select-none"
      >
        {/* Unselected regions (dimmed) */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-black/20 dark:bg-black/40"
          style={{ width: `${startPercent}%` }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 bg-black/20 dark:bg-black/40"
          style={{ width: `${100 - endPercent}%` }}
        />

        {/* Selected region (highlighted) */}
        <div
          className="absolute top-0 bottom-0 bg-violet-500/20 dark:bg-violet-500/30 border-y-2 border-violet-500/50"
          style={{
            left: `${startPercent}%`,
            width: `${endPercent - startPercent}%`,
          }}
        />

        {/* Playhead indicator */}
        {currentTime >= trimStart && currentTime <= trimEnd && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-violet-500 shadow-lg shadow-violet-500/50 z-20"
            style={{ left: `${playheadPercent}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-violet-500 rounded-full shadow-lg" />
          </div>
        )}

        {/* Start Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 cursor-ew-resize group"
          style={{ left: `${startPercent}%` }}
          onMouseDown={() => handleMouseDown("start")}
        >
          <div className="w-4 h-10 bg-white dark:bg-gray-800 border-2 border-violet-500 rounded-md shadow-lg group-hover:scale-110 transition-transform">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-0.5 h-5 bg-violet-500/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* End Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 z-30 cursor-ew-resize group"
          style={{ left: `${endPercent}%` }}
          onMouseDown={() => handleMouseDown("end")}
        >
          <div className="w-4 h-10 bg-white dark:bg-gray-800 border-2 border-violet-500 rounded-md shadow-lg group-hover:scale-110 transition-transform">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-0.5 h-5 bg-violet-500/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Full duration label */}
      <div className="text-center text-[10px] text-muted-foreground/60">
        Total: {formatTime(duration)}
      </div>
    </div>
  );
}
