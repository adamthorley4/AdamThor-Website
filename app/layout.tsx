import type { Metadata } from 'next';
import { Cormorant, DM_Mono, Jost } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dm-mono',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Adam Thor — AI Developer',
  description: "There are hours disappearing from your week that you haven't noticed yet. I find them — then build the solution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${cormorant.variable} ${dmMono.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
