// Datos estáticos del perfil - Edita estos datos directamente en el código
const profileData = {
  aboutMe: `Soy un desarrollador full stack apasionado por crear soluciones tecnológicas innovadoras. 
    Con experiencia en desarrollo web moderno, me especializo en construir aplicaciones escalables 
    y eficientes que mejoran la experiencia del usuario.`,
  experience: [
    {
      position: "Desarrollador Full Stack",
      company: "Empresa XYZ",
      period: "2022 - Presente",
      description: "Desarrollo y mantenimiento de aplicaciones web usando React, Next.js, Node.js y PostgreSQL. Liderazgo de proyectos de migración y optimización de rendimiento."
    },
    {
      position: "Desarrollador Frontend",
      company: "Empresa ABC",
      period: "2020 - 2022",
      description: "Desarrollo de interfaces de usuario responsivas y accesibles. Colaboración con equipos de diseño para implementar diseños pixel-perfect."
    },
    {
      position: "Desarrollador Junior",
      company: "Startup Tech",
      period: "2019 - 2020",
      description: "Primeros pasos en el desarrollo profesional. Aprendizaje de tecnologías modernas y buenas prácticas de desarrollo."
    }
  ],
  education: [
    {
      degree: "Grado en Ingeniería Informática",
      institution: "Universidad de Madrid",
      period: "2015 - 2019",
      description: "Especialización en desarrollo de software y sistemas de información."
    },
    {
      degree: "Bootcamp Full Stack Development",
      institution: "Ironhack",
      period: "2019",
      description: "Programa intensivo de desarrollo web full stack con tecnologías modernas."
    }
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Avanzado (C1)" },
    { name: "Francés", level: "Intermedio (B2)" }
  ],
  skills: [
    "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", 
    "MongoDB", "Git", "Docker", "AWS", "Tailwind CSS", "Supabase"
  ],
  additionalInfo: `Disponible para trabajar en remoto o híbrido. Interesado en proyectos de código abierto 
    y en contribuir a la comunidad de desarrolladores. Apasionado por el aprendizaje continuo y las 
    nuevas tecnologías.`
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-crema">
      {/* Título principal */}
      <header className="text-start">
        <h1 className="text-6xl md:text-7xl font-extrabold text-chocolate tracking-tight px-12">PERFIL</h1>
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
            />po
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
                  <div key={index} className="border-l-4 border-caramelo pl-4">
                    <h3 className="text-lg font-bold text-chocolate">{exp.position}</h3>
                    <p className="text-caramelo font-medium">{exp.company} • {exp.period}</p>
                    <p className="text-chocolate/80 mt-2">{exp.description}</p>
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
                  <div key={index} className="border-l-4 border-chocolate pl-4">
                    <h3 className="text-lg font-bold text-chocolate">{edu.degree}</h3>
                    <p className="text-caramelo font-medium">{edu.institution} • {edu.period}</p>
                    <p className="text-chocolate/80 mt-2">{edu.description}</p>
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
                    <span className="font-semibold text-chocolate">{lang.name}</span>
                    <span className="text-caramelo">{lang.level}</span>
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
                    className="px-3 py-1 bg-caramelo/20 text-chocolate rounded-full text-sm font-medium"
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
      <h2 className="text-xl font-bold mb-3 text-chocolate">{title}</h2>
      {typeof content === 'string' ? (
        <p className="text-chocolate leading-relaxed">{content}</p>
      ) : (
        <div className="text-chocolate">{content}</div>
      )}
    </div>
  );
}
