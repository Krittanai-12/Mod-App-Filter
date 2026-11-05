import type { Metadata } from 'next';
import WorkspacePolicies from '@/components/workspace/policies-view';

export const metadata: Metadata = { title: 'นโยบายการปกปิด | Mod App Filter' };

export default function Page() {
  return <WorkspacePolicies />;
}
