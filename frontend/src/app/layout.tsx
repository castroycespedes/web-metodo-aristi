import type { Metadata } from 'next';
import { Bebas_Neue, Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
});
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'Metodo Aristi',
  description:
    'Escuela de futbol enfocada en tecnica, creatividad, confianza y mentalidad para jugadores jovenes.',
  openGraph: {
    title: 'Metodo Aristi',
    description:
      'Entrenamientos especializados con balon para formar jugadores tecnicos, creativos y sin miedo.',
    type: 'website',
    locale: 'es_CO',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${bebas.variable} ${oswald.variable}`}>
        {children}
      </body>
    </html>
  );
}
