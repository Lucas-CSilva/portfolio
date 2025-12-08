import { FolderSearch } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-muted/50 p-4 rounded-full mb-4">
        <FolderSearch className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="text-center max-w-sm space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          {message}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tente selecionar uma tecnologia diferente ou limpe os filtros para visualizar todos os projetos.
        </p>
      </div>
    </div>
  );
}