'use client'
import Image from "next/image";
import Carousel from "@/components/carousel";
import ProjectCard from "@/components/project-card";

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
    technologies: ["React", "Vite", "MongoDB", "TypeScript", "KonvaJS", "Redux", "Axios"],
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
  // Renderizado de cada testimonio
  function TestimonialCard({ testimonial }: {
    testimonial: typeof testimonials[0],
  }) {
    return (
      <div className="flex-shrink-0 w-full flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex-shrink-0 mt-4 mb-4 md:my-0">
          <Image
            src={testimonial.image}
            alt="Testimonio"
            width={200}
            height={200}
            className="bg-white rounded-full w-[120px] h-[120px] md:w-[200px] md:h-[200px] border border-black/10"
          />
        </div>
        <div className="bg-white/80 rounded-lg shadow p-6 text-black text-base flex-1">
          {testimonial.text.map((paragraph, idx) => (
            <p className="mb-4" key={idx}>{paragraph}</p>
          ))}
          <div className="font-bold mt-2">{testimonial.name}</div>
          <div className="text-sm text-[#4a4a4a]">{testimonial.role}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Título principal */}
      <header className="text-start">
        <h1 className="text-6xl md:text-7xl font-extrabold text-black tracking-tight px-12 py-4">PROYECTOS</h1>
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
      <section className="w-full bg-white py-12 border-t border-black/10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex justify-center rounded-lg order-2 md:order-1">
            <div className="relative w-[340px] h-[260px] md:w-[420px] md:h-[320px] group">
              <Image
                src="/sorolla.png"
                alt="Paquete NPM"
                width={400}
                height={300}
                className="object-contain rounded-lg shadow-lg border-4 border-black/20 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-3 rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
                <Image src="/npm-logo-black.png" alt="NPM Logo" width={40} height={40} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start order-1 md:order-2 px-6 md:px-0">
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">PAQUETE NPM</h2>
              <div className="bg-black/10 px-3 py-1 rounded-full text-sm font-semibold text-black">
                Publicado
              </div>
            </div>
            <p className="text-black text-lg mb-4 max-w-md">
              He colaborado en el desarrollo de un paquete npm para mi empresa que optimiza el flujo de trabajo, automatizando procesos repetitivos y proporcionando utilidades específicas para nuestros proyectos.
            </p>
            {/* <p className="text-chocolate text-lg mb-6 max-w-md">
              Este paquete incluye herramientas para la manipulación de datos, componentes reutilizables y funciones de ayuda que han mejorado significativamente nuestra eficiencia de desarrollo.
            </p> */}
            <p className="text-black text-lg mb-6 max-w-md">
              Sorolla es una biblioteca de componentes React optimizada tanto para proyectos de React vanilla como Next.js, que proporciona eficientes herramientas de anotación basadas en canvas impulsadas por Konva.
            </p>
            <a href="https://www.npmjs.com/package/@siali/sorolla" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-black/90 transition">
              Más información <span className="text-xl">↗</span>
            </a>
          </div>
        </div>
      </section>
      {/* Sección Diseños con Figma */}
      <section className="w-full bg-[#4a4a4a] py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="flex flex-row">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">DISEÑOS CON FIGMA!</h2>
              <Image src="/figma.png" alt="Figma" width={70} height={30} />
            </div>
            <p className="text-white text-lg mb-4 max-w-md">
              Aunque aún aprendiendo, y sin tener conocimientos certificados en diseño, he realizado diversos diseños en Figma a base de aprendizaje autodidacta y algún curso!
            </p>
            <a href="https://www.figma.com/design/C7y0nuC4q5khzwpgL00snR/Untitled?node-id=0-1&t=kP4HIBTzqH3TtqxI-1" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-black/90 transition">
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
                className="object-contain rounded-lg shadow-lg border-4 border-black/20 absolute left-60 top-16 rotate-[8deg] z-20 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-[12deg] group-hover:shadow-2xl"
                style={{ zIndex: 20 }}
              />
              {/* Imagen del medio (inicio) */}
              <Image
                src="/inicio.png"
                alt="Inicio"
                width={350}
                height={270}
                className="object-contain rounded-lg shadow-lg border-4 border-black/20 absolute left-10 top-0 rotate-[-6deg] z-10 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-[-12deg] group-hover:shadow-2xl"
                style={{ zIndex: 10 }}
              />
              {/* Imagen superior (works) */}
              <Image
                src="/works.png"
                alt="Works"
                width={350}
                height={270}
                className="object-contain rounded-lg shadow-lg border-4 border-black/20 absolute left-20 top-32 rotate-[-2deg] z-30 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-[2deg] group-hover:shadow-2xl"
                style={{ zIndex: 30 }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Sección Página Web de Delivery para Restaurante */}
      <section className="w-full border-t border-black/10">
        {/* Hero Section - Dark Background */}
        <div className="w-full bg-white py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-5xl md:text-7xl font-extrabold text-black mb-4 uppercase tracking-tight">
              PÁGINA WEB DE DELIVERY
            </h2>
            <p className="text-xl md:text-2xl text-black/80 mb-12">
              Revolucionando la experiencia de pedidos online
            </p>
            <div className="flex justify-center items-center gap-8 mb-12 w-full">
              <div className="relative w-full max-w-full">
                <Image
                  src="/captura-adminer.png"
                  alt="Dashboard de la aplicación"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
                />
              </div>
            </div>
            <a 
              href="https://traviatta-app-shopping.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-8 py-3 font-bold text-lg hover:bg-gray-300 transition-colors"
            >
              VISTA GENERAL
            </a>
          </div>
        </div>

        {/* Challenge & Solution Section - Split Panels */}
        <div className="w-full flex flex-col md:flex-row">
          {/* Left Panel - THE CHALLENGE */}
          <div className="flex-1 bg-white p-12 md:p-16 flex flex-col items-start">
            <div className="text-6xl md:text-8xl text-black mb-6">?</div>
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-6 uppercase">EL RETO</h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            Uno de los proyectos en los que he estado trabajando estos últimos meses, ha sido un conjunto de aplicaciones que permitan hacer pedidos a domicilio a los clientes, y que después sean recibidos por los camareros y diferentes cocinas en el restaurante, aportando agilidad y registro de usuarios, registro de todo tipo de datos, historial de pedidos, pagos seguros.
            Este sistema es una solución real a el problema de la gestión de pedidos para restaurantes con un alto volumen de trabajo. 
            </p>
          </div>

          {/* Right Panel - THE SOLUTION */}
          <div className="flex-1 bg-black p-12 md:p-16 flex flex-col items-start">
            <div className="text-6xl md:text-8xl text-white mb-6 self-end">✓</div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase">LA SOLUCIÓN</h3>
            <ul className="text-white/90 text-lg leading-relaxed space-y-3 max-w-md">
              <li>• Dos aplicaciones independientes desarrolladas enteramente fullstack con Nextjs y React</li>
              <li>• Arquitectura segura con SSR y SSC</li>
              <li>• Validación y gestión de sesiones de usuario</li>
              <li>• Base de datos relacional optimizada</li>
              <li>• Código estructurado para máxima seguridad</li>
            </ul>
          </div>
        </div>

        {/* Feature Showcase Section - Three Columns */}
        <div className="w-full bg-white py-16 md:py-20">
          <div className="max-w-[70vw] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              <div className="bg-white border border-gray-200 p-8 rounded-lg">
                <h4 className="text-xl md:text-2xl font-bold text-black mb-4 uppercase">CATÁLOGO DE PRODUCTOS</h4>
                <p className="text-gray-600 mb-6">
                  Catálogo completo de productos con imágenes de alta calidad gracias al almacenamiento en storage que proporciona Supabase, junto a datos propios de cada producto como alérgenos, nombre, precio, descripción e ingredientes.
                </p>
                <div className="mt-6">
                  <Image
                    src="/entrante-captura.png"
                    alt="Catálogo de productos"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>
            
              <div className="bg-white border border-gray-200 p-8 rounded-lg">
                <h4 className="text-xl md:text-2xl font-bold text-black mb-4 uppercase">INGREDIENTES PERSONALIZADOS</h4>
                <p className="text-gray-600 mb-6">
                 Una de las dificultades encontradas a la hora de diseñar la DB, fue que cada plato agregado al pedido almacenara de alguna manera los ingredientes modificados a elección del cliente.
                </p>
                <div className="mt-6">
                  <Image
                    src="/captura-ingredientes.png"
                    alt="Gestión de pedidos"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>

        
              <div className="bg-white border border-gray-200 p-8 rounded-lg">
                <h4 className="text-xl md:text-2xl font-bold text-black mb-4 uppercase">VALIDACIÓN DE DIRECCIONES</h4>
                <p className="text-gray-600 mb-6">
                  Verificación de direcciones mediante OpenStreetMap, que proporciona las coordenadas del usuario y del restaurante. Si la dirección no está dentro de un radio de 10km, se bloquea la entrega.
                </p>
                <div className="mt-6">
                  <Image
                    src="/captura-openstreetmap.png"
                    alt="Sistema de pago"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-8 rounded-lg">
                <h4 className="text-xl md:text-2xl font-bold text-black mb-4 uppercase">PASARELA DE PAGO CON STRIPE</h4>
                <p className="text-gray-600 mb-6">
                  Gracias al servicio de Stripe, el cliente puede ingresar sus datos bancarios con total seguridad y efectuar el pago, ya que al actuar de intermediario usando sus componentes, no se almacenan en ningún sitio dentro de la aplicación.
                </p>
                <div className="mt-6">
                  <Image
                    src="/stripe.png"
                    alt="Sistema de pago"
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Role & Technologies / Results Section - Split Panels */}
        <div className="w-full flex flex-col md:flex-row">
          {/* Left Panel - MY ROLE & TECHNOLOGIES */}
          <div className="flex-1 bg-black p-12 md:p-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 uppercase">MI ROL & TECNOLOGÍAS</h3>
            <ul className="space-y-4 text-white text-lg">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Full-stack Developer
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Next.js
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                React
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                TypeScript
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Supabase
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                PostgreSQL
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                TailwindCSS
              </li>
            </ul>
          </div>

          {/* Right Panel - RESULTS */}
          <div className="flex-1 bg-white p-12 md:p-16">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-8 uppercase">RESULTADOS</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
                  100%
                </div>
                <div>
                  <p className="text-2xl font-bold text-black">Aplicación Funcional</p>
                  <p className="text-gray-600">Desplegada y accesible públicamente</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-gray-600 mb-4">Aprendizajes clave:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• SSR y SSC implementados correctamente</li>
                  <li>• Arquitectura escalable y segura</li>
                  <li>• Base de datos relacional optimizada</li>
                  <li>• Experiencia de usuario fluida y responsive</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="w-full bg-black py-12 text-center">
          <a 
            href="#" 
            className="inline-block bg-white text-black px-10 py-4 font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            VER PROYECTO EN VIVO
          </a>
        </div>
      </section>

      {/* Sección Testimonios */}
      <section className="w-full bg-white pb-12 px-4 md:px-0 border-t border-black/10">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-8 text-center mt-8">
            ¿QUÉ OPINAN MIS COMPAÑEROS SOBRE MÍ?
          </h2>
          <div className="mt-8">
            <Carousel
              items={testimonials}
              renderItem={(testimonial) => <TestimonialCard testimonial={testimonial} />}
              minHeight="400px"
              arrowColor="text-black"
              activeIndicatorColor="bg-black"
              inactiveIndicatorColor="bg-[#4a4a4a] hover:bg-black/70"
            />
          </div>
        </div>
      </section>
    </div>
  );
} 