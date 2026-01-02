import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_CONFETTI_DURATION_MS,
  DEFAULT_CONFETTI_SEED,
} from "@/components/ui/popup-modal/constants/confetti";
import type { ConfettiPiece } from "@/components/ui/popup-modal/types/confetti";
import { buildConfettiPieces } from "@/components/ui/popup-modal/utils/buildConfettiPieces";

interface UseConfettiArgs {
  seed?: number;
  durationMs?: number;
  onDone?: () => void;
}

export function useConfetti({
  seed = DEFAULT_CONFETTI_SEED,
  durationMs = DEFAULT_CONFETTI_DURATION_MS,
  onDone,
}: UseConfettiArgs): { alive: boolean; pieces: ConfettiPiece[] } {
  const pieces = useMemo(() => buildConfettiPieces(seed), [seed]);
  const [alive, setAlive] = useState(true);

  const onDoneRef = useRef<UseConfettiArgs["onDone"]>(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const t = setTimeout(() => {
      setAlive(false);
      onDoneRef.current?.();
    }, durationMs);

    return () => clearTimeout(t);
  }, [durationMs]);

  return { alive, pieces };
}
