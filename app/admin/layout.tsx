import type { ReactNode } from 'react';
import { RequireMockSession } from '@/components/mock-auth';
import { AdminProvider } from '@/components/admin/state';
import { AdminShell } from '@/components/admin/shell';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RequireMockSession admin>
      <AdminProvider>
        <AdminShell>{children}</AdminShell>
      </AdminProvider>
    </RequireMockSession>
  );
}
