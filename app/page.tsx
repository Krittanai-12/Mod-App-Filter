'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { workspacePaths } from '@/lib/routes';

// Client redirect also works with the project's static export.
export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(workspacePaths.workspace);
  }, [router]);
  return (
    <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground" role="status">
      <Link href={workspacePaths.workspace}>กำลังเปิดพื้นที่ทำงาน…</Link>
    </div>
  );
}
