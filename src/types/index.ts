export interface Pillar {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  businessType: string;
  rating: number;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: ServiceFeature[];
  icon: string;
  price: number;              // USD
  priceType: "one-time" | "monthly";
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
}

export interface PricingTier {
  slug: string;
  name: string;
  priceLabel: string;       // placeholder, e.g. "Starting at $199/mo"
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;    // "Most Popular" styling
}
