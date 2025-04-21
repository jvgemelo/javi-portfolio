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
    <div className="flex gap-6">
      {navigationLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`font-medium transition-colors hover:text-primary text-sm ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
} 