const aliasPairs: Array<[RegExp, string]> = [
  [/\breactnative\b/g, "react native"],
  [/\bnextjs\b/g, "next.js"],
  [/\bnext js\b/g, "next.js"],
  [/\breactjs\b/g, "react"],
  [/\bprojcts?\b/g, "projects"],
  [/\bskils?\b/g, "skills"],
  [/\bhier\b/g, "hire"],
  [/\bcontct\b/g, "contact"],
  [/\bfirbase\b/g, "firebase"],
  [/\bappstore\b/g, "app store"],
  [/\bplaystore\b/g, "play store"],
];

export function normalizeText(value: string) {
  const lowered = value.toLowerCase().trim();
  const withoutSymbols = lowered
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9.+#\s-]/g, " ")
    .replace(/\s+/g, " ");

  return aliasPairs.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    withoutSymbols,
  );
}

export function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function tokenize(text: string) {
  return normalizeText(text)
    .split(" ")
    .filter((token) => token.length > 1);
}
