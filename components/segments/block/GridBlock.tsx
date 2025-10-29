import { GridBlockProps, GridCellProps } from "@/app/type/page";
import ArrowIcon from "@/components/segments/molecules/ArrowIcon";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default function GridBlock({
  has_description,
  description,
  cells,
}: GridBlockProps) {
  return (
    <div className="relative w-full flex flex-col py-24">
      {has_description && (
        <div className="w-full text-primary-8 text-2xl font-medium font-gabarito px-10 mb-8">
          <PortableText value={description} />
        </div>
      )}
      <div className="w-full flex items-start px-10">
        {cells?.map((cell: GridCellProps, index: number) => {
          return (
            <div key={cell._key} className="contents">
              <div className="flex-1 flex flex-col">
                {cell.mediaType === "image" && (
                  <Image
                    src={cell.image}
                    alt={cell.title}
                    width={100}
                    height={100}
                    className="w-full h-auto mb-3"
                  />
                )}
                <div className="text-2xl font-medium font-gabarito text-primary-8">
                  {cell.title}
                </div>
                <div className="text-lg text-primary-8 leading-normal">
                  <PortableText value={cell.description} />
                </div>
              </div>
              {index < cells.length - 1 && (
                <div className="relative top-36 mx-12 text-primary-8">
                  <ArrowIcon />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
