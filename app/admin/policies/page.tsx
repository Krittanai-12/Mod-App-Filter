import type { Metadata } from 'next';
import AdminPolicies from '@/components/admin/policies-view';

export const metadata: Metadata = { title: 'นโยบายขององค์กร | Mod App Filter' };

export default function Page() {
  return <AdminPolicies />;
}
