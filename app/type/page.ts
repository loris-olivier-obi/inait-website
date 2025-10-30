import { PortableTextBlock } from "next-sanity";

export type HeadlineProps = {
  _type: string;
  _key: string;
  title: string;
  level: string;
  theme: string;
};

export type ContactFormBlockProps = {
  _type: string;
  _key: string;
  title: string;
  emailAddress: string;
  phoneNumber: string;
  message: PortableTextBlock;
  address: PortableTextBlock;
};

export type GridCellProps = {
  _key: string;
  title: string;
  description: PortableTextBlock;
  mediaType: string;
  image: string;
  video: string;
};

export type GridBlockProps = {
  _type: string;
  _key: string;
  has_description: boolean;
  description: PortableTextBlock;
  cells: GridCellProps[];
};

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
  theme: string;
};

export type DoubleColumnBlockProps = {
  _type: string;
  _key: string;
  leftColumn: PortableTextBlock;
  rightColumn: PortableTextBlock;
  theme: string;
};

export type TripleColumnBlockProps = {
  _type: string;
  _key: string;
  firstColumn: PortableTextBlock;
  secondColumn: PortableTextBlock;
  thirdColumn: PortableTextBlock;
  theme: string;
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
  content: (
    | TitleHeadlineBlockProps
    | DoubleColumnBlockProps
    | GridBlockProps
    | HeadlineProps
  )[];
};
