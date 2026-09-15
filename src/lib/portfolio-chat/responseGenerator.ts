import {
  sohailContact,
  sohailExperience,
  sohailProfile,
  sohailProjects,
  sohailServices,
  sohailSkills,
} from "@/data/sohail";
import type { ChatAction, ChatContext, ChatResponse, PortfolioProject } from "@/types/portfolio-chat";
import { detectIntent, detectTechnology, isOutOfScope } from "./intentDetector";
import { findProject, findProjectById, findProjectsByTechnology } from "./projectMatcher";
import { includesAny, normalizeText } from "./textNormalizer";

const rejection =
  "I'm Sohail's portfolio assistant. I can only help with questions about Sohail, his skills, projects, experience, services, and professional work.";

function baseSuggestions() {
  const suggestions = ["About Sohail", "Skills", "Featured Projects", "Services", "Why Hire Sohail?", "Contact Sohail"];
  const hasReactNative = sohailSkills.some((group) => group.items.includes("React Native"));
  return hasReactNative ? ["React Native Experience", ...suggestions] : suggestions;
}

function contactActions() {
  return [
    { label: "Contact Sohail", href: `mailto:${sohailContact.email}`, kind: "primary" as const },
    { label: "LinkedIn", href: sohailContact.linkedin, kind: "secondary" as const },
    { label: "GitHub", href: sohailContact.github, kind: "secondary" as const },
  ];
}

function projectActions(projects: PortfolioProject[]) {
  const actions: ChatAction[] = [{ label: "View All Projects", href: "/projects", kind: "primary" }];
  const firstProject = projects[0];
  if (firstProject) {
    actions.push({ label: "Open Project", href: firstProject.projectUrl, kind: "secondary" as const });
  }
  return actions;
}

function technologyResponse(technology: string, context: ChatContext): ChatResponse {
  const projects = findProjectsByTechnology(technology);
  const normalizedTechnology = normalizeText(technology);
  const experienceItems = sohailExperience.filter((item) =>
    item.skills.some((skill) => normalizeText(skill).includes(normalizedTechnology)),
  );
  const serviceItems = sohailServices.filter((service) =>
    normalizeText([service.title, service.description, ...service.capabilities].join(" ")).includes(normalizedTechnology),
  );

  if (!projects.length && !experienceItems.length && !serviceItems.length) {
    return {
      type: "text",
      message: "I don't currently have that information in Sohail's portfolio.",
      suggestions: baseSuggestions(),
      updatedContext: { ...context, lastIntent: "technology", lastTechnology: technology },
    };
  }

  const messageParts = [`Yes. Sohail's portfolio includes ${technology}.`];
  if (experienceItems.length) {
    messageParts.push(
      `It appears in his experience as ${experienceItems
        .map((item) => `${item.role} at ${item.company}`)
        .join(", ")}.`,
    );
  }
  if (projects.length) {
    messageParts.push(`I found ${projects.length} related project${projects.length === 1 ? "" : "s"}.`);
  }
  if (serviceItems.length) {
    messageParts.push("It is also part of his service offering.");
  }

  return {
    type: projects.length ? "projects" : "text",
    message: messageParts.join(" "),
    projects: projects.slice(0, 5),
    actions: projects.length ? projectActions(projects) : contactActions(),
    suggestions: [`Which projects used ${technology}?`, "Services", "Contact Sohail"],
    updatedContext: { ...context, lastIntent: "technology", lastTechnology: technology },
  };
}

function projectResponse(project: PortfolioProject, context: ChatContext): ChatResponse {
  return {
    type: "projects",
    message: `${project.title} is listed in Sohail's portfolio as a ${project.type} built at ${project.company}. ${project.description}`,
    projects: [project],
    actions: [
      { label: "Open Project", href: project.projectUrl, kind: "primary" },
      { label: "View All Projects", href: "/projects", kind: "secondary" },
    ],
    suggestions: ["What technologies were used?", "Show similar projects", "Contact Sohail"],
    updatedContext: {
      ...context,
      lastIntent: "project_specific",
      lastProjectId: project.id,
      lastTopic: project.title,
    },
  };
}

function followUpResponse(question: string, context: ChatContext): ChatResponse | undefined {
  const normalized = normalizeText(question);

  if (context.lastTechnology && includesAny(normalized, ["it", "that", "technology", "projects", "used"])) {
    return technologyResponse(context.lastTechnology, context);
  }

  const project = findProjectById(context.lastProjectId);
  if (project && includesAny(normalized, ["technologies", "tech", "stack", "used", "platform"])) {
    return {
      type: "projects",
      message: `${project.title} is listed with ${project.technologies.join(", ")} and platform coverage for ${project.platform.join(", ")}.`,
      projects: [project],
      actions: [{ label: "Open Project", href: project.projectUrl, kind: "primary" }],
      suggestions: ["Show similar projects", "Contact Sohail"],
      updatedContext: context,
    };
  }

  return undefined;
}

export function getChatResponse(question: string, context: ChatContext = {}): ChatResponse {
  const normalized = normalizeText(question);
  const followUp = followUpResponse(question, context);
  if (followUp) return followUp;

  if (isOutOfScope(question)) {
    return {
      type: "text",
      message: rejection,
      suggestions: baseSuggestions(),
      updatedContext: context,
    };
  }

  const intent = detectIntent(question);
  const nextContext = { ...context, lastIntent: intent };

  if (intent === "greeting") {
    return {
      type: "text",
      message:
        "Hi! I'm Sohail's portfolio assistant. I can tell you about his skills, projects, experience, services, or how to contact him.",
      suggestions: baseSuggestions(),
      updatedContext: nextContext,
    };
  }

  if (intent === "about") {
    return {
      type: "text",
      message: `${sohailProfile.name} is a ${sohailProfile.title}. ${sohailProfile.summary} ${sohailProfile.about}`,
      actions: [{ label: "View Experience", href: "/#experience", kind: "secondary" }],
      suggestions: ["Skills", "React Native Experience", "Why Hire Sohail?"],
      updatedContext: { ...nextContext, lastTopic: "about" },
    };
  }

  if (intent === "skills") {
    return {
      type: "skills",
      message: "Sohail works primarily across frontend systems, mobile delivery, motion polish, backend integrations, and deployment workflows.",
      skills: sohailSkills,
      suggestions: ["React Native Experience", "Does Sohail know Next.js?", "Has Sohail used Firebase?"],
      updatedContext: { ...nextContext, lastTopic: "skills" },
    };
  }

  if (intent === "services") {
    return {
      type: "services",
      message: "These are the services currently shown in Sohail's portfolio.",
      services: sohailServices,
      actions: [{ label: "Contact Sohail", href: "/#contact", kind: "primary" }],
      suggestions: ["Can Sohail deploy apps?", "Complete App Development", "Website Development"],
      updatedContext: { ...nextContext, lastTopic: "services" },
    };
  }

  if (intent === "experience") {
    return {
      type: "text",
      message: `Sohail has 5+ years moving from reusable UI foundations to full release ownership. His portfolio lists roles at ${sohailExperience
        .map((item) => item.company)
        .join(", ")}.`,
      actions: [{ label: "View Experience", href: "/#experience", kind: "primary" }],
      suggestions: ["React Native Experience", "Why Hire Sohail?", "Projects"],
      updatedContext: { ...nextContext, lastTopic: "experience" },
    };
  }

  if (intent === "contact") {
    return {
      type: "contact",
      message: `You can contact Sohail by email at ${sohailContact.email}, or use the trusted portfolio links below.`,
      actions: contactActions(),
      suggestions: ["Services", "Why Hire Sohail?", "Featured Projects"],
      updatedContext: { ...nextContext, lastTopic: "contact" },
    };
  }

  if (intent === "availability") {
    return {
      type: "text",
      message: sohailProfile.availability,
      actions: [{ label: "Contact Sohail", href: "/#contact", kind: "primary" }],
      suggestions: ["Services", "Why Hire Sohail?", "Contact Sohail"],
      updatedContext: { ...nextContext, lastTopic: "availability" },
    };
  }

  if (intent === "hire") {
    return {
      type: "skills",
      message:
        "Sohail combines frontend and cross-platform mobile development experience with practical production work across React Native, React, Next.js, Firebase, API integrations, app deployment, and UI implementation.",
      skills: [
        { title: "Strengths", items: sohailProfile.highlights },
        { title: "Production Focus", items: ["Responsive UI", "Release ownership", "Performance tuning", "Production debugging", "Store deployment"] },
      ],
      actions: contactActions(),
      suggestions: ["Show me his projects", "Services", "Experience"],
      updatedContext: { ...nextContext, lastTopic: "hire" },
    };
  }

  const project = findProject(question);
  if (project) return projectResponse(project, nextContext);

  const technology =
    detectTechnology(question) ||
    (includesAny(normalized, ["android", "ios", "deploy", "deployment", "app store", "play console", "testflight"])
      ? includesAny(normalized, ["deploy", "deployment", "app store", "play console", "testflight"])
        ? "Store deployment"
        : normalized.includes("ios")
          ? "iOS"
          : "Android"
      : undefined);
  if (technology) return technologyResponse(technology, nextContext);

  if (intent === "projects") {
    const mobileOnly = includesAny(normalized, ["mobile", "android", "ios", "app"]);
    const featuredOnly = includesAny(normalized, ["featured", "best"]);
    const projects = sohailProjects.filter((item) => {
      if (featuredOnly) return item.featured;
      if (mobileOnly) return item.platform.some((platform) => platform !== "Web");
      return true;
    });

    return {
      type: "projects",
      message: featuredOnly
        ? "Here are featured projects from Sohail's portfolio."
        : mobileOnly
          ? "Here are mobile projects from Sohail's portfolio."
          : "Here are projects from Sohail's portfolio.",
      projects: projects.slice(0, 6),
      actions: projectActions(projects),
      suggestions: ["React Native projects", "Firebase projects", "Contact Sohail"],
      updatedContext: { ...nextContext, lastTopic: "projects" },
    };
  }

  if (intent === "help") {
    return {
      type: "text",
      message:
        "I can help with questions about Sohail's profile, skills, projects, services, experience, availability, and contact links.",
      suggestions: baseSuggestions(),
      updatedContext: nextContext,
    };
  }

  if (normalized.includes("sohail") || normalized.includes("his") || normalized.includes("he ")) {
    return {
      type: "text",
      message: "I don't currently have that information in Sohail's portfolio.",
      suggestions: baseSuggestions(),
      updatedContext: nextContext,
    };
  }

  return {
    type: "text",
    message: rejection,
    suggestions: baseSuggestions(),
    updatedContext: nextContext,
  };
}
