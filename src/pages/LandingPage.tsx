import { useState } from "react";
import {
  ArrowRight,
  MousePointer2,
  Play,
  Layers,
  Download,
  Video,
  Palette,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router";

/* ──────────────────── Landing Page ────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <HowItWorksSection />
        <ComingSoonSection />
        <WaitlistSection />
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
        <div
          className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 blur-[100px] opacity-30"
          style={{
            background:
              "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(217, 70, 239) 100%)",
          }}
        />
        <div
          className="absolute top-20 right-0 h-[400px] w-[400px] blur-[80px] opacity-15"
          style={{
            background:
              "linear-gradient(135deg, rgb(217, 70, 239) 0%, rgb(139, 92, 246) 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div
          className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 px-4 py-1.5 text-sm font-medium"
          style={{ color: "#8b5cf6" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Free to use · No account needed
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Record your screen.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(217, 70, 239) 100%)",
            }}
          >
            Make it beautiful.
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Frameful captures your screen, lets you pick a beautiful background,
          trim the timeline, and export a polished video — all in your browser.
          No sign-up, no uploads, fully private.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2 px-8 text-base shadow-lg shadow-[#8b5cf6]/20"
            onClick={() => navigate("/record")}
          >
            Start recording — it's free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-8 text-base"
            onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Play className="h-4 w-4" />
            See how it works
          </Button>
        </div>

        <p className="animate-fade-up delay-400 mt-4 text-xs text-muted-foreground">
          Works on Chrome, Edge, Brave & Firefox
        </p>

        {/* Hero visual mock — browser recorder preview */}
        <div className="animate-fade-up delay-500 mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xl shadow-[#8b5cf6]/5 animate-pulse-glow">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 bg-red-400/80" />
                <div className="h-3 w-3 bg-yellow-400/80" />
                <div className="h-3 w-3 bg-green-400/80" />
              </div>
              <div className="ml-3 flex-1 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                frameful.app/studio
              </div>
            </div>

            {/* Mock studio preview */}
            <div
              className="relative p-8 md:p-12"
              style={{
                background:
                  "linear-gradient(135deg, #1a0533 0%, #2d1052 50%, #1a0533 100%)",
              }}
            >
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
                          className={`mx-auto h-5 w-5 ${i === 0 ? "bg-[#8b5cf6]/60" : "bg-white/8"}`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Editor content mock */}
                  <div className="flex-1 p-4">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="h-3 w-12 bg-[#8b5cf6]/30" />
                        <div className="h-3 w-20 bg-white/15" />
                      </div>
                      <div className="flex gap-2 pl-4">
                        <div className="h-3 w-16 bg-[#d946ef]/20" />
                        <div className="h-3 w-24 bg-white/10" />
                      </div>
                      <div className="flex gap-2 pl-4">
                        <div className="h-3 w-20 bg-white/10" />
                        <div className="h-3 w-12 bg-[#8b5cf6]/25" />
                      </div>
                      <div className="h-3 w-8 bg-white/8" />
                      <div className="flex gap-2">
                        <div className="h-3 w-14 bg-[#8b5cf6]/30" />
                        <div className="h-3 w-28 bg-white/12" />
                      </div>
                      <div className="flex gap-2 pl-4">
                        <div className="h-3 w-10 bg-white/10" />
                        <div className="h-3 w-16 bg-[#d946ef]/20" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cursor overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-[#8b5cf6]/40 bg-[#8b5cf6]/10 p-3 backdrop-blur-sm">
                    <MousePointer2 className="h-5 w-5 text-[#d946ef]" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute right-4 bottom-4 left-4 top-auto">
                  <div className="flex items-center justify-between">
                    <div className="bg-black/50 px-2 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                      Background applied
                    </div>
                    <div className="bg-black/50 px-2 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                      00:12
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating labels */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div
                  className="bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{ color: "#d8b4fe" }}
                >
                  Custom Background
                </div>
                <div
                  className="bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{ color: "#d8b4fe" }}
                >
                  Trim & Export
                </div>
                <div
                  className="bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{ color: "#d8b4fe" }}
                >
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

/* ─────────────────── How It Works ─────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Record",
      description:
        "Click record and choose a screen, window, or browser tab. Frameful captures everything in HD with no time limit.",
      icon: Video,
    },
    {
      number: "02",
      title: "Customize",
      description:
        "Pick a beautiful background from the gallery or upload your own. Trim the timeline to keep only what matters.",
      icon: Palette,
    },
    {
      number: "03",
      title: "Export",
      description:
        "Hit download and your edited video renders locally in .webm format — fast, private, and ready to share.",
      icon: Download,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-sm font-medium tracking-wide uppercase"
            style={{ color: "#8b5cf6" }}
          >
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Record. Customize. Export.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three steps. No learning curve. Everything stays on your device.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div
            className="absolute top-16 left-[16.6%] right-[16.6%] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, rgb(139, 92, 246) 0%, rgb(217, 70, 239) 50%, rgb(139, 92, 246) 100%)",
              opacity: 0.3,
            }}
          />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Step icon */}
              <div
                className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-colors duration-200"
                style={{
                  backgroundColor:
                    i === 0
                      ? "rgba(139, 92, 246, 0.08)"
                      : i === 1
                        ? "rgba(168, 85, 247, 0.08)"
                        : "rgba(217, 70, 239, 0.08)",
                  color: i === 0 ? "#8b5cf6" : i === 1 ? "#a855f7" : "#d946ef",
                }}
              >
                <step.icon className="h-6 w-6" />
              </div>
              <div
                className="mb-2 text-xs font-mono font-semibold tracking-widest"
                style={{
                  color: i === 0 ? "#8b5cf6" : i === 1 ? "#a855f7" : "#d946ef",
                }}
              >
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

/* ──────────────── Current Features ──────────────── */
// function FeaturesSection() {
//   const features = [
//     {
//       icon: MonitorPlay,
//       title: "Screen, Window, or Tab",
//       description:
//         "Record any screen, application window, or specific browser tab. Choose exactly what you want to capture.",
//     },
//     {
//       icon: Palette,
//       title: "Custom Backgrounds",
//       description:
//         "Choose from built-in backgrounds or upload your own images. Your video gets composited with a beautiful backdrop.",
//     },
//     {
//       icon: Scissors,
//       title: "Timeline Trimming",
//       description:
//         "Drag the trim handles on the timeline to cut out the beginning or end. Keep only the good parts.",
//     },
//     {
//       icon: Download,
//       title: "Local Export",
//       description:
//         "Your video renders entirely in your browser. Nothing gets uploaded. Download a polished .webm file instantly.",
//     },
//     {
//       icon: Clock,
//       title: "No Time Limit",
//       description:
//         "Record for as long as you need. There's no cap on recording duration — it's your machine, your rules.",
//     },
//     {
//       icon: Video,
//       title: "HD Quality",
//       description:
//         "Frameful captures at your screen's native resolution. Exports are rendered at crisp 1280×720 (16:9).",
//     },
//   ];

//   return (
//     <section className="py-20 md:py-28 bg-muted/30">
//       <div className="mx-auto max-w-5xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <p
//             className="text-sm font-medium tracking-wide uppercase"
//             style={{ color: "#d946ef" }}
//           >
//             What you get today
//           </p>
//           <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
//             Everything you need to record & share.
//           </h2>
//           <p className="mt-4 text-muted-foreground">
//             All features work right now, right in your browser. No installs, no
//             accounts, no cloud.
//           </p>
//         </div>

//         <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature, i) => (
//             <div
//               key={i}
//               className="group border border-border/60 bg-card p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8b5cf6]/5"
//             >
//               <div
//                 className="mb-4 inline-flex h-10 w-10 items-center justify-center transition-colors duration-200"
//                 style={{
//                   background: `linear-gradient(135deg, rgba(139, 92, 246, ${0.08 + i * 0.02}) 0%, rgba(217, 70, 239, ${0.08 + i * 0.02}) 100%)`,
//                   color: "#8b5cf6",
//                 }}
//               >
//                 <feature.icon className="h-5 w-5" />
//               </div>
//               <h3 className="text-base font-semibold">{feature.title}</h3>
//               <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ──────────────── Coming Soon ──────────────── */
function ComingSoonSection() {
  const upcoming = [
    {
      title: "Advanced Editing",
      description:
        "Cut, split, and rearrange clips right inside the studio. Add transitions between segments and fine-tune your video without leaving the browser.",
      status: "In Development",
    },
    {
      title: "Auto Zoom-In on Click",
      description:
        "A browser extension that tracks your clicks during recording and automatically adds smooth scale-in (zoom) effects at each click point. Focus exactly where it matters.",
      status: "Planned",
    },
    {
      title: "Frameful Extension",
      description:
        "Install a lightweight browser extension to capture click events, annotate recordings, and trigger Frameful directly from any tab with a single shortcut.",
      status: "Planned",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-sm font-medium tracking-wide uppercase"
            style={{ color: "#a855f7" }}
          >
            Coming Soon
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            What's next for Frameful.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We're actively building these features. Join the waitlist to get
            early access.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {upcoming.map((item, i) => (
            <div
              key={i}
              className="group relative border border-dashed border-border bg-card/50 p-6 rounded-xl transition-all duration-300 hover:border-[#8b5cf6]/40 hover:bg-card"
            >
              {/* Status badge */}
              <div
                className="mb-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase"
                style={{
                  background:
                    item.status === "In Development"
                      ? "rgba(139, 92, 246, 0.1)"
                      : "rgba(217, 70, 239, 0.1)",
                  color:
                    item.status === "In Development" ? "#8b5cf6" : "#d946ef",
                }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse"
                  style={{
                    backgroundColor:
                      item.status === "In Development" ? "#8b5cf6" : "#d946ef",
                  }}
                />
                {item.status}
              </div>

              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Waitlist ──────────────── */
function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Waitlist signup:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-2xl px-8 py-16 text-center text-white md:px-16"
          style={{
            background:
              "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(167, 78, 243) 40%, rgb(217, 70, 239) 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -top-20 -left-20 h-60 w-60 bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 bg-white/5 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-white/3 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Mail className="h-3.5 w-3.5" />
              Join the waitlist
            </div>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Be first to try new features.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
              Auto zoom-in, advanced editing, and the browser extension are
              coming soon. Drop your email and we'll let you know when they're
              ready.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 rounded-md bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 backdrop-blur-sm border border-white/20 outline-none focus:border-white/40 focus:bg-white/15 transition-colors"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="gap-2 bg-white px-8 text-sm font-semibold shadow-lg hover:bg-white/90"
                  style={{ color: "#7c3aed" }}
                >
                  Notify me
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="mx-auto mt-8 max-w-md animate-fade-up">
                <div className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-4 text-sm font-medium backdrop-blur-sm border border-white/20">
                  <Sparkles className="h-4 w-4" />
                  You're on the list! We'll reach out soon.
                </div>
              </div>
            )}

            <p className="mt-4 text-sm text-white/50">
              No spam. We'll only email you about new features.
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
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{
                background:
                  "linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(217, 70, 239) 100%)",
              }}
            >
              <Layers className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              frameful
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              to="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
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
