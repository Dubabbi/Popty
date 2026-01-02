export const DEFAULT_CONFETTI_SEED = 0x1234abcd;
export const DEFAULT_CONFETTI_DURATION_MS = 3000;

export const CONFETTI_PIECE_COUNT = 60;

/* 30% 확률로 emoji */
export const EMOJI_THRESHOLD = 0.7;

export const CONFETTI_COLORS = [
  "var(--color-primary)",
  "#FF6B9D",
  "#C77DFF",
  "#4CC9F0",
  "#FFD60A",
  "#06FFA5",
  "#FF9E00",
] as const;

export const CONFETTI_EMOJIS = ["🎉", "✨", "🎊", "⭐", "💫", "🌟"] as const;

export const CONFETTI_KEYFRAMES_CSS = `
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(calc(var(--rot) * 1deg)); opacity: 1; }
    100% { transform: translateY(100vh) rotate(calc(var(--rot) * 1deg + 720deg)); opacity: 0; }
  }
`;
