import { News } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

import Link from "next/link";
import styles from "./newsCard.module.css";

export default function NewsCard({ content }: { content: News }) {
  return (
    <div className="relative w-full gap-y-3 flex flex-col items-start">
      <div className="relative w-full mb-5 overflow-hidden rounded-xl shadow">
        <Image
          src={content.image}
          alt={content.title}
          width={1000}
          height={1000}
          className="w-full h-auto"
        />
      </div>
      <div className="relative w-full">
        <div className="font-dm-serif text-4xl font-semibold text-white mb-2">
          {content.title}
        </div>
        <div className={styles.content}>
          <PortableText value={content.summary} />
        </div>
      </div>

      <Link
        href={content.link}
        className="text-white border border-solid border-white px-16 py-4 rounded-full font-gabarito text-xl font-medium mt-4 transition-colors hover:bg-white hover:text-primary-8 duration-500 ease-in-out"
      >
        Read article
      </Link>
    </div>
  );
}
