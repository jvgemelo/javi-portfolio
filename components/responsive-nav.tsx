'use client';

import { useEffect, useState } from 'react';
import PortfolioNav from './portfolio-nav';

// Tamaño en píxeles para una tablet pequeña
const TABLET_BREAKPOINT = 768;

export default function ResponsiveNav() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  useEffect(() => {
    // Actualizar el estado solo en el cliente
    setIsMounted(true);
    
    // Establecer ancho inicial
    const updateWidth = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobileView(width < TABLET_BREAKPOINT);
    };
    
    updateWidth();
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Durante SSR o antes de montar, simplemente renderizar el componente normal
  // para evitar cambios de layout durante la hidratación
  if (!isMounted) {
    return <PortfolioNav />;
  }
  
  if (isMobileView) {
    // En móvil, solo retornamos el MobileNav, que se renderizará desde otro lugar
    return null;
  }
  
  // En pantallas más grandes, mostrar en la barra de navegación
  return <PortfolioNav />;
} 