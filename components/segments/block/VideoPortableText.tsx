import Image from "next/image";

function getVimeoEmbedUrl(url: string): string {
  const match = url.match(/(?:vimeo\.com\/|video\/)(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&muted=1`;
  }
  return url;
}

function isImageUrl(url = "") {
  return /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(url);
}

export default function VideoPortableText({
  value,
}: {
  value: { url?: string };
}) {
  const videoUrl = value?.url || "";
  if (!videoUrl) return null;
  if (isImageUrl(videoUrl)) {
    return (
      <div className="relative w-full my-4">
        <Image
          src={videoUrl}
          alt={"Image"}
          width={1000}
          height={600}
          className="w-full h-auto"
        />
      </div>
    );
  }
  if (videoUrl.includes("vimeo.com")) {
    return (
      <div className="relative w-full my-4">
        <iframe
          src={getVimeoEmbedUrl(videoUrl)}
          className="w-full aspect-video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Video"
        />
      </div>
    );
  }
  return (
    <div className="relative w-full my-4">
      <video
        src={videoUrl}
        className="w-full h-auto"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
