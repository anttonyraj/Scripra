import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas/80 backdrop-blur-md border-b border-line">
      <div className="max-w-[1080px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/product" className="text-[13.5px] font-medium text-ink-2 hover:text-ink transition-colors">
              Product
            </Link>
            <Link href="/how-it-works" className="text-[13.5px] font-medium text-ink-2 hover:text-ink transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-[13.5px] font-medium text-ink-2 hover:text-ink transition-colors">
              Pricing
            </Link>
            <Link href="/company" className="text-[13.5px] font-medium text-ink-2 hover:text-ink transition-colors">
              Company
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            href="/demo"
            className="hidden md:inline-flex items-center justify-center text-[13.5px] font-semibold px-[20px] py-[10px] rounded-[8px] bg-indigo text-white hover:bg-[#6E6FF5] transition-all hover:-translate-y-[1px]"
          >
            Try the demo
          </Link>
        </div>
      </div>
    </header>
  );
}
