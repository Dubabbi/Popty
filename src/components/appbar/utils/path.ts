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

export function isMyRootRoute(path?: string) {
  const p = normalizePath(getEffectivePath(path));
  return p === "/my" || p === "my";
}

export function isMySubRoute(path?: string) {
  const p = normalizePath(getEffectivePath(path));
  return /(^|\/)my\/.+/.test(p);
}

export function isHomeRoute(path?: string) {
  const p = normalizePath(getEffectivePath(path));
  return p === "" || p === "/" || p === "/home" || p === "home";
}
