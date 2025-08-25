"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import slide1 from "@/assets/home/carousel/slide1.webp";
import slide2 from "@/assets/home/carousel/slide2.webp";
import slide3 from "@/assets/home/carousel/slide3.webp";

export default function HomeCarousel() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
        className="relative"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="relative w-full h-[150px]">
              <Image
                src={slide1}
                alt="Slide 1"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full h-[150px]">
              <Image
                src={slide2}
                alt="Slide 2"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full h-[150px]">
              <Image
                src={slide3}
                alt="Slide 3"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
