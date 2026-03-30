export interface Solution {
  slug: string;
  name: string;
  tag: string;
  price: string;
  status: "active" | "waitlist";
  shortDescription: string;
  features: string[];
  rightForYou?: string[];
  financingNote?: string;
}

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
  solution?: string;
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
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
}
