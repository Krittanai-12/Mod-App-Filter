import type { Metadata } from 'next';
import WorkspaceHistory from '@/components/workspace/history-view';

export const metadata: Metadata = { title: 'ประวัติการใช้งาน | Mod App Filter' };

export default function Page() {
  return <WorkspaceHistory />;
}
