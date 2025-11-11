import { ThemeSwitcher } from "@/components/theme-switcher";
import PortfolioNav from "@/components/portfolio-nav";
import ResponsiveNav from "@/components/responsive-nav";
import MobileNav from "@/components/mobile-nav";
import Footer from "@/components/footer";
import { Geist, Geist_Mono } from "next/font/google";
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
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="es" className={`${spaceGrotesk.className} ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <CarouselWrapper images={backgroundImages} /> */}
          <main className=" flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-7 items-center bg-white">
              <nav className="w-full flex justify-center  h-16 backdrop-blur-sm bg-background sticky top-0 z-50 bg-white">
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
              
              <div className="animate-fadeIn flex flex-col max-w-screen w-full backdrop-blur-md bg-white min-h-[calc(100vh-4rem)]">
                {children}
              </div>

              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
