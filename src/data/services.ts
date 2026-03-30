import { Service } from "@/types";

const SERVICES: Service[] = [
  {
    slug: "biz-setup",
    name: "Business Setup",
    tagline: "Launch your business with confidence",
    description:
      "Starting a business is one of the most important decisions you'll ever make, and the legal foundation you lay today shapes everything that follows. GetBizii guides entrepreneurs through every step of business formation — from selecting the right entity structure to filing with your state and securing your federal tax ID.\n\nWe work with you to evaluate whether an LLC, S-Corp, or C-Corp best aligns with your growth goals, liability tolerance, and tax strategy. Once you've chosen your structure, our team handles the paperwork: articles of organization or incorporation, registered agent designation, state filing submissions, and the IRS EIN application. You stay focused on building your business while we handle the bureaucracy.\n\nBeyond the initial filing, we set you up with an operating agreement or corporate bylaws tailored to your ownership structure, and we build a compliance calendar so you never miss an annual report, renewal deadline, or tax election. Our team stays with you after launch — available to answer questions, make amendments, and add members or shareholders as your business evolves.\n\nWhether you're a solo founder launching a consulting practice or a team of co-founders raising a first round, GetBizii delivers the expertise and speed to get you legally operational in days, not weeks.",
    features: [
      {
        icon: "Settings",
        title: "Entity Selection Guidance",
        description:
          "We analyze your goals and recommend the optimal structure — LLC, S-Corp, or C-Corp — based on liability protection, tax treatment, and long-term growth plans.",
      },
      {
        icon: "FileText",
        title: "State Filing & Registration",
        description:
          "We prepare and submit all formation documents to your state, including articles of organization or incorporation, and confirm your entity is in good standing.",
      },
      {
        icon: "CreditCard",
        title: "EIN Acquisition",
        description:
          "We secure your Federal Employer Identification Number from the IRS so you can open business bank accounts, hire employees, and file taxes under your business name.",
      },
      {
        icon: "Shield",
        title: "Registered Agent Services",
        description:
          "We act as your registered agent, receiving official state correspondence and legal notices on your behalf and forwarding them to you promptly.",
      },
      {
        icon: "ClipboardList",
        title: "Operating Agreements & Bylaws",
        description:
          "We draft customized operating agreements for LLCs and corporate bylaws for corporations that define ownership, decision-making authority, and member rights.",
      },
      {
        icon: "CalendarCheck",
        title: "Compliance Calendar",
        description:
          "We build a tailored calendar of annual reports, tax deadlines, and renewal dates so your entity stays in good standing year after year.",
      },
    ],
    icon: "Building2",
    ctaLabel: "Get Started",
    ctaHref: "/contact?service=biz-setup",
    metaTitle: "Business Formation & Entity Setup | GetBizii",
    metaDescription:
      "Launch your LLC, S-Corp, or C-Corp with expert guidance. GetBizii handles state filings, EIN acquisition, operating agreements, and compliance so you can focus on growing your business.",
  },
  {
    slug: "bookkeeping",
    name: "Bookkeeping",
    tagline: "Keep your finances organized and audit-ready",
    description:
      "Accurate books are the heartbeat of a healthy business. Without clean financial records, you're flying blind — unable to spot cash flow problems, optimize spending, or prepare for tax season without a scramble. GetBizii's bookkeeping service gives you real-time financial clarity so you always know exactly where your business stands.\n\nEvery month our team reconciles your bank and credit card accounts, categorizes transactions using your chart of accounts, and delivers a complete set of financial statements: profit and loss, balance sheet, and cash flow statement. You get a clear picture of revenue, expenses, and margins — and we flag anything that looks unusual before it becomes a problem.\n\nWe integrate directly with your payroll provider, payment processors, and expense platforms to automate data flow and eliminate manual entry errors. Whether you're on QuickBooks, Xero, or another platform, we work within your existing tools or help you migrate to the right one.\n\nAt tax time, your books are already clean and categorized — no last-minute document hunts or emergency reconciliations. We prepare a tax-ready package your CPA or our in-house team can use immediately. For growing businesses, our bookkeeping feeds directly into monthly management reports with commentary so stakeholders can make informed decisions without digging through spreadsheets.",
    features: [
      {
        icon: "BarChart3",
        title: "Monthly Bank Reconciliation",
        description:
          "We reconcile all bank and credit card accounts monthly, catching discrepancies early and ensuring your records always match your actual account balances.",
      },
      {
        icon: "Tag",
        title: "Transaction Categorization",
        description:
          "Every income and expense transaction is accurately categorized to your chart of accounts, giving you clean data for reporting, budgeting, and tax preparation.",
      },
      {
        icon: "TrendingUp",
        title: "Financial Statement Preparation",
        description:
          "We deliver monthly profit and loss statements, balance sheets, and cash flow statements so you have a complete picture of your financial position.",
      },
      {
        icon: "ArrowLeftRight",
        title: "Accounts Payable & Receivable",
        description:
          "We track what you owe and what you're owed, helping you manage vendor payments and follow up on outstanding invoices to keep cash flow healthy.",
      },
      {
        icon: "Users",
        title: "Payroll Integration",
        description:
          "We sync with your payroll provider to ensure wages, taxes, and benefit deductions are properly recorded in your books without manual re-entry.",
      },
      {
        icon: "CheckCircle2",
        title: "Tax-Ready Records",
        description:
          "Your books are maintained year-round in a tax-ready state, so filing season requires no emergency cleanup — just hand off clean financials and move on.",
      },
    ],
    icon: "BookOpen",
    ctaLabel: "Start Bookkeeping",
    ctaHref: "/contact?service=bookkeeping",
    metaTitle: "Professional Bookkeeping Services for Small Business | GetBizii",
    metaDescription:
      "Stay audit-ready with monthly reconciliation, financial statements, and tax-ready books. GetBizii's bookkeeping service keeps your finances accurate and organized all year long.",
  },
  {
    slug: "cpa",
    name: "CPA Services",
    tagline: "Strategic tax planning and compliance",
    description:
      "Most business owners pay far more in taxes than they need to — not because of bad luck, but because they lack a proactive tax strategy. GetBizii's CPA services go well beyond compliance. We are your year-round strategic partner, working with you to minimize your tax burden, plan for growth, and navigate the complexity of business taxation.\n\nWe start every engagement with a comprehensive review of your current entity structure, income profile, and deduction landscape. From there we build a forward-looking tax plan that identifies opportunities to reduce taxable income through legitimate strategies: retirement plan contributions, timing of income and expenses, depreciation elections, home office deductions, vehicle use, and more. We model multiple scenarios so you can make decisions with a clear view of the tax consequences.\n\nThroughout the year we calculate and track quarterly estimated tax payments so you're never caught short at year-end. If your business operates in multiple states, we manage multi-state apportionment, nexus analysis, and filings across every jurisdiction where you have obligations. When correspondence arrives from the IRS or a state agency, we handle the response — protecting you from unnecessary penalties and resolving issues quickly.\n\nAt tax time, we prepare your business and personal returns with meticulous attention to detail, ensuring every legitimate deduction is captured. And if your business needs audit representation, our CPAs stand with you every step of the way.",
    features: [
      {
        icon: "Lightbulb",
        title: "Tax Strategy Planning",
        description:
          "We build a customized annual tax plan that identifies legal strategies to reduce your tax liability — reviewing your entity, income structure, and available deductions.",
      },
      {
        icon: "CalendarDays",
        title: "Quarterly Estimated Taxes",
        description:
          "We calculate your quarterly estimated payments to keep you compliant and avoid underpayment penalties, adjusting projections as your income changes throughout the year.",
      },
      {
        icon: "Building2",
        title: "Entity Structure Optimization",
        description:
          "We evaluate whether your current entity election — sole proprietor, LLC, S-Corp, or C-Corp — is still the most tax-efficient choice as your revenue and circumstances evolve.",
      },
      {
        icon: "DollarSign",
        title: "Deduction Maximization",
        description:
          "From retirement contributions and vehicle use to home office and depreciation elections, we ensure every legitimate deduction is documented and claimed.",
      },
      {
        icon: "AlertCircle",
        title: "IRS & State Correspondence",
        description:
          "We handle all IRS notices and state agency inquiries on your behalf, providing professional responses that resolve issues efficiently and protect you from avoidable penalties.",
      },
      {
        icon: "Globe",
        title: "Multi-State Compliance",
        description:
          "If you operate across state lines, we manage nexus analysis, apportionment calculations, and filings in every state where your business has tax obligations.",
      },
    ],
    icon: "Calculator",
    ctaLabel: "Schedule Consultation",
    ctaHref: "/contact?service=cpa",
    metaTitle: "CPA Tax Planning & Compliance for Small Business | GetBizii",
    metaDescription:
      "Stop overpaying taxes. GetBizii's CPA services deliver proactive tax strategy, quarterly planning, deduction maximization, and IRS representation for small business owners.",
  },
  {
    slug: "legal",
    name: "Legal Services",
    tagline: "Protect your business with experienced legal guidance",
    description:
      "Every business faces legal risk — in contracts, employment relationships, intellectual property, and day-to-day operations. The difference between businesses that thrive and those that face costly disputes often comes down to having the right legal protections in place from the start. GetBizii's legal services give you access to experienced business attorneys who understand the realities of running a small and mid-size company.\n\nWe draft and review the contracts that govern your business relationships: client service agreements, vendor contracts, non-disclosure agreements, and partnership arrangements. Our attorneys ensure your agreements clearly define scope, payment terms, liability limits, and dispute resolution procedures — closing the gaps that lead to misunderstandings and litigation.\n\nFor growing teams, we prepare employment agreements, independent contractor arrangements, and offer letters that protect your business and set clear expectations. We advise on non-compete enforceability, wage and hour compliance, and proper worker classification to keep you on the right side of employment law.\n\nWe help founders and business owners protect their intellectual property — from trademark registration and trade secret policies to licensing agreements and IP assignment clauses in employment contracts. And when disputes arise, our team provides early-stage representation and negotiation to resolve conflicts quickly and cost-effectively before they escalate to litigation.",
    features: [
      {
        icon: "FileText",
        title: "Contract Drafting & Review",
        description:
          "We draft and review client agreements, vendor contracts, and NDAs to ensure your interests are protected, terms are enforceable, and liability is clearly allocated.",
      },
      {
        icon: "UserCheck",
        title: "Employment Agreements",
        description:
          "We prepare employment contracts, offer letters, and independent contractor agreements that define roles, compensation, and obligations while protecting your business.",
      },
      {
        icon: "Lock",
        title: "Intellectual Property Protection",
        description:
          "We advise on trademark registration, trade secret policies, and IP assignment clauses to protect the assets that give your business its competitive edge.",
      },
      {
        icon: "Shield",
        title: "Liability Protection",
        description:
          "We review your operating structure and agreements to identify and close legal gaps that could expose you to personal or business liability.",
      },
      {
        icon: "Home",
        title: "Commercial Lease Review",
        description:
          "Before you sign a commercial lease, we review every clause — rent escalations, build-out responsibilities, termination rights, and personal guarantee provisions.",
      },
      {
        icon: "Handshake",
        title: "Partnership & Shareholder Agreements",
        description:
          "We draft and negotiate partnership agreements and shareholder arrangements that define decision-making rights, profit sharing, exit procedures, and dispute resolution.",
      },
    ],
    icon: "Briefcase",
    ctaLabel: "Consult with Legal",
    ctaHref: "/contact?service=legal",
    metaTitle: "Business Legal Services for Small Business Owners | GetBizii",
    metaDescription:
      "Protect your business with experienced legal guidance. GetBizii handles contracts, employment agreements, IP protection, and liability risk so you can operate with confidence.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServices(): Service[] {
  return SERVICES;
}

export function getRelatedServices(currentSlug: string, count = 3): Service[] {
  return SERVICES.filter((service) => service.slug !== currentSlug).slice(0, count);
}

export const services: Service[] = SERVICES;
