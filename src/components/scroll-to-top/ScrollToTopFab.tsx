import * as React from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 220;
const R = 18;
const CIRCUMFERENCE = 2 * Math.PI * R;

type Props = {
  scrollSelector?: string;
};

function isWindow(target: Window | HTMLElement): target is Window {
  return target === window;
}

export function ScrollToTopFab({ scrollSelector = ".main-content" }: Props) {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [rippling, setRippling] = React.useState(false);

  React.useEffect(() => {
    const el = document.querySelector(scrollSelector) as HTMLElement | null;
    const target: Window | HTMLElement = el ?? window;

    let ticking = false;

    const getScrollTop = () => {
      return isWindow(target) ? window.scrollY || 0 : target.scrollTop;
    };

    const getMaxScroll = () => {
      if (isWindow(target)) {
        const doc = document.documentElement;
        return Math.max(1, doc.scrollHeight - window.innerHeight);
      }
      return Math.max(1, target.scrollHeight - target.clientHeight);
    };

    const update = () => {
      const y = getScrollTop();
      setVisible(y > SHOW_AFTER_PX);

      const max = getMaxScroll();
      const p = Math.min(1, Math.max(0, y / max));
      const offset = CIRCUMFERENCE * (1 - p);

      btnRef.current?.style.setProperty("--fab-dashoffset", `${offset}`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();

    if (isWindow(target)) {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollSelector]);

  const handleClick = () => {
    setRippling(true);

    const el = document.querySelector(scrollSelector) as HTMLElement | null;

    if (el) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.setTimeout(() => setRippling(false), 520);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label="맨 위로 이동"
      title="맨 위로"
      onClick={handleClick}
      className={[
        "scroll-top-fab",
        visible ? "is-visible" : "is-hidden",
        rippling ? "is-rippling" : "",
      ].join(" ")}
    >
      <svg
        className="scroll-top-fab__ring"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <circle className="scroll-top-fab__track" cx="22" cy="22" r={R} />
        <circle className="scroll-top-fab__progress" cx="22" cy="22" r={R} />
      </svg>

      <span className="scroll-top-fab__ripple" aria-hidden="true" />
      <ArrowUp className="scroll-top-fab__icon" aria-hidden="true" />
    </button>
  );
}
