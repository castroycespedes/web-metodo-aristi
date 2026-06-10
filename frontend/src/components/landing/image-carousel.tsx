'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ImageCarouselProps = {
  images: string[];
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  interval?: number;
};

export function ImageCarousel({
  images,
  alt,
  priority = false,
  className,
  imageClassName,
  interval = 5200,
}: ImageCarouselProps) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const slides = total > 1 ? [...images, ...images] : images;

  useEffect(() => {
    if (total <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, total]);

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + total) % total);
  };

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <div
        className="flex h-full [--carousel-step:100%] transition-transform duration-700 ease-out md:[--carousel-step:33.333333%]"
        style={{ transform: `translateX(calc(-${active} * var(--carousel-step)))` }}
      >
        {slides.map((src, index) => (
          <div key={`${src}-${index}`} className="relative h-full min-w-full md:min-w-[33.333333%]">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority && index === 0}
              sizes="(min-width: 768px) 33vw, 100vw"
              className={cn('object-cover', imageClassName)}
            />
          </div>
        ))}
      </div>
      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={() => move(-1)}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-black/45 text-primary transition hover:border-primary hover:bg-primary/15"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={() => move(1)}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-black/45 text-primary transition hover:border-primary hover:bg-primary/15"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Ver imagen ${index + 1}`}
              onClick={() => setActive(index)}
              className={cn(
                'h-2.5 rounded-full border border-primary/70 transition-all',
                index === active ? 'w-7 bg-primary' : 'w-2.5 bg-black/45 hover:bg-primary/60',
              )}
            />
          ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
