import Logo from "@/components/segments/molecules/logo";
import Link from "next/link";

type SimplePageProps = {
  title: string;
  slug: { current: string };
};

export default function GlobalNavigation({
  pages,
}: {
  pages: SimplePageProps[];
}) {
  const navPages: SimplePageProps[] = [...pages];

  const homeIndex = navPages.findIndex((page) => page.title === "home");
  if (homeIndex !== -1) {
    const [home] = navPages.splice(homeIndex, 1);
    navPages.unshift(home);
  }

  const newsPage: SimplePageProps = {
    title: "news",
    slug: { current: "news" },
  };
  navPages.push(newsPage);

  return (
    <nav className="fixed top-0 left-0 w-full flex flex-row items-center justify-between z-50 p-6">
      <Logo color="white" className="w-auto h-8" />
      <div className="flex flex-row gap-x-6">
        {navPages.map((page: SimplePageProps) => (
          <Link
            className="text-white font-gabarito text-lg font-normal capitalize"
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
