import type { Metadata } from 'next';
import { Providers } from './providers';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lucas Silva | Engenheiro de Software',
  description: 'Portfólio de projetos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen relative overflow-x-hidden scroll-smooth">
        <Providers>
          {/* --- CAMADA DE AMBIÊNCIA (NOVO) --- */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-background transition-colors">
             {/* Grade de Pontos (Dot Pattern) - Sutil e Técnica */}
            <div className="absolute h-full w-full bg-[radial-gradient(var(--nord3)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.1]"></div>
            
            {/* Aurora Glow - Um gradiente difuso no topo para dar vida */}
            <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-primary/5 blur-[120px] opacity-10 dark:opacity-20 rounded-full translate-y-[-50%]"></div>
          </div>

          {/* Header */}
          <header className="fixed top-0 right-0 p-6 z-50 flex justify-end w-full pointer-events-none">
            <div className="pointer-events-auto">
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 w-full">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}