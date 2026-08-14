import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Scripra",
  description: "Get in touch with the Scripra team for sales, support, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6 bg-canvas">
        <div className="max-w-[560px] mx-auto">
          <div className="bg-panel border border-line rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-[28px] font-bold text-ink tracking-tight mb-2">Get in touch</h1>
              <p className="text-[14px] text-ink-2">Have a question or looking for enterprise deployment? We'd love to help.</p>
            </div>

            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="Antony Raj"
                  className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="antony@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help your team?"
                  className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-xl bg-indigo text-white font-semibold text-[15px] hover:bg-indigo-deep transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
