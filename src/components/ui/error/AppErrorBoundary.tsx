import React from "react";

type Props = {
  children: React.ReactNode;
  onGoHome?: () => void;
};

type State = { error: Error | null };

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[AppErrorBoundary]", error, info);
  }

  private reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{ padding: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>문제가 발생했어요</h2>
        <p style={{ margin: 0, marginBottom: 16, opacity: 0.8 }}>
          화면을 다시 시도하거나 홈으로 이동해 주세요.
        </p>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={this.reset}>다시 시도</button>
          <button onClick={this.props.onGoHome}>홈으로</button>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>

        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", opacity: 0.7 }}>
          {this.state.error.message}
        </pre>
      </div>
    );
  }
}
