import { updateBanner } from '@/config/site';

/** Attribute set on <html> once the visitor closes the update banner (see globals.css). */
export const UPDATE_BANNER_ATTR = 'data-update-banner';

/**
 * Inlined at the top of <body> so a banner dismissed earlier in this browser
 * session is hidden before first paint — no flash, no layout shift.
 */
export const updateBannerInitScript = `try{if(sessionStorage.getItem(${JSON.stringify(
  updateBanner.storageKey,
)})==="1")document.documentElement.setAttribute("${UPDATE_BANNER_ATTR}","dismissed")}catch(e){}`;
