'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from './ImageUpload';
import VideoUpload from './VideoUpload';
import SaveBar from './SaveBar';

interface HeroData {
  eyebrow: string;
  headline: string;
  headline_accent: string;
  subheadline: string;
  hero_image_url: string;
  hero_image_alt: string;
  hero_video_url: string;
  cat_corporate_url: string;
  cat_school_url: string;
  cat_hotel_url: string;
  cat_industrial_url: string;
}

const DEFAULTS: HeroData = {
  eyebrow: 'Premium Uniform Manufacturer · Dubai, UAE',
  headline: 'Uniforms That Define',
  headline_accent: 'Your Brand',
  subheadline: 'Kah Global delivers premium custom uniforms across the UAE — corporate, school, hospitality, and industrial. Trusted by 500+ businesses.',
  hero_image_url: '',
  hero_image_alt: 'Kah Global hero image',
  hero_video_url: '',
  cat_corporate_url: '',
  cat_school_url: '',
  cat_hotel_url: '',
  cat_industrial_url: '',
};

export default function HeroSection() {
  const [data, setData] = useState<HeroData>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('hero_settings').select('*').limit(1).single().then(({ data: row }) => {
      if (row) setData({ ...DEFAULTS, ...row });
      setLoading(false);
    });
  }, []);

  function set(key: keyof HeroData, val: string) {
    setData((d) => ({ ...d, [key]: val }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError('');

    // Try full save with video URL first
    let { error: err } = await supabase.from('hero_settings').upsert(
      { id: 1, ...data },
      { onConflict: 'id' }
    );

    // If hero_video_url column doesn't exist yet, save without it
    if (err?.message?.includes('hero_video_url')) {
      const { hero_video_url: _v, ...dataWithoutVideo } = data;
      const result = await supabase.from('hero_settings').upsert(
        { id: 1, ...dataWithoutVideo },
        { onConflict: 'id' }
      );
      err = result.error;
      if (!err) {
        setError('Saved (except video — run: npm run migrate to enable video support)');
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  if (loading) return <LoadingCard />;

  return (
    <div className="max-w-2xl space-y-6">
      <Card title="Hero Text">
        <Field label="Eyebrow Text (small badge above headline)" value={data.eyebrow} onChange={(v) => set('eyebrow', v)} />
        <Field label="Main Headline" value={data.headline} onChange={(v) => set('headline', v)} />
        <Field label="Headline Accent (gold highlighted word)" value={data.headline_accent} onChange={(v) => set('headline_accent', v)} />
        <Field label="Subheading / Description" value={data.subheadline} onChange={(v) => set('subheadline', v)} textarea />
      </Card>

      <Card title="Hero Background Video">
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-3 mb-2">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-blue-700 text-xs leading-relaxed">
            Video plays automatically, muted &amp; looping as the hero background. <strong>Video takes priority over image</strong> when both are set.
          </p>
        </div>
        <VideoUpload
          currentUrl={data.hero_video_url}
          label="Background Video"
          onUploaded={(url) => set('hero_video_url', url)}
        />
      </Card>

      <Card title="Hero Background Image">
        <p className="text-xs text-gray-400 -mt-1 mb-1">Used as fallback if no video is set, or as a poster frame behind the video.</p>
        <ImageUpload
          bucket="kah-images"
          path="hero/background"
          currentUrl={data.hero_image_url}
          label="Background Image"
          onUploaded={(url) => set('hero_image_url', url)}
        />
        <Field label="Image Alt Text (for accessibility)" value={data.hero_image_alt} onChange={(v) => set('hero_image_alt', v)} />
      </Card>

      <Card title="Floating Category Card Images">
        <p className="text-xs text-gray-400 -mt-1 mb-2">
          These are the 4 square cards shown on the right side of the hero. Upload a photo for each — replaces the default icon.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ImageUpload
            bucket="kah-images"
            path="hero/cat-corporate"
            currentUrl={data.cat_corporate_url}
            label="Corporate Uniforms"
            onUploaded={(url) => set('cat_corporate_url', url)}
          />
          <ImageUpload
            bucket="kah-images"
            path="hero/cat-school"
            currentUrl={data.cat_school_url}
            label="School Uniforms"
            onUploaded={(url) => set('cat_school_url', url)}
          />
          <ImageUpload
            bucket="kah-images"
            path="hero/cat-hotel"
            currentUrl={data.cat_hotel_url}
            label="Hotel / Hospitality"
            onUploaded={(url) => set('cat_hotel_url', url)}
          />
          <ImageUpload
            bucket="kah-images"
            path="hero/cat-industrial"
            currentUrl={data.cat_industrial_url}
            label="Industrial / Safety"
            onUploaded={(url) => set('cat_industrial_url', url)}
          />
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

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  const cls = "w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#C9A84C] transition-colors";
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {textarea
        ? <textarea className={cls + " resize-none"} rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input className={cls} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse space-y-4">
        {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-100 rounded-xl" />)}
      </div>
    </div>
  );
}
