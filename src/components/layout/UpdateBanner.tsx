'use client';

import { Wrench, X } from 'lucide-react';
import { updateBanner } from '@/config/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { UPDATE_BANNER_ATTR } from '@/lib/updateBanner';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function UpdateBanner() {
  function dismiss() {
    try {
      sessionStorage.setItem(updateBanner.storageKey, '1');
    } catch {
      // Storage unavailable (private mode / blocked) — hide for this page view only.
    }
    document.documentElement.setAttribute(UPDATE_BANNER_ATTR, 'dismissed');
  }

  return (
    <div
      id="update-banner"
      role="region"
      aria-label="Website update notice"
      className="border-b border-orange-line bg-orange-soft text-navy"
    >
      <div className="container-page flex items-start gap-2.5 py-1.5 text-xs leading-snug md:items-center md:gap-3">
        <Wrench aria-hidden className="mt-0.5 size-3.5 shrink-0 text-orange md:mt-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-row md:items-center md:gap-3">
          <p lang="en">{updateBanner.en}</p>
          <span aria-hidden className="hidden h-3.5 w-px shrink-0 bg-orange-line md:block" />
          <p lang="ms" className="text-navy/80">
            {updateBanner.ms}
          </p>
          <a
            href={whatsappUrl(updateBanner.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 self-start md:ml-auto md:self-auto font-semibold whitespace-nowrap text-navy underline underline-offset-2 hover:text-orange-ink"
          >
            <WhatsAppIcon className="size-3.5 text-whatsapp" />
            {updateBanner.linkLabel}
          </a>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close notice"
          className="-my-1 -mr-1.5 inline-flex size-7 shrink-0 items-center justify-center rounded-control text-navy/70 hover:bg-orange-line/60 hover:text-navy"
        >
          <X aria-hidden className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
