import type { Metadata } from 'next';
import AdminActivity from '@/components/admin/activity-view';

export const metadata: Metadata = { title: 'บันทึกกิจกรรม | Mod App Filter' };

export default function Page() {
  return <AdminActivity />;
}
