import type { Product } from '@/data/products';
import { formatQtyRange, formatRM } from '@/lib/format';

export function PriceTierTable({ product }: { product: Product }) {
  const base = product.priceTiers[0].price;
  return (
    <div className="overflow-hidden rounded-card border border-line">
      <div className="flex items-center justify-between bg-navy px-4 py-2.5">
        <p className="text-label font-semibold uppercase text-white">Volume price per piece</p>
        <p className="text-xs text-sky">Excl. branding & SST</p>
      </div>
      <table className="w-full text-sm">
        <caption className="sr-only">Price per piece by order quantity</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Quantity</th>
            <th scope="col">Price per piece</th>
            <th scope="col">Saving</th>
          </tr>
        </thead>
        <tbody>
          {product.priceTiers.map((tier, i) => {
            const saving = Math.round((1 - tier.price / base) * 100);
            const best = i === product.priceTiers.length - 1;
            return (
              <tr key={tier.minQty} className={`border-t border-line ${best ? 'bg-orange-soft' : i % 2 ? 'bg-surface' : 'bg-white'}`}>
                <th scope="row" className="px-4 py-3 text-left font-semibold text-navy">
                  {formatQtyRange(tier.minQty, tier.maxQty)}
                  {tier.label && <span className="block text-xs font-normal text-muted">{tier.label}</span>}
                </th>
                <td className="px-4 py-3 text-right font-display font-bold text-navy tabular-nums">{formatRM(tier.price)}</td>
                <td className="w-24 px-4 py-3 text-right text-xs font-semibold tabular-nums">
                  {saving > 0 ? <span className="text-emerald-700">Save {saving}%</span> : <span className="text-muted">Base</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
