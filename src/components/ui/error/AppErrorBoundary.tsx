import React from "react";
import { AlertTriangle, Home, RefreshCcw, RotateCcw, Clipboard } from "lucide-react";

type Props = {
  children: React.ReactNode;
  onGoHome?: () => void;
};

type State = {
  error: Error | null;
  showDetails: boolean;
  copied: boolean;
};

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, showDetails: false, copied: false };

  static getDerivedStateFromError(error: Error): State {
    return { error, showDetails: false, copied: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[AppErrorBoundary]", error, info);
  }

  private reset = () => this.setState({ error: null, showDetails: false, copied: false });

  private toggleDetails = () => this.setState((s) => ({ ...s, showDetails: !s.showDetails }));

  private copyDetails = async () => {
    const { error } = this.state;
    if (!error) return;
    const text = `${error.name}: ${error.message}\n\n${error.stack ?? ""}`;
    try {
      await navigator.clipboard.writeText(text);
      this.setState({ copied: true }, () =>
        setTimeout(() => this.setState({ copied: false }), 1400)
      );
    } catch {
      // noop
    }
  };

  render() {
    if (!this.state.error) return this.props.children;

    const { onGoHome } = this.props;
    const { error, showDetails, copied } = this.state;

    return (
      <div
        role="alert"
        aria-live="assertive"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
          display: "grid",
          placeItems: "center",
          padding: "var(--space-6)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 640,
            borderRadius: "var(--radius-2xl)",
            background: "white",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.10)",
            overflow: "hidden",
            animation: "efade 220ms ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "var(--space-6)",
              background: "linear-gradient(135deg, #FFF5F7 0%, #F0E7FF 100%)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 18px rgba(255, 182, 217, 0.35)",
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={26} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  lineHeight: 1.2,
                }}
              >
                문제가 발생했어요
              </h2>
              <p
                style={{
                  margin: 0,
                  marginTop: 6,
                  color: "var(--color-text-secondary)",
                  fontSize: "0.938rem",
                }}
              >
                아래 버튼으로 다시 시도하거나 홈으로 이동해 주세요.
              </p>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-4)" }}>
            {/* Actions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-3)",
              }}
            >
              <button
                onClick={this.reset}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "var(--radius-xl)",
                  background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
                  boxShadow: "0 6px 18px rgba(217, 249, 95, 0.35)",
                  fontWeight: 700,
                }}
              >
                <RotateCcw size={18} />
                다시 시도
              </button>

              {onGoHome && (
                <button
                  onClick={onGoHome}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 16px",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "white",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  <Home size={18} />
                  홈으로
                </button>
              )}

              <button
                onClick={() => window.location.reload()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                <RefreshCcw size={18} />
                새로고침
              </button>

              <button
                onClick={this.copyDetails}
                title="오류 상세 복사"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                <Clipboard size={18} />
                {copied ? "복사됨!" : "상세 복사"}
              </button>

              <button
                onClick={this.toggleDetails}
                aria-expanded={showDetails}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {showDetails ? "상세 닫기" : "상세 보기"}
              </button>
            </div>

            {/* Details */}
            {showDetails && (
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "var(--radius-xl)",
                  background: "linear-gradient(135deg, #F8FFE7 0%, #FFFFFF 100%)",
                  padding: "var(--space-4)",
                  animation: "efade 140ms ease-out",
                }}
              >
                <strong style={{ display: "block", marginBottom: 8 }}>
                  {error?.name ?? "Error"}
                </strong>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {error?.stack ?? error?.message}
                </pre>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes efade {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
}
