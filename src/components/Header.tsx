import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2.5"
        >
          <p className="text-2xl font-bold bg-purple-700 text-white px-4 py-1.5 inline-block tracking-tight shadow-lg hover:shadow-xl transition-shadow">
            FrameFul
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
