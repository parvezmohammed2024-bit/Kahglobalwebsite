'use client';

import { useActionState } from 'react';
import { LoaderCircle, LogIn } from 'lucide-react';
import { login } from '../actions';

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
        Password
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="h-12 rounded-control border border-line bg-white px-3.5 text-sm text-ink focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
        />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {state.error}
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
