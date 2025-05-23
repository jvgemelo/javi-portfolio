'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProfilePhotoCarouselProps {
  photos: string[];
}

export default function ProfilePhotoCarousel({ photos }: ProfilePhotoCarouselProps) {
  // Filtrar fotos vacías y proporcionar imagen por defecto si no hay fotos
  const validPhotos = photos.filter(photo => photo && photo.trim() !== "");
  const hasPhotos = validPhotos.length > 0;
  const defaultPhoto = "https://yaolajjmtmjgfwlzqtic.supabase.co/storage/v1/object/public/fotos//default-foto.jpg"; // URL a la imagen por defecto de Supabase
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Control de navegación del carrusel
  const goToNext = () => {
    if (isTransitioning || validPhotos.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validPhotos.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Tiempo de la transición
  };

  const goToPrevious = () => {
    if (isTransitioning || validPhotos.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validPhotos.length) % validPhotos.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Tiempo de la transición
  };

  // Obtener los índices de las fotos adyacentes
  const getAdjacentIndices = () => {
    if (validPhotos.length <= 1) return { prev: null, next: null };
    
    const prevIndex = (currentIndex - 1 + validPhotos.length) % validPhotos.length;
    const nextIndex = (currentIndex + 1) % validPhotos.length;
    
    return { prev: prevIndex, next: nextIndex };
  };

  const { prev, next } = getAdjacentIndices();

  // Si no hay fotos, muestra un mensaje y la imagen por defecto
  if (!hasPhotos) {
    return (
      <div className="w-full py-16 relative">
        <h2 className="text-2xl font-bold text-center mb-8">Mis Fotos</h2>
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[300px] h-[350px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={defaultPhoto}
              alt="Foto de perfil por defecto"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-4 text-center text-muted-foreground">No has subido fotos aún</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 relative">
      <h2 className="text-2xl font-bold text-center mb-8">Mis Fotos</h2>
      
      <div className="relative flex justify-center items-center h-[350px] overflow-hidden">
        {/* Foto anterior */}
        {prev !== null && (
          <div 
            className="absolute transform transition-all duration-500 ease-in-out"
            style={{
              left: 'calc(50% - 300px)',
              zIndex: 1,
              opacity: 0.7,
              filter: 'blur(1px)',
              transform: `translateX(-50%) scale(0.7) ${isTransitioning ? 'translateZ(-100px)' : ''}`
            }}
          >
            <div className="relative w-[250px] h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={validPhotos[prev]}
                alt="Foto de perfil"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Foto actual (central) */}
        <div 
          className="relative z-10 transform transition-all duration-500 ease-in-out"
          style={{
            transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
          }}
        >
          <div className="relative w-[300px] h-[350px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={validPhotos[currentIndex]}
              alt="Foto de perfil actual"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Foto siguiente */}
        {next !== null && (
          <div 
            className="absolute transform transition-all duration-500 ease-in-out"
            style={{
              right: 'calc(50% - 300px)',
              zIndex: 1,
              opacity: 0.7,
              filter: 'blur(1px)',
              transform: `translateX(50%) scale(0.7) ${isTransitioning ? 'translateZ(-100px)' : ''}`
            }}
          >
            <div className="relative w-[250px] h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={validPhotos[next]}
                alt="Foto de perfil"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Botones de navegación */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm hover:bg-background/70"
          onClick={goToPrevious}
          disabled={isTransitioning || validPhotos.length <= 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm hover:bg-background/70"
          onClick={goToNext}
          disabled={isTransitioning || validPhotos.length <= 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      </div>
      
      {/* Indicadores de posición */}
      <div className="flex justify-center gap-2 mt-6">
        {validPhotos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-4' : 'bg-muted'
            }`}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentIndex(index);
              setTimeout(() => setIsTransitioning(false), 500);
            }}
          />
        ))}
      </div>
    </div>
  );
} 