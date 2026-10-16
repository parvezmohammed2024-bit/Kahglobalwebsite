import { getCatalogFresh } from '@/lib/catalog/store';
import { SiteImagesEditor } from '@/components/admin/SiteImagesEditor';

export const metadata = { title: 'Page images' };

export default async function AdminImagesPage() {
  const catalog = await getCatalogFresh();
  return <SiteImagesEditor siteImages={catalog.siteImages} />;
}
