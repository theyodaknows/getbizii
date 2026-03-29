import { Solution } from "@/types";

export const SOLUTIONS: Solution[] = [
  {
    slug: "erp-systems",
    name: "ERP Systems",
    tag: "Enterprise",
    price: "$50K - $250K",
    status: "active",
    description: "Integrated business management solutions for large-scale operations",
    features: [
      "Real-time inventory management",
      "Financial automation",
      "Supply chain optimization",
      "Multi-branch support",
      "Compliance reporting",
    ],
    heroImage: "src/images/solutions/erp-systems.webp",
  },
  {
    slug: "crm-solutions",
    name: "CRM Solutions",
    tag: "Sales & Marketing",
    price: "$10K - $50K",
    status: "active",
    description: "Customer relationship management platforms for sales and marketing teams",
    features: [
      "Customer pipeline tracking",
      "Email integration",
      "Automated workflows",
      "Analytics dashboard",
      "Mobile app access",
    ],
    heroImage: "src/images/solutions/crm-solutions.webp",
  },
  {
    slug: "business-intelligence",
    name: "Business Intelligence",
    tag: "Analytics",
    price: "$30K - $150K",
    status: "active",
    description: "Data analytics and visualization platforms for data-driven decisions",
    features: [
      "Real-time dashboards",
      "Predictive analytics",
      "Custom reporting",
      "Data warehouse integration",
      "Advanced visualizations",
    ],
    heroImage: "src/images/solutions/business-intelligence.webp",
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud Infrastructure",
    tag: "Infrastructure",
    price: "$20K - $100K",
    status: "active",
    description: "Scalable cloud platforms for modern application deployment and management",
    features: [
      "Auto-scaling capabilities",
      "Multi-region deployment",
      "Security hardening",
      "Cost optimization",
      "24/7 monitoring",
    ],
    heroImage: "src/images/solutions/cloud-infrastructure.webp",
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    tag: "Innovation",
    price: "$75K - $300K",
    status: "waitlist",
    description: "Custom AI/ML solutions for predictive analytics and process automation",
    features: [
      "Model training and optimization",
      "Natural language processing",
      "Computer vision solutions",
      "Predictive forecasting",
      "Custom algorithm development",
    ],
    heroImage: "src/images/solutions/ai-machine-learning.webp",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

export function getActiveSolutions(): Solution[] {
  return SOLUTIONS.filter((solution) => solution.status === "active");
}
