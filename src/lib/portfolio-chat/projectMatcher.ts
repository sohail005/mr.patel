import { sohailProjects } from "@/data/sohail";
import type { PortfolioProject } from "@/types/portfolio-chat";
import { normalizeText, tokenize } from "./textNormalizer";

function scoreProject(project: PortfolioProject, question: string) {
  const normalizedQuestion = normalizeText(question);
  const projectName = normalizeText(project.title);
  const projectTokens = tokenize(project.title);
  const technologyTokens = project.technologies.map(normalizeText);

  if (normalizedQuestion.includes(projectName)) return 100;

  const tokenScore = projectTokens.reduce(
    (score, token) => score + (normalizedQuestion.includes(token) ? 16 : 0),
    0,
  );
  const techScore = technologyTokens.reduce(
    (score, tech) => score + (normalizedQuestion.includes(tech) ? 6 : 0),
    0,
  );

  return tokenScore + techScore;
}

export function findProject(question: string) {
  const matches = sohailProjects
    .map((project) => ({ project, score: scoreProject(project, question) }))
    .filter((match) => match.score >= 16)
    .sort((a, b) => b.score - a.score);

  return matches[0]?.project;
}

export function findProjectsByTechnology(technology: string) {
  const normalizedTechnology = normalizeText(technology);

  return sohailProjects.filter((project) => {
    const searchable = normalizeText(
      [...project.technologies, ...project.platform, project.type, project.title].join(" "),
    );
    return searchable.includes(normalizedTechnology);
  });
}

export function findProjectById(projectId?: string) {
  return sohailProjects.find((project) => project.id === projectId);
}
