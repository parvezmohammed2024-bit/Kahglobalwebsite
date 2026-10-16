import type { Metadata } from 'next';

// Admin pages depend on the login cookie and live data — never prerender them.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Kah Global Admin' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-dvh flex-col bg-surface">{children}</div>;
}
