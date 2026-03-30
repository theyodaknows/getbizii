import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/data/services";
import {
  ServiceHero,
  ServiceFeatures,
  ServiceCTA,
  RelatedServices,
} from "@/components/services";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceHero service={service} breadcrumbs={BREADCRUMBS} />
      <ServiceFeatures features={service.features} />
      <ServiceCTA ctaLabel={service.ctaLabel} ctaHref={service.ctaHref} />
      <RelatedServices currentSlug={slug} count={3} />
    </>
  );
}
