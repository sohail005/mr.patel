export interface SkillGroup {
  title: string;
  items: string[];
}

export interface PortfolioService {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
}

export interface PortfolioExperience {
  period: string;
  duration: string;
  role: string;
  company: string;
  type: string;
  focus: string;
  highlights: string[];
  skills: string[];
}

export interface ProjectThumbnail {
  src: string;
  alt: string;
  previewUrl: string;
  fit?: "cover" | "contain";
  source: "Website" | "Google Play" | "App Store";
  appIcon?: string;
  developer?: string;
  rating?: string;
  downloads?: string;
  screenshots?: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  platform: string[];
  company: string;
  region: string;
  type: string;
  metric: string;
  projectUrl: string;
  featured?: boolean;
  year?: string;
  thumbnail?: ProjectThumbnail;
}
