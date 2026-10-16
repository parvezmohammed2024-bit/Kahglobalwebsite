'use client';

import { useActionState, useState } from 'react';
import { Eye, EyeOff, LoaderCircle, LogIn } from 'lucide-react';
import { login } from '../actions';

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);
  const [visible, setVisible] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
        Password
        <span className="relative">
          <input
            type={visible ? 'text' : 'password'}
            name="password"
            required
            autoFocus
            autoComplete="current-password"
            className="h-12 w-full rounded-control border border-line bg-white pr-12 pl-3.5 text-sm text-ink focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-control text-muted hover:bg-surface hover:text-navy"
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </span>
      </label>
      {state?.error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {state.error} Passwords are case-sensitive. If you changed it in Vercel, redeploy before logging in.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-control bg-navy font-semibold text-white hover:bg-steel disabled:opacity-60"
      >
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : <LogIn className="size-4" />} Log in
      </button>
    </form>
  );
}
