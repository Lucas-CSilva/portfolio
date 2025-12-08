interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="text-center max-w-md">
        <p className="text-xl text-text-secondary mb-4">{message}</p>
        <p className="text-text-muted">
          Try selecting a different technology or clear the filter to see all projects.
        </p>
      </div>
    </div>
  );
}
