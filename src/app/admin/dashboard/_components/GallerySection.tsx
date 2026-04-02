'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from './ImageUpload';

interface GalleryImage {
  id?: number;
  image_url: string;
  alt_text: string;
  display_order: number;
}

const EMPTY: GalleryImage = { image_url: '', alt_text: '', display_order: 0 };

export default function GallerySection() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState<GalleryImage>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function load() {
    const { data } = await supabase.from('gallery_images').select('*').order('display_order');
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!newItem.image_url) { setError('Please upload an image first.'); return; }
    setSaving(true);
    setError('');
    const payload = { ...newItem, display_order: items.length + 1 };
    const { error: err } = await supabase.from('gallery_images').insert(payload);
    setSaving(false);
    if (err) { setError(err.message); return; }
    setNewItem({ ...EMPTY });
    setAdding(false);
    load();
  }

  async function del(id: number) {
    await supabase.from('gallery_images').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  if (loading) return <div className="text-gray-400 text-sm animate-pulse p-4">Loading gallery…</div>;

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{items.length} image{items.length !== 1 ? 's' : ''} · scrolling marquee shown before Contact section</p>
          <p className="text-gray-400 text-xs mt-0.5">Gallery only appears on website when at least 1 image is uploaded.</p>
        </div>
        <button onClick={() => { setAdding(true); setError(''); }}
          className="inline-flex items-center gap-2 bg-[#C9A84C] text-white font-bold px-4 py-2 rounded-xl text-sm hover:brightness-110 transition-all shadow-md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Image
        </button>
      </div>

      {/* Grid preview */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-[4/5] bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.image_url} alt={img.alt_text} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                <button
                  onClick={() => setDeleteId(img.id!)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                <p className="text-white text-xs truncate">{img.alt_text || 'No caption'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && !adding && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
          <p className="font-bold text-gray-400">No gallery images yet</p>
          <p className="text-gray-300 text-sm mt-1">Click &quot;Add Image&quot; to upload your first photo.</p>
        </div>
      )}

      {/* Add form */}
      {adding && (
        <div className="bg-white rounded-2xl border border-[#C9A84C] shadow-lg p-6 space-y-4">
          <h3 className="font-extrabold text-[#0A1F44] text-base">Add Gallery Image</h3>
          <ImageUpload
            bucket="kah-images"
            path={`gallery/img-${Date.now()}`}
            currentUrl={newItem.image_url}
            label="Gallery Photo"
            onUploaded={(url) => setNewItem((p) => ({ ...p, image_url: url }))}
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Caption / Alt Text (optional)</label>
            <input
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              placeholder="e.g. Corporate uniforms for Bank Rakyat"
              value={newItem.alt_text}
              onChange={(e) => setNewItem((p) => ({ ...p, alt_text: e.target.value }))}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving}
              className="bg-[#0A1F44] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#C9A84C] transition-all disabled:opacity-60 shadow">
              {saving ? 'Saving…' : 'Add to Gallery'}
            </button>
            <button onClick={() => { setAdding(false); setNewItem({ ...EMPTY }); }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
            <h3 className="font-extrabold text-[#0A1F44] text-lg mb-2">Delete Image?</h3>
            <p className="text-gray-500 text-sm mb-5">It will be removed from the gallery immediately.</p>
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
