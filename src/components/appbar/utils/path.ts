export function getEffectivePath(explicit?: string) {
  if (explicit) return explicit;
  if (typeof window === "undefined") return "";
  const { hash, pathname } = window.location;
  if (hash && hash.startsWith("#/")) return hash.slice(1);
  return pathname || "";
}

export function normalizePath(path: string) {
  return path.split("?")[0].split("#")[0].replace(/\/+$/, "");
}

export function isMyRoute(path?: string) {
  const p = normalizePath(getEffectivePath(path));
  return /(^|\/)my(\/|$)/.test(p);
}
