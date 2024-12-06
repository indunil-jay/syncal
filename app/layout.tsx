import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryClientProvider from "@/app/tanstak-query-provider";
import { Toaster } from "@/app/_components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "syncal",
  description: "syncal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <Toaster />
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
