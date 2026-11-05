'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ui } from '@/lib/ui-styles';
import { ArrowRight, Check, CheckCheck, FlaskConical, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { policyTypes } from './config';
import { useAdmin } from './state';

export default function AdminPolicies() {
  const { filter, policy, policyDraft, setPolicyDraft, savedAt, savePolicy } = useAdmin();
  return (
    <div className={ui('admin-policy-grid')}>
      <Card as="section" className={ui('secondary-card')}>
        <div className={ui('section-title')}>
          <h2>นโยบายการปกปิดมาตรฐาน</h2>
          <Badge variant="unstyled" className={ui('subtle-badge')}>
            DRAFT PREVIEW
          </Badge>
        </div>
        <p className={ui('admin-card-subtitle')}>
          กำหนดประเภทข้อมูลที่ต้องการปกปิดในตัวอย่างนโยบายขององค์กร
        </p>
        {policyTypes.map((item) => (
          <div className={ui('admin-policy-row')} key={item.id}>
            <span className={ui(`entity-icon ${item.color}`)}>
              <ShieldCheck size={19} />
            </span>
            <div>
              <b>{item.label}</b>
              <p>{item.description}</p>
              <code>
                {item.sample}
                <ArrowRight size={12} />
                <span>{policyDraft.includes(item.id) ? item.mask : item.sample}</span>
              </code>
            </div>
            <Switch
              aria-label={`นโยบาย ${item.label}`}
              checked={policyDraft.includes(item.id)}
              onCheckedChange={(checked) =>
                setPolicyDraft((items) =>
                  checked ? [...items, item.id] : items.filter((id) => id !== item.id),
                )
              }
            />
          </div>
        ))}
        <div className={ui('admin-policy-save')}>
          <span>
            <CheckCheck size={14} />
            {savedAt}
          </span>
          <Button
            disabled={
              JSON.stringify([...policy].sort()) === JSON.stringify([...policyDraft].sort())
            }
            onClick={savePolicy}
          >
            <Check size={16} />
            บันทึกนโยบายตัวอย่าง
          </Button>
        </div>
      </Card>
      <Card as="section" className={ui('secondary-card admin-policy-help')}>
        <span className={ui('entity-icon blue')}>
          <ShieldCheck size={25} />
        </span>
        <h2>เริ่มที่นโยบายที่เหมาะสม</h2>
        <p>เลือกสิ่งที่ต้องการปกปิดให้ครอบคลุมข้อมูลในองค์กร และตรวจผลลัพธ์ก่อนนำไปใช้จริง</p>
        <div className={ui('policy-summary-number')}>
          <strong>{policyDraft.length}</strong>
          <span>ประเภทที่เลือก</span>
        </div>
        <div className={ui('inline-notice')}>
          <FlaskConical size={17} />
          นโยบายหน้านี้เป็น mockup ยังไม่บังคับใช้กับพื้นที่ปกปิดข้อมูล และจะรีเซ็ตเมื่อโหลดหน้าใหม่
        </div>
      </Card>
    </div>
  );
}
