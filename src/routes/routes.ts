export type ViewType =
  | "home"
  | "browse"
  | "calendar"
  | "map"
  | "saved"
  | "my"
  | "capsule"
  | "detail"
  | "notifications"
  | "search"
  | "roadmap";

export const VIEW_PATH: Record<Exclude<ViewType, "detail">, string> = {
  home: "/",
  browse: "/browse",
  calendar: "/calendar",
  map: "/map",
  saved: "/saved",
  my: "/my",
  notifications: "/notifications",
  capsule: "/capsule",
  search: "/search",
  roadmap: "/roadmap",
};

export function toTitle(view: ViewType) {
  if (view === "home") return "";
  if (view === "detail") return "";
  return view.charAt(0).toUpperCase() + view.slice(1);
}

export function getCurrentView(pathname: string): ViewType {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/detail/")) return "detail";

  const key = pathname.replace("/", "") as ViewType;
  const allowed: ViewType[] = [
    "browse",
    "calendar",
    "map",
    "saved",
    "my",
    "notifications",
    "search",
    "capsule",
    "roadmap",
  ];

  return allowed.includes(key) ? key : "home";
}
