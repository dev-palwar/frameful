import {
  ComingSoonSection,
  HowItWorksSection,
  WaitlistSection,
} from "@/components/landing";
import Hero from "@/components/landing/Hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <HowItWorksSection />
        <ComingSoonSection />
        <WaitlistSection />
      </main>
    </div>
  );
}
