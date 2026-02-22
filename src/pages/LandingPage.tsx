import {
  ArrowRight,
  MousePointer2,
  Play,
  Layers,
  Download,
  Sparkles,
  Video,
  Mic,
  Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

/* ──────────────────── Landing Page ────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <HowItWorksSection />
        <ExampleOutputSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-purple-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700">
          <Sparkles className="h-3.5 w-3.5" />
          Free to use · No account needed
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Record your screen.
          <br />
          <span className="bg-linear-to-r from-purple-300 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Make it beautiful.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Frameful captures your browser and screen, then automatically adds
          smooth zoom & pan effects that follow your cursor. Professional
          videos, zero editing.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2 px-8 text-base shadow-lg shadow-purple-500/20"
            onClick={() => navigate("/record")}
          >
            Start recording — it's free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="gap-2 px-8 text-base">
            <Play className="h-4 w-4" />
            Watch demo
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Works on Firefox, Chrome, Edge & Brave
        </p>

        {/* Hero visual mock — browser recorder preview */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xl shadow-purple-500/5">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <div className="ml-3 flex-1 rounded-md bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                frameful.app/studio
              </div>
            </div>

            {/* Mock video preview area */}
            <div className="relative bg-linear-to-br from-purple-950 via-purple-900 to-purple-800 p-8 md:p-12">
              {/* Inner "video" frame */}
              <div className="relative mx-auto aspect-video max-w-xl overflow-hidden rounded-lg border border-white/10 bg-[#1a1025] shadow-2xl">
                {/* Mock code editor content */}
                <div className="flex h-full">
                  {/* Sidebar mock */}
                  <div className="hidden w-12 border-r border-white/5 bg-[#150d20] sm:block">
                    <div className="space-y-3 p-2 pt-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`mx-auto h-5 w-5 rounded ${i === 0 ? "bg-purple-500/60" : "bg-white/8"}`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Editor content mock */}
                  <div className="flex-1 p-4">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="h-3 w-12 rounded bg-purple-400/30" />
                        <div className="h-3 w-20 rounded bg-white/15" />
                      </div>
                      <div className="flex gap-2 pl-4">
                        <div className="h-3 w-16 rounded bg-purple-300/20" />
                        <div className="h-3 w-24 rounded bg-white/10" />
                      </div>
                      <div className="flex gap-2 pl-4">
                        <div className="h-3 w-20 rounded bg-white/10" />
                        <div className="h-3 w-12 rounded bg-purple-400/25" />
                      </div>
                      <div className="h-3 w-8 rounded bg-white/8" />
                      <div className="flex gap-2">
                        <div className="h-3 w-14 rounded bg-purple-400/30" />
                        <div className="h-3 w-28 rounded bg-white/12" />
                      </div>
                      <div className="flex gap-2 pl-4">
                        <div className="h-3 w-10 rounded bg-white/10" />
                        <div className="h-3 w-16 rounded bg-purple-300/20" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zoom indicator overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border-2 border-purple-400/40 bg-purple-500/10 p-3 backdrop-blur-sm">
                    <MousePointer2 className="h-5 w-5 text-purple-300" />
                  </div>
                </div>

                {/* Zoom frame indicator */}
                <div className="absolute right-4 bottom-4 left-4 top-auto">
                  <div className="flex items-center justify-between">
                    <div className="rounded bg-black/50 px-2 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                      2.5× zoom
                    </div>
                    <div className="rounded bg-black/50 px-2 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                      00:12
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating labels */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm">
                  Auto-zoom
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm">
                  Cursor tracking
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm">
                  1080p
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Record",
      description:
        "Click record and use your browser normally. Frameful captures everything — screen, cursor movements, clicks.",
      icon: Video,
    },
    {
      number: "02",
      title: "Edit",
      description:
        "Auto-generated zoom & pan effects follow your cursor. Tweak depth, timing, and background if you want.",
      icon: Scissors,
    },
    {
      number: "03",
      title: "Export",
      description:
        "Pick your aspect ratio, hit export. Your video renders locally — fast, private, and ready to share.",
      icon: Download,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-purple-600 uppercase">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Record. Edit. Export.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three steps. No learning curve.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute top-16 left-[16.6%] right-[16.6%] hidden h-px bg-linear-to-r from-purple-200 via-purple-300 to-purple-200 md:block" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Step icon */}
              <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-purple-200 bg-purple-50 text-purple-600 transition-colors duration-200">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="mb-2 text-xs font-mono font-semibold text-purple-500 tracking-widest">
                STEP {step.number}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExampleOutputSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-purple-600 uppercase">
            Before & After
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Same recording. Totally different result.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Frameful turns flat screen captures into focused, cinematic videos.
          </p>
        </div>

        <div className="mx-auto mt-14 grid gap-6 md:grid-cols-2">
          {/* Before */}
          <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
            <div className="border-b border-border/60 bg-muted/40 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-400/70" />
                <span className="text-xs font-medium text-muted-foreground">
                  Before — Raw recording
                </span>
              </div>
            </div>
            <div className="relative aspect-video bg-[#f0eff1] p-3">
              {/* Full screen, no zoom mock */}
              <div className="h-full w-full overflow-hidden rounded border border-border/40 bg-white">
                {/* Tiny browser content */}
                <div className="border-b border-border/30 bg-muted/30 px-3 py-1.5">
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-300/60" />
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-300/60" />
                    <div className="h-1.5 w-1.5 rounded-full bg-green-300/60" />
                  </div>
                </div>
                <div className="space-y-1.5 p-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex gap-1.5">
                      <div
                        className="h-1.5 rounded bg-muted"
                        style={{ width: `${30 + 10 * 40}%` }}
                      />
                      <div
                        className="h-1.5 rounded bg-muted/60"
                        style={{ width: `${10 + 10 * 20}%` }}
                      />
                    </div>
                  ))}
                </div>
                {/* Tiny cursor */}
                <div className="absolute top-1/2 left-1/2">
                  <MousePointer2 className="h-3 w-3 text-muted-foreground/40" />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white/80 backdrop-blur-sm">
                Hard to follow · No focus
              </div>
            </div>
          </div>

          {/* After */}
          <div className="overflow-hidden rounded-xl border-2 border-purple-300 bg-card shadow-lg shadow-purple-500/5">
            <div className="border-b border-purple-200/60 bg-purple-50/50 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-xs font-medium text-purple-700">
                  After — With Frameful
                </span>
              </div>
            </div>
            <div className="relative aspect-video bg-linear-to-br from-purple-950 via-purple-900 to-purple-800 p-6">
              {/* Zoomed in, clean focus mock */}
              <div className="mx-auto h-full max-w-xs overflow-hidden rounded-lg border border-white/10 bg-[#1a1025] shadow-2xl">
                <div className="space-y-2 p-4">
                  <div className="flex gap-2">
                    <div className="h-2.5 w-14 rounded bg-purple-400/40" />
                    <div className="h-2.5 w-20 rounded bg-white/15" />
                  </div>
                  <div className="flex gap-2 pl-3">
                    <div className="h-2.5 w-18 rounded bg-purple-300/25" />
                    <div className="h-2.5 w-24 rounded bg-white/10" />
                  </div>
                  <div className="flex gap-2 pl-3">
                    <div className="h-2.5 w-12 rounded bg-white/10" />
                    <div className="h-2.5 w-16 rounded bg-purple-400/30" />
                  </div>
                  <div className="flex gap-2 pl-6">
                    <div className="h-2.5 w-20 rounded bg-white/12" />
                  </div>
                </div>
                {/* Cursor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-2 -translate-y-2">
                  <MousePointer2 className="h-5 w-5 text-purple-300 drop-shadow-lg" />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-purple-200 backdrop-blur-sm">
                Zoomed · Clean · Cinematic
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-600 via-purple-500 to-purple-700 px-8 py-16 text-center text-white md:px-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Your screen recordings deserve better.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-purple-100">
              Stop fighting video editors. Record once, export a polished video
              with automatic zoom, pan, and beautiful backgrounds.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 bg-white px-8 text-base text-purple-700 shadow-lg hover:bg-purple-50"
              >
                Start recording free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Mic className="h-4 w-4" />
                See premium features
              </Button>
            </div>
            <p className="mt-4 text-sm text-purple-200">
              No sign-up required · Renders locally · 100% private
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Footer ─────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Layers className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              frameful
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              GitHub
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 Frameful. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
