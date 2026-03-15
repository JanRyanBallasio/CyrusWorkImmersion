"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type ImageGalleryItem = {
  type: "image";
  src: StaticImageData;
  title: string;
};

type VideoGalleryItem = {
  type: "video";
  src: string;
  title: string;
};

type GalleryItem = ImageGalleryItem | VideoGalleryItem;

export function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = React.useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = React.useState(true);
  const itemCount = items.length;

  const goTo = React.useEffectEvent((nextIndex: number) => {
    const normalized = (nextIndex + itemCount) % itemCount;
    setIndex(normalized);
  });

  const handleManualGoTo = React.useEffectEvent((nextIndex: number) => {
    setAutoplayEnabled(false);
    goTo(nextIndex);
  });

  React.useEffect(() => {
    if (!autoplayEnabled) {
      return;
    }

    const timer = window.setInterval(() => {
      goTo(index + 1);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [autoplayEnabled, index]);

  return (
    <div className="space-y-5">
      <div className="relative">
        <div className="relative aspect-[4/3] min-h-[15rem] overflow-hidden rounded-[1.5rem] sm:aspect-[16/10] sm:min-h-[24rem] lg:min-h-[26rem] sm:rounded-[2rem]">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === index
                  ? "z-10 scale-100 opacity-100 pointer-events-auto"
                  : "z-0 scale-[1.03] opacity-0 pointer-events-none"
              }`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-black">
                  <video
                    key={item.src}
                    src={item.src}
                    className="h-full w-full object-contain"
                    controls={i === index}
                    playsInline
                    preload="metadata"
                  />
                </div>
              )}
              {item.type === "image" ? (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
              ) : null}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleManualGoTo(index - 1)}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 size-9 -translate-y-1/2 border-white/30 bg-black/45 p-0 text-white hover:bg-white hover:text-black sm:left-5 sm:size-10"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleManualGoTo(index + 1)}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 size-9 -translate-y-1/2 border-white/30 bg-black/45 p-0 text-white hover:bg-white hover:text-black sm:right-5 sm:size-10"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => handleManualGoTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index
                ? "w-12 bg-[var(--foreground)]"
                : "w-2.5 bg-[var(--line-strong)]/30 hover:bg-[var(--foreground)]/60"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
