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
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-gabarito text-5xl font-bold mb-4">{headline}</h1>
        <p className="font-dm-serif text-xl">{subtitle}</p>
      </div>
      {headerImage && (
        <div className="absolute inset-0 z-0">
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
