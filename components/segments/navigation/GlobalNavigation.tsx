"use client";

import Logo from "@/components/segments/molecules/logo";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SimplePageProps = {
  title: string;
  slug: { current: string };
  pageIndex: number;
};

export default function GlobalNavigation({
  pages,
}: {
  pages: SimplePageProps[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Check if scrolled past viewport height for background
      setIsScrolled(currentScrollY > viewportHeight);

      // Check if scrolled past 100vh for hiding/showing
      if (currentScrollY > viewportHeight) {
        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        // Always show when above 100vh
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50 p-6 transition-all duration-300 ease-in-out",
        isScrolled && "bg-primary-8/60",
        !isVisible && "-translate-y-full"
      )}
    >
      <Logo color="white" className="w-auto h-8" />
      <div className="flex flex-row gap-x-6">
        {pages.map((page: SimplePageProps) => (
          <Link
            className="text-white font-gabarito text-lg font-normal"
            key={page.slug.current}
            href={`/${page.slug.current}`}
          >
            {page.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
