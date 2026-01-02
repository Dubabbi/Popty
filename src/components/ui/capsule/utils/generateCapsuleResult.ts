import type {
  CapsuleMascot,
  CapsuleResult,
} from "@/components/ui/capsule/types/capsule";
import type { CapsuleCategory } from "@/components/ui/capsule/constants/capsule";

type PopupLike = { id: string; category: string };

export function generateCapsuleResult(args: {
  nextInt: (min: number, max: number) => number;
  shuffle: <T>(arr: T[]) => T[];
  mascots: Record<
    CapsuleMascot,
    { name: string; emoji: string; color: string; gradient: string }
  >;
  categories: readonly CapsuleCategory[];
  messages: readonly string[];
  popupsData: readonly PopupLike[];
}): CapsuleResult {
  const { nextInt, shuffle, mascots, categories, messages, popupsData } = args;

  const mascotKeys = Object.keys(mascots) as CapsuleMascot[];
  const randomMascot = mascotKeys[nextInt(0, mascotKeys.length - 1)];
  const mascotData = mascots[randomMascot];

  const randomCategory = categories[nextInt(0, categories.length - 1)];
  const categoryPopups = popupsData.filter(
    (p) => p.category === randomCategory,
  );

  const selectedPopups = shuffle(categoryPopups)
    .slice(0, 3)
    .map((p) => p.id);

  const randomMessage = messages[nextInt(0, messages.length - 1)];

  return {
    mascot: randomMascot,
    mascotName: mascotData.name,
    message: randomMessage,
    popups: selectedPopups.length > 0 ? selectedPopups : ["1", "2", "3"],
    color: mascotData.color,
    gradient: mascotData.gradient,
  };
}
