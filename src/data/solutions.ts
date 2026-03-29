import { Solution } from "@/types";

export const SOLUTIONS: Solution[] = [
  {
    slug: "erp-systems",
    name: "ERP Systems",
    tag: "Enterprise",
    price: "$50K - $250K",
    status: "active",
    description:
      "Integrated business management solutions for large-scale operations that unify finance, HR, supply chain, and manufacturing into a single platform. Our ERP implementations eliminate data silos and provide real-time visibility across every department. We configure, customize, and deploy systems that scale with your organization as it grows.",
    features: [
      "Real-time inventory management",
      "Financial automation",
      "Supply chain optimization",
      "Multi-branch support",
      "Compliance reporting",
    ],
    heroImage: "/images/solutions/erp-systems.webp",
  },
  {
    slug: "crm-solutions",
    name: "CRM Solutions",
    tag: "Sales & Marketing",
    price: "$10K - $50K",
    status: "active",
    description:
      "Customer relationship management platforms built for sales and marketing teams that need a complete view of every prospect and client interaction. We tailor CRM workflows to match your sales process, so your team spends less time on administration and more time closing deals. Seamless integrations with email, calendars, and marketing tools keep your pipeline moving.",
    features: [
      "Customer pipeline tracking",
      "Email integration",
      "Automated workflows",
      "Analytics dashboard",
      "Mobile app access",
    ],
    heroImage: "/images/solutions/crm-solutions.webp",
  },
  {
    slug: "business-intelligence",
    name: "Business Intelligence",
    tag: "Analytics",
    price: "$30K - $150K",
    status: "active",
    description:
      "Data analytics and visualization platforms that transform raw business data into actionable intelligence for faster, more confident decisions. We design custom dashboards that surface the KPIs that matter most to your leadership team, updated in real time. Predictive models and trend analysis help you anticipate market shifts before they impact revenue.",
    features: [
      "Real-time dashboards",
      "Predictive analytics",
      "Custom reporting",
      "Data warehouse integration",
      "Advanced visualizations",
    ],
    heroImage: "/images/solutions/business-intelligence.webp",
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud Infrastructure",
    tag: "Infrastructure",
    price: "$20K - $100K",
    status: "active",
    description:
      "Scalable cloud platforms engineered for modern application deployment, high availability, and operational cost control across any major cloud provider. We architect environments that auto-scale under demand spikes and shrink during quiet periods, keeping your spend aligned with actual usage. End-to-end security hardening and 24/7 monitoring ensure your workloads stay protected and performant.",
    features: [
      "Auto-scaling capabilities",
      "Multi-region deployment",
      "Security hardening",
      "Cost optimization",
      "24/7 monitoring",
    ],
    heroImage: "/images/solutions/cloud-infrastructure.webp",
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    tag: "Innovation",
    price: "$75K - $300K",
    status: "waitlist",
    description:
      "Custom AI and machine learning solutions that embed predictive intelligence and process automation directly into your existing business workflows. Our data scientists collaborate with your team to identify high-value use cases, then build, train, and deploy models tuned to your specific data and goals. From natural language processing to computer vision, we deliver production-ready systems that generate measurable ROI.",
    features: [
      "Model training and optimization",
      "Natural language processing",
      "Computer vision solutions",
      "Predictive forecasting",
      "Custom algorithm development",
    ],
    heroImage: "/images/solutions/ai-machine-learning.webp",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}

export function getActiveSolutions(): Solution[] {
  return SOLUTIONS.filter((solution) => solution.status === "active");
}
