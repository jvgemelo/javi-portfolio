'use client';

import { useState, useCallback, ReactNode } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  showArrows?: boolean;
  showIndicators?: boolean;
  minHeight?: string;
  arrowColor?: string;
  activeIndicatorColor?: string;
  inactiveIndicatorColor?: string;
  transitionDuration?: string;
}

export default function Carousel<T>({
  items,
  renderItem,
  showArrows = true,
  showIndicators = true,
  minHeight = "400px",
  arrowColor = "text-chocolate",
  activeIndicatorColor = "bg-chocolate",
  inactiveIndicatorColor = "bg-caramelo hover:bg-chocolate/70",
  transitionDuration = "duration-[1500ms]",
}: CarouselProps<T>) {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const previousSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleManualNavigation = useCallback((newIndex: number) => {
    setCurrent(newIndex);
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden relative">
      <div 
        className={`flex transition-transform ease-in-out ${transitionDuration}`} 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full flex items-center justify-center"
            style={{ minHeight }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Controles de navegación (flechas e indicadores) */}
      {(showArrows || showIndicators) && items.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-50 pointer-events-none">
          {/* Flecha izquierda */}
          {showArrows && (
            <button 
              onClick={previousSlide}
              className={`pointer-events-auto hover:scale-110 transition-transform duration-200 ${arrowColor} text-2xl`}
              aria-label="Anterior"
            >
              <BsFillArrowLeftCircleFill />
            </button>
          )}
          
          {/* Indicadores de puntos */}
          {showIndicators && (
            <div className="flex justify-center gap-3 pointer-events-none">
              {items.map((_, i) => {
                return (
                  <div 
                    onClick={() => handleManualNavigation(i)}
                    key={"circle" + i}
                    className={`rounded-full w-5 h-5 cursor-pointer transition-colors duration-200 pointer-events-auto ${
                      i === current ? activeIndicatorColor : inactiveIndicatorColor
                    }`}
                  />  
                );
              })}
            </div>
          )}
          
          {/* Flecha derecha */}
          {showArrows && (
            <button 
              onClick={nextSlide}
              className={`pointer-events-auto hover:scale-110 transition-transform duration-200 ${arrowColor} text-2xl`}
              aria-label="Siguiente"
            >
              <BsFillArrowRightCircleFill />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

