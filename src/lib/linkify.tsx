import type { ReactNode } from "react";

const URL_PATTERN = /https?:\/\/[^\s<>"']+/g;
const TRAILING_PUNCTUATION_PATTERN = /[),.!?;:]+$/;

export function linkifyText(text: string, linkClassName?: string): ReactNode[] {
  const parts = text.split(URL_PATTERN);
  const rawUrls = text.match(URL_PATTERN) ?? [];

  const nodes: ReactNode[] = [];
  parts.forEach((part, index) => {
    const rawUrl = rawUrls[index];
    if (!rawUrl) {
      if (part) nodes.push(part);
      return;
    }

    const trailingMatch = rawUrl.match(TRAILING_PUNCTUATION_PATTERN);
    const trailing = trailingMatch ? trailingMatch[0] : "";
    const url = trailing ? rawUrl.slice(0, -trailing.length) : rawUrl;

    if (part) nodes.push(part);
    nodes.push(
      <a
        key={`${url}-${index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {url}
      </a>
    );
    if (trailing) nodes.push(trailing);
  });

  return nodes;
}
