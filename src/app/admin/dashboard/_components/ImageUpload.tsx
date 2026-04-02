'use client';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface ImageUploadProps {
  bucket: string;
  path: string;
  currentUrl?: string;
  label: string;
  onUploaded: (url: string) => void;
}

export default function ImageUpload({ bucket, path, currentUrl, label, onUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentUrl ?? '');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Max 10 MB.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Sanitize filename — remove spaces and special chars
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const safePath = path.replace(/[^a-zA-Z0-9/_-]/g, '-');
      const filename = `${safePath}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filename, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: '3600',
        });

      if (uploadError) {
        // Provide clearer error messages
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Storage bucket not found. Run npm run migrate to create it.');
        }
        if (uploadError.message.includes('not allowed') || uploadError.message.includes('policy')) {
          throw new Error('Upload blocked by storage policy. Run the storage fix SQL in Supabase.');
        }
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
      setPreview(data.publicUrl);
      onUploaded(data.publicUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed — check browser console for details');
      console.error('[ImageUpload] Error:', err);
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    setPreview('');
    onUploaded('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>

      {preview && (
        <div className="mb-3 relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group" style={{ height: 140 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="preview" className="w-full h-full object-contain p-2" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-md transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Remove
          </button>
        </div>
      )}

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 text-center transition-all duration-200 ${
          uploading
            ? 'border-[#C9A84C] bg-[#C9A84C]/5 cursor-wait'
            : 'border-gray-300 cursor-pointer hover:border-[#C9A84C] hover:bg-[#C9A84C]/5'
        }`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-[#C9A84C] font-semibold text-sm">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading…
          </div>
        ) : (
          <>
            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">{preview ? 'Click to replace image' : 'Click to upload image'}</p>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP · Max 10 MB</p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {error && (
        <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
