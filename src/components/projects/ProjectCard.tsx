import type { Project } from '@/lib/types';
import { TechBadge } from '@/components/ui/TechBadge';
import { Card, CardContent, Link, Box, Typography, Divider } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard(project: Project) {
  return (
    <Link
      href={project.liveUrl || project.repoUrl || '#'}
      target={project.liveUrl || project.repoUrl ? '_blank' : undefined}
      rel={project.liveUrl || project.repoUrl ? 'noopener noreferrer' : undefined}
      underline="none"
      sx={{
        display: 'block',
        height: '100%',
        '&:hover .project-title': {
          color: 'var(--accent-primary)',
        },
        '&:hover .project-icon': {
          color: 'var(--accent-primary)',
          transform: 'translate(2px, -2px)',
        },
      }}
    >
      <Card
        elevation={0}
        sx={{
          height: '100%',
          border: '1px solid',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'var(--accent-primary)',
            borderOpacity: 0.3,
          },
        }}
        className="border-[var(--border-default)] bg-[var(--bg-surface)]/50"
      >
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                className="project-title text-[var(--text-primary)]"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  mb: 1,
                  transition: 'color 0.2s',
                }}
              >
                {project.title}
              </Typography>
              <Typography
                variant="body2"
                className="text-[var(--text-secondary)]"
                sx={{
                  lineHeight: 1.6,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {project.description}
              </Typography>
            </Box>
            <ArrowUpRight className="project-icon w-4 h-4 flex-shrink-0 text-[var(--text-muted)] transition-all" />
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <Divider className="border-[var(--border-default)]" sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {project.technologies.slice(0, 4).map((tech) => (
                <TechBadge key={tech} technology={tech} />
              ))}
              {project.technologies.length > 4 && (
                <Typography
                  variant="caption"
                  className="text-[var(--text-muted)]"
                  sx={{ alignSelf: 'center', fontSize: '0.75rem' }}
                >
                  +{project.technologies.length - 4}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}