import { COMING_SOON_CONFIG } from "@/configs/landing.config";

export default function ComingSoonSection() {
  const { sectionLabel, headline, subtext, items, statusColors } =
    COMING_SOON_CONFIG;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-sm font-medium tracking-wide uppercase"
            style={{ color: "#a855f7" }}
          >
            {sectionLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-muted-foreground">{subtext}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const { bg, text } = statusColors[item.status];
            return (
              <div
                key={i}
                className="group relative rounded-xl border border-dashed border-border bg-card/50 p-6 transition-all duration-300 hover:border-[#8b5cf6]/40 hover:bg-card"
              >
                {/* Status badge */}
                <div
                  className="mb-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase"
                  style={{ background: bg, color: text }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: text }}
                  />
                  {item.status}
                </div>

                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
