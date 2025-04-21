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
  const { data: userData, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  if (error) {
    console.error('Error fetching user data:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Error al cargar los datos del perfil</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  // Imágenes por defecto si no hay fotos en el perfil
  const defaultPhotos = [
    "https://yaolajjmtmjgfwlzqtic.supabase.co/storage/v1/object/public/fotos/yo.jpeg",
    "https://yaolajjmtmjgfwlzqtic.supabase.co/storage/v1/object/public/fotos/yo-comics.jpeg",
    "https://yaolajjmtmjgfwlzqtic.supabase.co/storage/v1/object/public/fotos/yo-ghibli.jpeg"
  ];

  // Usar las fotos del usuario si existen, o las predeterminadas si no
    // Usar las fotos del usuario si existen, o las predeterminadas si no
    const userPhotos = userData?.fotos ? 
    (typeof userData.fotos === 'string' ? 
      (userData.fotos.startsWith('[') ? JSON.parse(userData.fotos) : [userData.fotos]) 
      : userData.fotos) 
    : defaultPhotos;

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
      
      {userData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ProfileSection title="Perfil" content={userData.perfil} />
          <ProfileSection title="Experiencia" content={userData.experiencia} />
          <ProfileSection title="Formación" content={userData.formacion} />
          <ProfileSection title="Herramientas" content={userData.herramientas} />
          <ProfileSection title="Idiomas" content={userData.idiomas} />
          <ProfileSection title="Información adicional" content={userData.informacion} />
        </div>
      ) : (
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-yellow-800">No se encontraron datos de perfil. Por favor completa tu perfil.</p>
          <Link 
            href="/profile/edit" 
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Completar Perfil
          </Link>
        </div>
      )}
    </div>
  );
}

// Helper component for displaying profile sections
function ProfileSection({ title, content }: { title: string; content: string | null }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-700">{content || 'Sin información proporcionada'}</p>
    </div>
  );
} 