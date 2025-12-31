import { ReactNode } from 'react';

interface BadgeProps {
  variant: 'dday' | 'reservation' | 'free' | 'ending' | 'new' | 'trending' | 'reminder';
  children: ReactNode;
  size?: 'small' | 'medium';
}

export function Badge({ variant, children, size = 'small' }: BadgeProps) {
  const variants = {
    dday: {
      background: 'var(--color-error)',
      color: 'white',
    },
    reservation: {
      background: 'var(--color-accent)',
      color: 'white',
    },
    free: {
      background: 'var(--color-success)',
      color: 'white',
    },
    ending: {
      background: 'var(--color-warning)',
      color: 'var(--color-gray-900)',
    },
    new: {
      background: 'var(--color-lavender)',
      color: 'var(--color-gray-900)',
    },
    trending: {
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
      color: 'white',
    },
    reminder: {
      background: 'var(--color-peach)',
      color: 'var(--color-gray-900)',
    },
  };

  const sizes = {
    small: {
      padding: 'var(--space-1) var(--space-2)',
      fontSize: '0.75rem',
    },
    medium: {
      padding: 'var(--space-2) var(--space-3)',
      fontSize: '0.875rem',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...sizes[size],
      }}
    >
      {children}
    </span>
  );
}
