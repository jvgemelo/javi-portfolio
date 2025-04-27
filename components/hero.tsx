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
    <div className={`${spaceGrotesk.className} relative flex flex-col items-center gap-8 text-center overflow-hidden`}>
           <div className="absolute inset-0 z-0 flex justify-end">
        <Image
          src="/yo-comics-Photoroom.png"
          alt="Background"
          width={500}
          height={800}
          className="object-contain scale-[1.2]"
          priority
        />
      </div>
      
      <div className="space-y-4 px-4 relative z-10">
        <h2 className="text-lg font-bold sm:text-5xl sm:text-xl">
          Javier García
        </h2>
        <h1 className="text-xl text-chocolate font-bold text-muted-foreground md:text-8xl md:text-chocolate md:font-bold">
          FRONTEND DEVELOPER {"</>"}  
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Bienvenido a mi portfolio personal. Soy un apasionado de la tecnología y el desarrollo de software, 
          especializado en crear aplicaciones web modernas y eficientes.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 relative z-10">
        <Button asChild size="lg" className="bg-caramelo text-crema hover:bg-caramelo/80">
          <Link href="/profile">Ver mi perfil</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="mailto:contacto@ejemplo.com">Contactar</Link>
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 relative z-10">
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
    <div className="rounded-lg border p-6 text-card-foreground shadow-sm transition-all hover:shadow-md backdrop-blur-sm bg-background/60">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-black">{description}</p>
    </div>
  );
}