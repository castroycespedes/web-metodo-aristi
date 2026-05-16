"use client";

import { MessageCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-line/65 bg-brand-black/72 text-brand-white backdrop-blur-xl">
      <nav className="container-page flex h-[var(--header-height)] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Metodo Aristi inicio">
          <span className="grid h-11 w-11 place-items-center rounded-sm bg-aqua-sweep font-display text-3xl leading-none text-brand-black shadow-glow">
            A
          </span>
          <span className="grid leading-none">
            <span className="text-[0.58rem] font-black uppercase tracking-[0.48em] text-brand-steel">
              Metodo
            </span>
            <span className="font-display text-3xl tracking-[0.12em]">Aristi</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.68rem] font-black uppercase tracking-wide text-brand-white/70 transition hover:text-brand-cyan"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <ButtonLink
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          size="sm"
          icon={<MessageCircle size={16} />}
          className="hidden xl:inline-flex"
        >
          Agenda tu clase
        </ButtonLink>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-sm border border-brand-cyan/30 text-brand-cyan lg:hidden"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-brand-line bg-brand-black lg:hidden">
          <Container className="grid gap-1 py-4">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-3 text-xs font-black uppercase tracking-wide text-brand-white/78 hover:bg-white/5 hover:text-brand-cyan"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              size="sm"
              icon={<MessageCircle size={16} />}
              className="mt-2"
              onClick={() => setIsOpen(false)}
            >
              Agenda tu clase
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
