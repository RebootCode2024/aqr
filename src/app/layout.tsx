import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquaregia", // This is the title of the page
  description: "Echo of Liberation", // This is the description
  openGraph: {
    title: "Aquaregia", // This is the title that will appear on social media shares
    siteName: "Aquaregia - Echo of Liberation", // This is the name of the site that will appear
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the link to the favicon */}
        <link rel="icon" href="/assets/logo-tpt.png" sizes="64x64" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aquaregia</title> {/* Title tag in case you want to override */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
