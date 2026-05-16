export const siteConfig = {
  name: "Metodo Aristi",
  description:
    "Entrenamientos con balon y coordinacion para formar jugadores tecnicos, creativos y sin miedo.",
  url: "https://metodoaristi.com",
  whatsapp: {
    phone: "3022243805",
    message: "Hola, quiero información sobre los entrenamientos"
  },
  instagramUrl: "https://www.instagram.com/metodoaristi",
  tiktokUrl: "https://www.tiktok.com/@metodoaristi",
  location: "Colombia",
  navItems: [
    { label: "Inicio", href: "/" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Metodo Aristi", href: "#metodo" },
    { label: "Entrenamientos", href: "#entrenamientos" },
    { label: "Galeria", href: "#galeria" },
    { label: "Sobre mi", href: "#sobre-mi" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Contacto", href: "#contacto" }
  ]
};

export function getWhatsAppUrl() {
  return `https://wa.me/${siteConfig.whatsapp.phone}?text=${encodeURIComponent(
    siteConfig.whatsapp.message
  )}`;
}
