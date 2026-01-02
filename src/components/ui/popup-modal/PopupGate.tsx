import { useCallback, useRef, useState } from "react";
import { DynamicPopup } from "@/components/ui/popup-modal/DynamicPopup";
import { Confetti } from "@/components/ui/popup-modal/Confetti";

export function PopupGate() {
  const [showDynamic, setShowDynamic] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleAllowPopup = useCallback(() => {
    setShowConfetti(true);
    setShowDynamic(false);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setShowConfetti(false);
      timerRef.current = null;
    }, 3000);
  }, []);

  return (
    <>
      {showDynamic && <DynamicPopup onAllow={handleAllowPopup} />}
      {showConfetti && <Confetti />}
    </>
  );
}
