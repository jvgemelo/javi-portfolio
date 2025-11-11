'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { name: "Proyectos", href: "/proyectos" },
  { name: "Perfil", href: "/profile" },
  { name: "Contacto", href: "/contacto" },
];

export default function PortfolioNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-32 w-[30vw] bg-white py-2 rounded-full font-geist-sans">
      {navigationLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`relative font-bold transition-all duration-300 text-lg group ${
              isActive ? "text-primary" : "text-black hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            {link.name}
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`}></span>
          </Link>
        );
      })}
    </div>
  );
} 