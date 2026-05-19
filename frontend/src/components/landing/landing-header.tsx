'use client';

import { Instagram, Menu, MessageCircle, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const whatsappUrl =
  'https://wa.me/3022243805?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20entrenamientos';

const navItems = [
  { href: '#metodo', label: 'Metodo' },
  { href: '#funciona', label: 'Como funciona' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contacto', label: 'Contacto' },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-8 text-[11px] font-black uppercase text-white/80 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
          <a
            className="transition hover:text-primary"
            href="https://www.instagram.com/metodoaristi"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </nav>
        <a className="hidden lg:block" href={whatsappUrl} target="_blank" rel="noreferrer">
          <Button className="rounded-md font-black uppercase">
            <MessageCircle className="h-4 w-4" />
            Agenda tu clase
          </Button>
        </a>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-black lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 text-sm font-black uppercase sm:px-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-white/80 transition hover:bg-white/10 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              <Button className="mt-3 w-full">
                <MessageCircle className="h-4 w-4" />
                Agenda tu clase
              </Button>
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-primary">
        <ShieldCheck className="h-6 w-6" />
      </div>
      <div>
        <p className="font-oswald text-xl font-black uppercase leading-none text-primary cyan-glow">
          Halcones
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
          Escuela de futbol
        </p>
      </div>
    </Link>
  );
}
