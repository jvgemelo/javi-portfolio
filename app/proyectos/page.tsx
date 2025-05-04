import Link from "next/link";
import Image from "next/image";

// Datos de ejemplo para los proyectos
const projects = [
  {
    id: 1,
    title: "Dashboard",
    description:
      "Dashboard creado con la libreria recharts para React y componentes de Shadcn.",
    technologies: ["NextJS", "TailwindCSS","TypeScript", "Supabase", "React", "WebRTC"],
    imageUrl: "/dashboard.png",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Previewer",
    description:
      "Visoniado de cámaras en directo a tavés de RabbitMQ..",
    technologies: ["NextJS", "TailwindCSS","TypeScript", "PostgreSQL", "React", "RabbitMQ"],
    imageUrl: "/productividad.jpg",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 3,
    title: "Annotations",
    description:
      "Aplicación para inspeccionar y marcar defectos en piezas de cerámica. Se usó la librería de KonvaJS para pintar encima de las imágenes..",
    technologies: ["React", "Vite", "MongoDB", "TypeScript","KonvaJS"],
    imageUrl: "/porce-inspector.jpg",
    demoUrl: "#",
    repoUrl: "#",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-crema">
      {/* Título principal */}
      <header className="text-start">
        <h1 className="text-6xl md:text-7xl font-extrabold text-chocolate tracking-tight px-8">WORKS</h1>
      </header>

      {/* Grid de proyectos */}
      <section className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Sección Diseños con Figma */}
      <section className="w-full bg-caramelo py-12 px-4 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-chocolate mb-4">DESIGNS WITH FIGMA!</h2>
            <p className="text-chocolate text-lg mb-4 max-w-md">
              Aunque aún aprendiendo, y sin tener conocimientos certificados en diseño, he realizado diversos diseños en Figma a base de aprendizaje autodidacta y algún curso!
            </p>
            <a href="https://www.figma.com/design/C7y0nuC4q5khzwpgL00snR/Untitled?node-id=0-1&t=kP4HIBTzqH3TtqxI-1" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-chocolate text-crema font-semibold shadow hover:bg-chocolate/90 transition">
              Link al portfolio <span className="text-xl">↗</span>
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-48 md:w-96 md:h-64">
              <Image src="/figma-designs-mock.png" alt="Diseños Figma" fill className="object-contain rounded-lg shadow-lg border-4 border-chocolate/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Testimonios */}
      <section className="w-full bg-crema py-12 px-4 md:px-0 border-t border-caramelo/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-chocolate mb-8 text-center">WHAT PEOPLE SAYS ABOUT ME</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
            <div className="flex-shrink-0">
              <Image src="/testimonio-avatar.jpg" alt="Testimonio" width={120} height={120} className="rounded-full border-4 border-caramelo" />
            </div>
            <div className="bg-white/80 rounded-lg shadow p-6 text-chocolate text-base">
              <p className="mb-4">
                He tenido la oportunidad de trabajar con Javier y puedo destacar su gran responsabilidad y compromiso en cada proyecto. Es un profesional proactivo que siempre busca maneras de mejorar y aportar nuevas ideas. No he tenido queja con agilidad de varios proyectos innovadores, demostrando versatilidad tanto en desarrollo web como en tareas de back-end.
              </p>
              <p className="mb-2">
                Siempre está disponible para ayudar a sus compañeros, fomentando un excelente ambiente de trabajo en equipo. Es un programador web muy competente, con capacidad para adaptarse a distintos retos tecnológicos y aprender rápidamente nuevas herramientas.
              </p>
              <div className="font-bold mt-2">Jesús Gutiérrez Siliceo</div>
              <div className="text-sm text-caramelo">Front-End Dev & Design Product Team Lead</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white/50 shadow-md transition-all ">
      <div className="aspect-video relative w-full">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.title} fill className="object-contain" />
        ) : (
          <div className="absolute inset-0 bg-caramelo/20 flex items-center justify-center">
            <p className="text-black font-bold text-lg">Vista previa</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-chocolate">{project.title}</h3>
        <p className="text-black mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-caramelo text-black rounded-full border border-caramelo/30"
            >
              {tech}
            </span>
          ))}
        </div>
        {/*<div className="flex gap-4 mt-4">
          <Link
            href={project.demoUrl}
            className="text-sm font-medium px-4 py-2 rounded-full bg-caramelo text-white hover:bg-caramelo/90 transition shadow"
          >
            Ver Demo
          </Link>
          <Link
            href={project.repoUrl}
            className="text-sm font-medium px-4 py-2 rounded-full border border-caramelo text-caramelo hover:bg-caramelo/10 transition"
          >
            Ver Repositorio
          </Link>
        </div>*/}
      </div>
    </div>
  );
} 