import Divider from "@/components/molecules/divider";

export default function DividerPortableText({
  value,
}: {
  value: { theme?: string; size?: string; className?: string };
}) {
  return (
    <Divider
      theme={value?.theme ?? "grey"}
      size={value?.size ?? "medium"}
      className="my-4"
    />
  );
}
