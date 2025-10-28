import GlobalNavigation from "@/components/segments/navigation/GlobalNavigation";
import { getMenuItems } from "@/lib/sanity";
import type { Metadata } from "next";
import { DM_Serif_Text, Gabarito } from "next/font/google";
import "./globals.css";

type SimplePageProps = {
  title: string;
  slug: { current: string };
  pageIndex: number;
};

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
  const pages = await getMenuItems();
  const newsPage: SimplePageProps = {
    title: "News",
    slug: { current: "news" },
    pageIndex: pages.menuItems.length - 1,
  };
  const content = [
    ...pages.menuItems.slice(0, -1),
    newsPage,
    pages.menuItems[pages.menuItems.length - 1],
  ];

  return (
    <html lang="en">
      <body
        className={`${gabarito.variable} ${dmSerifText.variable} antialiased`}
      >
        <GlobalNavigation pages={content as SimplePageProps[]} />
        {children}
      </body>
    </html>
  );
}
