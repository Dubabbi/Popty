import { useRef } from "react";
import DateRangePicker from "@/components/my/report-popup/parts/DateRangePicker";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onStartChange: (date: Date | null) => void;
  onEndChange: (date: Date | null) => void;
};

function getScrollParent(el: HTMLElement | null): HTMLElement | null {
  let parent = el?.parentElement ?? null;

  while (parent) {
    const style = window.getComputedStyle(parent);
    const oy = style.overflowY;
    if (oy === "auto" || oy === "scroll") return parent;
    parent = parent.parentElement;
  }

  return (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
}

export function DateInputs({ startDate, endDate, onStartChange, onEndChange }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    const node = wrapRef.current;
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "end" });
    const scroller = getScrollParent(node);
    setTimeout(() => {
      scroller?.scrollBy({ top: 360, behavior: "smooth" });
    }, 180);
  };

  return (
    <div ref={wrapRef}>
      <label
        style={{
          display: "block",
          marginBottom: "var(--space-2)",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          paddingLeft: "var(--space-2)",
        }}
      >
        기간 *
      </label>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartChange}
        onEndDateChange={onEndChange}
        onOpen={handleOpen}
      />
    </div>
  );
}
