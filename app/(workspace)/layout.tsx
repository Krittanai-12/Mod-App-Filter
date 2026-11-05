import type { ReactNode } from 'react';
import { RequireMockSession } from '@/components/mock-auth';
import { WorkspaceProvider } from '@/components/workspace/state';
import { WorkspaceShell } from '@/components/workspace/shell';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RequireMockSession>
      <WorkspaceProvider>
        <WorkspaceShell>{children}</WorkspaceShell>
      </WorkspaceProvider>
    </RequireMockSession>
  );
}
