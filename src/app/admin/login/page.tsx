import Image from 'next/image';
import { redirect } from 'next/navigation';
import { adminConfigured, isAdmin } from '@/lib/admin/auth';
import { LoginForm } from './LoginForm';

export const metadata = { title: 'Log in' };

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin');
  const ready = adminConfigured();

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-panel border border-line bg-white p-6 shadow-card sm:p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Image src="/brand/logo-full.png" alt="Kah Global Sdn Bhd" width={600} height={269} className="h-auto w-40" />
          <h1 className="font-display text-xl font-bold text-navy">Website admin</h1>
        </div>
        {ready ? (
          <LoginForm />
        ) : (
          <div className="rounded-control bg-orange-soft p-4 text-sm text-ink">
            <p className="font-semibold text-navy">Admin is not set up yet.</p>
            <p className="mt-1">
              In Vercel → Project → Settings → Environment Variables, add <code>ADMIN_PASSWORD</code> and{' '}
              <code>ADMIN_SESSION_SECRET</code> (a long random text, 32+ characters), then redeploy.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
