import type { Metadata } from 'next';
import { Bebas_Neue, Inter, Oswald } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/app-providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'Método Aristi',
  description: 'Academia de tecnificación Método Aristi',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} ${oswald.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
