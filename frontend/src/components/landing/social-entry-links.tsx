import { Facebook, Instagram, Music2 } from 'lucide-react';
import { facebookUrl, instagramUrl, tiktokUrl } from '@/lib/contact';

const socialLinks = [
  {
    href: instagramUrl,
    label: 'Instagram',
    value: '@metodoaristi',
    icon: Instagram,
    className: 'text-[#E4405F]',
  },
  {
    href: tiktokUrl,
    label: 'TikTok',
    value: '@metodoaristi',
    icon: Music2,
    className: 'text-primary',
  },
  {
    href: facebookUrl,
    label: 'Facebook',
    value: 'Método Aristi',
    icon: Facebook,
    className: 'text-[#1877F2]',
  },
];

export function SocialEntryLinks() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {socialLinks.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 border border-primary/70 bg-primary/5 px-4 py-3 text-white transition hover:border-primary hover:bg-primary/15 hover:shadow-[0_0_22px_hsl(var(--primary)/0.22)]"
            aria-label={item.label}
          >
            <Icon className={`h-7 w-7 shrink-0 transition group-hover:scale-110 ${item.className}`} />
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-white/50 group-hover:text-primary/80">
                {item.label}
              </span>
              <span className="block truncate text-sm font-black">{item.value}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
