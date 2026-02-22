import { LucideGithub } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const params = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      style={{
        display:
          params.pathname == "/record" || params.pathname == "/privacy"
            ? "none"
            : "block",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2.5"
        >
          <div className="relative inline-block">
            <p
              className="text-2xl font-bold bg-purple-700 text-white px-4 py-1.5 inline-block tracking-tight shadow-lg hover:shadow-xl transition-shadow"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
              }}
            >
              FrameFul
            </p>
            {/* v1 badge */}
            <span
              className="absolute -top-2 -right-2 flex items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase ring-1 ring-white/20 shadow-md"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #e879f9 100%)",
                color: "#fff",
                textShadow: "0 0 6px rgba(232,121,249,0.8)",
                boxShadow: "0 0 8px rgba(167,139,250,0.5)",
              }}
            >
              v1
            </span>
          </div>
        </div>
        <a
          href="https://github.com/dev-palwar/frameful"
          target="_blank"
          className="cursor-pointer"
        >
          <LucideGithub />
        </a>
      </div>
    </nav>
  );
};

export default Header;
