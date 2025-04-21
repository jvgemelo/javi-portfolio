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
            <div className="flex-1 w-full flex flex-col gap-7 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 backdrop-blur-sm bg-background/80 sticky top-0 z-50 shadow-md">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center">
                    <Link href={"/"} className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform">Javi Portfolio</Link>
                    <PortfolioNav />
                  </div>
                  <div className="flex items-center gap-4">
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                    <div className="ml-2 hidden md:block">
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </nav>
              
              <div className="animate-fadeIn flex flex-col gap-14 max-w-5xl w-full p-8 backdrop-blur-md bg-background/60 rounded-xl shadow-2xl border border-foreground/5">
                {children}
              </div>

              <footer className="w-full border-t border-foreground/10 backdrop-blur-sm bg-background/80 mt-10">
                <div className="max-w-5xl mx-auto py-8 px-5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Javier</span>
                    <span className="text-sm text-muted-foreground">© {new Date().getFullYear()}</span>
                  </div>
                  
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
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
