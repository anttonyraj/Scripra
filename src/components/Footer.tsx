import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0B0D14] border-t border-white/10 pt-24">
      <div className="max-w-[1080px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Logo variant="inverse" showTagline={false} />
            <p className="mt-4 text-[13px] text-white/50">AI Conversation Intelligence</p>
          </div>
          
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/product" className="text-[13.5px] text-white/70 hover:text-white">Overview</Link></li>
              <li><Link href="/how-it-works" className="text-[13.5px] text-white/70 hover:text-white">How it Works</Link></li>
              <li><Link href="/demo" className="text-[13.5px] text-white/70 hover:text-white">Live Demo</Link></li>
              <li><Link href="/pricing" className="text-[13.5px] text-white/70 hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/product" className="text-[13.5px] text-white/70 hover:text-white">Product Suite</Link></li>
              <li><Link href="/#integrations" className="text-[13.5px] text-white/70 hover:text-white">Integrations</Link></li>
              <li><Link href="/security" className="text-[13.5px] text-white/70 hover:text-white">Security &amp; Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="https://aiworkx.com" target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-white/70 hover:text-white">AIworkX</a></li>
              <li><Link href="/investors" className="text-[13.5px] text-white/70 hover:text-white">Investors &amp; Strategy</Link></li>
              <li><Link href="/contact" className="text-[13.5px] text-white/70 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-[13.5px] text-white/70 hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="text-[13.5px] text-white/70 hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/50">
            Scripra — a product of <a href="https://aiworkx.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-indigo-400">AIworkX</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
