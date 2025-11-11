import Image from "next/image";

// Mapeo de tecnologías a sus iconos
const techIcons: Record<string, string> = {
  NextJS: "/react.png", // Usar React como fallback para NextJS
  TailwindCSS: "/tailwind.png",
  TypeScript: "/typescript.png",
  Supabase: "/supabase.jpg",
  React: "/react.png",
  PostgreSQL: "/Postgresql_elephant.svg.png",
  MongoDB: "/MongoDB.png",
  JavaScript: "/js.png",
  HTML: "/html-5.png",
  CSS: "/CSS3.webp",
  Java: "/java.png",
  Docker: "/docker.png",
};

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  repoUrl: string;
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div 
      className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:scale-105"
    >
      {/* Área de la foto con borde blanco grueso (estilo Polaroid) */}
      <div className="bg-white p-3 border-b-4 border-white">
        <div className="aspect-video relative w-full bg-white border-2 border-gray-100">
          {project.imageUrl ? (
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              fill 
              className="object-contain object-top p-1" 
            />
          ) : (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <p className="text-black font-bold text-lg">Vista previa</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Área de texto inferior (estilo Polaroid - espacio para escribir) */}
      <div className="px-4 py-4 bg-white min-h-[140px] flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2 text-black text-center">{project.title}</h3>
          <p className="text-black text-xs mb-4 text-center leading-relaxed">{project.description}</p>
        </div>
        
        {/* Tecnologías con iconos */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {project.technologies.map((tech) => {
            const iconPath = techIcons[tech];
            return (
              <span
                key={tech}
                className="text-[10px] px-2 py-1 bg-gray-100 text-black rounded-full border border-gray-300 flex items-center gap-1 shadow-sm"
              >
                {iconPath && (
                  <Image 
                    src={iconPath} 
                    alt={tech} 
                    width={14} 
                    height={14} 
                    className="object-contain flex-shrink-0"
                  />
                )}
                <span className="whitespace-nowrap">{tech}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

