import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <div className="h-10 px-4 flex justify-end items-center w-full backdrop-blur-md z-10 py-8">
      <ThemeToggle />
    </div>
  );
};

export default Header;
