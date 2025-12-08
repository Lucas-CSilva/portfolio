import type { Metadata } from 'next';
import { Providers } from './providers';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio - Nord Design',
  description: 'A modern portfolio showcasing projects with Nord theme',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
