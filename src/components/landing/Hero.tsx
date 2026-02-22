import { ArrowRight, Play, Sparkles } from "lucide-react";
import demoVideo from "@/assets/display/frameful-edited-2026-02-22(1).webm";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  HERO_CONFIG,
  GRADIENT,
  GRADIENT_REVERSE,
} from "@/configs/landing.config";

export default function Hero() {
  const navigate = useNavigate();
  const cfg = HERO_CONFIG;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 blur-[100px] opacity-30"
          style={{ background: GRADIENT }}
        />
        <div
          className="absolute top-20 right-0 h-[400px] w-[400px] blur-[80px] opacity-15"
          style={{ background: GRADIENT_REVERSE }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div
          className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 px-4 py-1.5 text-sm font-medium"
          style={{ color: "#8b5cf6" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {cfg.badge}
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {cfg.headlineStatic}
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: GRADIENT }}
          >
            {cfg.headlineGradient}
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {cfg.subtext}
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2 px-8 text-base shadow-lg shadow-[#8b5cf6]/20"
            onClick={() => navigate("/record")}
          >
            {cfg.primaryCtaLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-8 text-base"
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Play className="h-4 w-4" />
            {cfg.secondaryCtaLabel}
          </Button>
        </div>

        <p className="animate-fade-up delay-400 mt-4 text-xs text-muted-foreground">
          {cfg.browserSupportNote}
        </p>

        {/* Hero mock — browser recorder preview */}
        <div className="animate-fade-up delay-500 mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xl shadow-[#8b5cf6]/5 animate-pulse-glow">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <div className="ml-3 flex-1 rounded bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                {cfg.mockAddressBar}
              </div>
            </div>

            {/* Product demo video */}
            <video
              src={demoVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
