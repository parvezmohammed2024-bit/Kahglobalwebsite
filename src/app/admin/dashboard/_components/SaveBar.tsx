'use client';

interface SaveBarProps {
  saving: boolean;
  saved: boolean;
  error: string;
  onSave: () => void;
  label?: string;
}

export default function SaveBar({ saving, saved, error, onSave, label = 'Save Changes' }: SaveBarProps) {
  return (
    <div className="flex items-center gap-4 pt-4 border-t border-gray-200 mt-6">
      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-[#0A1F44] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#C9A84C] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
      >
        {saving ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Saving…
          </>
        ) : label}
      </button>

      {saved && !saving && (
        <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Saved! Website updated.
        </span>
      )}

      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}
