'use client';
import { ui } from '@/lib/ui-styles';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoaderCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type MockRole = 'member' | 'admin';
export type MockUser = { name: string; email: string; role: MockRole };
const SESSION_KEY = 'mod-app-filter.mock-session.v1';
type AuthState = {
  user: MockUser | null;
  ready: boolean;
  login: (email: string, role: MockRole) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthState | null>(null);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? 'null');
      if (
        saved &&
        typeof saved.name === 'string' &&
        typeof saved.email === 'string' &&
        ['member', 'admin'].includes(saved.role)
      )
        setUser(saved);
    } catch {
      /* Missing or unavailable browser storage starts a fresh demo. */
    }
    setReady(true);
  }, []);

  function login(email: string, role: MockRole) {
    const next: MockUser = {
      name: role === 'admin' ? 'Admin Demo' : 'Member Demo',
      email: email.trim(),
      role,
    };
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } catch {
      /* In-memory preview still works. */
    }
    setUser(next);
    router.replace(role === 'admin' ? '/admin' : '/home');
  }

  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* Clear the in-memory session as well. */
    }
    setUser(null);
    router.replace('/login');
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useMockAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('Mock auth requires MockAuthProvider');
  return auth;
}

export function RequireMockSession({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const { user, ready, logout } = useMockAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user) router.replace('/login');
  }, [ready, user, router]);
  if (!ready || !user)
    return (
      <div className={ui('auth-loading')} role="status">
        <LoaderCircle className={ui('spin')} size={25} />
        <span>กำลังเปิดพื้นที่ทำงาน…</span>
      </div>
    );
  if (admin && user.role !== 'admin')
    return (
      <div className={ui('access-denied')}>
        <span>
          <ShieldAlert size={34} />
        </span>
        <h1>พื้นที่สำหรับผู้ดูแลระบบ</h1>
        <p>
          คุณกำลังทดลองใช้งานด้วยบทบาทผู้ใช้ทั่วไป
          <br />
          เข้าสู่ระบบด้วยบทบาท Admin เพื่อดูหน้าจัดการ
        </p>
        <Button asChild>
          <Link href="/home">กลับพื้นที่ทำงาน</Link>
        </Button>
        <Button variant="ghost" onClick={logout}>
          เข้าสู่ระบบด้วยบัญชีอื่น
        </Button>
        <small>การจำกัดหน้านี้เป็นตัวอย่าง UI สำหรับ mockup เท่านั้น</small>
      </div>
    );
  return children;
}
