import { PortableTextBlock } from "next-sanity";

export type TitleHeadlineBlockProps = {
  _type: string;
  _key: string;
  title: string;
  titleLevel: string;
  mediaType: string;
  mediaAlignment: string;
  image: string;
  video: string;
  content: PortableTextBlock;
};

export type DoubleColumnBlockProps = {
  _type: string;
  _key: string;
  leftColumn: PortableTextBlock;
  rightColumn: PortableTextBlock;
};

export type PageProps = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  headline?: string;
  subtitle?: string;
  headerImage?: string;
  content: (TitleHeadlineBlockProps | DoubleColumnBlockProps)[];
};
