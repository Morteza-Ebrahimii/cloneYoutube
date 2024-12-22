import { useEffect, useRef, useState } from "react";
import { FormatDuration } from "../utils/Formatduratoin";
import { formatTimeAgo } from "../utils/FormatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATEER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;
    if (isVideoPlaying) {
      videoRef.current.currentTime === 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div className="flex flex-col gap-2 ">
      <a
        onMouseEnter={() => setIsVideoPlaying(true)}
        onMouseLeave={() => setIsVideoPlaying(false)}
        href={`/watch?v=${id}`}
        className="relative aspect-video"
      >
        <img
          src={thumbnailUrl}
          alt="img"
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {FormatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200  ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        ></video>
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt=""
            className="w-12 h-12 rounded-full "
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text  text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATEER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
