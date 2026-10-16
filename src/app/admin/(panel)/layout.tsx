import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, LogOut, TriangleAlert } from 'lucide-react';
import { requireAdmin } from '@/lib/admin/auth';
import { blobConfigured } from '@/lib/catalog/store';
import { logout } from '../actions';

const nav = [
  { href: '/admin', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/images', label: 'Page images' },
];

export default async function AdminPanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/brand/logo-mark.png" alt="" width={36} height={34} className="h-8 w-auto" />
            <span className="font-display font-extrabold text-navy">Kah Global Admin</span>
          </Link>
          <nav aria-label="Admin" className="order-3 w-full overflow-x-auto sm:order-none sm:w-auto">
            <ul className="flex gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex h-9 items-center rounded-control px-3 text-sm font-semibold text-navy hover:bg-surface">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              className="inline-flex h-9 items-center gap-1.5 rounded-control px-3 text-sm font-semibold text-steel hover:bg-surface"
            >
              Website <ExternalLink className="size-3.5" />
            </Link>
            <form action={logout}>
              <button type="submit" className="inline-flex h-9 items-center gap-1.5 rounded-control px-3 text-sm font-semibold text-steel hover:bg-surface">
                <LogOut className="size-3.5" /> Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      {!blobConfigured() && (
        <div className="border-b border-orange-line bg-orange-soft">
          <p className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-3 text-sm text-navy md:px-8">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-orange" />
            <span>
              <strong>Storage not connected — changes cannot be saved yet.</strong> In Vercel open this project → Storage →
              Create → Blob (public access), connect it to the project, then redeploy. You are seeing the built-in default
              catalogue.
            </span>
          </p>
        </div>
      )}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
    </>
  );
}
