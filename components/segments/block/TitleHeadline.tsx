import { TitleHeadlineBlockProps } from "@/app/type/page";

export default function TitleHeadline({
  title,
  titleLevel,
  mediaType,
  mediaAlignment,
  image,
  video,
  content,
}: TitleHeadlineBlockProps) {
  return <div>{title}</div>;
}
