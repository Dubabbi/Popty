export interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  /* number (deg) */
  rotation: number;
  size: number;
  emoji?: string;
  borderRadius: string | number;
}

export interface ConfettiProps {
  seed?: number;
  durationMs?: number;
  onDone?: () => void;
}
