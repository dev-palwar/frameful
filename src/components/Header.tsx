import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <div className="h-16 px-4 flex justify-between items-center w-full backdrop-blur-md z-10">
      <p className="text-2xl font-bold bg-purple-700 text-white px-4 py-1.5 inline-block tracking-tight shadow-lg hover:shadow-xl transition-shadow">
        FrameFul
      </p>
      <ThemeToggle />
    </div>
  );
};

export default Header;
