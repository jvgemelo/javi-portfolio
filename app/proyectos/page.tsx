import Link from "next/link";
import Image from "next/image";

// Datos de ejemplo para los proyectos
const projects = [
  {
    id: 1,
    title: "Gráficos Renault",
    description:
      "Gráficos para Renault, con datos de producción, procesos y filtros.",
    technologies: ["NextJS", "TailwindCSS","TypeScript", "PostgreSQL", "React", "WebRTC"],
    imageUrl: "/renault-graphs.jpg",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Ajos Viewer",
    description:
      "Aplicación para visualizar cámaras en vivo de producción de Ajos.",
    technologies: ["NextJS", "TailwindCSS","TypeScript", "PostgreSQL", "React", "RabbitMQ"],
    imageUrl: "/ajos-viewer.jpg",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 3,
    title: "Porce Inspection",
    description:
      "Aplicación para inspeccionar y marcar defectos en piezas de cerámica.",
    technologies: ["React", "Vite", "MongoDB", "TypeScript","KonvaJS"],
    imageUrl: "/porce-inspection.jpg",
    demoUrl: "#",
    repoUrl: "#",
  },
];

export default function Projects() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-center mb-12">Proyectos en los que he trabajado</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="rounded-lg border overflow-hidden bg-card shadow-sm hover:shadow-md transition-all backdrop-blur-sm bg-background/60">
            <div className="aspect-video relative w-full">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <p className="text-white font-bold text-lg">Vista previa</p>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-4">
          <Link 
            href={project.demoUrl} 
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver Demo
          </Link>
          <Link 
            href={project.repoUrl} 
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver Repositorio
          </Link>
        </div>
      </div>
    </div>
  );
} 