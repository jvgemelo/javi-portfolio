'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Datos de ejemplo para los proyectos
const projects = [
  {
    id: 1,
    title: "Dashboard",
    description:
      "Dashboard creado con la libreria recharts para React y componentes de Shadcn.",
    technologies: ["NextJS", "TailwindCSS", "TypeScript", "Supabase", "React", "WebRTC"],
    imageUrl: "/dashboard.png",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Previewer",
    description:
      "Visoniado de cámaras en directo a tavés de RabbitMQ..",
    technologies: ["NextJS", "TailwindCSS", "TypeScript", "PostgreSQL", "React", "RabbitMQ"],
    imageUrl: "/productividad.jpg",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 3,
    title: "Annotations",
    description:
      "Aplicación para inspeccionar y marcar defectos en piezas de cerámica. Se usó la librería de KonvaJS para pintar encima de las imágenes..",
    technologies: ["React", "Vite", "MongoDB", "TypeScript", "KonvaJS"],
    imageUrl: "/porce-inspector.jpg",
    demoUrl: "#",
    repoUrl: "#",
  },
];

// Array de testimonios
const testimonials = [
  {
    image: "/dev.webp",
    text: [
      "He tenido la oportunidad de trabajar con Javier y puedo destacar su gran responsabilidad y compromiso en cada proyecto. Es un profesional proactivo que siempre busca maneras de mejorar y aportar nuevas ideas. No he tenido queja con agilidad de varios proyectos innovadores, demostrando versatilidad tanto en desarrollo web como en tareas de back-end.",
      "Siempre está disponible para ayudar a sus compañeros, fomentando un excelente ambiente de trabajo en equipo. Es un programador web muy competente, con capacidad para adaptarse a distintos retos tecnológicos y aprender rápidamente nuevas herramientas.",
    ],
    name: "Jesús Gutiérrez Siliceo",
    role: "Front-End Dev & Design Product Team Lead",
  },
  {
    image: "/dev2.webp", // <--- Nueva imagen
    text: [
      "Trabajar con Javier es realmente fácil y agradable. Siempre mantiene una actitud positiva y se involucra al máximo para lograr el mejor resultado posible. Tiene una mentalidad muy orientada a la mejora continua, buscando constantemente nuevas formas de optimizar tanto con las herramientas que usamos como explorando nuevas tecnologías.",
      "Su enfoque en el detalle y su disposición a colaborar hacen que cualquier proyecto con él fluya de forma natural.",
    ],
    name: "Lucía Cilla Cuevas",
    role: "AI R&D Engineer",
  },
  {
    image: "/dev3.webp",
    text: [
      "Javier se incorporó al equipo con formación en desarrollo multiplataforma, sin experiencia previa en desarrollo web. Aun así, mostró una gran disposición para aprender y adaptarse. Su progreso fue gradual, pero constante y bien fundamentado, lo que le permitió asimilar con profundidad los conceptos clave del frontend. Con el tiempo, fue ganando soltura y confianza, y hoy se desempeña con seguridad en entornos web, destacando por su compromiso y su capacidad de adaptación.",
    ],
    name: "Francisco Colls",
    role: "Front-End Dev",
  }
];

export default function Projects() {
  // Carrusel de testimonios estilo profile-photo-carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const testimonialsCount = testimonials.length;

  // Índices adyacentes
  const prevIndex = (currentIndex - 1 + testimonialsCount) % testimonialsCount;
  const nextIndex = (currentIndex + 1) % testimonialsCount;

  // Navegación
  const goToNext = () => {
    if (isTransitioning || testimonialsCount <= 1) return;
    setDirection('next');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonialsCount);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning || testimonialsCount <= 1) return;
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + testimonialsCount) % testimonialsCount);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Swipe handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      setDirection('next');
      goToNext();
    } else if (distance < -minSwipeDistance) {
      setDirection('prev');
      goToPrevious();
    }
  };

  // Renderizado de cada testimonio
  function TestimonialCard({ testimonial, size, blur, opacity, zIndex }: {
    testimonial: typeof testimonials[0],
    size: "lg" | "sm",
    blur?: boolean,
    opacity?: number,
    zIndex?: number,
  }) {
    return (
      <div
        className={`
          relative flex flex-col md:flex-row items-center gap-8
          transition-all duration-500 ease-in-out
          ${size === "lg" ? "w-full md:w-[1200px] scale-100" : "w-2/3 md:w-[400px] scale-90"}
        `}
        style={{
          filter: blur ? "blur(2px)" : undefined,
          opacity: opacity ?? 1,
          zIndex: zIndex ?? 1,
        }}
      >
        <div className="flex-shrink-0 mt-4 mb-4 md:my-0">
          <Image
            src={testimonial.image}
            alt="Testimonio"
            width={size === "lg" ? 120 : 100}
            height={size === "lg" ? 120 : 100}
            className="bg-crema rounded-full md:w-[200px] md:h-[200px]"
          />
        </div>
        <div className={`bg-white/80 rounded-lg shadow p-6 text-chocolate text-base flex-1 ${size === "lg" ? "" : "text-sm"}`}>
          {testimonial.text.map((paragraph, idx) => (
            <p className="mb-4" key={idx}>{paragraph}</p>
          ))}
          <div className="font-bold mt-2">{testimonial.name}</div>
          <div className="text-sm text-caramelo">{testimonial.role}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema">
      {/* Título principal */}
      <header className="text-start">
        <h1 className="text-6xl md:text-7xl font-extrabold text-chocolate tracking-tight px-12">PROYECTOS</h1>
      </header>

      {/* Grid de proyectos */}
      <section className="px-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      {/* Sección Paquete NPM */}
      <section className="w-full bg-crema py-12 border-t border-caramelo/30">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex justify-center rounded-lg order-2 md:order-1">
            <div className="relative w-[340px] h-[260px] md:w-[420px] md:h-[320px] group">
              <Image
                src="/sorolla.png"
                alt="Paquete NPM"
                width={400}
                height={300}
                className="object-contain rounded-lg shadow-lg border-4 border-chocolate/30 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-3 rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
                <Image src="/npm-logo-black.png" alt="NPM Logo" width={40} height={40} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start order-1 md:order-2 px-6 md:px-0">
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-3xl md:text-4xl font-bold text-chocolate mb-4">PAQUETE NPM</h2>
              <div className="bg-caramelo/20 px-3 py-1 rounded-full text-sm font-semibold text-chocolate">
                Publicado
              </div>
            </div>
            <p className="text-chocolate text-lg mb-4 max-w-md">
              He colaborado en el desarrollo de un paquete npm para mi empresa que optimiza el flujo de trabajo, automatizando procesos repetitivos y proporcionando utilidades específicas para nuestros proyectos.
            </p>
            {/* <p className="text-chocolate text-lg mb-6 max-w-md">
              Este paquete incluye herramientas para la manipulación de datos, componentes reutilizables y funciones de ayuda que han mejorado significativamente nuestra eficiencia de desarrollo.
            </p> */}
            <p className="text-chocolate text-lg mb-6 max-w-md">
              Sorolla es una biblioteca de componentes React optimizada tanto para proyectos de React vanilla como Next.js, que proporciona eficientes herramientas de anotación basadas en canvas impulsadas por Konva.
            </p>
            <a href="https://www.npmjs.com/package/@siali/sorolla" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-chocolate text-crema font-semibold shadow hover:bg-chocolate/90 transition">
              Más información <span className="text-xl">↗</span>
            </a>
          </div>
        </div>
      </section>
      {/* Sección Diseños con Figma */}
      <section className="w-full bg-caramelo py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="flex flex-row">
              <h2 className="text-3xl md:text-4xl font-bold text-chocolate mb-4">DISEÑOS CON FIGMA!</h2>
              <Image src="/figma.png" alt="Figma" width={70} height={30} />
            </div>
            <p className="text-chocolate text-lg mb-4 max-w-md">
              Aunque aún aprendiendo, y sin tener conocimientos certificados en diseño, he realizado diversos diseños en Figma a base de aprendizaje autodidacta y algún curso!
            </p>
            <a href="https://www.figma.com/design/C7y0nuC4q5khzwpgL00snR/Untitled?node-id=0-1&t=kP4HIBTzqH3TtqxI-1" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-chocolate text-crema font-semibold shadow hover:bg-chocolate/90 transition">
              Link al portfolio <span className="text-xl">↗</span>
            </a>
          </div>
          <div className="flex-1 flex justify-center  rounded-lg">
            <div className="relative w-[340px] h-[260px] md:w-[420px] md:h-[320px] group">
              {/* Imagen de fondo (designs) */}
              <Image
                src="/designs.png"
                alt="Diseño Figma"
                width={350}
                height={270}
                className="object-contain rounded-lg shadow-lg border-4 border-chocolate/30 absolute left-60 top-16 rotate-[8deg] z-20 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-[12deg] group-hover:shadow-2xl"
                style={{ zIndex: 20 }}
              />
              {/* Imagen del medio (inicio) */}
              <Image
                src="/inicio.png"
                alt="Inicio"
                width={350}
                height={270}
                className="object-contain rounded-lg shadow-lg border-4 border-chocolate/30 absolute left-10 top-0 rotate-[-6deg] z-10 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-[-12deg] group-hover:shadow-2xl"
                style={{ zIndex: 10 }}
              />
              {/* Imagen superior (works) */}
              <Image
                src="/works.png"
                alt="Works"
                width={350}
                height={270}
                className="object-contain rounded-lg shadow-lg border-4 border-chocolate/30 absolute left-20 top-32 rotate-[-2deg] z-30 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-[2deg] group-hover:shadow-2xl"
                style={{ zIndex: 30 }}
              />
            </div>
          </div>
        </div>
      </section>



      {/* Sección Testimonios */}
      <section className="w-full bg-white pb-12 px-4 md:px-0 border-t border-caramelo/30">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-chocolate mb-8 text-center mt-8">
            ¿QUÉ OPINAN MIS COMPAÑEROS SOBRE MÍ?
          </h2>
          <div
            className="relative flex justify-center items-center h-[500px] md:h-[340px] overflow-hidden mt-8 md:mt-0"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Mostramos solo la tarjeta actual, sin animaciones */}
            <div className="relative z-10">
              <TestimonialCard testimonial={testimonials[currentIndex]} size="lg" />
            </div>

            {/* Flechas de navegación */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-chocolate text-3xl font-bold px-2 hover:text-caramelo transition z-20 bg-white/70 rounded-full"
              aria-label="Anterior"
              disabled={isTransitioning}
            >
              &#8592;
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-chocolate text-3xl font-bold px-2 hover:text-caramelo transition z-20 bg-white/70 rounded-full"
              aria-label="Siguiente"
              disabled={isTransitioning}
            >
              &#8594;
            </button>
          </div>

          {/* Indicadores de puntos */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-chocolate w-4' : 'bg-caramelo'
                  }`}
                onClick={() => {
                  if (isTransitioning || index === currentIndex) return;
                  setCurrentIndex(index);
                }}
              />
            ))}
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
          <Image src={project.imageUrl} alt={project.title} fill className="object-contain object-top" />
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