'use client';
import { AuditList } from './audit-list';
import { Card } from '@/components/ui/card';
import { ui } from '@/lib/ui-styles';
import { Download, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from './state';

export default function AdminActivity() {
  const { events, exportEvents } = useAdmin();
  return (
    <Card as="section" className={ui('secondary-card')}>
      <div className={ui('section-title')}>
        <div>
          <h2>บันทึกกิจกรรมขององค์กร</h2>
          <p className={ui('admin-card-subtitle')}>
            รายการตัวอย่างและการเปลี่ยนแปลงในเซสชันนี้ · เวลา Asia/Bangkok
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={exportEvents}>
          <Download size={14} />
          ส่งออก JSON
        </Button>
      </div>
      <AuditList events={events} />
      <div className={ui('inline-notice')}>
        <LockKeyhole size={16} />
        บันทึกเฉพาะกิจกรรมการจัดการตัวอย่าง ไม่มีข้อมูลต้นฉบับที่นำมาปกปิด
      </div>
    </Card>
  );
}
