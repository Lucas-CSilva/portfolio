import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] text-center px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
          Olá, eu sou o <span className="text-primary">Lucas</span>.
        </h1>
        
        <div className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-4 font-light">
          <p>
            Desenvolvedor backend e cientista da computação
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Button variant="default" className="h-11 px-8 rounded-full shadow-sm hover:shadow-md transition-all">
            <Mail className="mr-2 h-4 w-4" />
            Contato
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" asChild>
              <a href="https://github.com/lucas-csilva" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 opacity-70 hover:opacity-100 transition-opacity" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 opacity-70 hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}