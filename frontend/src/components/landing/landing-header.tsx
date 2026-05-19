'use client';

import { Instagram, Menu, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { href: '#metodo', label: 'Metodo' },
  { href: '#funciona', label: 'Como funciona' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#galeria', label: 'Galeria' },
  { href: '/login', label: 'Entrar al sistema' },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-8 text-[11px] font-black uppercase text-white/80 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
          <a className="transition hover:text-primary" href="https://www.instagram.com/" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
        </nav>
        <div className="hidden lg:block">
          <Button className="rounded-md font-black uppercase">Agenda tu clase</Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80 border-white/10 bg-black text-white">
            <div className="flex h-full flex-col px-5 py-6">
              <Brand onClick={() => setOpen(false)} />
              <nav className="mt-10 flex flex-col gap-2 text-sm font-black uppercase">
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
                <a
                  href="https://www.instagram.com/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-white/80 transition hover:bg-white/10 hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </nav>
              <Button className="mt-auto rounded-md font-black uppercase">
                Agenda tu clase
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20">
        <ShieldCheck className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xl font-black uppercase leading-none">Metodo Aristi</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
          Escuela de futbol
        </p>
      </div>
    </Link>
  );
}
