const rm = new Intl.NumberFormat('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 18.9 → "RM 18.90" */
export function formatRM(value: number): string {
  return `RM ${rm.format(value)}`;
}

/** Tier label, e.g. "1–49 pcs" or "300+ pcs" */
export function formatQtyRange(minQty: number, maxQty?: number): string {
  return maxQty === undefined ? `${minQty.toLocaleString('en-MY')}+ pcs` : `${minQty}–${maxQty} pcs`;
}
