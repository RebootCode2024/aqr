import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquaregia",
  description: "Aquaregia - Echo of Liberation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content="Aquaregia - Echo of Liberation" />
        <link rel="icon" href="/assets/logo-tpt.png" sizes="64x64" />
        <title>Aquaregia</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
