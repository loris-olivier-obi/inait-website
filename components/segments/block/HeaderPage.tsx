import { HeaderPageProps } from "@/app/type/header";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";

export default function HeaderPage({
  headline,
  subtitle,
  headerImage,
  title,
}: HeaderPageProps) {
  return (
    <div className="relative w-full h-screen">
      <div className="relative z-10 flex flex-col items-start justify-center w-full h-full px-[10vw] text-white">
        <h1 className="font-dm-serif text-[8vw] mb-4 leading-tight">
          {headline}
        </h1>
        <p className="font-gabarito text-4xl">{subtitle}</p>
      </div>
      {headerImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={urlFor(headerImage).width(1920).height(1080).url()}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
