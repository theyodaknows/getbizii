import type { Solution } from "@/types";

export const SOLUTIONS: Solution[] = [
  {
    slug: "mobile-dna-livescanning",
    name: "Mobile DNA & Livescanning",
    tag: "Biometric Tech",
    price: "$12,500",
    status: "active",
    shortDescription: "A complete biometric services business — mobile DNA collection, livescan fingerprinting, and background check portal — deployed and ready to operate.",
    features: [
      "Appointment booking system with client portal",
      "Mobile-optimized intake forms and waivers",
      "HIPAA-compliant document storage",
      "Automated confirmation and reminder emails",
      "Results delivery portal for clients",
      "Business dashboard with revenue tracking",
      "Branded mobile site for field technicians",
    ],
    financingNote: "Financing available — split your investment into manageable monthly payments.",
    rightForYou: [
      "You offer or want to offer DNA collection, livescan, or background checks",
      "You're scheduling appointments manually or via phone",
      "You need HIPAA-compliant document and results delivery",
      "You want a client portal and automated reminders",
    ],
  },
  {
    slug: "party-rental",
    name: "Party Rental",
    tag: "Event Tech",
    price: "$15,000",
    status: "active",
    shortDescription: "A full-featured party and event rental platform with online inventory browsing, booking, availability management, and delivery scheduling.",
    features: [
      "Online rental catalog with photos and pricing",
      "Real-time availability calendar",
      "Online booking and deposit collection",
      "Delivery scheduling and route management",
      "Damage waiver and contract e-signatures",
      "Client account portal with booking history",
      "Automated upsell and bundle recommendations",
    ],
    financingNote: "Financing available — split your investment into manageable monthly payments.",
    rightForYou: [
      "You rent party equipment, tents, bounce houses, or event gear",
      "You're managing bookings and availability by phone or spreadsheet",
      "You want to automate deposits, contracts, and delivery scheduling",
      "You're ready to grow beyond word-of-mouth referrals",
    ],
  },
  {
    slug: "print-reseller",
    name: "Print Reseller",
    tag: "E-Commerce",
    price: "$7,500",
    status: "active",
    shortDescription: "A branded print-on-demand e-commerce storefront with product customization, order management, and supplier integration.",
    features: [
      "Branded storefront with product categories",
      "Custom artwork upload and preview tool",
      "Automated order routing to print suppliers",
      "Order tracking portal for customers",
      "Bulk order discounts and quote system",
      "Reseller margin control dashboard",
      "Email marketing integration for repeat buyers",
    ],
    financingNote: "Financing available — split your investment into manageable monthly payments.",
    rightForYou: [
      "You resell printed products (cards, banners, apparel, signage)",
      "You want a branded storefront without managing inventory",
      "You're routing orders to print suppliers manually",
      "You want to control margins and offer bulk pricing",
    ],
  },
  {
    slug: "mobile-detailing",
    name: "Mobile Detailing",
    tag: "Service Tech",
    price: "$9,800",
    status: "active",
    shortDescription: "A complete mobile auto detailing operation with online booking, service packages, before/after photo delivery, and customer review collection.",
    features: [
      "Online booking with service package selection",
      "GPS-enabled technician scheduling",
      "Before/after photo delivery via client portal",
      "Automated review request sequences",
      "Upsell add-ons at checkout",
      "Fleet account management for B2B clients",
      "Mobile payment processing on-site",
    ],
    financingNote: "Financing available — split your investment into manageable monthly payments.",
    rightForYou: [
      "You offer mobile or on-site auto detailing services",
      "You're scheduling jobs via text, calls, or social media",
      "You want to automate review requests and upsells",
      "You're ready to take on fleet or B2B clients",
    ],
  },
  {
    slug: "plumber",
    name: "Plumber",
    tag: "Field Service Tech",
    price: "$18,500",
    status: "active",
    shortDescription: "A professional plumbing business platform with job dispatching, estimate generation, invoice management, and customer communication automation.",
    features: [
      "Service request intake and job scheduling",
      "Automated estimate and proposal builder",
      "Technician dispatch and GPS tracking",
      "Digital invoice and payment collection",
      "Warranty tracking per job",
      "Customer communication portal",
      "Recurring maintenance plan management",
      "Integration with plumbing supply catalogs",
    ],
    financingNote: "Financing available — split your investment into manageable monthly payments.",
    rightForYou: [
      "You run a plumbing business with one or more technicians",
      "You're managing job requests, estimates, and invoices manually",
      "You want GPS dispatch and digital payment collection in the field",
      "You're ready to offer recurring maintenance plans",
    ],
  },
  {
    slug: "mini-apparel-shop",
    name: "Mini Apparel Shop",
    tag: "Fashion Tech",
    price: "$14,000",
    status: "active",
    shortDescription: "A complete fashion e-commerce brand launch — storefront, lookbook, size guide, inventory management, and influencer affiliate tools.",
    features: [
      "Branded storefront with lookbook gallery",
      "Size guide and fit recommendation tool",
      "Inventory and variant management",
      "Discount codes and promotional pricing",
      "Influencer affiliate tracking portal",
      "Email drip campaigns for abandoned carts",
      "Instagram shop integration",
    ],
    financingNote: "Financing available — split your investment into manageable monthly payments.",
    rightForYou: [
      "You're launching or growing a fashion or apparel brand",
      "You want an online storefront with a lookbook and size guide",
      "You're ready to run promotions and an affiliate program",
      "You want Instagram shop integration from day one",
    ],
  },
  {
    slug: "custom-jewelry",
    name: "Custom Jewelry",
    tag: "Luxury Tech",
    price: "$22,000",
    status: "active",
    shortDescription: "A luxury custom jewelry brand platform with design consultation booking, gemstone customization visualization, certificate of authenticity delivery, and white-glove client management.",
    features: [
      "Custom order intake with design brief form",
      "Gemstone and metal options configurator",
      "Design preview and approval workflow",
      "Certificate of authenticity generation",
      "White-glove client communication portal",
      "Layaway and financing plan management",
      "Referral program for existing clients",
      "Social proof gallery with client photos",
    ],
    financingNote: "Financing available — split your investment into manageable monthly payments.",
    rightForYou: [
      "You create custom or bespoke jewelry on commission",
      "You want to streamline design consultations and approvals",
      "You need certificate of authenticity and layaway management",
      "You work with high-value clients who expect white-glove service",
    ],
  },
  {
    slug: "kurbside",
    name: "Kurbside",
    tag: "Coming Soon",
    price: "TBD",
    status: "waitlist",
    shortDescription: "A next-generation curbside and mobile commerce platform. Join the waitlist to be first in line.",
    features: [
      "Mobile-first storefront for curbside pickup",
      "Real-time order status notifications",
      "QR code order scanning",
      "Loyalty program integration",
      "Fleet management for delivery drivers",
      "Analytics dashboard for location performance",
    ],
  },
];

export function getAllSolutions(): Solution[] {
  return SOLUTIONS;
}

export function getActiveSolutions(): Solution[] {
  return SOLUTIONS.filter((s) => s.status === "active");
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getRelatedSolutions(currentSlug: string, count = 3): Solution[] {
  return SOLUTIONS.filter(
    (s) => s.status === "active" && s.slug !== currentSlug
  ).slice(0, count);
}
