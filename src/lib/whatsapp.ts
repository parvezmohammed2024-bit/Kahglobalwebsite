import { contact } from '@/data/site';

/** wa.me link to the company WhatsApp, optionally with a pre-filled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hi Kah Global, I would like to enquire about uniforms for my company.';
