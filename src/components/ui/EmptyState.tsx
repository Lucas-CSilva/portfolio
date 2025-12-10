import { Box, Typography } from '@mui/material';
import { FolderSearch } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10,
        px: 3,
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: '50%',
          mb: 2,
        }}
        className="bg-[var(--bg-elevated)]"
      >
        <FolderSearch className="w-8 h-8 text-[var(--text-muted)]" />
      </Box>
      <Box sx={{ textAlign: 'center', maxWidth: 448 }}>
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: 600 }}
          className="text-[var(--text-primary)]"
        >
          {message}
        </Typography>
        <Typography
          variant="body2"
          className="text-[var(--text-secondary)]"
        >
          Tente selecionar uma tecnologia diferente ou limpe os filtros para visualizar todos os projetos.
        </Typography>
      </Box>
    </Box>
  );
}