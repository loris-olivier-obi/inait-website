import { HeadlineProps } from "@/app/type/page";
import { cn } from "@/utils/classNames";

export default function Headline({ title, level, theme }: HeadlineProps) {
  let mainTitle;

  switch (level) {
    case "h2":
      mainTitle = (
        <h2 className="font-dm-serif text-[86px] font-bold mb-0!">{title}</h2>
      );
      break;
    case "h3":
      mainTitle = <h3 className="text-3xl font-bold">{title}</h3>;
      break;
    case "h4":
      mainTitle = <h4 className="text-2xl font-bold">{title}</h4>;
      break;
    default:
      mainTitle = (
        <h2 className="font-dm-serif text-[86px] font-bold">{title}</h2>
      );
      break;
  }

  let backgroundColor;

  switch (theme) {
    case "grey":
      backgroundColor = "bg-neutral-1";
      break;
    case "blue":
      backgroundColor = "bg-primary-8";
      break;
    case "white":
      backgroundColor = "bg-white";
      break;
    default:
      backgroundColor = "bg-neutral-1";
      break;
  }

  return (
    <div
      className={cn(
        "relative w-full flex flex-col pt-20 px-10 text-primary-8",
        backgroundColor,
      )}
    >
      {mainTitle}
    </div>
  );
}
