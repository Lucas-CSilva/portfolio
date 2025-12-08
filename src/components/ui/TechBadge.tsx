interface TechBadgeProps {
  technology: string;
  active?: boolean;
  onClick?: () => void;
}

export function TechBadge({ technology, active = false, onClick }: TechBadgeProps) {
  const baseClasses = "inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors";
  const colorClasses = active
    ? "bg-accent-primary text-white"
    : "bg-app-elevated text-text-secondary";
  const interactiveClasses = onClick ? "cursor-pointer hover:bg-accent-hover" : "";

  return (
    <span
      className={`${baseClasses} ${colorClasses} ${interactiveClasses}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {technology}
    </span>
  );
}
