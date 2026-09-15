export type ChatIntent =
  | "about"
  | "skills"
  | "projects"
  | "project_specific"
  | "services"
  | "experience"
  | "contact"
  | "availability"
  | "hire"
  | "technology"
  | "greeting"
  | "help"
  | "unknown";

export type ChatResponseType =
  | "text"
  | "skills"
  | "projects"
  | "services"
  | "contact";

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
}

export interface ChatAction {
  label: string;
  href: string;
  kind?: "primary" | "secondary";
}

export interface ChatContext {
  lastIntent?: ChatIntent;
  lastTechnology?: string;
  lastProjectId?: string;
  lastTopic?: string;
}

export interface ChatResponse {
  type: ChatResponseType;
  message: string;
  skills?: SkillGroup[];
  services?: PortfolioService[];
  projects?: PortfolioProject[];
  actions?: ChatAction[];
  suggestions?: string[];
  updatedContext?: ChatContext;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  response?: ChatResponse;
}
