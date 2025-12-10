import { Chip } from '@mui/material';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  technology: string;
  active?: boolean;
  onClick?: () => void;
}

export function TechBadge({ technology, active = false, onClick }: TechBadgeProps) {
  return (
    <Chip
      label={technology}
      size="small"
      onClick={onClick}
      sx={{
        fontSize: '0.75rem',
        fontWeight: active ? 600 : 500,
        letterSpacing: '-0.01em',
        transition: 'all 0.2s',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          borderColor: 'divider',
        } : {},
      }}
      className={cn(
        'border',
        active 
          ? 'border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
          : 'border-[var(--border-default)]/50 bg-[var(--bg-surface)] text-[var(--text-secondary)]',
        onClick && 'hover:bg-[var(--bg-elevated)]'
      )}
    />
  );
}