import { sohailSkills } from "@/data/sohail";
import type { ChatIntent } from "@/types/portfolio-chat";
import { includesAny, normalizeText } from "./textNormalizer";
import { findProject } from "./projectMatcher";

const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "whats up"];

const intentKeywords: Record<Exclude<ChatIntent, "unknown" | "technology" | "project_specific">, string[]> = {
  about: ["who is sohail", "about sohail", "tell me about sohail", "bio", "profile", "summary"],
  skills: ["skills", "technologies", "tech stack", "what does sohail know", "what can sohail do", "stack"],
  projects: ["projects", "work", "portfolio", "applications", "apps", "featured", "show me"],
  services: ["services", "offer", "provide", "development training", "website development", "app development"],
  experience: ["experience", "career", "worked", "companies", "job", "role", "years"],
  contact: ["contact", "email", "reach", "linkedin", "github", "message"],
  availability: ["available", "availability", "open to", "taking work"],
  hire: ["hire", "why should", "why hire", "recruit", "client", "choose sohail"],
  greeting: greetings,
  help: ["help", "what can you answer", "suggest", "questions"],
};

const generalEducationQuestions = [
  "what is react",
  "what is react native",
  "what is firebase",
  "what is next.js",
  "explain react",
  "explain firebase",
  "explain next.js",
  "write code",
  "python",
  "bitcoin",
  "president",
  "weather",
  "joke",
  "recipe",
  "solve",
  "translate",
  "machine learning",
];

export const knownTechnologies = Array.from(
  new Set(sohailSkills.flatMap((group) => group.items)),
).sort((a, b) => b.length - a.length);

export function detectTechnology(question: string) {
  const normalized = normalizeText(question);
  return knownTechnologies.find((technology) =>
    normalized.includes(normalizeText(technology)),
  );
}

export function isOutOfScope(question: string) {
  const normalized = normalizeText(question);
  const mentionsSohail = normalized.includes("sohail") || normalized.includes("his") || normalized.includes("he ");
  const technology = detectTechnology(question);

  if (technology && mentionsSohail) return false;
  if (generalEducationQuestions.some((keyword) => normalized.includes(keyword))) return true;

  return false;
}

export function detectIntent(question: string): ChatIntent {
  const normalized = normalizeText(question);

  if (!normalized) return "unknown";
  if (greetings.includes(normalized)) return "greeting";
  if (findProject(question)) return "project_specific";

  const technology = detectTechnology(question);
  if (technology) {
    const relevantTechnologyAsk =
      includesAny(normalized, ["sohail", "his", "he ", "used", "know", "experience", "projects", "work", "built", "with"]) ||
      normalized === normalizeText(technology);
    return relevantTechnologyAsk ? "technology" : "unknown";
  }

  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (includesAny(normalized, keywords)) return intent as ChatIntent;
  }

  if (includesAny(normalized, ["android", "ios", "deploy", "deployment", "play console", "app store", "testflight"])) {
    return "technology";
  }

  return "unknown";
}
