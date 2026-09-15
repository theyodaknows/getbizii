import { getAllServices } from "@/data/services";
import { AuroraBackground } from "@/components/aurora/AuroraBackground";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CreditCopilotSection } from "@/components/home/CreditCopilotSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingTiersSection } from "@/components/home/PricingTiersSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  const services = getAllServices();

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Fixed full-page aurora — behind everything */}
      <div className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <AuroraBackground
          colorStops={["#475569", "#64748b", "#475569"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* All page content above the aurora */}
      <div className="relative z-10">
        <HeroSection />
        <TrustBar />
        <ServicesSection services={services} />
        <CreditCopilotSection />
        <HowItWorks />
        <Testimonials />
        <PricingTiersSection />
        <ContactSection />
      </div>
    </div>
  );
}
