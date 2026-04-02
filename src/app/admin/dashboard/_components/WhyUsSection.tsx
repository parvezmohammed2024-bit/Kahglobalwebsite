'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Feature {
  id?: number;
  number: string;
  title: string;
  description: string;
  display_order: number;
}

const EMPTY: Feature = { number: '01', title: '', description: '', display_order: 0 };

export default function WhyUsSection() {
  const [items, setItems] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Feature | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function load() {
    const { data } = await supabase.from('why_us_features').select('*').order('display_order');
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    const next = items.length + 1;
    setEditing({ ...EMPTY, number: String(next).padStart(2, '0'), display_order: next });
    setIsNew(true);
    setError('');
  }

  function openEdit(f: Feature) {
    setEditing({ ...f });
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

    const { error: err } = isNew
      ? await supabase.from('why_us_features').insert(payload)
      : await supabase.from('why_us_features').update(payload).eq('id', editing.id!);

    setSaving(false);
    if (err) { setError(err.message); return; }
    setEditing(null);
    load();
  }

  async function del(id: number) {
    await supabase.from('why_us_features').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  if (loading) return <div className="text-gray-400 text-sm animate-pulse p-4">Loading features…</div>;

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{items.length} feature point{items.length !== 1 ? 's' : ''} · shown as cards in the &quot;Why Choose Us&quot; section</p>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#C9A84C] text-white font-bold px-4 py-2 rounded-xl text-sm hover:brightness-110 transition-all shadow-md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Feature
        </button>
      </div>

      {items.length === 0 && !editing && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
          <p className="font-bold text-gray-400">No features yet</p>
          <p className="text-gray-300 text-sm mt-1">Click &quot;Add Feature&quot; to create one.</p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0A1F44]/10 flex items-center justify-center font-black text-[#C9A84C] text-sm flex-shrink-0">
              {f.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#0A1F44] text-sm">{f.title}</div>
              <div className="text-gray-400 text-xs mt-0.5 line-clamp-2">{f.description}</div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(f)} className="px-3 py-1.5 text-xs font-semibold text-[#0A1F44] border border-gray-200 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">Edit</button>
              <button onClick={() => setDeleteId(f.id!)} className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-[#C9A84C] shadow-lg p-6 space-y-4">
          <h3 className="font-extrabold text-[#0A1F44] text-base">{isNew ? 'New Feature' : 'Edit Feature'}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number (e.g. 01)</label>
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                value={editing.number}
                onChange={(e) => setEditing((prev) => prev && ({ ...prev, number: e.target.value }))}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Order</label>
              <input
                type="number"
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                value={editing.display_order}
                onChange={(e) => setEditing((prev) => prev && ({ ...prev, display_order: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
            <input
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              value={editing.title}
              onChange={(e) => setEditing((prev) => prev && ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing((prev) => prev && ({ ...prev, description: e.target.value }))}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="bg-[#0A1F44] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#C9A84C] transition-all disabled:opacity-60 shadow">
              {saving ? 'Saving…' : isNew ? 'Create Feature' : 'Save Changes'}
            </button>
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <h3 className="font-extrabold text-[#0A1F44] text-lg mb-2">Delete Feature?</h3>
            <p className="text-gray-500 text-sm mb-5">It will be removed from the Why Choose Us section.</p>
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
