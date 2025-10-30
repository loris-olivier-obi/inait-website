import {
  DoubleColumnBlockProps,
  GridBlockProps,
  HeadlineProps,
  TitleHeadlineBlockProps,
  TripleColumnBlockProps,
} from "@/app/type/page";
import DoubleColumn from "@/components/segments/block/DoubleColumn";
import GridBlock from "@/components/segments/block/GridBlock";
import Headline from "@/components/segments/block/Headline";
import TitleHeadline from "@/components/segments/block/TitleHeadline";
import TripleColumn from "@/components/segments/block/TripleColumn";
import { match } from "ts-pattern";

export default function PageContent({
  content,
}: {
  content: (
    | TitleHeadlineBlockProps
    | DoubleColumnBlockProps
    | GridBlockProps
    | HeadlineProps
    | TripleColumnBlockProps
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
          .with("grid", () => (
            <GridBlock key={block._key} {...(block as GridBlockProps)} />
          ))
          .with("headline", () => (
            <Headline key={block._key} {...(block as HeadlineProps)} />
          ))
          .with("tripleColumn", () => (
            <TripleColumn
              key={block._key}
              {...(block as TripleColumnBlockProps)}
            />
          ))
          .with("doubleColumn", () => (
            <DoubleColumn
              key={block._key}
              {...(block as DoubleColumnBlockProps)}
            />
          ))
          .otherwise(() => (
            <div key={block._key}>Unknown block type: {block._type}</div>
          ));
      })}
    </div>
  );
}
