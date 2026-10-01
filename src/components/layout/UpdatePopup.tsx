'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { updatePopup } from '@/config/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { showUpdateBar } from '@/lib/updateNotice';
import { buttonClasses } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

type Phase = 'hidden' | 'open' | 'closing';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(updatePopup.storageKey) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(updatePopup.storageKey, '1');
  } catch {
    // Storage blocked (private mode etc.) — the popup may show again on reload.
  }
}

/**
 * "Website being updated" popup. Appears once per browser session after
 * `delayMs`, blurs the page behind it, locks scrolling and traps focus.
 */
export function UpdatePopup({ delayMs }: { delayMs: number }) {
  const [phase, setPhase] = useState<Phase>('hidden');
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const finishedRef = useRef(false);

  // Schedule the popup once per visit.
  useEffect(() => {
    if (alreadySeen()) return;
    const timer = window.setTimeout(() => {
      // Re-check in case another tab/page marked it while we waited.
      if (alreadySeen()) return;
      markSeen();
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setPhase('open');
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  // Lock scroll (without layout shift) and move focus into the dialog while visible.
  const visible = phase !== 'hidden';
  useEffect(() => {
    if (!visible) return;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    primaryRef.current?.focus();
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [visible]);

  // Final step of closing: unmount, reveal the bottom bar, restore focus.
  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase('hidden');
    showUpdateBar();
    returnFocusRef.current?.focus?.();
  }, []);

  const close = useCallback(() => {
    markSeen();
    setPhase((p) => (p === 'open' ? 'closing' : p));
    // Fallback in case the exit animation's animationend never fires.
    window.setTimeout(finish, 400);
  }, [finish]);

  function onAnimationEnd() {
    if (phase === 'closing') finish();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab' || !dialogRef.current) return;
    // Keep keyboard focus inside the dialog.
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!visible) return null;
  const closing = phase === 'closing';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" onKeyDown={onKeyDown}>
      {/* Overlay — click to close */}
      <div
        aria-hidden
        onClick={close}
        className={`absolute inset-0 bg-navy-950/45 backdrop-blur-[8px] ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-popup-title"
        aria-describedby="update-popup-text"
        onAnimationEnd={onAnimationEnd}
        className={`relative w-full max-w-[420px] rounded-panel bg-white p-6 text-center shadow-overlay sm:p-8 ${
          closing ? 'animate-pop-out' : 'animate-pop-in'
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-control text-muted hover:bg-surface hover:text-navy"
        >
          <X aria-hidden className="size-4" />
        </button>

        <div className="mx-auto mb-5 flex justify-center">
          <Image
            src="/brand/logo-full.png"
            alt="Kah Global Sdn Bhd"
            width={600}
            height={269}
            className="h-auto w-48 sm:w-52"
          />
        </div>

        <h2 id="update-popup-title" className="font-display text-headline-sm font-bold text-navy sm:text-2xl">
          {updatePopup.heading}
        </h2>
        <div id="update-popup-text" className="mt-3 flex flex-col gap-2">
          <p className="text-sm text-ink sm:text-base">{updatePopup.text}</p>
          <p lang="ms" className="text-xs text-muted sm:text-sm">
            {updatePopup.textMs}
          </p>
        </div>

        <div className="mt-6 flex w-full flex-col gap-2.5">
          <a
            ref={primaryRef}
            href={whatsappUrl(updatePopup.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={buttonClasses('whatsapp', 'md', 'w-full')}
          >
            <WhatsAppIcon /> {updatePopup.whatsappLabel}
          </a>
          <button type="button" onClick={close} className={buttonClasses('outline', 'md', 'w-full')}>
            {updatePopup.continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
