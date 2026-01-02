export const capsuleColors = [
  "#FF8BA0",
  "#6B8AFF",
  "#B8F0D9",
  "#FFF4C4",
  "#FFD4B8",
  "#D4C4FF",
];

export const messages = [
  "오늘은 이곳이 당신을 기다려요!",
  "새로운 경험이 당신을 반겨요!",
  "특별한 순간을 만날 시간이에요!",
  "행운의 팝업을 발견했어요!",
  "이번 주 놓치면 안 되는 곳!",
  "당신의 취향 저격 팝업!",
];

export const categories = [
  "Character",
  "Goods",
  "Exhibition",
  "Beauty",
  "Food",
  "Fashion",
] as const;

export const capsuleColorMap: Record<number, string> = {
  1: capsuleColors[2], // Mint
  2: capsuleColors[4], // Peach
  3: capsuleColors[1], // Sky
  4: capsuleColors[0], // Pink
  5: capsuleColors[5], // Purple
  6: capsuleColors[0], // Candy Stripe Pink
  7: capsuleColors[3], // Yellow
  8: capsuleColors[5], // Lavender
  9: capsuleColors[0], // Large Pink
  10: capsuleColors[1], // Sky
  11: capsuleColors[5], // Candy Stripe Lavender
  12: capsuleColors[2], // Mint
  13: capsuleColors[4], // Peach
  14: capsuleColors[3], // Yellow
  15: capsuleColors[2], // Candy Stripe Mint
};

export type CapsuleCategory = (typeof categories)[number];
