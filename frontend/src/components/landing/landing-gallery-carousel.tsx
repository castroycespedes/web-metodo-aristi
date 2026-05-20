'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type GalleryItem = {
  title: string;
  position: string;
};

export function LandingGalleryCarousel({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleItems = useMemo(() => {
    if (!items.length) return [];
    return [0, 1, 2].map((offset) => {
      const index = (activeIndex + offset + items.length) % items.length;
      return { ...items[index], index };
    });
  }, [activeIndex, items]);

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [items.length]);

  function previous() {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  }

  function next() {
    setActiveIndex((current) => (current + 1) % items.length);
  }

  if (!items.length) {
    return null;
  }

  return (
    <div className="relative mt-9">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <article
            key={`${item.title}-${item.index}`}
            className="group relative h-72 overflow-hidden border border-white/10 bg-[#0B1220]"
          >
            <Image
              src="/images/football-training.jpg"
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
              className="object-cover transition duration-500 group-hover:scale-110"
              style={{ objectPosition: item.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-primary">
                Metodo Aristi
              </p>
              <h3 className="mt-2 text-2xl font-black uppercase leading-none">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={previous}
          aria-label="Imagen anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary transition hover:border-primary hover:bg-primary/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Ir a ${item.title}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'h-2.5 rounded-full transition-all',
                index === activeIndex ? 'w-9 bg-primary' : 'w-2.5 bg-white/25',
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Imagen siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary transition hover:border-primary hover:bg-primary/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
