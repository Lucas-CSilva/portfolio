'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { SearchOff } from '@mui/icons-material';

/**
 * 404 page for invalid project slugs
 */
export default function ProjectNotFound() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '70vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: { xs: 8, md: 12 },
                }}
            >
                <Stack spacing={3} alignItems="center" textAlign="center">
                    <SearchOff
                        sx={{
                            fontSize: { xs: 64, md: 80 },
                            color: 'text.secondary',
                            opacity: 0.5,
                        }}
                    />
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2.5rem' },
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Project Not Found
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: 500,
                            fontSize: { xs: '0.95rem', md: '1.05rem' },
                            lineHeight: 1.7,
                        }}
                    >
                        The project you're looking for doesn't exist or has been moved.
                        Check out our other amazing projects instead.
                    </Typography>
                    <Button
                        component={Link}
                        href="/#projects"
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 2,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                        }}
                    >
                        Browse All Projects
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
