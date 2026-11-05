import type { Metadata } from 'next';
import WorkspaceSettings from '@/components/workspace/settings-view';

export const metadata: Metadata = { title: 'ตั้งค่าพื้นที่ทำงาน | Mod App Filter' };

export default function Page() {
  return <WorkspaceSettings />;
}
