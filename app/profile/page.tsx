import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import ProfilePhotoCarousel from '@/components/profile-photo-carousel';

export default async function Profile() {
  const supabase = await createClient();
  
  // Get the current authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  
  // If user is not logged in, show a message
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Necesitas iniciar sesión para ver tu perfil</h1>
        <a href="/login" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Ir a inicio de sesión</a>
      </div>
    );
  }         
  
  // Fetch user data from user_data table
  // Usando .maybeSingle() en lugar de .single() para evitar el error
  const { data: userData, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();
  
  // Imágenes por defecto si no hay fotos en el perfil
  const defaultPhotos = [
    "https://yaolajjmtmjgfwlzqtic.supabase.co/storage/v1/object/public/fotos/default-foto.jpg",
  ];

  // Datos de ejemplo para el perfil si no existe o está vacío
  const datosEjemplo = {
    perfil: "Este es un ejemplo de tu perfil profesional. Aquí puedes describir brevemente quién eres, tu experiencia general y tus objetivos profesionales.",
    experiencia: "Ejemplo: Desarrollador Full Stack en XYZ Company (2018-2023). Responsable del desarrollo y mantenimiento de aplicaciones web usando React, Node.js y PostgreSQL.",
    formacion: "Ejemplo: Grado en Ingeniería Informática, Universidad de Madrid (2014-2018). Bootcamp de Desarrollo Web Full Stack (2019).",
    herramientas: "Ejemplo: React, Next.js, TypeScript, Node.js, PostgreSQL, Supabase, Git, Docker.",
    idiomas: "Ejemplo: Español (nativo), Inglés (avanzado), Francés (básico).",
    informacion: "Ejemplo: Disponibilidad para trabajar remotamente. Intereses en desarrollo de videojuegos y diseño UX/UI."
  };

  // Usar las fotos del usuario si existen, o las predeterminadas si no
  const userPhotos = userData?.fotos ? 
    (typeof userData.fotos === 'string' ? 
      (userData.fotos.startsWith('[') ? JSON.parse(userData.fotos) : [userData.fotos]) 
      : userData.fotos) 
    : defaultPhotos;

  // Verificar si algún campo del perfil tiene contenido
  const perfilEditado = userData && (
    userData.perfil || userData.experiencia || userData.formacion || 
    userData.herramientas || userData.idiomas || userData.informacion
  );

  // Verificar si hay perfil o si debemos mostrar el perfil de ejemplo
  const mostrarEjemplo = !userData || !perfilEditado;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
        <Link 
          href="/profile/edit" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Editar Perfil
        </Link>
      </div>

      {/* Carrusel de fotos */}
      <ProfilePhotoCarousel photos={userPhotos} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <ProfileSection 
          title="Perfil" 
          content={mostrarEjemplo ? datosEjemplo.perfil : userData.perfil} 
          isExample={mostrarEjemplo}
        />
        <ProfileSection 
          title="Experiencia" 
          content={mostrarEjemplo ? datosEjemplo.experiencia : userData.experiencia} 
          isExample={mostrarEjemplo}
        />
        <ProfileSection 
          title="Formación" 
          content={mostrarEjemplo ? datosEjemplo.formacion : userData.formacion} 
          isExample={mostrarEjemplo}
        />
        <ProfileSection 
          title="Herramientas" 
          content={mostrarEjemplo ? datosEjemplo.herramientas : userData.herramientas} 
          isExample={mostrarEjemplo}
        />
        <ProfileSection 
          title="Idiomas" 
          content={mostrarEjemplo ? datosEjemplo.idiomas : userData.idiomas} 
          isExample={mostrarEjemplo}
        />
        <ProfileSection 
          title="Información adicional" 
          content={mostrarEjemplo ? datosEjemplo.informacion : userData.informacion} 
          isExample={mostrarEjemplo}
        />
        {mostrarEjemplo && (
          <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg shadow">
            <p className="text-blue-700 font-medium mb-2">👆 Los datos mostrados son ejemplos</p>
            <p className="text-blue-600">Edita tu perfil para personalizar esta información.</p>
            <Link 
              href="/profile/edit" 
              className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {userData ? 'Editar mi perfil' : 'Crear mi perfil'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component for displaying profile sections
function ProfileSection({ title, content, isExample = false }: { title: string; content: string | null; isExample?: boolean }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow ${isExample ? 'border border-dashed border-gray-300' : ''}`}>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {isExample ? (
        <p className="text-gray-500 italic">{content || 'Sin información proporcionada'}</p>
      ) : (
        <p className="text-gray-700">{content || 'Sin información proporcionada'}</p>
      )}
      {isExample && <span className="text-xs text-gray-400 mt-2 block">Datos de ejemplo</span>}
    </div>
  );
} 