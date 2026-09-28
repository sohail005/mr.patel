export function scrollToHash(id: string) {
  if (typeof window === "undefined") return;
  if (id === "contact") {
    window.location.href = "/contact";
    return;
  }
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `/#${id}`);
    return;
  }
  window.location.href = `/#${id}`;
}
