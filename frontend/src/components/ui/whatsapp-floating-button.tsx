import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site";

type WhatsAppFloatingButtonProps = {
  phone?: string;
  message?: string;
};

export function WhatsAppFloatingButton({
  phone,
  message
}: WhatsAppFloatingButtonProps) {
  const href =
    phone && message ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : getWhatsAppUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand-cyan text-brand-black shadow-glow-strong transition hover:scale-105 hover:bg-brand-cyanDark"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={25} />
    </a>
  );
}
