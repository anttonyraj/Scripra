import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact Us | Scripra",
  description: "Get in touch with the Scripra team for sales, support, or partnership inquiries via Resend.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16 bg-canvas">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
