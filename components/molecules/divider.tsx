import { cn } from "@/utils/classNames";

type DividerProps = {
  theme: string;
  size: string;
  className?: string;
};

export default function Divider({ theme, size, className }: DividerProps) {
  let backgroundColor;
  let width;

  switch (theme) {
    case "grey":
      backgroundColor = "bg-neutral-2";
      break;
    case "white":
      backgroundColor = "bg-neutral-2";
      break;
    case "blue":
      backgroundColor = "bg-primary-6";
      break;
    default:
      backgroundColor = "bg-neutral-2";
      break;
  }

  switch (size) {
    case "small":
      width = "w-8";
      break;
    case "medium":
      width = "w-24";
      break;
    case "large":
      width = "w-44";
      break;
    default:
      width = "w-8";
      break;
  }

  return (
    <div className={cn("block h-px", className, backgroundColor, width)} />
  );
}
