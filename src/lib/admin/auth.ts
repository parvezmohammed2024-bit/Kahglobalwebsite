import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/*
 * Minimal single-password admin auth.
 *   ADMIN_PASSWORD        — the password used on /admin/login
 *   ADMIN_SESSION_SECRET  — long random string used to sign the session cookie
 * Set both in Vercel → Project → Settings → Environment Variables.
 */

export const SESSION_COOKIE = 'kg_admin';
const SESSION_DAYS = 7;

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

function sign(payload: string, key: string): string {
  return createHmac('sha256', key).update(payload).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !secret()) return false;
  // Compare HMACs so lengths always match and timing does not leak.
  const key = secret() as string;
  return safeEqual(sign(input, key), sign(expected, key));
}

export async function startSession() {
  const key = secret();
  if (!key) throw new Error('ADMIN_SESSION_SECRET is not set');
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(expires);
  (await cookies()).set(SESSION_COOKIE, `${payload}.${sign(payload, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const key = secret();
  if (!key || !process.env.ADMIN_PASSWORD) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload, key))) return false;
  return Number(payload) > Date.now();
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
