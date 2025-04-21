'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from './ui/button';
import { handleSignOut } from './mobile-auth-actions';

export default function MobileAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    
    getUser();
  }, []);

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-foreground/10 w-full">
        <div className="text-center text-muted-foreground">
          Hola, <span className="font-medium text-foreground">{user.email}</span>
        </div>
        <form action={handleSignOut}>
          <Button type="submit" className="px-6 py-2 rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors">
            Cerrar sesión
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-foreground/10 w-full">
      <Link 
        href="/sign-in"
        className="w-full text-center px-6 py-2 rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors"
      >
        Iniciar sesión
      </Link>
      <Link 
        href="/sign-up"
        className="w-full text-center px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Registrarse
      </Link>
    </div>
  );
} 