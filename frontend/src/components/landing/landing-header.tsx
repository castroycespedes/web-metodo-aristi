'use client';

import Image from 'next/image';
import { Instagram, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { createWhatsappUrl, instagramUrl } from '@/lib/contact';

const navItems = [
  { href: '#metodo', label: 'Método' },
  { href: '#funciona', label: 'Cómo funciona' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#galeria', label: 'Galería' },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const evaluationUrl = createWhatsappUrl('Quiero mi evaluación técnica');

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
          <a
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_12%,#fd5949_38%,#d6249f_62%,#285AEB_100%)] text-white transition hover:scale-105"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </nav>
        <div className="hidden lg:block">
          <Button asChild className="rounded-md font-black uppercase">
            <a href={evaluationUrl} target="_blank" rel="noreferrer">Agenda tu evaluación técnica</a>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Abrir menú"
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
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-white/80 transition hover:bg-white/10 hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </nav>
              <Button asChild className="mt-auto rounded-md font-black uppercase">
                <a href={evaluationUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  Agenda tu evaluación técnica
                </a>
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
      <Image
        src="/assets/metodo-aristi-logo.jpeg"
        alt="Método Aristi"
        width={48}
        height={48}
        className="h-12 w-12 rounded-md object-cover"
      />
      <div>
        <p className="text-xl font-black uppercase leading-none">Método Aristi</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
          Academia de tecnificación
        </p>
      </div>
    </Link>
  );
}
