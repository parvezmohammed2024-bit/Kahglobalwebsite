import { contact } from '@/data/site';
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/** Floating WhatsApp button shown on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with us on WhatsApp (${contact.whatsapp.display})`}
      id="whatsapp-float"
      className="group fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-overlay transition-transform hover:scale-105 hover:bg-whatsapp-hover md:right-6 md:bottom-6 md:py-3 md:pr-5 md:pl-4"
    >
      <WhatsAppIcon className="size-7 md:size-6" />
      <span className="hidden text-sm font-semibold md:inline">Chat on WhatsApp</span>
    </a>
  );
}
