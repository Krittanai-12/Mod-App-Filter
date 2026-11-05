import type { Metadata } from 'next';
import AdminOverview from '@/components/admin/overview-view';

export const metadata: Metadata = { title: 'ภาพรวมผู้ดูแลระบบ | Mod App Filter' };

export default function Page() {
  return <AdminOverview />;
}
