'use client';

interface ResultsCounterProps {
  showing: number;
  total: number;
}

export function ResultsCounter({ showing, total }: ResultsCounterProps) {
  const isFiltered = showing < total;

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-muted-foreground">
        Exibindo
      </span>
      <span className={`
        px-2.5 py-1 rounded-full font-mono font-bold text-sm
        transition-all duration-300
        ${isFiltered 
          ? 'bg-primary/10 text-primary border border-primary/20' 
          : 'bg-muted/50 text-foreground border border-border/50'
        }
      `}>
        {showing}
      </span>
      <span className="text-muted-foreground">
        de {total} {total === 1 ? 'projeto' : 'projetos'}
      </span>
    </div>
  );
}
