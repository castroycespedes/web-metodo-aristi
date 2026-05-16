"use client";

import { Quote, Star } from "lucide-react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type TestimonialsSliderProps = {
  testimonials: Testimonial[];
};

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow, Pagination]}
      autoplay={{
        delay: 3600,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      centeredSlides
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 120,
        modifier: 1.8,
        slideShadows: false
      }}
      effect="coverflow"
      grabCursor
      loop
      pagination={{ clickable: true }}
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2
        },
        1180: {
          slidesPerView: 3
        }
      }}
      className="!pb-14"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.author} className="h-auto">
          <article className="group mx-auto flex min-h-80 max-w-md flex-col justify-between rounded-sm border border-brand-line bg-brand-panel/92 p-6 shadow-soft transition duration-300 hover:-translate-y-2 hover:border-brand-cyan/70 hover:shadow-glow-strong">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Quote className="text-brand-cyan" size={34} />
                <div className="flex gap-1 text-brand-cyan">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={17} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-7 text-brand-white/80">{testimonial.quote}</p>
            </div>
            <div className="mt-8 border-t border-brand-line pt-5">
              <p className="font-display text-3xl leading-none text-brand-white">{testimonial.author}</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-brand-cyan">
                {testimonial.role}
              </p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
