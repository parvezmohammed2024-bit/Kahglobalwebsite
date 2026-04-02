'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from './ImageUpload';
import SaveBar from './SaveBar';

interface Settings {
  logo_url: string;
  company_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  footer_text: string;
  map_embed_url: string;
}

const DEFAULTS: Settings = {
  logo_url: '',
  company_name: 'Kah Global',
  tagline: 'Premium uniforms crafted for excellence — serving businesses across the UAE since 2014.',
  phone: '+971 55 123 4567',
  email: 'info@kahglobal.ae',
  address: 'Dubai, United Arab Emirates',
  whatsapp: '+971551234567',
  instagram: 'https://instagram.com/kahglobal',
  facebook: 'https://facebook.com/kahglobal',
  footer_text: '© 2025 Kah Global General Trading LLC. All rights reserved.',
  map_embed_url: '',
};

type Row = { key: string; value: string };

function toSettings(rows: Row[]): Settings {
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value ?? '';
  return { ...DEFAULTS, ...map };
}

function fromSettings(s: Settings): Row[] {
  return (Object.keys(s) as (keyof Settings)[]).map((key) => ({ key, value: s[key] }));
}

export default function SettingsSection() {
  const [data, setData] = useState<Settings>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('site_settings').select('key, value').then(({ data: rows }) => {
      if (rows?.length) setData(toSettings(rows));
      setLoading(false);
    });
  }, []);

  function set(key: keyof Settings, val: string) {
    setData((d) => ({ ...d, [key]: val }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError('');

    const rows = fromSettings(data);
    const { error: err } = await supabase
      .from('site_settings')
      .upsert(rows, { onConflict: 'key' });

    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  if (loading) return (
    <div className="max-w-2xl space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse space-y-3">
          {[1,2,3].map(j => <div key={j} className="h-10 bg-gray-100 rounded-xl" />)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <Card title="Logo">
        <ImageUpload
          bucket="kah-images"
          path="settings/logo"
          currentUrl={data.logo_url}
          label="Company Logo"
          onUploaded={(url) => set('logo_url', url)}
        />
        {data.logo_url && (
          <p className="text-xs text-gray-400 mt-1">Logo URL saved. Website Navbar &amp; Footer will use this automatically.</p>
        )}
      </Card>

      <Card title="Company Info">
        <Field label="Company Name" value={data.company_name} onChange={(v) => set('company_name', v)} />
        <Field label="Company Tagline" value={data.tagline} onChange={(v) => set('tagline', v)} textarea />
        <Field label="Footer Copyright Text" value={data.footer_text} onChange={(v) => set('footer_text', v)} />
      </Card>

      <Card title="Contact Details">
        <Field label="Phone Number" value={data.phone} onChange={(v) => set('phone', v)} placeholder="+971 55 123 4567" />
        <Field label="Email Address" value={data.email} onChange={(v) => set('email', v)} placeholder="info@kahglobal.ae" />
        <Field label="WhatsApp Number (digits only, no spaces)" value={data.whatsapp} onChange={(v) => set('whatsapp', v)} placeholder="971551234567" />
        <Field label="Office Address" value={data.address} onChange={(v) => set('address', v)} textarea />
      </Card>

      <Card title="Google Maps Pin">
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          1. Go to <strong>Google Maps</strong> and search your location.<br />
          2. Click <strong>Share</strong> → <strong>Embed a map</strong> → Copy the iframe code.<br />
          3. Paste only the <strong>src="..."</strong> URL (starting with <code className="bg-gray-100 px-1 rounded">https://www.google.com/maps/embed</code>) below.
        </p>
        <Field
          label="Google Maps Embed URL"
          value={data.map_embed_url}
          onChange={(v) => set('map_embed_url', v)}
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        {data.map_embed_url && (
          <div className="mt-3 rounded-xl overflow-hidden border border-gray-200" style={{ height: 200 }}>
            <iframe
              src={data.map_embed_url}
              style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map preview"
            />
          </div>
        )}
      </Card>

      <Card title="Social Media Links">
        <Field label="Instagram URL" value={data.instagram} onChange={(v) => set('instagram', v)} placeholder="https://instagram.com/yourpage" />
        <Field label="Facebook URL" value={data.facebook} onChange={(v) => set('facebook', v)} placeholder="https://facebook.com/yourpage" />
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
