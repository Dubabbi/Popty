import type { AppBarProps } from "@/components/appbar/types/appbar";
import { isMyRoute, getEffectivePath } from "./utils/path";
import { DefaultAppBar } from "./parts/DefaultAppBar";
import { HomeAppBar } from "./parts/HomeAppBar";
import { CapsuleAppBar } from "./parts/CapsuleAppBar";

export function AppBar(props: AppBarProps) {
  const path = getEffectivePath(props.pathname);

  if (isMyRoute(path)) return <DefaultAppBar {...props} />;

  if (props.currentView === "capsule") return <CapsuleAppBar {...props} />;
  if (props.currentView === "home") return <HomeAppBar {...props} />;

  return <DefaultAppBar {...props} />;
}
