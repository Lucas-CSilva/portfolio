import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Lucas Silva | Developer',
  description: 'Portfólio de projetos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.className}>
      <body className="flex flex-col min-h-screen relative overflow-x-hidden scroll-smooth">
        <Providers>
          {/* Background Ambience Layer */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-background transition-colors">
            {/* Subtle Dot Pattern */}
            <div className="absolute h-full w-full bg-[radial-gradient(var(--nord3)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.1]"></div>
            
            {/* Aurora Glow Effect */}
            <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-primary/5 blur-[120px] opacity-10 dark:opacity-20 rounded-full translate-y-[-50%]"></div>
          </div>

          {/* Header with Navigation */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}