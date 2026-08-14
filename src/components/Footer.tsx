import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-[1080px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Logo variant="primary" />
            <p className="mt-4 text-[13px] text-ink-3">AI Conversation Intelligence</p>
          </div>
          
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-ink-3 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/product" className="text-[13.5px] text-ink-2 hover:text-ink">Overview</Link></li>
              <li><Link href="/how-it-works" className="text-[13.5px] text-ink-2 hover:text-ink">How it Works</Link></li>
              <li><Link href="/demo" className="text-[13.5px] text-ink-2 hover:text-ink">Live Demo</Link></li>
              <li><Link href="/pricing" className="text-[13.5px] text-ink-2 hover:text-ink">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-ink-3 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/product" className="text-[13.5px] text-ink-2 hover:text-ink">Memory &amp; Context</Link></li>
              <li><Link href="/#integrations" className="text-[13.5px] text-ink-2 hover:text-ink">Integrations</Link></li>
              <li><Link href="/security" className="text-[13.5px] text-ink-2 hover:text-ink">Security &amp; Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-ink-3 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="https://aiworkx.com" target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-ink-2 hover:text-ink">AIworkX</a></li>
              <li><Link href="/contact" className="text-[13.5px] text-ink-2 hover:text-ink">Contact</Link></li>
              <li><Link href="/privacy" className="text-[13.5px] text-ink-2 hover:text-ink">Privacy</Link></li>
              <li><Link href="/terms" className="text-[13.5px] text-ink-2 hover:text-ink">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-ink-3">
            Scripra — a product of <a href="https://aiworkx.com" target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-indigo">AIworkX</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
