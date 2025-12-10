import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Box, Grid } from '@mui/material';

interface ProjectGalleryProps {
  projects: Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return <EmptyState message="Nenhum projeto encontrado com este filtro." />;
  }

  return (
    <Grid
      container
      spacing={{ xs: 3, lg: 4 }}
      sx={{
        width: '100%',
        margin: 0,
      }}
    >
      {projects.map((project, index) => (
        <Grid
          size={{xs: 12, sm: 6, lg: 4, xl: 3}}
          key={project.id}
          sx={{
            animation: 'fadeInUp 0.7s ease-out both',
            animationDelay: `${index * 80}ms`,
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(32px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <ProjectCard {...project} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}