import { type ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  icon,
}: ButtonProps) {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    borderRadius: "var(--radius-lg)",
    fontWeight: 600,
    transition: "all 0.2s",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    width: fullWidth ? "100%" : "auto",
  };

  const sizeStyles = {
    small: {
      padding: "var(--space-2) var(--space-4)",
      fontSize: "0.875rem",
    },
    medium: {
      padding: "var(--space-3) var(--space-6)",
      fontSize: "1rem",
    },
    large: {
      padding: "var(--space-4) var(--space-8)",
      fontSize: "1.125rem",
    },
  };

  const variantStyles = {
    primary: {
      background: disabled ? "var(--color-gray-300)" : "var(--color-accent)",
      color: "white",
      boxShadow: disabled ? "none" : "var(--shadow-md)",
    },
    secondary: {
      background: disabled
        ? "var(--color-gray-200)"
        : "var(--color-primary-bg)",
      color: disabled ? "var(--color-gray-400)" : "var(--color-primary)",
      border: `2px solid ${disabled ? "var(--color-gray-300)" : "var(--color-primary)"}`,
    },
    ghost: {
      background: "transparent",
      color: disabled ? "var(--color-gray-400)" : "var(--color-text-secondary)",
    },
  };

  const hoverStyles = !disabled
    ? {
        primary: {
          transform: "translateY(-1px)",
          boxShadow: "var(--shadow-lg)",
        },
        secondary: { background: "var(--color-primary-light)", color: "white" },
        ghost: { background: "var(--color-gray-100)" },
      }
    : {};

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      className={`button button-${variant} button-${size}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled && hoverStyles[variant]) {
          Object.assign(e.currentTarget.style, hoverStyles[variant]);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, variantStyles[variant]);
        }
      }}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
}
