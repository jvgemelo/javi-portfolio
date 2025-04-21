import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import PortfolioNav from "@/components/portfolio-nav";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";

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

// Imágenes por defecto para el fondo
const defaultBackgroundImages = [
  "/images/profile1.jpg",
  "/images/profile2.jpg",
  "/images/profile3.jpg",
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Intentar obtener fotos del usuario para el fondo
  let backgroundImages = defaultBackgroundImages;
  
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: userData } = await supabase
        .from('user_data')
        .select('fotos')
        .eq('user_id', user.id)
        .single();
      
        if (userData?.fotos && typeof userData.fotos === 'string') {
          const parsedPhotos = JSON.parse(userData.fotos);
          if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
            backgroundImages = parsedPhotos;
          }
        }
    }
  } catch (error) {
    console.error('Error al cargar fotos de fondo:', error);
    // Si hay un error, seguimos usando las imágenes por defecto
  }

  return (
    <html lang="es" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CarouselWrapper images={backgroundImages} />
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 backdrop-blur-sm bg-background/70">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"} className="text-xl font-bold">Javi Portfolio</Link>
                    <PortfolioNav />
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5 backdrop-blur-sm bg-background/50 rounded-lg shadow-xl">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 backdrop-blur-sm bg-background/70">
                <p>
                  Desarrollado por Javier
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
