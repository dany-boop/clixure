import type { Metadata } from 'next';
import './globals.css';
import IntroAnimation from './components/molecules/intro';
import { geistMono, poppinsRegular } from './fonts';

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
