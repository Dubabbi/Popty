export function PullingOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.8)",
        zIndex: 100,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div style={{ fontSize: "4rem", animation: "spin 1s linear infinite" }}>
        🎰
      </div>
    </div>
  );
}
