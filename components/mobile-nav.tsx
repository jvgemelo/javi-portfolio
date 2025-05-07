'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileAuth from './mobile-auth';

// Tamaño en píxeles para una tablet pequeña
const TABLET_BREAKPOINT = 768;

// Los mismos enlaces que en PortfolioNav
const navigationLinks = [
  { name: "Proyectos", href: "/proyectos" },
  { name: "Perfil", href: "/profile" },
  { name: "Contacto", href: "/contacto" },
];

export default function MobileNav() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsMounted(true);
    
    const updateWidth = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobileView(width < TABLET_BREAKPOINT);
    };
    
    updateWidth();
    
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Evitar scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  if (!isMounted || !isMobileView) {
    return null;
  }
  
  return (
    <>
      {/* Botón de hamburguesa - reposicionado para evitar superposiciones */}
      <div className="fixed top-0 right-0 z-50 m-3 flex items-center">
        <button 
          onClick={toggleMenu}
          className="p-2 rounded-md bg-background/70 hover:bg-background shadow-md transition-colors"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
      
      {/* Menú desplegable con transición mejorada */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transform transition-all duration-300 ease-in-out overflow-y-auto ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none translate-y-[-8px]'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-full py-20 px-8">
          {/* Logo en el menú móvil */}
          <div className="mb-12">
            <Link href="/" onClick={toggleMenu} className="text-3xl font-bold bg-black bg-clip-text text-transparent">
              Javi Portfolio
            </Link>
          </div>
          
          {/* Navegación */}
          <nav className="flex flex-col items-center gap-8 text-xl w-full">
            <Link 
              href="/" 
              onClick={toggleMenu} 
              className={`transition-colors hover:text-primary ${pathname === '/' ? 'text-primary font-medium' : 'text-foreground'}`}
            >
              Inicio
            </Link>
            
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`transition-colors hover:text-primary ${
                    isActive ? 'text-primary font-medium' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Opciones de autenticación */}
          <MobileAuth />
          
          {/* Redes sociales en el menú móvil */}
          <div className="mt-12 flex gap-6">
            <a href="https://github.com/jvgemelo" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/javier-garcia-segovia-678842243/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://www.instagram.com/javier_garcia_segovia/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 