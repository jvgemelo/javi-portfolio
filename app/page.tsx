import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
});

export default async function Home() {
  return (
    <div className={`${spaceGrotesk.className} relative flex flex-col items-center gap-8 text-center overflow-hidden min-h-[85vh]`}>
      <div className="space-y-4 px-4 relative w-full">
        <h2 className="text-lg font-bold sm:text-xl">
          Javier García
        </h2>
        <div className="flex flex-col pt-[10vh] sm:pt-[14vh] pb-[6vh] sm:pb-[10vh]">
          <div className="hidden sm:flex absolute left-4 sm:left-8 z-[25] flex-col gap-2 mt-4 bg-white p-2 py-4 sm:py-8 rounded-full border border-black/10 shadow-lg">
            <div className="color-box group relative"> 
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-black rounded-md transition-all duration-300 group-hover:scale-110"></div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-lg font-bold absolute left-12 sm:left-16 top-2 sm:top-3">#000000</span>
            </div>
            <div className="color-box group relative">
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-[#4a4a4a] rounded-md transition-all duration-300 group-hover:scale-110"></div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-lg font-bold absolute left-12 sm:left-16 top-2 sm:top-3">#4a4a4a</span>
            </div>
            <div className="color-box group relative">
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-white border border-black/20 rounded-md transition-all duration-300 group-hover:scale-110"></div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-lg font-bold absolute left-12 sm:left-16 top-2 sm:top-3">#ffffff</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-8xl text-black font-bold text-center relative z-[30]">
            FRONTEND
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-8xl text-black font-bold text-center">
            <span>DEVELOPER {"</>"}</span>
          </h1>
          <div className="">
            <p className="text-sm font-bold text-center bg-white/80 p-3 rounded-lg">
              Convierto ideas en proyectos de software tangibles.<br/>
              Automatización, acceso a datos, estadísticas, digitalización.
            </p>
          </div>

          <div className="block sm:hidden mt-6 px-4">
            <p className="text-sm font-bold text-center bg-white/80 p-3 rounded-lg">
              Bienvenido a mi portfolio personal. Soy un apasionado de la tecnología y el desarrollo de software, 
              especializado en crear aplicaciones web modernas y eficientes.
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden sm:flex absolute top-0 right-0 mr-4 sm:mr-16 max-w-[250px] h-full items-center z-[20] px-4">
        <p className="text-lg font-bold text-right">
          Bienvenido a mi portfolio personal. Soy un apasionado de la tecnología y el desarrollo de software, 
          especializado en crear aplicaciones web modernas y eficientes.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 relative z-[20] mt-auto sm:mt-0">
        <Button asChild size="lg" className="bg-black text-white hover:bg-black/90 transition-all shadow-lg">
          <Link href="/profile">Ver mi perfil</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contacto">Contactar</Link>
        </Button>
      </div>
      <div>
        <img src="/computer-black.png" alt="computer" className="rounded-md"/>
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
