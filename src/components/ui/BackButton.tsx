'use client';

import { Button, alpha, useTheme } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export function BackButton() {
    const theme = useTheme();
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
                color: 'text.secondary',
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&:hover': {
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
            }}
        >
            Back to Projects
        </Button>
    );
}
