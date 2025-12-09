import { Chip } from "@heroui/react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  technology: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Professional, minimal badge styling
 * Uses subtle, monochromatic approach aligned with enterprise design
 */
export function TechBadge({ technology, active = false, onClick }: TechBadgeProps) {
  return (
    <Chip
      variant="flat"
      size="sm"
      radius="sm"
      onClick={onClick}
      classNames={{
        base: cn(
          "border border-divider/50 bg-default-50 transition-all",
          active && "border-accent-primary/50 bg-accent-primary/10",
          onClick && "cursor-pointer hover:border-divider hover:bg-default-100"
        ),
        content: cn(
          "text-xs font-medium tracking-tight text-default-700",
          active && "text-accent-primary font-semibold"
        ),
      }}
    >
      {technology}
    </Chip>
  );
}