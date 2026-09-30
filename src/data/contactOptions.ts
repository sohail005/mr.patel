export const CONTACT_SERVICE_OPTIONS = [
  "App Deployment Services",
  "Complete App Development",
  "Website Development",
  "Development Training",
] as const;

export type ContactServiceOption = (typeof CONTACT_SERVICE_OPTIONS)[number];
