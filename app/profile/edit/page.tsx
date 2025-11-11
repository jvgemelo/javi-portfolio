'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [userData, setUserData] = useState({
    perfil: '',
    experiencia: '',
    formacion: '',
    herramientas: '',
    idiomas: '',
    informacion: ''
  });
  
  // Estado para el manejo de fotos
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error('Error al obtener usuario:', userError?.message);
          router.push('/login');
          return;
        }
        
        // Get user data from the database
        const { data, error } = await supabase
          .from('user_data')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
          throw error;
        }
        
        if (data) {
          setUserData({
            perfil: data.perfil || '',
            experiencia: data.experiencia || '',
            formacion: data.formacion || '',
            herramientas: data.herramientas || '',
            idiomas: data.idiomas || '',
            informacion: data.informacion || ''
          });
          
          // Inicializar las fotos desde los datos guardados
          try {
            if (data.fotos) {
              // Si es string, hacer parse; si es array, usar directamente
              if (typeof data.fotos === 'string') {
                const parsedPhotos = JSON.parse(data.fotos);
                setPhotos(Array.isArray(parsedPhotos) ? parsedPhotos : []);
              } else if (Array.isArray(data.fotos)) {
                setPhotos(data.fotos);
              } else {
                setPhotos([]);
              }
            } else {
              setPhotos([]);
            }
          } catch (e) {
            console.error('Error al parsear fotos:', e);
            setPhotos([]);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [supabase, router]);
  
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    
    if (!dropZone) return;
    
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('border-blue-500', 'bg-blue-50');
    };
    
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    };
    
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('border-blue-500', 'bg-blue-50');
      
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    };
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    
    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    // Validar que sea una imagen
    if (!file.type.match(/image\/(jpeg|jpg|gif|png)/i)) {
      setPhotoError('El archivo debe ser una imagen (jpeg, jpg, gif, png)');
      return;
    }
    
    setPhotoError('');
    setUploadingPhoto(true);
    
    try {
      // Usar el nombre original del archivo
      const fileName = `${Date.now()}-${file.name}`;
      
      // Subir el archivo a Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('fotos')
        .upload(fileName, file, {
          upsert: true,
          cacheControl: '3600'
        });
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Obtener la URL pública del archivo
      const { data: publicUrlData } = supabase
        .storage
        .from('fotos')
        .getPublicUrl(fileName);
      
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error('No se pudo obtener la URL pública de la imagen');
      }
      
      // Agregar la URL al array de fotos
      setPhotos([...photos, publicUrlData.publicUrl]);
      
    } catch (error: any) {
      console.error('Error al subir la foto:', error);
      setPhotoError(`Error al subir la foto: ${error.message || 'Por favor intenta de nuevo.'}`);
    } finally {
      setUploadingPhoto(false);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      
      console.log('Saving photos array:', photos);
      
      // Upsert the user data (update if exists, insert if doesn't)
      const { error } = await supabase
        .from('user_data')
        .upsert({
          user_id: user.id,
          ...userData,
          fotos: photos  // No usamos JSON.stringify aquí, dejamos que Supabase lo maneje
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
      
      // Navigate back to profile page
      router.push('/profile');
      router.refresh();
    } catch (error: any) {
      console.error('Error al guardar el perfil:', error.message);
      alert('Error al guardar el perfil. Por favor intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Título principal */}
      <header className="text-start">
        <h1 className="text-6xl md:text-7xl font-extrabold text-black tracking-tight px-12">EDITAR PERFIL</h1>
      </header>
      
      <div className="container mx-auto py-8 px-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Sección de fotos */}
            <div className="border rounded-xl p-6 bg-white/50 shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-black">Mis Fotos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-4">
                  <div 
                    ref={dropZoneRef}
                    className="border-2 border-dashed border-black/30 rounded-lg p-6 text-center cursor-pointer transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/jpeg,image/png,image/gif,image/jpg"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                    {uploadingPhoto ? (
                      <p className="text-black">Subiendo foto...</p>
                    ) : (
                      <>
                        <p className="text-black mb-1">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <p className="text-xs text-[#4a4a4a]">
                          La imagen se subirá con su nombre original
                        </p>
                      </>
                    )}
                  </div>
                  
                  {photoError && <p className="text-red-500 text-xs mt-1">{photoError}</p>}
                </div>
                
                <div>
                  <p className="block text-sm font-medium text-black mb-1">
                    Fotos actuales ({photos.length})
                  </p>
                  <p className="text-xs text-[#4a4a4a] mb-2">
                    Las fotos aparecerán en un carrusel en tu perfil público
                  </p>
                </div>
              </div>
              
              {/* Previsualización de fotos */}
              {photos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div 
                      key={index} 
                      className="relative group rounded-lg overflow-hidden h-[150px] border"
                    >
                      <Image
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => removePhoto(index)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg bg-black/5">
                  <p className="text-black/70">No has añadido ninguna foto todavía</p>
                </div>
              )}
            </div>
            
            <FormField 
              name="perfil" 
              label="Perfil" 
              value={userData.perfil}
              onChange={handleChange}
              placeholder="Describe tu perfil profesional"
            />
            
            <FormField 
              name="experiencia" 
              label="Experiencia" 
              value={userData.experiencia}
              onChange={handleChange}
              placeholder="Describe tu experiencia profesional"
            />
            
            <FormField 
              name="formacion" 
              label="Formación" 
              value={userData.formacion}
              onChange={handleChange}
              placeholder="Describe tu formación académica"
            />
            
            <FormField 
              name="herramientas" 
              label="Herramientas" 
              value={userData.herramientas}
              onChange={handleChange}
              placeholder="Lista las herramientas y tecnologías que manejas"
            />
            
            <FormField 
              name="idiomas" 
              label="Idiomas" 
              value={userData.idiomas}
              onChange={handleChange}
              placeholder="Lista los idiomas que hablas y tu nivel"
            />
            
            <FormField 
              name="informacion" 
              label="Información adicional" 
              value={userData.informacion}
              onChange={handleChange}
              placeholder="Cualquier otra información relevante"
            />
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="px-5 py-2 border border-black rounded-full shadow-sm text-sm font-medium text-black bg-white hover:bg-black/10 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 border-0 rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-black/90 transition-colors"
              >
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FormFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function FormField({ name, label, value, onChange, placeholder }: FormFieldProps) {
  return (
    <div className="bg-white/50 p-6 rounded-xl shadow-md">
      <label htmlFor={name} className="block text-lg font-medium text-black mb-2">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={name}
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border border-black/20 rounded-lg p-3 whitespace-pre-wrap bg-white/80"
        />
      </div>
    </div>
  );
}