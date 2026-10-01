import { updateBar } from '@/config/site';
import { whatsappUrl } from '@/lib/whatsapp';

/**
 * Slim "website in progress" bar fixed to the bottom of the screen.
 * Hidden by default; shown via CSS once <html data-update-bar="on"> is set
 * (after the update popup closes, or immediately on later pages of the visit).
 */
export function UpdateBar() {
  return (
    <div
      id="update-bar"
      role="status"
      className="fixed inset-x-0 bottom-0 z-30 hidden h-[var(--update-bar-h)] items-center justify-center bg-navy px-4 text-xs text-white shadow-[0_-2px_8px_rgb(0_16_38/0.15)]"
    >
      <p className="flex min-w-0 items-center gap-1.5 whitespace-nowrap">
        <span aria-hidden>🚧</span>
        <span className="truncate sm:hidden">{updateBar.textShort}</span>
        <span className="hidden truncate sm:inline">{updateBar.text}</span>
        <span aria-hidden className="text-sky">·</span>
        <a
          href={whatsappUrl(updateBar.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-semibold text-white underline underline-offset-2 hover:text-orange-line"
        >
          <span className="sm:hidden">{updateBar.linkShort}</span>
          <span className="hidden sm:inline">{updateBar.link}</span>
        </a>
      </p>
    </div>
  );
}
