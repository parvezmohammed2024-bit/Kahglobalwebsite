/**
 * Site-wide switches. Flip a value and redeploy.
 */

/** Show the "website is being updated" notice at the top of every page. */
export const SHOW_UPDATE_BANNER = true;

export const updateBanner = {
  en: 'We’re updating our website — product photos and details are coming soon. For orders and quotes, WhatsApp us anytime.',
  ms: 'Laman web kami sedang dikemas kini — gambar dan maklumat produk akan datang. Untuk tempahan dan sebut harga, WhatsApp kami.',
  linkLabel: 'WhatsApp Us',
  whatsappMessage: 'Hi Kah Global, I would like to ask about uniforms / a quotation.',
  /** sessionStorage key — dismissal lasts for the browser session only. */
  storageKey: 'kg-update-banner-dismissed',
} as const;
