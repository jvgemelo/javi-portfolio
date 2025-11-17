'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setFormSubmitted(true);
    setFormState({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <div className="min-h-[85vh] bg-white pb-20 md:pb-10">
      {/* Título principal */}
      <header className="text-start">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-black tracking-tight px-4 sm:px-8 md:px-12 pt-4">CONTACTO</h1>
      </header>
      
      <div className="max-w-4xl mx-auto py-6 md:py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-10">
          <div className="bg-white/50 p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-black">Información de contacto</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4a4a4a] mt-1">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div>
                  <p className="font-medium text-black">Teléfono</p>
                  <a href="tel:+34683617481" className="text-black/70 hover:text-black transition-colors">+34 683 61 74 81</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4a4a4a] mt-1">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div>
                  <p className="font-medium text-black">Email</p>
                  <a href="mailto:javiergarciasegovia1997@gmail.com" className="text-black/70 hover:text-black transition-colors">javiergarciasegovia1997@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4a4a4a] mt-1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="font-medium text-black">Ubicación</p>
                  <a href="https://www.google.com/maps?q=Santander,+España" target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black transition-colors">Santander, España</a>
                </div>
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-4 text-black">Redes Sociales</h3>
            <div className="flex gap-4">
              <a href="https://github.com/jvgemelo" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#4a4a4a] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/javier-garcia-segovia-678842243//" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#4a4a4a] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.instagram.com/javier_garcia_segovia/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#4a4a4a] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          {/* <div className="bg-white/50 p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-black">Envíame un mensaje</h2>
            {formSubmitted ? (
              <div className="bg-black/10 text-black p-6 rounded-lg">
                <h3 className="font-semibold text-xl">¡Mensaje enviado!</h3>
                <p className="my-3">Gracias por contactarme. Te responderé lo antes posible.</p>
                <Button 
                  className="mt-4 bg-black text-white hover:bg-black/90 rounded-full px-5" 
                  onClick={() => setFormSubmitted(false)}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-black font-medium">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="mt-1 border-black/20 focus:border-black bg-white/80 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-black font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="mt-1 border-black/20 focus:border-black bg-white/80 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-black font-medium">Mensaje</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full mt-1 border border-black/20 focus:border-black focus:ring-black rounded-md p-3 bg-white/80"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-black/90 rounded-full px-5"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            )}
          </div>
        </div> */}
        </div>
        
      </div>
    </div>
  );
} 