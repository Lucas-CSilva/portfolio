import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  technology: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Nord-themed color mapping for technology badges
 * Uses Frost (nord7-10) and Aurora (nord11-15) colors
 */
const getTechBadgeColor = (tech: string): string => {
  const techLower = tech.toLowerCase();
  
  // Frost colors (Blue/Cyan family) - nord7-10
  if (techLower.includes('react') || techLower.includes('next')) {
    return 'bg-[oklch(0.696_0.17_162.48)] text-[oklch(0.129_0.042_264.695)] dark:bg-[oklch(0.696_0.17_162.48)]/20 dark:text-[oklch(0.696_0.17_162.48)] dark:border-[oklch(0.696_0.17_162.48)]/40';
  }
  if (techLower.includes('typescript') || techLower.includes('javascript')) {
    return 'bg-[oklch(0.769_0.188_70.08)] text-[oklch(0.129_0.042_264.695)] dark:bg-[oklch(0.769_0.188_70.08)]/20 dark:text-[oklch(0.769_0.188_70.08)] dark:border-[oklch(0.769_0.188_70.08)]/40';
  }
  if (techLower.includes('node') || techLower.includes('express')) {
    return 'bg-[oklch(0.627_0.265_303.9)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.627_0.265_303.9)]/20 dark:text-[oklch(0.627_0.265_303.9)] dark:border-[oklch(0.627_0.265_303.9)]/40';
  }
  
  // Aurora colors (Vibrant accents) - nord11-15
  if (techLower.includes('css') || techLower.includes('tailwind') || techLower.includes('sass')) {
    return 'bg-[oklch(0.488_0.243_264.376)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.488_0.243_264.376)]/20 dark:text-[oklch(0.488_0.243_264.376)] dark:border-[oklch(0.488_0.243_264.376)]/40';
  }
  if (techLower.includes('firebase') || techLower.includes('stripe') || techLower.includes('api')) {
    return 'bg-[oklch(0.645_0.246_16.439)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.645_0.246_16.439)]/20 dark:text-[oklch(0.645_0.246_16.439)] dark:border-[oklch(0.645_0.246_16.439)]/40';
  }
  if (techLower.includes('d3') || techLower.includes('chart') || techLower.includes('recharts')) {
    return 'bg-[oklch(0.828_0.189_84.429)] text-[oklch(0.129_0.042_264.695)] dark:bg-[oklch(0.828_0.189_84.429)]/20 dark:text-[oklch(0.828_0.189_84.429)] dark:border-[oklch(0.828_0.189_84.429)]/40';
  }
  if (techLower.includes('mdx') || techLower.includes('contentful') || techLower.includes('cms')) {
    return 'bg-[oklch(0.704_0.191_22.216)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.704_0.191_22.216)]/20 dark:text-[oklch(0.704_0.191_22.216)] dark:border-[oklch(0.704_0.191_22.216)]/40';
  }
  
  // Default: Muted Nord colors
  return 'bg-muted/70 text-muted-foreground border border-border/50';
};

export function TechBadge({ technology, active = false, onClick }: TechBadgeProps) {
  const colorClasses = active ? '' : getTechBadgeColor(technology);
  
  return (
    <Badge
      variant={active ? "default" : "secondary"}
      className={cn(
        "transition-all duration-200 font-mono text-xs tracking-wide font-semibold",
        "shadow-sm hover:shadow-md",
        onClick && "cursor-pointer hover:scale-105 active:scale-95",
        !active && colorClasses,
        active && "shadow-lg shadow-primary/20"
      )}
      onClick={onClick}
    >
      {technology}
    </Badge>
  );
}