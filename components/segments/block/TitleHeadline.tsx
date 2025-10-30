import { TitleHeadlineBlockProps } from "@/app/type/page";
import Divider from "@/components/molecules/divider";
import { cn } from "@/utils/classNames";
import { PortableText } from "next-sanity";
import Image from "next/image";

import styles from "./portabletext.module.css";

function getVimeoEmbedUrl(url: string): string {
  const match = url.match(/(?:vimeo\.com\/|video\/)(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&muted=1`;
  }
  return url;
}

export default function TitleHeadline({
  title,
  titleLevel,
  mediaType,
  mediaAlignment,
  image,
  video,
  content,
  theme,
}: TitleHeadlineBlockProps) {
  let backgroundColor;
  let textColor;

  switch (theme) {
    case "grey":
      backgroundColor = "bg-neutral-1";
      textColor = "text-primary-8";
      break;
    case "blue":
      backgroundColor = "bg-primary-8";
      textColor = "text-white";
      break;
    case "white":
      backgroundColor = "bg-white";
      textColor = "text-primary-8";

      break;
    default:
      backgroundColor = "bg-neutral-1";
      textColor = "text-primary-8";
      break;
  }

  let mainTitle;

  switch (titleLevel) {
    case "h2":
      mainTitle = (
        <h2 className="block font-dm-serif text-[104px] font-bold mb-0!">
          {title}
        </h2>
      );
      break;
    case "h3":
      mainTitle = (
        <h3 className="block font-dm-serif text-7xl font-bold mb-7!">
          {title}
        </h3>
      );
      break;
    case "h4":
      mainTitle = (
        <h4 className="block font-dm-serif text-4xl font-bold">{title}</h4>
      );
      break;
    case "h5":
      mainTitle = (
        <h5 className="block font-dm-serif text-2xl font-bold uppercase tracking-wide">
          {title}
        </h5>
      );
      break;
    default:
      mainTitle = (
        <h2 className="block font-dm-serif text-[86px] font-bold">{title}</h2>
      );
      break;
  }

  let textClass;
  switch (theme) {
    case "grey":
      textClass = styles.textGrey;
      break;
    case "blue":
      textClass = styles.textBlue;
      break;
    default:
      textClass = styles.textGrey;
      break;
  }

  let flexDirection;
  switch (mediaAlignment) {
    case "left":
      flexDirection = "flex-row-reverse";
      break;
    case "right":
      flexDirection = "flex-row";
      break;
    case "none":
      flexDirection = "flex-row";
      break;
    default:
      flexDirection = "flex-row";
      break;
  }

  return (
    <div
      className={cn(
        "relative w-full flex items-center",
        mediaAlignment === "none" ? "py-[30vh]" : "py-[12vh]",
        backgroundColor,
        textColor,
        flexDirection,
      )}
    >
      <section className="relative w-1/2 px-20">
        {mainTitle}
        <Divider theme={theme} size="medium" className="mb-8" />
        <div className={cn(styles.content, textClass)}>
          <PortableText value={content} />
        </div>
      </section>
      {mediaType === "image" && (
        <section className="relative w-1/2 px-10">
          <Image
            src={image}
            className=" w-full h-auto"
            alt={title}
            width={1000}
            height={1000}
          />
        </section>
      )}
      {mediaType === "video" && (
        <section className="w-1/2 px-10">
          {video?.includes("vimeo.com") ? (
            <iframe
              src={getVimeoEmbedUrl(video)}
              className="w-full aspect-video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : (
            <video
              src={video}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </section>
      )}
    </div>
  );
}
