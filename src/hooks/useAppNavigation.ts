import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { VIEW_PATH, type ViewType } from "@/routes/routes";

export function useAppNavigation() {
  const navigate = useNavigate();

  const onNavigate = useCallback(
    (view: ViewType, popupId?: string) => {
      if (view === "detail") {
        if (!popupId) return;
        navigate(`/detail/${popupId}`);
        return;
      }
      navigate(VIEW_PATH[view]);
    },
    [navigate],
  );

  return { onNavigate };
}
