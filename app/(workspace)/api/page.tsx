import type { Metadata } from 'next';
import WorkspaceApi from '@/components/workspace/api-view';

export const metadata: Metadata = { title: 'API และการเชื่อมต่อ | Mod App Filter' };

export default function Page() {
  return <WorkspaceApi />;
}
