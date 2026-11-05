import {
  AudioLines,
  Code2,
  Fingerprint,
  History,
  Mail,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { type EntityType } from '@/lib/redact';

export type Page = 'workspace' | 'history' | 'policies' | 'api' | 'settings';
export type RecordItem = { id: number; name: string; count: number; time: string; kind: string };
export const entities: { type: EntityType; icon: LucideIcon; color: string; hint: string }[] = [
  { type: 'name', icon: Users, color: 'purple', hint: 'ชื่อและนามสกุลภาษาไทย / อังกฤษ' },
  { type: 'id', icon: Fingerprint, color: 'orange', hint: 'เลขประจำตัวประชาชน 13 หลัก' },
  { type: 'email', icon: Mail, color: 'blue', hint: 'ที่อยู่อีเมล' },
  { type: 'phone', icon: AudioLines, color: 'pink', hint: 'หมายเลขโทรศัพท์ประเทศไทย' },
  { type: 'custom', icon: SlidersHorizontal, color: 'gray', hint: 'คำหรือข้อมูลที่คุณกำหนด' },
];
export const nav: { id: Page; label: string; icon: LucideIcon }[] = [
  { id: 'workspace', label: 'พื้นที่ปกปิดข้อมูล', icon: ScanLine },
  { id: 'history', label: 'ประวัติการใช้งาน', icon: History },
  { id: 'policies', label: 'นโยบายการปกปิด', icon: ShieldCheck },
  { id: 'api', label: 'API & การเชื่อมต่อ', icon: Code2 },
];
