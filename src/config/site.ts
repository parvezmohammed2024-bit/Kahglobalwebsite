/**
 * Site-wide switches. Change a value and redeploy.
 */

/** Show the "we're updating our website" popup once per visit. */
export const SHOW_UPDATE_POPUP = true;

/** How long after page load the popup appears (milliseconds). */
export const POPUP_DELAY_MS = 4000;

export const updatePopup = {
  heading: 'We’re Working Behind the Scenes',
  text: 'Our new website is being updated with product photos and full details. You can still browse, or contact us directly for orders and quotes.',
  textMs: 'Laman web kami sedang dikemas kini. Hubungi kami untuk tempahan dan sebut harga.',
  whatsappLabel: 'WhatsApp Us',
  continueLabel: 'Continue Browsing',
  whatsappMessage: 'Hi Kah Global, I would like to ask about uniforms / a quotation.',
  /** sessionStorage key — the popup shows once per browser session. */
  storageKey: 'kg-update-popup-seen',
} as const;
