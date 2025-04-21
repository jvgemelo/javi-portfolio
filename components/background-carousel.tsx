'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type BackgroundCarouselProps = {
  images: string[];
  interval?: number;
};

export default function BackgroundCarousel({
  images,
  interval = 8000,
}: BackgroundCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
          style={{
            opacity: index === currentImageIndex ? 0.2 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        >
          <Image
            src={src}
            alt="Background image"
            fill
            priority
            quality={90}
            className="object-cover blur-[2px]"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-background z-10" />
    </div>
  );
} 