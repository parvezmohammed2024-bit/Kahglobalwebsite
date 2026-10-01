import { updatePopup } from '@/config/site';

/**
 * Set on <html> once the visitor has seen (and closed) the update popup.
 * globals.css uses it to show the bottom progress bar, pad the page and
 * lift the floating WhatsApp button.
 */
export const UPDATE_BAR_ATTR = 'data-update-bar';

export function showUpdateBar() {
  document.documentElement.setAttribute(UPDATE_BAR_ATTR, 'on');
}

/**
 * Inlined at the top of <body>: if the popup was already seen this session,
 * show the bar before first paint (no flash or layout shift on later pages).
 */
export const updateBarInitScript = `try{if(sessionStorage.getItem(${JSON.stringify(
  updatePopup.storageKey,
)})==="1")document.documentElement.setAttribute("${UPDATE_BAR_ATTR}","on")}catch(e){}`;
