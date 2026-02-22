import { GithubIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const params = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      style={{ display: params.pathname == "/record" ? "none" : "block" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2.5"
        >
          <p
            className="text-2xl font-bold bg-purple-700 text-white px-4 py-1.5 inline-block tracking-tight shadow-lg hover:shadow-xl transition-shadow"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
            }}
          >
            FrameFul
          </p>
        </div>
        <div className="p-2 rounded-full bg-chart-1 text-white hover:bg-gray-200 cursor-pointer">
          <GithubIcon />
        </div>
      </div>
    </nav>
  );
};

export default Header;
