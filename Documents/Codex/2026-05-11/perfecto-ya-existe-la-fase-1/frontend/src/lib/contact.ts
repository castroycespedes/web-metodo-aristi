export const whatsappNumber = '573013420785';
export const instagramUrl = 'https://www.instagram.com/metodoaristi/';
export const tiktokUrl = 'https://www.tiktok.com/@metodoaristi';
export const facebookUrl = 'https://www.facebook.com/MetodoAristi';

export function createWhatsappUrl(message?: string) {
  const baseUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;

  if (!message) return baseUrl;

  return `${baseUrl}&text=${encodeURIComponent(message)}`;
}
