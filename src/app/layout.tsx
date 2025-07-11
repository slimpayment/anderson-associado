import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import TopProgressBar from '@/components/TopProgressBar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Licenciado para : ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
  description: "Demonstração",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased `}>

        {children}
        <Toaster richColors position="top-right" closeButton={true} duration={3000} />
      <TopProgressBar />



      </body>
    </html>







  );
}
