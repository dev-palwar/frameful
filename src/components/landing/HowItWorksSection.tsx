import { HOW_IT_WORKS_CONFIG } from "@/configs/landing.config";

export default function HowItWorksSection() {
  const { sectionLabel, headline, subtext, steps } = HOW_IT_WORKS_CONFIG;

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-sm font-medium tracking-wide uppercase"
            style={{ color: "#8b5cf6" }}
          >
            {sectionLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-muted-foreground">{subtext}</p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting gradient line */}
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
              {/* Icon */}
              <div
                className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-colors duration-200"
                style={{
                  backgroundColor: step.bgColor,
                  color: step.color,
                }}
              >
                <step.icon className="h-6 w-6" />
              </div>

              <div
                className="mb-2 font-mono text-xs font-semibold tracking-widest"
                style={{ color: step.color }}
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
