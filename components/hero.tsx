import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-8 py-12 text-center lg:py-20">
      <div className="space-y-4 px-4">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          Javier García
        </h1>
        <h2 className="text-lg text-muted-foreground sm:text-xl">
          Desarrollador de Software
        </h2>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Bienvenido a mi portfolio personal. Soy un apasionado de la tecnología y el desarrollo de software, 
          especializado en crear aplicaciones web modernas y eficientes.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/profile">Ver mi perfil</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="mailto:contacto@ejemplo.com">Contactar</Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
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
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md backdrop-blur-sm bg-background/60">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
