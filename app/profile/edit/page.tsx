'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    perfil: '',
    experiencia: '',
    formacion: '',
    herramientas: '',
    idiomas: '',
    informacion: ''
  });
  
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
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [supabase, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
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
      
      // Upsert the user data (update if exists, insert if doesn't)
      const { error } = await supabase
        .from('user_data')
        .upsert({
          user_id: user.id,
          ...userData
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Editar Perfil</h1>
      
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="space-y-6">
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
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </form>
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
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
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
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
} 