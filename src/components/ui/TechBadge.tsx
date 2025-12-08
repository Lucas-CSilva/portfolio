import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  technology: string;
  active?: boolean;
  onClick?: () => void;
}

export function TechBadge({ technology, active = false, onClick }: TechBadgeProps) {
  return (
    <Badge
      variant={active ? "default" : "secondary"}
      className={cn(
        "transition-all duration-300 font-mono text-xs tracking-wide",
        onClick && "cursor-pointer hover:opacity-80",
        !active && "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
      )}
      onClick={onClick}
    >
      {technology}
    </Badge>
  );
}