import { ThemeSwitcher } from "@/components/theme-switcher";
import PortfolioNav from "@/components/portfolio-nav";
import ResponsiveNav from "@/components/responsive-nav";
import MobileNav from "@/components/mobile-nav";
import { Geist } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

// Cliente-side wrapper for BackgroundCarousel
import CarouselWrapper from "../components/carousel-wrapper";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Javier - Portfolio Personal",
  description: "Portfolio profesional con mis proyectos y experiencia",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
});

// Agregamos la fuente caligráfica para la firma
const dancingScript = Dancing_Script({
  display: "swap",
  subsets: ["latin"],
  weight: ["700"], // Usamos negrita para mayor impacto
});

// Imágenes por defecto para el fondo
const defaultBackgroundImages = [
  "/images/profile1.jpg",
  "/images/profile2.jpg",
  "/images/profile3.jpg",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Imágenes estáticas para el fondo
  const backgroundImages = defaultBackgroundImages;

  return (
    <html lang="es" className={spaceGrotesk.className} suppressHydrationWarning>
      <body className="bg-white p-6 text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <CarouselWrapper images={backgroundImages} /> */}
          <main className=" flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-7 items-center bg-crema">
              <nav className="w-full flex justify-center  h-16 backdrop-blur-sm bg-background sticky top-0 z-50 bg-crema">
              <div className="w-full max-w-screen flex justify-between items-center p-3 px-5 text-sm">
                  <div className="w-1/4">
                    <Link href={"/"} className={`text-4xl font-bold bg-black bg-clip-text text-transparent hover:scale-105 transition-transform ${dancingScript.className}`}>Javier</Link>
                  </div>
                  <div className="w-2/4 flex justify-center">
                    <ResponsiveNav />
                  </div>
                  <div className="w-1/4 flex justify-end items-center gap-4">
                    {/* <div className="ml-2 hidden md:block">
                      <ThemeSwitcher />
                    </div> */}
                  </div>
                </div>
              </nav>
              {/* Navegación móvil que solo se muestra en pantallas pequeñas basado en píxeles */}
              <MobileNav />
              
              <div className="animate-fadeIn flex flex-col max-w-screen w-full backdrop-blur-md bg-crema">
                {children}
              </div>

             {/*} <footer className="w-full border-t border-foreground/10 backdrop-blur-sm bg-black fixed bottom-0 left-0">
                <div className="max-w-5xl mx-auto py-4 sm:py-8 px-5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Javier</span>
                    <span className="text-sm text-muted-foreground">© {new Date().getFullYear()}</span>
                  </div>
                  {/* Muestra de los tres colores 
                  <div className="flex justify-center gap-4 md:w-auto mb-2">
                      <div className="w-10 h-10 bg-crema rounded-md shadow-md relative group hover:scale-110 transition-transform cursor-pointer">
                        <span className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background/90 text-xs font-medium rounded transition-opacity">crema</span>
                      </div>
                      <div className="w-10 h-10 bg-caramelo rounded-md shadow-md relative group hover:scale-110 transition-transform cursor-pointer">
                        <span className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background/90 text-xs font-medium rounded transition-opacity">caramelo</span>
                      </div>
                      <div className="w-10 h-10 bg-chocolate rounded-md shadow-md relative group hover:scale-110 transition-transform cursor-pointer">
                        <span className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background/90 text-xs font-medium rounded transition-opacity">chocolate</span>
                      </div>
                    </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-6">
                      <a href="https://github.com/jvgemelo" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/javier-garcia-segovia-678842243/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/javier_garcia_segovia/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                      <div className="md:hidden">
                        <ThemeSwitcher />
                      </div>
                    </div>
                  </div>
                </div>
              </footer> */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
