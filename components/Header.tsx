"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="">
      <nav className="">
        <Link href="/" className={`py-2 font-medium ${isActive("/")}`}>
          Home
        </Link>
        <Link href="/sobre" className={` ${isActive("/sobre")}`}>
          Sobre
        </Link>
        <Link
          href="/contato"
          className={`py-2 font-medium ${isActive("/contato")}`}
        >
          Contato
        </Link>
      </nav>
    </header>
  );
}
