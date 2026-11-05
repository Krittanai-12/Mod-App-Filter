'use client';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Label } from '@/components/ui/label';
import { ui } from '@/lib/ui-styles';
import { FlaskConical, Plus, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { AppNavbar } from '@/components/app-navbar';
import { type MockRole } from '@/components/mock-auth';
import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { adminTabs } from './config';
import { adminPaths, pageForPath } from '@/lib/routes';
import { useAdmin } from './state';

export function AdminShell({ children }: { children: ReactNode }) {
  const tab = pageForPath(adminPaths, usePathname(), 'overview');
  const {
    members,
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
    addMember,
  } = useAdmin();
  return (
    <div className={ui('app-shell admin-shell navbar-layout')}>
      <AppNavbar
        admin
        items={adminTabs.map((item) => ({
          id: item.id,
          label: item.name,
          icon: item.icon,
          active: tab === item.id,
          badge: item.id === 'members' ? String(members.length) : undefined,
          href: adminPaths[item.id],
        }))}
      />
      <div className={ui('main-shell')}>
        <main className={ui('admin-main')}>
          <div className={ui('page-heading')}>
            <div>
              <div className={ui('eyebrow')}>
                <span />
                YOUR TEAM. YOUR PRIVACY. YOUR CONTROL.
              </div>
              <h1>
                {tab === 'overview'
                  ? 'ดูแลทั้งทีม จากที่เดียว'
                  : tab === 'members'
                    ? 'คนที่ใช่ ในพื้นที่ที่ปลอดภัย'
                    : tab === 'policies'
                      ? 'มาตรฐานเดียวกัน สำหรับทั้งองค์กร'
                      : 'มองเห็นทุกความเคลื่อนไหว'}
              </h1>
              <p>
                {tab === 'overview'
                  ? 'ภาพรวมสมาชิก นโยบาย และกิจกรรมในพื้นที่ทำงานขององค์กร'
                  : tab === 'members'
                    ? 'จัดการสมาชิกและบทบาทในหน้าจำลอง โดยไม่มีการส่งคำเชิญจริง'
                    : tab === 'policies'
                      ? 'ทดลองตั้งค่าการปกปิดสำหรับองค์กร ก่อนเชื่อมต่อระบบจริง'
                      : 'กิจกรรมตัวอย่างและการเปลี่ยนแปลงที่คุณทดลองทำในหน้านี้'}
              </p>
            </div>
            <Button
              size="sm"
              className="gap-2! text-xs! [&>svg]:block!"
              onClick={() => {
                setAddOpen(true);
                setMemberError('');
              }}
            >
              <Plus size={15} />
              เพิ่มสมาชิก
            </Button>
          </div>
          <div className={ui('admin-preview-note')}>
            <FlaskConical size={15} />
            <span>
              <b>Admin preview</b> · ข้อมูลและการเปลี่ยนแปลงเป็นตัวอย่างเฉพาะหน้านี้
              รีเฟรชเพื่อเริ่มใหม่
            </span>
            <span>ไม่เชื่อมฐานข้อมูล</span>
          </div>
          {children}

          <footer>
            <span className={ui('footer-brand')}>
              <ShieldCheck size={14} />
              Mod App Filter · Admin
            </span>
            <span>Built for your team. Designed for privacy.</span>
            <span className={ui('version')}>Mockup · v0.2</span>
          </footer>
        </main>
      </div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <span className={ui('dialog-icon')}>
            <Users size={25} />
          </span>
          <DialogTitle>เพิ่มสมาชิกในทีม</DialogTitle>
          <DialogDescription>
            เพิ่มข้อมูลเพื่อทดลองหน้าจัดการเท่านั้น ไม่มีการสร้างบัญชีหรือส่งอีเมลจริง
          </DialogDescription>
          <form className={ui('admin-add-form')} onSubmit={addMember}>
            <Label unstyled htmlFor="member-name">
              ชื่อที่แสดง
            </Label>
            <Input
              unstyled
              id="member-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={80}
              placeholder="ชื่อสมาชิกตัวอย่าง"
            />
            <Label unstyled htmlFor="member-email">
              อีเมล
            </Label>
            <Input
              unstyled
              id="member-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
              placeholder="name@example.com"
            />
            <div>
              <Label unstyled>
                แผนก
                <NativeSelect
                  unstyled
                  aria-label="แผนกสมาชิกใหม่"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {['Operations', 'IT & Security', 'Human Resources', 'Marketing', 'Finance'].map(
                    (d) => (
                      <NativeSelectOption key={d}>{d}</NativeSelectOption>
                    ),
                  )}
                </NativeSelect>
              </Label>
              <Label unstyled>
                บทบาท
                <NativeSelect
                  unstyled
                  aria-label="บทบาทสมาชิกใหม่"
                  value={role}
                  onChange={(e) => setRole(e.target.value as MockRole)}
                >
                  <NativeSelectOption value="member">User</NativeSelectOption>
                  <NativeSelectOption value="admin">Admin</NativeSelectOption>
                </NativeSelect>
              </Label>
            </div>
            {memberError && (
              <p className={ui('form-error')} role="alert">
                {memberError}
              </p>
            )}
            <Button type="submit">
              <Plus size={16} />
              เพิ่มสมาชิกจำลอง
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
