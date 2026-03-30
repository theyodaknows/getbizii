import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSolutions, getSolutionBySlug } from "@/data/solutions";
import {
  SolutionHero,
  SolutionFeatures,
  SolutionPricing,
  SolutionCTA,
  RelatedSolutions,
} from "@/components/solutions";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: `${solution.name} | GetBizii`,
    description: solution.shortDescription,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <main>
      <SolutionHero solution={solution} />
      <SolutionFeatures solution={solution} />
      <SolutionPricing solution={solution} />
      <SolutionCTA solution={solution} />
      <RelatedSolutions solution={solution} />
    </main>
  );
}
