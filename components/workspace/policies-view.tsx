'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { ui } from '@/lib/ui-styles';
import { ArrowDownToLine, ArrowRight, CircleHelp, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { entityLabels, redact, type MaskMode } from '@/lib/redact';
import { entities } from './config';
import { useWorkspace } from './state';

export default function WorkspacePolicies() {
  const { setResult, enabled, mode, setMode, setCustomOpen, toggle, navigate } = useWorkspace();
  return (
    <div className={ui('policy-layout')}>
      <Card as="section" className={ui('secondary-card')}>
        <div className={ui('section-title')}>
          <h2>นโยบายสำหรับพื้นที่ทำงาน</h2>
          <Badge variant="unstyled" className={ui('subtle-badge')}>
            มีผลกับเซสชันนี้
          </Badge>
        </div>
        <p className={ui('section-description')}>
          การตั้งค่าที่เลือกจะใช้กับการปกปิดครั้งถัดไป ตรวจสอบผลลัพธ์ทุกครั้งก่อนส่งต่อ
        </p>
        {entities.map(({ type, icon: Icon, color, hint }) => (
          <div className={ui('policy-row')} key={type}>
            <span className={ui(`entity-icon ${color}`)}>
              <Icon size={20} />
            </span>
            <div>
              <b>{entityLabels[type]}</b>
              <p>{hint}</p>
            </div>
            {type === 'custom' && (
              <Button size="sm" variant="ghost" onClick={() => setCustomOpen(true)}>
                กำหนดคำ
              </Button>
            )}
            <Switch
              aria-label={entityLabels[type]}
              checked={enabled.includes(type)}
              onCheckedChange={() => toggle(type)}
            />
          </div>
        ))}
        <div className={ui('inline-notice')}>
          <CircleHelp size={16} />
          การตรวจชื่อใช้กฎและป้ายกำกับ ยังไม่ได้ใช้โมเดล NER จึงอาจตรวจไม่พบชื่อที่ไม่มีบริบทกำกับ
        </div>
      </Card>
      <Card as="section" className={ui('secondary-card policy-preview')}>
        <span className={ui('entity-icon green')}>
          <ShieldCheck size={23} />
        </span>
        <h2>ปกปิดอย่างเหมาะสม</h2>
        <p>เลือกการแสดงผลให้เหมาะกับปลายทางของข้อมูล</p>
        <Label unstyled htmlFor="policy-mode">
          รูปแบบการปกปิด
        </Label>
        <NativeSelect
          unstyled
          id="policy-mode"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as MaskMode);
            setResult(null);
          }}
        >
          <NativeSelectOption value="full">ปกปิดทั้งหมด</NativeSelectOption>
          <NativeSelectOption value="partial">เหลือ 3 ตัวอักษรท้าย</NativeSelectOption>
          <NativeSelectOption value="label">แทนด้วยประเภทข้อมูล</NativeSelectOption>
        </NativeSelect>
        <div className={ui('policy-example')}>
          <small>ตัวอย่างเบอร์โทรศัพท์</small>
          <code>081-234-5678</code>
          <ArrowDownToLine size={18} />
          <code className={ui('masked')}>
            {redact('081-234-5678', { enabled: ['phone'], mode }).text}
          </code>
        </div>
        <Button
          onClick={() => {
            navigate('workspace');
            toast.success('พร้อมใช้การตั้งค่าที่เลือก');
          }}
        >
          ใช้นโยบายนี้
          <ArrowRight size={15} />
        </Button>
      </Card>
    </div>
  );
}
