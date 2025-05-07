import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-crema flex items-center justify-center align-middle">
      <form className="w-full max-w-md bg-white/80 rounded-lg shadow p-8 text-chocolate">
        <h1 className="text-3xl md:text-4xl font-bold text-chocolate mb-4">Registrarse</h1>
        <p className="text-sm text-foreground mb-6">
          ¿Ya tienes una cuenta?{" "}
          <Link className="text-caramelo font-medium underline hover:text-chocolate transition" href="/sign-in">
            Iniciar sesión
          </Link>
        </p>
        <div className="flex flex-col gap-4 [&>input]:mb-3">
          <Label htmlFor="email" className="text-chocolate">Correo electrónico</Label>
          <Input name="email" placeholder="tu@ejemplo.com" required className="border-caramelo/30 focus:border-chocolate" />
          <Label htmlFor="password" className="text-chocolate">Contraseña</Label>
          <Input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            minLength={6}
            required
            className="border-caramelo/30 focus:border-chocolate"
          />
          <SubmitButton 
            formAction={signUpAction} 
            pendingText="Registrando..."
            className="mt-4 px-5 py-2 rounded-full bg-chocolate text-crema font-semibold shadow hover:bg-chocolate/90 transition"
          >
            Registrarse
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
