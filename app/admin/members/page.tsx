import type { Metadata } from 'next';
import AdminMembers from '@/components/admin/members-view';

export const metadata: Metadata = { title: 'จัดการสมาชิก | Mod App Filter' };

export default function Page() {
  return <AdminMembers />;
}
