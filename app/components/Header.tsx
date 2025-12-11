import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="border-b border-primary-900 px-4 sm:px-8 py-4 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
