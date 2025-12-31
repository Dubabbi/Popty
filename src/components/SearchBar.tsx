import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = 'Search pop-ups, brands, areas...', onSearch }: SearchBarProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        style={{
          width: '100%',
          padding: 'var(--space-3) var(--space-4) var(--space-3) var(--space-12)',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--color-gray-200)',
          fontSize: '1rem',
          background: 'var(--color-bg)',
          transition: 'all 0.2s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107, 138, 255, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-gray-200)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      <Search
        size={20}
        style={{
          position: 'absolute',
          left: 'var(--space-4)',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-text-tertiary)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
