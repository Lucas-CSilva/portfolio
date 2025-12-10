'use client';

import { Box, Link, Typography, Container } from '@mui/material';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        borderTop: '1px solid',
      }}
      className="border-[var(--border-default)] bg-[var(--bg-surface)]/30"
    >
      <Container maxWidth={false} className="page-container">
        <Box
          sx={{
            py: 6,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Typography variant="body2" className="text-[var(--text-secondary)]">
            © {new Date().getFullYear()} Lucas C. Silva. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Link
              href="https://github.com/lucas-csilva"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.875rem',
                transition: 'color 0.2s',
              }}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            >
              <Github className="h-4 w-4" />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                GitHub
              </Box>
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.875rem',
                transition: 'color 0.2s',
              }}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            >
              <Linkedin className="h-4 w-4" />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                LinkedIn
              </Box>
            </Link>

            <Link
              href="mailto:contato@exemplo.com"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.875rem',
                transition: 'color 0.2s',
              }}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            >
              <Mail className="h-4 w-4" />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Contact
              </Box>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}