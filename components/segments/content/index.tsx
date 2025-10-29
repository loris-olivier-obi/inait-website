import {
  DoubleColumnBlockProps,
  GridBlockProps,
  TitleHeadlineBlockProps,
} from "@/app/type/page";
import DoubleColumn from "@/components/segments/block/DoubleColumn";
import GridBlock from "@/components/segments/block/GridBlock";
import TitleHeadline from "@/components/segments/block/TitleHeadline";
import { match } from "ts-pattern";

export default function PageContent({
  content,
}: {
  content: (
    | TitleHeadlineBlockProps
    | DoubleColumnBlockProps
    | GridBlockProps
  )[];
}) {
  return (
    <div>
      {content.map((block) => {
        return match(block._type)
          .with("titleHeadline", () => (
            <TitleHeadline
              key={block._key}
              {...(block as TitleHeadlineBlockProps)}
            />
          ))
          .with("doubleColumn", () => (
            <DoubleColumn
              key={block._key}
              {...(block as DoubleColumnBlockProps)}
            />
          ))
          .with("grid", () => (
            <GridBlock key={block._key} {...(block as GridBlockProps)} />
          ))
          .otherwise(() => (
            <div key={block._key}>Unknown block type: {block._type}</div>
          ));
      })}
    </div>
  );
}
