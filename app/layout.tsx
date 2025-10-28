import GlobalNavigation from "@/components/segments/navigation/GlobalNavigation";
import { getPagesForNavigation } from "@/lib/sanity";
import type { Metadata } from "next";
import { DM_Serif_Text, Gabarito } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "inait - Adaptive Intelligence With Digital Brains",
  description:
    "AI that learns, understands, and interacts with the world like the brain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getPagesForNavigation();

  return (
    <html lang="en">
      <body
        className={`${gabarito.variable} ${dmSerifText.variable} antialiased`}
      >
        <GlobalNavigation pages={pages} />
        {children}
      </body>
    </html>
  );
}
