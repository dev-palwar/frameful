import { Link } from "react-router";
import { FOOTER_CONFIG } from "@/configs/landing.config";

export default function Footer() {
  const { brandName, copyright, links } = FOOTER_CONFIG;

  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            {/* <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ background: GRADIENT }}
            >
              <Layers className="h-3.5 w-3.5 text-white" />
            </div> */}
            <span className="bg-chart-1 text-white px-4 py-1 capitalize text-sm font-semibold tracking-tight">
              {brandName}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {links.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
