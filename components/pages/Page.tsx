import { PageProps } from "@/app/type/page";

export default function Page({ content }: { content: PageProps }) {
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.headline}</p>
    </div>
  );
}
