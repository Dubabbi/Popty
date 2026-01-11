import type { CSSProperties } from "react";

export const MAX_CALENDAR_WIDTH = 430;

export const wrapperStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: MAX_CALENDAR_WIDTH,
  boxSizing: "border-box",
};

export const triggerButtonStyle = (isOpen: boolean, hasStart: boolean): CSSProperties => ({
  width: "100%",
  padding: "var(--space-4)",
  paddingLeft: 48,
  border: `2px solid ${isOpen ? "#D9F95F" : "rgba(0, 0, 0, 0.08)"}`,
  borderRadius: "var(--radius-xl)",
  fontSize: "1rem",
  background: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textAlign: "left",
  position: "relative",
  color: hasStart ? "#000" : "var(--color-text-tertiary)",
  fontWeight: hasStart ? 600 : 400,
  boxShadow: isOpen ? "0 0 0 4px rgba(217, 249, 95, 0.1)" : "none",
  boxSizing: "border-box",
});

export const calendarIconStyle: CSSProperties = {
  position: "absolute",
  left: 16,
  top: "50%",
  transform: "translateY(-50%)",
};

export const backdropStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 998,
};

export const dropdownStyle: CSSProperties = {
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  right: 0,
  width: "100%",
  background: "white",
  borderRadius: "var(--radius-xl)",
  boxShadow: "0 12px 48px rgba(0, 0, 0, 0.16)",
  padding: "var(--space-4)",
  zIndex: 999,
  animation: "calendarSlideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  border: "2px solid #D9F95F",
  boxSizing: "border-box",
};

export const monthNavStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "var(--space-4)",
  padding: "0 var(--space-2)",
};

export const monthNavButtonStyle: CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "var(--radius-md)",
  border: "none",
  background: "rgba(217, 249, 95, 0.15)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const weekHeaderStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "var(--space-1)",
  marginBottom: "var(--space-2)",
};

export const daysGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "var(--space-1)",
};

export const actionsStyle: CSSProperties = {
  marginTop: "var(--space-4)",
  display: "flex",
  gap: "var(--space-2)",
};

export const resetButtonStyle: CSSProperties = {
  flex: 1,
  padding: "var(--space-3)",
  border: "2px solid rgba(0, 0, 0, 0.08)",
  borderRadius: "var(--radius-lg)",
  background: "white",
  fontSize: "0.938rem",
  fontWeight: 600,
  color: "var(--color-text-secondary)",
  cursor: "pointer",
};

export const confirmButtonStyle: CSSProperties = {
  flex: 1,
  padding: "var(--space-3)",
  border: "none",
  borderRadius: "var(--radius-lg)",
  background: "#D9F95F",
  fontSize: "0.938rem",
  fontWeight: 700,
  color: "#000",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(217, 249, 95, 0.3)",
};

export const animationsCss = `
  @keyframes calendarSlideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
