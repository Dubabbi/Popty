import type { BubbleBg, StarBg } from "@/components/ui/capsule/types/capsule";

type Props = {
  bg: { bubbles: BubbleBg[]; stars: StarBg[] };
  capsuleColors: string[];
};

export function AnimatedBackground({ bg, capsuleColors }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.4,
        pointerEvents: "none",
      }}
    >
      {bg.bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: b.w,
            height: b.h,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${capsuleColors[i % capsuleColors.length]}60 0%, ${capsuleColors[i % capsuleColors.length]}20 50%, transparent 70%)`,
            left: `${b.left}%`,
            top: `${b.top}%`,
            filter: "blur(50px)",
            animation: `float ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {bg.stars.map((st, i) => (
        <div
          key={`star-${i}`}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "white",
            left: `${st.left}%`,
            top: `${st.top}%`,
            opacity: st.opacity,
            animation: `pulse ${st.duration}s ease-in-out infinite`,
            animationDelay: `${st.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
