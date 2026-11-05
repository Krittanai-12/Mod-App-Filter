import { Activity, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';
import { type MockRole } from '@/components/mock-auth';

export type AdminTab = 'overview' | 'members' | 'policies' | 'activity';
export type Member = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: MockRole;
  active: boolean;
  color: string;
};
export type AuditEvent = {
  id: number;
  action: string;
  detail: string;
  time: string;
  type: 'member' | 'policy' | 'system';
};
export const initialMembers: Member[] = [
  {
    id: 1,
    name: 'Admin Demo',
    email: 'admin@example.com',
    department: 'IT & Security',
    role: 'admin',
    active: true,
    color: 'blue',
  },
  {
    id: 2,
    name: 'พิมพ์ชนก ตัวอย่าง',
    email: 'pim@example.com',
    department: 'Human Resources',
    role: 'member',
    active: true,
    color: 'pink',
  },
  {
    id: 3,
    name: 'ธนกร ตัวอย่าง',
    email: 'thanakorn@example.com',
    department: 'Operations',
    role: 'member',
    active: true,
    color: 'orange',
  },
  {
    id: 4,
    name: 'Member Demo',
    email: 'member@example.com',
    department: 'Marketing',
    role: 'member',
    active: true,
    color: 'purple',
  },
  {
    id: 5,
    name: 'นรินทร์ ตัวอย่าง',
    email: 'narin@example.com',
    department: 'IT & Security',
    role: 'admin',
    active: true,
    color: 'green',
  },
  {
    id: 6,
    name: 'กมล ตัวอย่าง',
    email: 'kamon@example.com',
    department: 'Finance',
    role: 'member',
    active: false,
    color: 'gray',
  },
];
export const initialEvents: AuditEvent[] = [
  {
    id: 1,
    action: 'อัปเดตนโยบายการปกปิด',
    detail: 'เปิดใช้งานการปกปิดเลขบัตรประชาชน',
    time: '10:42 · ตัวอย่าง',
    type: 'policy',
  },
  {
    id: 2,
    action: 'เพิ่มสมาชิกเข้าพื้นที่ทำงาน',
    detail: 'พิมพ์ชนก ตัวอย่าง · Human Resources',
    time: '10:15 · ตัวอย่าง',
    type: 'member',
  },
  {
    id: 3,
    action: 'เปิดใช้งานพื้นที่ทำงาน',
    detail: 'Acme Organization · โหมดทดลอง',
    time: '09:30 · ตัวอย่าง',
    type: 'system',
  },
];
export const policyTypes = [
  {
    id: 'name',
    label: 'ชื่อและนามสกุล',
    description: 'ชื่อที่มีป้ายกำกับหรือคำนำหน้า',
    sample: 'สมชาย ใจดี',
    mask: 'xxxxxx xxxx',
    color: 'purple',
  },
  {
    id: 'id',
    label: 'เลขบัตรประชาชน',
    description: 'เลขประจำตัวประชาชน 13 หลัก',
    sample: '1-2345-67890-12-3',
    mask: 'x-xxxx-xxxxx-xx-x',
    color: 'orange',
  },
  {
    id: 'email',
    label: 'อีเมล',
    description: 'ที่อยู่อีเมลภายในเนื้อหา',
    sample: 'user@example.com',
    mask: 'xxxx@xxxxxxx.xxx',
    color: 'blue',
  },
  {
    id: 'phone',
    label: 'เบอร์โทรศัพท์',
    description: 'รูปแบบหมายเลขโทรศัพท์ประเทศไทย',
    sample: '081-234-5678',
    mask: 'xxx-xxx-xxxx',
    color: 'pink',
  },
];
export const adminTabs = [
  { id: 'overview', name: 'ภาพรวมองค์กร', icon: LayoutDashboard },
  { id: 'members', name: 'จัดการสมาชิก', icon: Users },
  { id: 'policies', name: 'นโยบายขององค์กร', icon: ShieldCheck },
  { id: 'activity', name: 'บันทึกกิจกรรม', icon: Activity },
] as const;
