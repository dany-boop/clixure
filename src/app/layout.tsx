import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import IntroAnimation from './components/molecules/intro';

export const poppinsLight = Poppins({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-poppins-light',
});

export const poppinsRegular = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins-regular',
});

export const poppinsBold = Poppins({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-poppins-bold',
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clixure Digital',
  description: 'clixure',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsRegular.variable} ${geistMono.variable} antialiased no-scrollbar`}
      >
        <IntroAnimation>{children}</IntroAnimation>
      </body>
    </html>
  );
}
