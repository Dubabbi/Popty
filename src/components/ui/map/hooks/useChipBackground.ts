import { useCallback, useMemo, useState } from "react";
import {
  getCategoryActiveBg,
  getCategoryHoverBg,
} from "@/components/ui/map/utils/categoryStyle";

export function useChipBackground(category: string, active: boolean) {
  const [hover, setHover] = useState(false);

  const background = useMemo(() => {
    if (hover) return getCategoryHoverBg(category);
    if (active) return getCategoryActiveBg(category);
    return "white";
  }, [hover, active, category]);

  const onMouseEnter = useCallback(() => setHover(true), []);
  const onMouseLeave = useCallback(() => setHover(false), []);

  return { background, onMouseEnter, onMouseLeave };
}
