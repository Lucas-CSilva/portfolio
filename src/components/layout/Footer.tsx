'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { Button, Link, Divider } from '@heroui/react';

export function Footer() {
  return (
    <footer className="w-full py-12 md:py-16">
      <Divider />
      <div className="container mx-auto px-6 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <div>
          <p className="text-sm font-medium text-foreground">
            Desenvolvido por Lucas C. Silva
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="light" 
            size="sm" 
            as={Link}
            href="https://github.com/lucas-csilva"
            isExternal
            startContent={<Github className="h-5 w-5" />}
          >
            GitHub
          </Button>
          
          <Button 
            variant="light" 
            size="sm" 
            as={Link}
            href="https://linkedin.com"
            isExternal
            startContent={<Linkedin className="h-5 w-5" />}
          >
            LinkedIn
          </Button>

          <Button 
            variant="light" 
            size="sm" 
            as={Link}
            href="mailto:contato@exemplo.com"
            startContent={<Mail className="h-5 w-5" />}
          >
            Email
          </Button>
        </div>
      </div>
    </footer>
  );
}