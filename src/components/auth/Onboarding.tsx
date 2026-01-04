import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/client";
import { Toast, type ToastType } from "@/components/Toast";

type TagCategory = {
  code: string;
  name_ko: string;
};

export default function Onboarding() {
  const MOBILE_BP = 500;

  function useIsMobile(bp = MOBILE_BP) {
    const [isMobile, setIsMobile] = useState(
      () => window.matchMedia(`(max-width:${bp}px)`).matches
    );

    useEffect(() => {
      const mq = window.matchMedia(`(max-width:${bp}px)`);
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

      // safari 대응
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else mq.addListener(handler);

      setIsMobile(mq.matches);

      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", handler);
        else mq.removeListener(handler);
      };
    }, [bp]);

    return isMobile;
  }
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<ToastType>("error");
  const [categories, setCategories] = useState<TagCategory[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const selectedList = useMemo(
    () => categories.filter((c) => selected.has(c.code)),
    [categories, selected]
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tag_categories")
        .select("code, name_ko")
        .order("code", { ascending: true });

      if (cancelled) return;

      if (error) {
        setToastMsg("오류가 발생했어요!");
        setToastType("error");
        setToastOpen(true);
        setCategories([]);
      } else {
        setCategories((data ?? []) as TagCategory[]);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleCategory = (code: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      if (next.has(code)) {
        next.delete(code);
        return next;
      }

      if (next.size >= 5) {
        setToastMsg("5개 이하로 선택해 주세요.");
        setToastType("error");
        setToastOpen(true);
        return next;
      }

      next.add(code);
      return next;
    });
  };

  const submit = async (items: TagCategory[]) => {
    if (submitting) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.rpc("set_my_categories", {
        p_codes: items.map((i) => i.code),
      });
      if (error) throw error;

      navigate("/", { replace: true });
    } catch (e) {
      console.error("set_my_tags_v2 error:", e);
      alert("저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = async () => {
    const etc = categories.find((c) => c.code === "ETC") ?? { code: "ETC", name_ko: "기타" };
    await submit([etc]);
  };

  const handleComplete = async () => {
    if (selectedList.length < 1) return;
    await submit(selectedList);
  };
  const styles = {
    full: {
      minHeight: "100vh",
      background: "#eee",
      display: "flex",
      flexDirection: "column" as const,
    },
    page: {
      minHeight: "100vh",
      maxWidth: "400px",
      minWidth: "370px",
      width: "100%",
      margin: "0 auto",
      background: "#ffffff",
      padding: "16px 20px 22px",
      display: "flex",
      flexDirection: "column" as const,
      fontFamily: "Pretendard",
    },
    topBar: {
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconButton: (disabled: boolean) => ({
      width: 44,
      height: 44,
      border: "none",
      background: "transparent",
      padding: 0,
      marginLeft: -10,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#1c1e20",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    }),
    skipButton: (disabled: boolean) => ({
      border: "none",
      background: "transparent",
      padding: 0,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "19px",
      color: "#ff7651",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
    }),
    body: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      paddingTop: 18,
    },
    title: {
      margin: "0 0 22px",
      fontSize: 24,
      fontWeight: 700,
      lineHeight: "34px",
      color: "#1c1e20",
    },
    hint: {
      margin: 0,
      fontSize: 13,
      fontWeight: 600,
      lineHeight: "19px",
      color: "#808284",
    },
    grid: {
      width: "100%",
      maxWidth: 335,
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      columnGap: 6,
      rowGap: 12,
    },
    chipBase: (disabled: boolean) => ({
      height: 40,
      padding: 10,
      border: "none",
      borderRadius: 8,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: 600,
      lineHeight: "19px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.65 : 1,
      userSelect: "none" as const,
    }),
    chipOn: {
      background: "#FFF0EC",
      color: "#FF7651",
    },
    chipOff: {
      background: "#F2F4F6",
      color: "#808284",
    },
    bottom: {
      paddingTop: 18,
      display: "flex",
      justifyContent: "center",
    },
    completeButton: (disabled: boolean) => ({
      width: "100%",
      maxWidth: 335,
      height: 56,
      border: "none",
      borderRadius: 12,
      background: disabled ? "#E7EAEE" : "#FF7651",
      color: disabled ? "#A7ADB4" : "#FFFFFF",
      fontSize: 16,
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
    }),
  };

  const fullStyle = isMobile ? { minHeight: "100vh", background: "#fff" } : styles.full;
  return (
    <div style={fullStyle}>
      <div style={styles.page}>
        <div style={styles.topBar}>
          <button
            type="button"
            onClick={handleSkip}
            disabled={submitting}
            style={styles.skipButton(submitting)}
          >
            건너뛰기
          </button>
        </div>

        <div style={styles.body}>
          <h1 style={styles.title}>
            좋아하는 카테고리를
            <br />
            선택해주세요.
          </h1>

          {loading ? (
            <p style={styles.hint}>불러오는 중...</p>
          ) : (
            <div style={styles.grid} aria-label="category-grid">
              {categories.map((c) => {
                const isOn = selected.has(c.code);
                return (
                  <button
                    key={c.code}
                    type="button"
                    aria-pressed={isOn}
                    onClick={() => toggleCategory(c.code)}
                    disabled={submitting}
                    style={{
                      ...styles.chipBase(submitting),
                      ...(isOn ? styles.chipOn : styles.chipOff),
                    }}
                  >
                    {c.name_ko}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div style={styles.bottom}>
          <button
            type="button"
            onClick={handleComplete}
            disabled={submitting || selectedList.length < 1}
            style={styles.completeButton(submitting || selectedList.length < 1)}
          >
            {submitting ? "저장 중..." : "완료"}
          </button>
        </div>
        {toastOpen && (
          <Toast
            message={toastMsg}
            type={toastType}
            duration={2200}
            onClose={() => setToastOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
