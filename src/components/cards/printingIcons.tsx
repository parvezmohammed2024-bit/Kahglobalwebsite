import { Palette, Printer, Sparkles, Stamp, type LucideIcon } from 'lucide-react';
import type { PrintingMethodId } from '@/data/services';

export const printingIcons: Record<PrintingMethodId, LucideIcon> = {
  embroidery: Sparkles,
  silkscreen: Stamp,
  sublimation: Palette,
  dtf: Printer,
};
