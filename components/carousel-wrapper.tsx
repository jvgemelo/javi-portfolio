'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false is allowed in client components
const BackgroundCarousel = dynamic(() => import('./background-carousel'), {
  ssr: false,
});

export default function CarouselWrapper({ images }: { images: string[] }) {
  return <BackgroundCarousel images={images} />;
} 