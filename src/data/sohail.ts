import type {
  PortfolioExperience,
  PortfolioProject,
  PortfolioService,
  SkillGroup,
} from "@/types/portfolio-chat";

export const sohailProfile = {
  name: "Sohail Patel",
  title: "Software Developer",
  headline:
    "I build thoughtful web and mobile experiences that solve real-world problems.",
  summary:
    "Sohail builds React Native and Next.js interfaces that are fast, readable, and steady after launch.",
  about:
    "His work sits between interface detail and release responsibility: responsive interfaces, careful scroll behavior, production-minded architecture, and the practical platform details that make a product feel finished.",
  specialization:
    "React Native mobile apps, React and Next.js web products, release engineering, and polished product interfaces.",
  availability:
    "Available for mobile apps, web products, dashboards, and interfaces where the details matter after launch.",
  highlights: [
    "5+ years shipping products",
    "20+ mobile and web releases",
    "React Native, React, and Next.js core stack",
    "Build, test, and launch ownership",
  ],
};

export const sohailSkills: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "State design"],
  },
  {
    title: "Mobile",
    items: [
      "React Native",
      "Android",
      "iOS",
      "Release cycles",
      "Store deployment",
      "Performance tuning",
      "Native modules",
    ],
  },
  {
    title: "Motion & Polish",
    items: ["Framer Motion", "Lenis scroll", "Three.js", "Interaction pacing", "Layout animations"],
  },
  {
    title: "Backend & Services",
    items: ["Firebase", "REST API integration", "Authentication", "Push notifications", "Data handling"],
  },
  {
    title: "Tools & Deployment",
    items: ["Git", "GitHub", "Android Studio", "Xcode", "Google Play Console", "App Store Connect", "TestFlight", "CI/CD"],
  },
];

export const sohailServices: PortfolioService[] = [
  {
    id: "app-deployment",
    title: "App Deployment Services",
    description:
      "A reliable path from a signed build to a confident Android and iOS release.",
    capabilities: [
      "Google Play Console and App Store Connect",
      "Signing, certificates, and provisioning",
      "Store listings, screenshots, and assets",
      "Internal, closed, open, TestFlight, and production releases",
      "Versioning, release management, and troubleshooting",
      "Push notifications, APNs, and Firebase configuration",
    ],
  },
  {
    id: "complete-app-development",
    title: "Complete App Development",
    description:
      "Production-minded mobile apps shaped from the first product idea through launch.",
    capabilities: [
      "React Native for Android and iOS",
      "APIs, Firebase, auth, and push notifications",
      "State management and native integrations",
      "Testing, performance, deployment, and future enhancements",
    ],
  },
  {
    id: "website-development",
    title: "Website Development",
    description:
      "Modern, responsive websites and web products built to perform after launch.",
    capabilities: [
      "React.js, Next.js, TypeScript, and Tailwind CSS",
      "Responsive landing pages and business websites",
      "Admin dashboards, SaaS apps, and API integrations",
      "Performance, SEO-friendly implementation, deployment, and maintenance",
    ],
  },
  {
    id: "development-training",
    title: "Development Training",
    description:
      "Practical, project-based guidance for developers who want to ship real work.",
    capabilities: [
      "React Native, React.js, Next.js, and TypeScript",
      "Firebase, API integration, Git, and GitHub workflows",
      "Android Studio basics and app deployment",
      "Real-world architecture, debugging, and production practices",
    ],
  },
];

export const sohailExperience: PortfolioExperience[] = [
  {
    period: "Mar 2025 to present",
    duration: "Current",
    role: "React Native, React.js and Next.js Developer",
    company: "Espirits Technologies Pvt Ltd.",
    type: "Full-time",
    focus:
      "Full mobile release cycles, CI/CD ownership, mentoring, and product work across web and mobile.",
    highlights: ["Mobile release ownership", "CI/CD pipelines", "Mentoring developers"],
    skills: ["React Native", "React", "Next.js", "CI/CD"],
  },
  {
    period: "Nov 2021 to Mar 2025 - 3 yrs 5 mons",
    duration: "3 yrs 5 mons",
    role: "React Native Developer",
    company: "Revalsys Technologies Pvt Ltd.",
    type: "Full-time",
    focus:
      "End-to-end app delivery with stronger depth in debugging, performance tuning, and release discipline.",
    highlights: ["App store delivery", "Performance tuning", "Production debugging"],
    skills: ["React Native", "Redux", "Firebase", "Native modules"],
  },
  {
    period: "Jan 2021 to Nov 2021 - 11 Mon",
    duration: "11 mons",
    role: "React and React Native Developer",
    company: "Mufeed Products and Services Pvt Ltd.",
    type: "Full-time",
    focus:
      "Reusable project structure, component systems, and performance-minded implementation.",
    highlights: ["Reusable components", "Project structure", "Responsive UI"],
    skills: ["React", "React Native", "JavaScript", "UI systems"],
  },
];

export const sohailProjects: PortfolioProject[] = [
  {
    id: "opus-virtual-offices",
    title: "Opus Virtual Offices",
    description:
      "A premium business platform for addresses, live answering, and operational trust across hundreds of US locations.",
    technologies: ["Web", "React", "Next.js"],
    platform: ["Web"],
    company: "Espirits Technologies Pvt Ltd.",
    region: "United States",
    type: "Web Platform",
    metric: "650+ locations",
    projectUrl: "https://www.opusvirtualoffices.com/",
    featured: true,
  },
  {
    id: "finecart-android",
    title: "Finecart",
    description:
      "A local marketplace app connecting neighborhood stores and customers with practical delivery flows.",
    technologies: ["React Native", "Mobile", "Marketplace"],
    platform: ["Android"],
    company: "Mufeed Products and Services Pvt Ltd.",
    region: "India",
    type: "Mobile App",
    metric: "10K+ downloads",
    projectUrl: "https://play.google.com/store/apps/details?id=com.retail.center.io",
    featured: true,
  },
  {
    id: "finecart-ios",
    title: "Finecart",
    description:
      "An iOS shopping app for pincode-based ecommerce with easy checkout and payment options.",
    technologies: ["iOS", "Ecommerce", "Shopping"],
    platform: ["iOS"],
    company: "Mufeed Products and Services Pvt Ltd.",
    region: "India",
    type: "Shopping App",
    metric: "3.7 rating",
    projectUrl: "https://apps.apple.com/in/app/finecart/id6462674750",
  },
  {
    id: "hopp-company-android",
    title: "HOPP COMPANY",
    description:
      "An on-demand driver booking app for hourly personal chauffeurs, round trips, one-way trips, airport pickups, shopping, events, and night-out travel.",
    technologies: ["React Native", "Travel & Local", "Customer app"],
    platform: ["Android"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "Hyderabad, India",
    type: "Customer Booking App",
    metric: "10K+ downloads",
    projectUrl: "https://play.google.com/store/apps/details?id=com.Revalsys.warantech.HoppCustomer",
    featured: true,
  },
  {
    id: "hopp-company-ios",
    title: "HOPP COMPANY",
    description:
      "The iOS HOPP customer app for on-demand driver booking, hourly chauffeurs, round trips, one-way trips, and doorstep driver access.",
    technologies: ["iOS", "Travel", "Customer app"],
    platform: ["iOS"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "Hyderabad, India",
    type: "Customer Booking App",
    metric: "4.6 rating",
    projectUrl: "https://apps.apple.com/in/app/hopp-company/id1527763771",
  },
  {
    id: "hopp-partner-android",
    title: "HOPP Partner",
    description:
      "A driver partner app for full-time or part-time earning, GPS-tracked trips, transparent daily, weekly, and monthly earnings, and weekly settlements.",
    technologies: ["React Native", "GPS tracking", "Driver partner"],
    platform: ["Android"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "Driver Partner App",
    metric: "5K+ downloads",
    projectUrl: "https://play.google.com/store/apps/details?id=com.Revalsys.warantech.HOPPDriver",
  },
  {
    id: "hopp-partner-ios",
    title: "HOPP - Partner",
    description:
      "The iOS HOPP partner app for driver workflows, trip handling, account visibility, and performance updates.",
    technologies: ["iOS", "Travel", "Driver partner"],
    platform: ["iOS"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "Driver Partner App",
    metric: "4.8 rating",
    projectUrl: "https://apps.apple.com/in/app/hopp-partner/id1527779025",
  },
  {
    id: "hopp-admin",
    title: "HOPP COMPANY - Admin",
    description:
      "A partner administration platform for organizations collaborating with HOPP COMPANY, supporting operational access for partner workflows.",
    technologies: ["Android", "Admin app", "Operations"],
    platform: ["Android"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "Admin Operations App",
    metric: "50+ downloads",
    projectUrl: "https://play.google.com/store/apps/details?id=com.hoppadmin",
  },
  {
    id: "revalomni-dashboard",
    title: "RevalOmni Dashboard",
    description:
      "A business monitoring interface for sales, inventory, and operating visibility across retail workflows.",
    technologies: ["Android", "Dashboard", "Analytics", "Operations"],
    platform: ["Android"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "Operations UI",
    metric: "Retail visibility",
    projectUrl: "https://play.google.com/store/apps/details?id=com.masterwsi",
  },
  {
    id: "revalsys-authenticator-android",
    title: "Revalsys Authenticator",
    description:
      "A security-focused utility for two-factor authentication and secure notifications in internal systems.",
    technologies: ["Android", "Security", "2FA", "Biometrics"],
    platform: ["Android"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "Security Utility",
    metric: "100+ downloads",
    projectUrl: "https://play.google.com/store/apps/details?id=com.revalnotification",
  },
  {
    id: "reval-ess-android",
    title: "Reval ESS",
    description:
      "An Android employee self-service app for daily attendance, work task sheets, onboarding, HRMS workflows, leave planning, and project tracking.",
    technologies: ["Android", "HRMS", "Attendance"],
    platform: ["Android"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "HRMS Utility",
    metric: "500+ downloads",
    projectUrl: "https://play.google.com/store/apps/details?id=com.revaless",
  },
  {
    id: "revalsys-authenticator-ios",
    title: "Revalsys-Authenticator",
    description:
      "An iOS productivity utility for secure logins with time-based one-time passwords delivered through the Revalsys Authenticator app.",
    technologies: ["iOS", "Security", "TOTP"],
    platform: ["iOS"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "Security Utility",
    metric: "Productivity",
    projectUrl: "https://apps.apple.com/in/app/revalsys-authenticator/id6737756995",
  },
  {
    id: "revaless-ios",
    title: "RevalESS",
    description:
      "An iOS employee self-service utility for location capture, grievance management, insurance tracking, overtime, performance review, and activity workflows.",
    technologies: ["iOS", "HRMS", "Utilities"],
    platform: ["iOS"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "HRMS Utility",
    metric: "Utilities",
    projectUrl: "https://apps.apple.com/in/app/revaless/id6739558255",
  },
  {
    id: "trusterra-partner",
    title: "Trusterra-Partner",
    description:
      "An iOS field operations app for EV dealer partners to onboard dealerships, verify documents, book FOS visits, inspect vehicles, and manage dealer inventory.",
    technologies: ["iOS", "EV operations", "Business"],
    platform: ["iOS"],
    company: "Revalsys Technologies Pvt Ltd.",
    region: "India",
    type: "Field Operations App",
    metric: "Business",
    projectUrl: "https://apps.apple.com/in/app/trusterra-partner/id6748809106",
  },
  {
    id: "pro-5-networking-android",
    title: "Pro 5 Networking",
    description:
      "A professional networking product designed for events, attendee discovery, and structured engagement.",
    technologies: ["React Native", "Mobile", "Networking", "Events"],
    platform: ["Android"],
    company: "Espirits Technologies Pvt Ltd.",
    region: "United Kingdom",
    type: "Event App",
    metric: "People discovery",
    projectUrl: "https://play.google.com/store/apps/details?id=com.pro_v_networking",
  },
  {
    id: "pro-5-networking-ios",
    title: "Pro 5 Networking",
    description:
      "An iOS business app for golf groups, membership access, group chat, private messaging, guest invitations, and event participation.",
    technologies: ["iOS", "Networking", "Golf groups"],
    platform: ["iOS"],
    company: "Espirits Technologies Pvt Ltd.",
    region: "United Kingdom",
    type: "Event App",
    metric: "4.0 rating",
    projectUrl: "https://apps.apple.com/in/app/pro-5-networking/id6745877588",
  },
];

export const sohailContact = {
  email: "sohail345patel@gmail.com",
  github: "https://github.com/sohail005",
  linkedin: "https://www.linkedin.com/in/md-sohail-a63a321b1/",
  threads: "https://www.threads.com/@sohail.code",
  instagram: "https://www.instagram.com/sohail.code/",
  youtube: "https://www.youtube.com/@Sohail.code005",
};
