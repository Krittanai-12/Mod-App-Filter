import type { Metadata } from 'next';
import WorkspaceHome from '@/components/workspace/home-view';

export const metadata: Metadata = { title: 'พื้นที่ปกปิดข้อมูล | Mod App Filter' };

export default function Page() {
  return <WorkspaceHome />;
}
