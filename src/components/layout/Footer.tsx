import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm py-12 md:py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Identidade / Copyright */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Desenvolvido por Lucas C. Silva
          </p>
        </div>

        {/* Links Sociais (Reutilizando estilo Ghost para minimalismo) */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
            <a 
              href="https://github.com/lucas-csilva" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ver perfil no GitHub"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </a>
          </Button>
          
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ver perfil no LinkedIn"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </a>
          </Button>

          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
            <a 
              href="mailto:contato@exemplo.com"
              aria-label="Enviar email"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}