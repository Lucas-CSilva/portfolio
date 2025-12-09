'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { Link, Divider } from '@heroui/react';

export function Footer() {
  return (
    <footer className="w-full border-t border-divider bg-default-50/30">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <div>
            <p className="text-sm text-default-500">
              © {new Date().getFullYear()} Lucas C. Silva. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com/lucas-csilva"
              isExternal
              className="text-sm text-default-500 hover:text-accent-primary transition-colors flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
            
            <Link 
              href="https://linkedin.com"
              isExternal
              className="text-sm text-default-500 hover:text-accent-primary transition-colors flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </Link>

            <Link 
              href="mailto:contato@exemplo.com"
              className="text-sm text-default-500 hover:text-accent-primary transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}