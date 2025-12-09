import { Chip } from "@heroui/react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  technology: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Nord-themed color mapping for technology badges
 * Returns HeroUI color and custom classes
 */
const getTechBadgeStyle = (tech: string): { color?: string; className: string } => {
  const techLower = tech.toLowerCase();
  
  // Frost colors (Blue/Cyan family) - nord7-10
  if (techLower.includes('react') || techLower.includes('next')) {
    return {
      className: 'bg-[oklch(0.696_0.17_162.48)] text-[oklch(0.129_0.042_264.695)] dark:bg-[oklch(0.696_0.17_162.48)]/20 dark:text-[oklch(0.696_0.17_162.48)]'
    };
  }
  if (techLower.includes('typescript') || techLower.includes('javascript')) {
    return {
      className: 'bg-[oklch(0.769_0.188_70.08)] text-[oklch(0.129_0.042_264.695)] dark:bg-[oklch(0.769_0.188_70.08)]/20 dark:text-[oklch(0.769_0.188_70.08)]'
    };
  }
  if (techLower.includes('node') || techLower.includes('express')) {
    return {
      className: 'bg-[oklch(0.627_0.265_303.9)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.627_0.265_303.9)]/20 dark:text-[oklch(0.627_0.265_303.9)]'
    };
  }
  
  // Aurora colors (Vibrant accents) - nord11-15
  if (techLower.includes('css') || techLower.includes('tailwind') || techLower.includes('sass')) {
    return {
      className: 'bg-[oklch(0.488_0.243_264.376)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.488_0.243_264.376)]/20 dark:text-[oklch(0.488_0.243_264.376)]'
    };
  }
  if (techLower.includes('firebase') || techLower.includes('stripe') || techLower.includes('api')) {
    return {
      className: 'bg-[oklch(0.645_0.246_16.439)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.645_0.246_16.439)]/20 dark:text-[oklch(0.645_0.246_16.439)]'
    };
  }
  if (techLower.includes('d3') || techLower.includes('chart') || techLower.includes('recharts')) {
    return {
      className: 'bg-[oklch(0.828_0.189_84.429)] text-[oklch(0.129_0.042_264.695)] dark:bg-[oklch(0.828_0.189_84.429)]/20 dark:text-[oklch(0.828_0.189_84.429)]'
    };
  }
  if (techLower.includes('mdx') || techLower.includes('contentful') || techLower.includes('cms')) {
    return {
      className: 'bg-[oklch(0.704_0.191_22.216)] text-[oklch(0.984_0.003_247.858)] dark:bg-[oklch(0.704_0.191_22.216)]/20 dark:text-[oklch(0.704_0.191_22.216)]'
    };
  }
  
  // Default: use HeroUI default color
  return { className: '' };
};

export function TechBadge({ technology, active = false, onClick }: TechBadgeProps) {
  const style = getTechBadgeStyle(technology);
  
  return (
    <Chip
      variant={active ? "solid" : "flat"}
      color={active ? "primary" : "default"}
      size="sm"
      radius="sm"
      onClick={onClick}
      className={cn(
        "font-mono text-xs tracking-wide font-semibold",
        onClick && "cursor-pointer",
        !active && style.className
      )}
    >
      {technology}
    </Chip>
  );
}