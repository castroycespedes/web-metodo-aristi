import { Instagram, Mail, MapPin, MessageCircle, Music2 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SocialButton } from "@/components/ui/social-button";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-black text-brand-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.75fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-aqua-sweep font-display text-3xl text-brand-black shadow-glow">
              A
            </span>
            <span className="font-display text-3xl tracking-[0.12em]">Metodo Aristi</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-brand-steel">{siteConfig.description}</p>
          <div className="mt-6 flex gap-3">
            <SocialButton
              href={getWhatsAppUrl()}
              label="WhatsApp"
              icon={<MessageCircle size={18} />}
              rel="noreferrer"
              target="_blank"
            />
            <SocialButton
              href={siteConfig.instagramUrl}
              label="Instagram"
              icon={<Instagram size={18} />}
              rel="noreferrer"
              target="_blank"
            />
            <SocialButton
              href={siteConfig.tiktokUrl}
              label="TikTok"
              icon={<Music2 size={18} />}
              rel="noreferrer"
              target="_blank"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-cyan">Mapa</h2>
          <div className="grid gap-3 text-sm text-brand-steel">
            {siteConfig.navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand-cyan">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-cyan">Contacto</h2>
          <div className="grid gap-3 text-sm text-brand-steel">
            <span className="flex items-center gap-2">
              <Mail size={16} /> contacto@metodoaristi.com
            </span>
            <a
              className="flex items-center gap-2 transition hover:text-brand-cyan"
              href={getWhatsAppUrl()}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle size={16} /> WhatsApp {siteConfig.whatsapp.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {siteConfig.location}
            </span>
          </div>
        </div>
      </Container>
      <div className="border-t border-brand-line py-5 text-center text-xs text-brand-steel/70">
        © {new Date().getFullYear()} Metodo Aristi. Todos los derechos reservados.
      </div>
    </footer>
  );
}
