import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <div className={`${spaceGrotesk.className} relative flex flex-col items-center gap-8 text-center overflow-hidden min-h-[85vh]`}>
      <div className="absolute inset-0 z-[1] flex justify-center items-center">
        <Image
          src="/yo-portfolio-Photoroom.png"
          alt="Background"
          width={700}
          height={1200}
          className="object-contain max-w-full h-auto"
          priority  
        />
      </div>
      
      <div className="space-y-4 px-4 relative w-full">
        <h2 className="text-lg font-bold sm:text-xl">
          Javier García
        </h2>
        <div className="flex flex-col pt-[10vh] sm:pt-[14vh] pb-[6vh] sm:pb-[10vh]">
          <div className="hidden sm:flex absolute left-4 sm:left-8 z-[25] flex-col gap-2 mt-4 bg-white p-2 py-4 sm:py-8 rounded-full">
            <div className="color-box group relative">
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-chocolate rounded-md transition-all duration-300 group-hover:scale-110"></div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-lg font-bold absolute left-12 sm:left-16 top-2 sm:top-3">#5e3023</span>
            </div>
            <div className="color-box group relative">
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-caramelo rounded-md transition-all duration-300 group-hover:scale-110"></div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-lg font-bold absolute left-12 sm:left-16 top-2 sm:top-3">#c08552</span>
            </div>
            <div className="color-box group relative">
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-crema rounded-md transition-all duration-300 group-hover:scale-110"></div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-lg font-bold absolute left-12 sm:left-16 top-2 sm:top-3">#f3e9dc</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-8xl text-chocolate font-bold ml-0 sm:ml-[20vw] text-center sm:text-left relative z-[30]">
            FRONTEND
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-8xl text-chocolate font-bold ml-0 sm:ml-44 text-center">
            <span>DEVEL<span className="inline-block w-[3rem] sm:w-[6rem]"></span>OPER {"</>"}</span>
          </h1>
        </div>
      </div>
      
      <div className="absolute top-8 sm:top-0 right-0 mr-4 sm:mr-16 max-w-[250px] h-auto sm:h-full flex items-center z-[20] px-4">
        <p className="text-sm sm:text-lg font-bold text-center sm:text-right bg-white/80 sm:bg-transparent p-2 rounded-lg sm:p-0 z-[50]">
          Bienvenido a mi portfolio personal. Soy un apasionado de la tecnología y el desarrollo de software, 
          especializado en crear aplicaciones web modernas y eficientes.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 relative z-[20] mt-auto sm:mt-0">
        <Button asChild size="lg" className="bg-caramelo text-crema hover:bg-caramelo/80">
          <Link href="/profile">Ver mi perfil</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contacto">Contactar</Link>
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:gap-20 md:grid-cols-3 relative z-10">
        <FeatureCard 
          title="Desarrollo Web" 
          description="Especializado en React, Next.js y otras tecnologías modernas para crear experiencias web interactivas."
        />
        <FeatureCard 
          title="Base de Datos" 
          description="Experiencia en Supabase, PostgreSQL y otras tecnologías para gestionar datos de manera eficiente."
        />
        <FeatureCard 
          title="Diseño UI/UX" 
          description="Enfoque en crear interfaces de usuario atractivas y experiencias de usuario intuitivas."
        />
      </div>
    </div>
  );
}

function FeatureCard({ 
  title, 
  description 
}: { 
  title: string; 
  description: string; 
}) {
  return (
    <div className="rounded-lg border p-4 sm:p-6 text-card-foreground shadow-sm w-[80vw] sm:w-[25vw] transition-all hover:shadow-md backdrop-blur-sm bg-background/60">
      <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      <p className="mt-2 text-black text-sm sm:text-base">{description}</p>
    </div>
  );
}