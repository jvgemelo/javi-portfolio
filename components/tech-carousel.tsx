'use client';

import Image from 'next/image';

const technologies = [
  { name: 'JavaScript', icon: '/js.png', isImage: true },
  { name: 'TypeScript', icon: '/typescript.png', isImage: true },
  { name: 'React', icon: '/react.png', isImage: true },
  { name: 'Next.js', icon: '▲' },
  { name: 'Supabase', icon: '/supabase.jpg', isImage: true },
  { name: 'PostgreSQL', icon: '/Postgresql_elephant.svg.png', isImage: true },
  { name: 'Tailwind CSS', icon: '/tailwind.png', isImage: true },
  { name: 'Git', icon: '/github.png', isImage: true },
  { name: 'HTML5', icon: '/html-5.png', isImage: true },
  { name: 'CSS3', icon: '/CSS3.webp', isImage: true },
  { name: 'Java', icon: '/java.png', isImage: true },
  { name: 'Docker', icon: '/docker.png', isImage: true },
  { name: 'MongoDB', icon: '/MongoDB.png', isImage: true },
  { name: 'Figma', icon: '/figma.png', isImage: true },
];

export function TechCarousel() {
  // Duplicamos el array para crear un bucle infinito sin interrupciones
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden py-4 relative">
      <div className="flex animate-scroll pause-animation">
        {duplicatedTechs.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-3 mx-4 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-black/10 shadow-sm whitespace-nowrap flex-shrink-0 transition-transform hover:scale-105"
          >
            {tech.isImage ? (
              <Image 
                src={tech.icon} 
                alt={tech.name}
                width={24}
                height={24}
                className="object-contain"
              />
            ) : (
              <span className="text-xl font-bold">{tech.icon}</span>
            )}
            <span className="text-sm sm:text-base font-bold text-black">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

