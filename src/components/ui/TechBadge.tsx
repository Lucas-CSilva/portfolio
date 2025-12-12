import { Chip } from '@mui/material';

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
      variant={active ? 'filled' : 'outlined'}
      color={active ? 'primary' : 'default'}
      sx={{
        fontSize: '0.75rem',
        fontWeight: active ? 600 : 500,
        letterSpacing: '-0.01em',
        transition: 'all 0.2s',
        cursor: onClick ? 'pointer' : 'default',
        borderColor: active ? 'primary.main' : 'divider',
        backgroundColor: active ? 'primary.main' : 'background.paper',
        color: active ? 'primary.contrastText' : 'text.secondary',
        opacity: active ? 1 : 0.85,
        '&:hover': onClick ? {
          opacity: 1,
          backgroundColor: active ? 'primary.dark' : 'action.hover',
          borderColor: active ? 'primary.dark' : 'text.secondary',
        } : {},
      }}
    />
  );
}