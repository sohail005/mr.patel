/**
 * Store CDN thumbnails (Google Play / App Store) are embedded in the data at
 * low fixed sizes (e.g. `=w526-h296`, `/392x696bb.png`) meant for list rows,
 * not full-width card images. Both CDNs will happily re-render the same
 * asset at a larger size via the URL, so request a size closer to what the
 * project card actually displays instead of upscaling the small version.
 */
export function getHiResThumbnail(src: string): string {
  const playMatch = src.match(/^(.*=w)(\d+)-h(\d+)(.*)$/);
  if (playMatch) {
    const [, prefix, w, h, suffix] = playMatch;
    const scale = Math.min(4, Math.max(2, 1200 / Number(w)));
    const newW = Math.round(Number(w) * scale);
    const newH = Math.round(Number(h) * scale);
    return `${prefix}${newW}-h${newH}${suffix}`;
  }

  const appleMatch = src.match(/^(.*\/)(\d+)x(\d+)(bb\.\w+)$/);
  if (appleMatch) {
    const [, prefix, w, h, suffix] = appleMatch;
    const scale = Math.min(4, Math.max(2, 1200 / Number(w)));
    const newW = Math.round(Number(w) * scale);
    const newH = Math.round(Number(h) * scale);
    return `${prefix}${newW}x${newH}${suffix}`;
  }

  return src;
}
