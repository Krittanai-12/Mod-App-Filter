'use client';
import { toast } from 'sonner';
import { useMockAuth, type MockRole } from '@/components/mock-auth';
import { createContext, useContext, useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  initialMembers,
  initialEvents,
  type AdminTab,
  type Member,
  type AuditEvent,
} from './config';
import { adminPaths } from '@/lib/routes';

function useAdminState() {
  const router = useRouter();
  const { user } = useMockAuth();
  const [members, setMembers] = useState(initialMembers);
  const [events, setEvents] = useState(initialEvents);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [memberError, setMemberError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Operations');
  const [role, setRole] = useState<MockRole>('member');
  const [policy, setPolicy] = useState(['name', 'id', 'email', 'phone']);
  const [policyDraft, setPolicyDraft] = useState(policy);
  const [savedAt, setSavedAt] = useState('ยังไม่มีการเปลี่ยนแปลง');
  const activeMembers = members.filter((m) => m.active).length;
  const filteredMembers = members.filter(
    (m) =>
      `${m.name} ${m.email} ${m.department}`.toLowerCase().includes(query.toLowerCase()) &&
      (filter === 'all' ||
        (filter === 'active' && m.active) ||
        (filter === 'inactive' && !m.active) ||
        (filter === 'admin' && m.role === 'admin')),
  );
  function audit(action: string, detail: string, type: AuditEvent['type']) {
    setEvents((items) => [
      {
        id: Date.now(),
        action,
        detail,
        type,
        time:
          new Date().toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Bangkok',
          }) + ' · เซสชันนี้',
      },
      ...items,
    ]);
  }
  function go(next: AdminTab) {
    router.push(adminPaths[next]);
  }
  function addMember(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      setMemberError('กรุณาระบุชื่อสมาชิก');
      return;
    }
    if (members.some((m) => m.email.toLowerCase() === email.trim().toLowerCase())) {
      setMemberError('อีเมลนี้มีอยู่ในรายชื่อแล้ว');
      return;
    }
    setMembers((items) => [
      ...items,
      {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        department,
        role,
        active: true,
        color: 'blue',
      },
    ]);
    audit('เพิ่มสมาชิกจำลอง', `${name.trim()} · ${department}`, 'member');
    setAddOpen(false);
    setName('');
    setEmail('');
    setMemberError('');
    toast.success('เพิ่มสมาชิกในหน้าจำลองแล้ว ไม่มีการส่งอีเมล');
  }
  function setMemberRole(member: Member, next: MockRole) {
    setMembers((items) => items.map((m) => (m.id === member.id ? { ...m, role: next } : m)));
    audit(
      'เปลี่ยนบทบาทสมาชิก',
      `${member.name} → ${next === 'admin' ? 'Admin' : 'User'}`,
      'member',
    );
    toast.success('เปลี่ยนบทบาทในหน้าจำลองแล้ว');
  }
  function toggleMember(member: Member) {
    setMembers((items) => items.map((m) => (m.id === member.id ? { ...m, active: !m.active } : m)));
    audit(member.active ? 'ปิดสถานะสมาชิกจำลอง' : 'เปิดสถานะสมาชิกจำลอง', member.name, 'member');
  }
  function savePolicy() {
    setPolicy([...policyDraft]);
    setSavedAt('บันทึกแล้วในเซสชันนี้');
    audit('บันทึกนโยบายจำลอง', `เปิดการปกปิด ${policyDraft.length} ประเภท`, 'policy');
    toast.success('บันทึกนโยบายตัวอย่างแล้ว');
  }
  function exportEvents() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(events, null, 2)], { type: 'application/json;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mock-admin-activity.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return {
    user,
    members,
    setMembers,
    events,
    setEvents,
    query,
    setQuery,
    filter,
    setFilter,
    addOpen,
    setAddOpen,
    memberError,
    setMemberError,
    name,
    setName,
    email,
    setEmail,
    department,
    setDepartment,
    role,
    setRole,
    policy,
    setPolicy,
    policyDraft,
    setPolicyDraft,
    savedAt,
    setSavedAt,
    activeMembers,
    filteredMembers,
    audit,
    go,
    addMember,
    setMemberRole,
    toggleMember,
    savePolicy,
    exportEvents,
  };
}

const AdminContext = createContext<ReturnType<typeof useAdminState> | null>(null);

// This provider lives in the shared layout, so in-memory data survives menu navigation.
export function AdminProvider({ children }: { children: ReactNode }) {
  const state = useAdminState();
  return <AdminContext.Provider value={state}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const state = useContext(AdminContext);
  if (!state) throw new Error('useAdmin requires AdminProvider');
  return state;
}
