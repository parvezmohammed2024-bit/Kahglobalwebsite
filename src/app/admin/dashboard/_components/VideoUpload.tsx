'use client';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface VideoUploadProps {
  currentUrl?: string;
  label: string;
  onUploaded: (url: string) => void;
}

export default function VideoUpload({ currentUrl, label, onUploaded }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentUrl ?? '');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setError('File too large. Max 50 MB.');
      return;
    }

    const allowed = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowed.includes(file.type)) {
      setError('Only MP4, WebM or OGG videos allowed.');
      return;
    }

    setUploading(true);
    setProgress(10);
    setError('');

    try {
      const ext = file.name.split('.').pop();
      const filename = `hero/video-${Date.now()}.${ext}`;

      setProgress(30);
      const { error: uploadError } = await supabase.storage
        .from('kah-images')
        .upload(filename, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      setProgress(90);
      const { data } = supabase.storage.from('kah-images').getPublicUrl(filename);
      setProgress(100);
      setPreview(data.publicUrl);
      onUploaded(data.publicUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function remove() {
    setPreview('');
    onUploaded('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>

      {/* Video preview */}
      {preview && (
        <div className="mb-3 relative rounded-xl overflow-hidden border border-gray-200 bg-black" style={{ height: 180 }}>
          <video
            src={preview}
            className="w-full h-full object-contain"
            autoPlay
            muted
            loop
            playsInline
          />
          <button
            type="button"
            onClick={remove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-md transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Remove
          </button>
        </div>
      )}

      {/* Upload zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 text-center transition-all duration-200 ${
          uploading ? 'border-[#C9A84C] bg-[#C9A84C]/5 cursor-wait' : 'border-gray-300 cursor-pointer hover:border-[#C9A84C] hover:bg-[#C9A84C]/5'
        }`}
      >
        {uploading ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#C9A84C] font-semibold text-sm">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading video…
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-[#C9A84C] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">{preview ? 'Click to replace video' : 'Click to upload video'}</p>
            <p className="text-xs text-gray-400 mt-0.5">MP4, WebM, OGG · Max 50 MB</p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/ogg"
        className="hidden"
        onChange={handleFile}
      />

      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}

      {preview && (
        <p className="text-xs text-gray-400 mt-1.5">
          Video plays automatically, muted, looping as hero background. If both image and video are set, video takes priority.
        </p>
      )}
    </div>
  );
}
