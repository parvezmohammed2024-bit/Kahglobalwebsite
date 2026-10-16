import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { UpdatePopup } from '@/components/layout/UpdatePopup';
import { UpdateBar } from '@/components/layout/UpdateBar';
import { updateBarInitScript } from '@/lib/updateNotice';
import { POPUP_DELAY_MS, SHOW_UPDATE_POPUP } from '@/config/site';

/** Public website chrome: header, footer, WhatsApp button, update notice. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-control bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      {SHOW_UPDATE_POPUP && <script dangerouslySetInnerHTML={{ __html: updateBarInitScript }} />}
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      {SHOW_UPDATE_POPUP && (
        <>
          <UpdateBar />
          <UpdatePopup delayMs={POPUP_DELAY_MS} />
        </>
      )}
    </>
  );
}
