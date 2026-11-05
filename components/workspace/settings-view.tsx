'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ui } from '@/lib/ui-styles';
import { Database, LockKeyhole } from 'lucide-react';

export default function WorkspaceSettings() {
  return (
    <div className={ui('settings-layout')}>
      <Card as="section" className={ui('secondary-card')}>
        <div className={ui('section-title')}>
          <h2>ข้อมูลองค์กร</h2>
          <Badge variant="unstyled" className={ui('subtle-badge')}>
            ตัวอย่าง
          </Badge>
        </div>
        <div className={ui('org-setting')}>
          <span className={ui('org-avatar')}>A</span>
          <div>
            <h3>Acme Organization</h3>
            <p>พื้นที่ทำงานสำหรับทีมภายในองค์กร</p>
          </div>
        </div>
        <div className={ui('setting-detail')}>
          <span>โหมดการใช้งาน</span>
          <b>Frontend preview</b>
        </div>
        <div className={ui('setting-detail')}>
          <span>การประมวลผล</span>
          <b>ภายในเบราว์เซอร์</b>
        </div>
        <div className={ui('setting-detail')}>
          <span>การเก็บประวัติ</span>
          <b>เฉพาะเซสชันปัจจุบัน</b>
        </div>
        <div className={ui('setting-detail')}>
          <span>เขตเวลา</span>
          <b>Asia/Bangkok</b>
        </div>
      </Card>
      <Card as="section" className={ui('secondary-card connection-card')}>
        <span className={ui('supabase-mark')}>
          <Database size={28} />
        </span>
        <h2>Supabase</h2>
        <p>เตรียมเชื่อมฐานข้อมูล สมาชิกองค์กร และสิทธิ์การใช้งานในขั้นถัดไป</p>
        <Badge variant="unstyled" className={ui('pending-badge')}>
          ยังไม่ได้เชื่อมต่อ
        </Badge>
        <div className={ui('connection-list')}>
          {[
            'Authentication & Organization',
            'นโยบายขององค์กร',
            'ประวัติการใช้งานและ API keys',
            'Row Level Security',
          ].map((s) => (
            <span key={s}>
              <div />
              {s}
            </span>
          ))}
        </div>
        <div className={ui('inline-notice')}>
          <LockKeyhole size={16} />
          เวอร์ชันนี้ยังไม่ส่งหรือบันทึกข้อมูลลงฐานข้อมูล
        </div>
      </Card>
    </div>
  );
}
