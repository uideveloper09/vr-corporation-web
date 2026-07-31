const PENDING_SCROLL_KEY = "vr:pending-scroll-id";

export const scrollToSection = (targetId: string) => {
  if (typeof document === "undefined") return;

  const section = document.getElementById(targetId);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** Queue a section scroll for after a route change (no #hash in the URL). */
export const queueScrollToSection = (targetId: string) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(PENDING_SCROLL_KEY, targetId);
};

/** Run any queued scroll, or a one-time hash scroll then strip the hash. */
export const consumePendingScroll = () => {
  if (typeof window === "undefined") return;

  const queued = window.sessionStorage.getItem(PENDING_SCROLL_KEY);
  if (queued) {
    window.sessionStorage.removeItem(PENDING_SCROLL_KEY);
    window.requestAnimationFrame(() => scrollToSection(queued));
    return;
  }

  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;

  window.history.replaceState(null, "", window.location.pathname + window.location.search);
  window.requestAnimationFrame(() => scrollToSection(hash));
};
