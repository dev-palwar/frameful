import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Frameful
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p
            className="mb-3 text-sm font-medium uppercase tracking-wide"
            style={{ color: "#8b5cf6" }}
          >
            Legal
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground">
            Last updated: February 2026
          </p>
        </div>

        {/* TL;DR callout */}
        <div
          className="mb-12 rounded-xl border p-6"
          style={{
            borderColor: "rgba(139, 92, 246, 0.25)",
            background: "rgba(139, 92, 246, 0.04)",
          }}
        >
          <p
            className="mb-1 text-sm font-semibold uppercase tracking-wide"
            style={{ color: "#8b5cf6" }}
          >
            The short version
          </p>
          <p className="text-base leading-relaxed text-foreground">
            Frameful runs entirely in your browser. We do not collect, store, or
            transmit your recordings, screen data, or any personal information.
            Your videos never leave your device.
          </p>
        </div>

        {/* Body sections */}
        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <Section title="1. What Frameful does">
            Frameful is a client-side web application. When you record your
            screen, the video stream is captured and processed entirely inside
            your browser using standard Web APIs (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              MediaRecorder
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              Canvas
            </code>
            ). No data is sent to any server at any point.
          </Section>

          <Section title="2. Data we collect">
            <strong className="font-semibold text-foreground">None.</strong> We
            do not collect:
            <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
              <li>Screen recordings or video content</li>
              <li>Cursor positions or click events</li>
              <li>Identifiers such as names, emails, or IP addresses</li>
              <li>Usage analytics or telemetry</li>
              <li>Cookies (we set none)</li>
            </ul>
          </Section>

          <Section title="3. Waitlist emails">
            If you choose to join our waitlist, you voluntarily provide your
            email address. This email is used solely to notify you about new
            Frameful features. We will never sell, share, or use it for any
            other purpose. You can ask to be removed at any time by emailing us.
          </Section>

          <Section title="4. Third-party services">
            Frameful loads fonts from Google Fonts via a standard{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              link
            </code>{" "}
            tag, which may cause your browser to make a request to Google's
            servers. This is the only external network request the page makes.
            Please refer to Google's Privacy Policy for details on how they
            handle font-serving requests.
          </Section>

          <Section title="5. Local storage">
            Frameful does not use{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              localStorage
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              sessionStorage
            </code>
            , or IndexedDB to persist any data between sessions. Recordings
            exist only in memory and are discarded when you close or navigate
            away from the tab.
          </Section>

          <Section title="6. Children's privacy">
            Frameful is not directed at children under 13 and we do not
            knowingly collect information from anyone under 13.
          </Section>

          <Section title="7. Changes to this policy">
            We may update this policy as Frameful evolves. Any changes will be
            reflected here with an updated date at the top. We encourage you to
            review this page periodically.
          </Section>

          <Section title="8. Contact">
            Questions about this policy? Reach out at{" "}
            <a
              href="mailto:privacy@frameful.app"
              className="font-medium transition-colors hover:text-foreground"
              style={{ color: "#8b5cf6" }}
            >
              privacy@frameful.app
            </a>
            .
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-foreground">{title}</h2>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
