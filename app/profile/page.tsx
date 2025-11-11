// Datos estáticos del perfil - Edita estos datos directamente en el código
const profileData = {
  aboutMe: `Me encanta aprender y experimentar con nuevas tecnologías. Comencé mi camino en la programación formándome en backend con Java, Spring Boot y Hibernate, pero las oportunidades laborales me llevaron a especializarme en el frontend, donde descubrí mi verdadera pasión. Hoy tengo un año de experiencia desarrollando interfaces dinámicas con React, Next.js, Tailwind CSS, Vite, Docker y GitHub. Además, disfruto participando en el diseño con Figma y creando soluciones propias en npm.`,
  experience: [
    {
      position: "Desarrollador de Frontend",
      company: "Siali",
      period: "Junio 2024 - Julio 2025",
      description: "Este último año me he dedicado al desarrollo de diferentes productos para Siali variados, usando tecnologías punteras como Nextjs y Supabase o el ya muy conocido Docker para el despliegue, sobretodo en desarrollo local, pero también en nube."
    },
    {
      position: "Prácticas",
      company: "Siali",
      period: "Abril 2024 - Junio 2024",
      description: "En esta etapa fui formado en desarrollo de frontend, haciendo cursos variados empezando por html y css sencillo hasta acabar con react con vite y posteriormente, NextJs junto con tailwindcss. También hice mis primeros desarrollos para Safe en producción como graficado de datos."
    },
    {
      position: "Visual",
      company: "Maisons du Monde",
      period: "Septiembre 2021 – Abril 2024",
      description: "Me desempeñé en el manejo de mercancía, ubiqué productos en la tienda y supervisé el inventario. Además, me encargué de diseñar y mantener ambientes adecuados, decorando espacios como dormitorios, salas de estar, y brindé servicio al cliente."
    }
  ],
  education: [
    {
      degree: "FPGS en Desarrollo de Aplicaciones Web (DAW)",
      institution: "A distancia",
      period: "Actualmente cursando",
      description: "Formación en desarrollo de aplicaciones web."
    },
    {
      degree: "FPGS en Desarrollo de Aplicaciones Multiplataforma",
      institution: "IES Augusto González de Linares",
      period: "2022 – 2024",
      description: "Java – Spring Boot – MongoDB – PostgreSQL"
    },
    {
      degree: "Bachillerato en Ciencias",
      institution: "IES José María de Pereda",
      period: "2020 – 2022",
      description: ""
    },
    {
      degree: "ESO",
      institution: "IES Blas Cabrera Felipe",
      period: "2016",
      description: ""
    }
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Cambridge B2 Certificate" }
  ],
  skills: [
    "JavaScript", "Java", "React", "Next.js", "TailwindCSS", 
    "Supabase", "MongoDB", "Docker", "GitHub", "Vite", "Figma"
  ],
  additionalInfo: `Carnet de conducir. Coche propio. Disponibilidad inmediata.`
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-white">
      {/* Título principal */}
      <header className="text-start">
        <h1 className="text-6xl md:text-7xl font-extrabold text-black tracking-tight px-12">PERFIL</h1>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Foto y About Me */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 mb-10">
          {/* Foto */}
          <div className="flex justify-center md:justify-start">
            <img 
              src="/6005869666301494380.jpg" 
              alt="Profile" 
              className="rounded-xl shadow-md object-cover w-full max-w-md"
            />
          </div>
          
          {/* About Me */}
          <ProfileSection 
            title="About Me" 
            content={profileData.aboutMe}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Experience */}
          <ProfileSection 
            title="Experience" 
            content={
              <div className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-[#4a4a4a] pl-4">
                    <h3 className="text-lg font-bold text-black">{exp.position}</h3>
                    <p className="text-[#4a4a4a] font-medium">{exp.company} • {exp.period}</p>
                    <p className="text-black/80 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            }
            fullWidth
          />

          {/* Education */}
          <ProfileSection 
            title="Education" 
            content={
              <div className="space-y-6">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-black pl-4">
                    <h3 className="text-lg font-bold text-black">{edu.degree}</h3>
                    <p className="text-[#4a4a4a] font-medium">{edu.institution} • {edu.period}</p>
                    <p className="text-black/80 mt-2">{edu.description}</p>
                  </div>
                ))}
              </div>
            }
            fullWidth
          />

          {/* Languages */}
          <ProfileSection 
            title="Languages" 
            content={
              <div className="space-y-3">
                {profileData.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-semibold text-black">{lang.name}</span>
                    <span className="text-[#4a4a4a]">{lang.level}</span>
                  </div>
                ))}
              </div>
            }
          />

          {/* Skills */}
          <ProfileSection 
            title="Skills & Tools" 
            content={
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-black/10 text-black rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            }
          />

          {/* Additional Information */}
          <ProfileSection 
            title="Additional Information" 
            content={profileData.additionalInfo}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying profile sections
function ProfileSection({ 
  title, 
  content, 
  fullWidth = false 
}: { 
  title: string; 
  content: string | React.ReactNode; 
  fullWidth?: boolean;
}) {
  return (
    <div className={`bg-white/50 p-6 rounded-xl shadow-md ${fullWidth ? 'md:col-span-2' : ''}`}>
      <h2 className="text-xl font-bold mb-3 text-black">{title}</h2>
      {typeof content === 'string' ? (
        <p className="text-black leading-relaxed">{content}</p>
      ) : (
        <div className="text-black">{content}</div>
      )}
    </div>
  );
}
