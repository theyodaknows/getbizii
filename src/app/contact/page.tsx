import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact GetBizii — Start Your Business Journey",
  description:
    "Reach out to GetBizii and start building your business identity today. Our team responds within one business day.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactSection />
    </div>
  );
}
