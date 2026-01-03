import { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      gradient: "linear-gradient(135deg, #E8FCA3 0%, #D4F095 100%)",
      iconColor: "#000",
      borderColor: "#E8FCA3",
      bgGradient: "linear-gradient(135deg, #F8FFE7 0%, #FFFFFF 100%)",
    },
    error: {
      icon: XCircle,
      gradient: "linear-gradient(135deg, #FFAEC0 0%, #FFB6C8 100%)",
      iconColor: "#fff",
      borderColor: "#FFAEC0",
      bgGradient: "linear-gradient(135deg, #FFF9FA 0%, #FFFFFF 100%)",
    },
    info: {
      icon: Info,
      gradient: "linear-gradient(135deg, #C4D9FF 0%, #B8CEFF 100%)",
      iconColor: "#fff",
      borderColor: "#C4D9FF",
      bgGradient: "linear-gradient(135deg, #F0F5FF 0%, #FFFFFF 100%)",
    },
    warning: {
      icon: AlertTriangle,
      gradient: "linear-gradient(135deg, #FFE4CC 0%, #FFD9C0 100%)",
      iconColor: "#fff",
      borderColor: "#FFE4CC",
      bgGradient: "linear-gradient(135deg, #FFF9F5 0%, #FFFFFF 100%)",
    },
  };

  const { icon: Icon, gradient, iconColor, borderColor, bgGradient } = config[type];

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 16,
        zIndex: 10000,
        animation: "toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          minWidth: 280,
          maxWidth: 400,
          padding: "var(--space-3)",
          background: bgGradient,
          border: `2px solid ${borderColor}`,
          borderRadius: "var(--radius-xl)",
          boxShadow: `0 12px 48px ${borderColor}40, 0 4px 16px rgba(0, 0, 0, 0.12)`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-lg)",
            background: gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `0 4px 12px ${borderColor}30`,
          }}
        >
          <Icon size={20} color={iconColor} strokeWidth={2.5} />
        </div>

        {/* Message */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.938rem",
              fontWeight: 600,
              color: "#000",
              lineHeight: 1.4,
            }}
          >
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: 28,
            height: 28,
            borderRadius: "var(--radius-md)",
            background: "rgba(0, 0, 0, 0.04)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.04)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X size={16} color="var(--color-text-tertiary)" strokeWidth={2.5} />
        </button>

        {/* Progress Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            borderRadius: "0 0 var(--radius-xl) var(--radius-xl)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: gradient,
              transformOrigin: "left",
              animation: `toastProgress ${duration}ms linear`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes toastSlideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes toastProgress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
}
