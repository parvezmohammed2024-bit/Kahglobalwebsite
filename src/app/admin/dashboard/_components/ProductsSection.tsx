'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from './ImageUpload';

interface Product {
  id?: number;
  title: string;
  description: string;
  gradient: string;
  image_url: string;
  image_alt: string;
  display_order: number;
}

const GRADIENTS = [
  { label: 'Navy Blue',    value: 'from-[#0A1F44] via-[#0d2855] to-[#1a3a6e]' },
  { label: 'Emerald',      value: 'from-emerald-700 to-emerald-900' },
  { label: 'Amber / Gold', value: 'from-amber-600 to-amber-900' },
  { label: 'Slate Gray',   value: 'from-gray-600 to-gray-900' },
  { label: 'Purple',       value: 'from-purple-700 to-purple-900' },
  { label: 'Rose',         value: 'from-rose-600 to-rose-900' },
];

const EMPTY: Product = { title: '', description: '', gradient: GRADIENTS[0].value, image_url: '', image_alt: '', display_order: 0 };

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function load() {
    const { data } = await supabase.from('products').select('*').order('display_order');
    setProducts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing({ ...EMPTY, display_order: products.length + 1 });
    setIsNew(true);
    setError('');
  }

  function openEdit(p: Product) {
    setEditing({ ...p });
    setIsNew(false);
    setError('');
  }

  async function save() {
    if (!editing) return;
    if (!editing.title.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    setError('');

    const payload = { ...editing };
    delete payload.id;

    let err;
    if (isNew) {
      ({ error: err } = await supabase.from('products').insert(payload));
    } else {
      ({ error: err } = await supabase.from('products').update(payload).eq('id', editing.id!));
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    setEditing(null);
    load();
  }

  async function del(id: number) {
    await supabase.from('products').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  if (loading) return <div className="text-gray-400 text-sm animate-pulse p-4">Loading products…</div>;

  return (
    <div className="max-w-3xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{products.length} product{products.length !== 1 ? 's' : ''} · shown on website in order</p>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#C9A84C] text-white font-bold px-4 py-2 rounded-xl text-sm hover:brightness-110 transition-all shadow-md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
      </div>

      {/* List */}
      {products.length === 0 && !editing && (
        <EmptyState label="No products yet" hint='Click "Add Product" to create your first one.' />
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#0A1F44] text-sm truncate">{p.title}</div>
              <div className="text-gray-400 text-xs truncate">{p.description}</div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(p)} className="px-3 py-1.5 text-xs font-semibold text-[#0A1F44] border border-gray-200 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">Edit</button>
              <button onClick={() => setDeleteId(p.id!)} className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-[#C9A84C] shadow-lg p-6 space-y-4">
          <h3 className="font-extrabold text-[#0A1F44] text-base">{isNew ? 'New Product' : 'Edit Product'}</h3>

          <FormField label="Product Name *" value={editing.title} onChange={(v) => setEditing((e) => e && ({ ...e, title: v }))} />
          <FormField label="Description" value={editing.description} onChange={(v) => setEditing((e) => e && ({ ...e, description: v }))} textarea />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Color</label>
            <select
              value={editing.gradient}
              onChange={(e) => setEditing((prev) => prev && ({ ...prev, gradient: e.target.value }))}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] transition-colors"
            >
              {GRADIENTS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>

          <ImageUpload
            bucket="kah-images"
            path={`products/${editing.title || 'product'}`}
            currentUrl={editing.image_url}
            label="Product Image"
            onUploaded={(url) => setEditing((e) => e && ({ ...e, image_url: url, image_alt: editing.title }))}
          />
          <FormField label="Display Order (1 = first)" value={String(editing.display_order)} onChange={(v) => setEditing((e) => e && ({ ...e, display_order: Number(v) }))} type="number" />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="bg-[#0A1F44] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#C9A84C] transition-all disabled:opacity-60 shadow">
              {saving ? 'Saving…' : isNew ? 'Create Product' : 'Save Changes'}
            </button>
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <h3 className="font-extrabold text-[#0A1F44] text-lg mb-2">Delete Product?</h3>
            <p className="text-gray-500 text-sm mb-5">This will remove it from the website immediately.</p>
            <div className="flex gap-3">
              <button onClick={() => del(deleteId)} className="bg-red-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-red-600 transition-all">Delete</button>
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({ label, value, onChange, textarea, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string }) {
  const cls = "w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] transition-colors";
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {textarea
        ? <textarea className={cls + " resize-none"} rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input className={cls} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  );
}

function EmptyState({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
      <p className="font-bold text-gray-400">{label}</p>
      <p className="text-gray-300 text-sm mt-1">{hint}</p>
    </div>
  );
}
