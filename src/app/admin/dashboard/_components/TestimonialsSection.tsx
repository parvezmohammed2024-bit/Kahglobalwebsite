'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from './ImageUpload';

interface Testimonial {
  id?: number;
  quote: string;
  name: string;
  job_title: string;
  company: string;
  avatar_url: string;
  display_order: number;
}

const EMPTY: Testimonial = { quote: '', name: '', job_title: '', company: '', avatar_url: '', display_order: 0 };

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function load() {
    const { data } = await supabase.from('testimonials').select('*').order('display_order');
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing({ ...EMPTY, display_order: items.length + 1 });
    setIsNew(true);
    setError('');
  }

  function openEdit(t: Testimonial) {
    setEditing({ ...t });
    setIsNew(false);
    setError('');
  }

  async function save() {
    if (!editing) return;
    if (!editing.quote.trim() || !editing.name.trim()) { setError('Quote and Name are required.'); return; }
    setSaving(true);
    setError('');

    const payload = { ...editing };
    delete payload.id;

    const { error: err } = isNew
      ? await supabase.from('testimonials').insert(payload)
      : await supabase.from('testimonials').update(payload).eq('id', editing.id!);

    setSaving(false);
    if (err) { setError(err.message); return; }
    setEditing(null);
    load();
  }

  async function del(id: number) {
    await supabase.from('testimonials').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  if (loading) return <div className="text-gray-400 text-sm animate-pulse p-4">Loading testimonials…</div>;

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{items.length} testimonial{items.length !== 1 ? 's' : ''} · rotates in carousel on website</p>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#C9A84C] text-white font-bold px-4 py-2 rounded-xl text-sm hover:brightness-110 transition-all shadow-md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Testimonial
        </button>
      </div>

      {items.length === 0 && !editing && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
          <p className="font-bold text-gray-400">No testimonials yet</p>
          <p className="text-gray-300 text-sm mt-1">Click &quot;Add Testimonial&quot; to create the first one.</p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0A1F44] flex items-center justify-center text-[#C9A84C] font-extrabold text-sm flex-shrink-0 overflow-hidden">
              {t.avatar_url
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                : t.name.charAt(0).toUpperCase()
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#0A1F44] text-sm">{t.name} <span className="text-gray-400 font-normal">— {t.company}</span></div>
              <div className="text-gray-400 text-xs mt-0.5 line-clamp-2">&ldquo;{t.quote}&rdquo;</div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(t)} className="px-3 py-1.5 text-xs font-semibold text-[#0A1F44] border border-gray-200 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">Edit</button>
              <button onClick={() => setDeleteId(t.id!)} className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-[#C9A84C] shadow-lg p-6 space-y-4">
          <h3 className="font-extrabold text-[#0A1F44] text-base">{isNew ? 'New Testimonial' : 'Edit Testimonial'}</h3>
          <FormField label="Quote / Message *" value={editing.quote} onChange={(v) => setEditing((e) => e && ({ ...e, quote: v }))} textarea />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Client Name *" value={editing.name} onChange={(v) => setEditing((e) => e && ({ ...e, name: v }))} />
            <FormField label="Job Title" value={editing.job_title} onChange={(v) => setEditing((e) => e && ({ ...e, job_title: v }))} />
          </div>
          <FormField label="Company" value={editing.company} onChange={(v) => setEditing((e) => e && ({ ...e, company: v }))} />
          <ImageUpload
            bucket="kah-images"
            path={`testimonials/${editing.name || 'avatar'}`}
            currentUrl={editing.avatar_url}
            label="Client Photo (optional)"
            onUploaded={(url) => setEditing((e) => e && ({ ...e, avatar_url: url }))}
          />
          <FormField label="Display Order (1 = first)" value={String(editing.display_order)} onChange={(v) => setEditing((e) => e && ({ ...e, display_order: Number(v) }))} type="number" />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="bg-[#0A1F44] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#C9A84C] transition-all disabled:opacity-60 shadow">
              {saving ? 'Saving…' : isNew ? 'Create Testimonial' : 'Save Changes'}
            </button>
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <h3 className="font-extrabold text-[#0A1F44] text-lg mb-2">Delete Testimonial?</h3>
            <p className="text-gray-500 text-sm mb-5">It will be removed from the website carousel.</p>
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
