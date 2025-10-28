import { DoubleColumnBlockProps } from "@/app/type/page";
import { PortableText } from "next-sanity";

export default function DoubleColumn({
  leftColumn,
  rightColumn,
}: DoubleColumnBlockProps) {
  return (
    <div className="flex flex-col w-full min-h-screen md:flex-row gap-4">
      <div className="w-1/2">
        <PortableText value={leftColumn} />
      </div>
      <div className="w-1/2">
        <PortableText value={rightColumn} />
      </div>
    </div>
  );
}
