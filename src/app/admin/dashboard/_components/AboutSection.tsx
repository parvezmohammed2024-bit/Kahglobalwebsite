'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from './ImageUpload';
import SaveBar from './SaveBar';

interface AboutData {
  about_heading: string;
  about_intro: string;
  about_story1: string;
  about_story2: string;
  about_factory_url: string;
  about_factory_alt: string;
  about_highlights: string; // stored as newline-separated
}

const DEFAULTS: AboutData = {
  about_heading: 'Crafting Uniforms That Make a Statement',
  about_intro: 'From our production facility in Cheras, KL, we deliver premium uniforms across Malaysia for over a decade.',
  about_story1: 'Founded in Cheras, we started with a simple mission — help Malaysian businesses project professionalism through well-crafted, affordable uniforms.',
  about_story2: 'Over a decade later, we serve SMEs, government departments, international hotel chains and national schools — all from our in-house production facility.',
  about_factory_url: '',
  about_factory_alt: 'Our factory in Cheras, KL',
  about_highlights: 'In-house design and production facility\nISO-compliant quality control process\nMOQ from 50 units — flexible for all sizes\nDelivery across Peninsular & East Malaysia',
};

export default function AboutSection() {
  const [data, setData] = useState<AboutData>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('about_settings').select('*').limit(1).single().then(({ data: row }) => {
      if (row) setData({ ...DEFAULTS, ...row });
      setLoading(false);
    });
  }, []);

  function set(key: keyof AboutData, val: string) {
    setData((d) => ({ ...d, [key]: val }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError('');
    const { error: err } = await supabase.from('about_settings').upsert(
      { id: 1, ...data },
      { onConflict: 'id' }
    );
    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  if (loading) return (
    <div className="max-w-2xl space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse space-y-3">
          {[1,2].map(j => <div key={j} className="h-10 bg-gray-100 rounded-xl" />)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">

      <Card title="About Section Image">
        <ImageUpload
          bucket="kah-images"
          path="about/factory"
          currentUrl={data.about_factory_url}
          label="Factory / Company Photo (shown on left side of About section)"
          onUploaded={(url) => set('about_factory_url', url)}
        />
        <Field
          label="Image Alt Text"
          value={data.about_factory_alt}
          onChange={(v) => set('about_factory_alt', v)}
          placeholder="e.g. Our factory in Cheras, KL"
        />
      </Card>

      <Card title="About Section Text">
        <Field label="Section Heading" value={data.about_heading} onChange={(v) => set('about_heading', v)} />
        <Field label="Intro Paragraph (shown below heading)" value={data.about_intro} onChange={(v) => set('about_intro', v)} textarea />
      </Card>

      <Card title="Our Story">
        <Field label="Story Paragraph 1" value={data.about_story1} onChange={(v) => set('about_story1', v)} textarea />
        <Field label="Story Paragraph 2" value={data.about_story2} onChange={(v) => set('about_story2', v)} textarea />
      </Card>

      <Card title="Highlights / Bullet Points">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Highlight Points <span className="text-gray-400 font-normal">(one per line)</span>
          </label>
          <textarea
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
            rows={6}
            value={data.about_highlights}
            onChange={(e) => set('about_highlights', e.target.value)}
            placeholder={"In-house design and production facility\nISO-compliant quality control process\nMOQ from 50 units — flexible for all sizes"}
          />
          <p className="text-xs text-gray-400 mt-1">Each line becomes one bullet point with a gold checkmark.</p>
        </div>
      </Card>

      <SaveBar saving={saving} saved={saved} error={error} onSave={save} />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-base font-extrabold text-[#0A1F44] mb-5 pb-3 border-b border-gray-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, textarea, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string;
}) {
  const cls = "w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#C9A84C] transition-colors";
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {textarea
        ? <textarea className={cls + " resize-none"} rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        : <input className={cls} type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  );
}
