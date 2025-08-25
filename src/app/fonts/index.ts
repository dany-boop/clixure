import { Poppins, Geist_Mono } from 'next/font/google';

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

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});