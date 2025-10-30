import { DoubleColumnBlockProps } from "@/app/type/page";
import { cn } from "@/utils/classNames";
import { PortableText } from "next-sanity";
import DividerPortableText from "./DividerPortableText";
import ImagePortableText from "./ImagePortableText";
import VideoPortableText from "./VideoPortableText";

import styles from "./doubleColumn.module.css";

export default function DoubleColumn({
  leftColumn,
  rightColumn,
  theme,
}: DoubleColumnBlockProps) {
  const portableComponents = {
    types: {
      divider: DividerPortableText,
      image: ImagePortableText,
      video: VideoPortableText,
    },
  } as const;

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

  return (
    <div
      className={cn(
        "flex flex-col w-full md:flex-row gap-12 py-32",
        backgroundColor,
      )}
    >
      <div className={cn(styles.content, textColor, "w-1/2")}>
        <PortableText value={leftColumn} components={portableComponents} />
      </div>
      <div className={cn(styles.content, textColor, "w-1/2")}>
        <PortableText value={rightColumn} components={portableComponents} />
      </div>
    </div>
  );
}
