import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";

export default function ImagePortableText({
  value,
}: {
  value: { asset?: { _ref?: string; _type?: string }; alt?: string };
}) {
  if (!value?.asset) return null;
  const imageUrl = urlFor(value.asset).width(1920).height(1080).url();
  if (!imageUrl?.startsWith("http")) return null;
  return (
    <div className="relative w-full my-4">
      <Image
        src={imageUrl}
        alt={value.alt || ""}
        width={1920}
        height={1080}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}
