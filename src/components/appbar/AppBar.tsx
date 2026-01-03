import type { AppBarProps } from "@/components/appbar/types/appbar";
import { getEffectivePath, isMySubRoute } from "./utils/path";
import { DefaultAppBar } from "./parts/DefaultAppBar";
import { HomeAppBar } from "./parts/HomeAppBar";
import { CapsuleAppBar } from "./parts/CapsuleAppBar";
import { MyPageAppBar } from "./parts/MyPageAppBar";

export function AppBar(props: AppBarProps) {
  const path = getEffectivePath(props.pathname);

  if (isMySubRoute(path)) return <MyPageAppBar {...props} />;

  if (props.currentView === "capsule") return <CapsuleAppBar {...props} />;
  if (props.currentView === "home") return <HomeAppBar {...props} />;

  return <DefaultAppBar {...props} />;
}
