'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ui } from '@/lib/ui-styles';
import {
  Check,
  Code2,
  Copy,
  FileText,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useWorkspace } from './state';

export default function WorkspaceApi() {
  const { apiTab, setApiTab, copy, apiCode } = useWorkspace();
  return (
    <>
      <Card as="section" className={ui('api-hero')}>
        <div>
          <Badge variant="unstyled" className={ui('subtle-badge')}>
            DEVELOPER PREVIEW
          </Badge>
          <h2>
            One API.
            <br />
            <span>Endless possibilities.</span>
          </h2>
          <p>
            เตรียมข้อมูลสำหรับ AI, analytics, CRM หรือส่งต่อระหว่างระบบ
            <br />
            วางการปกปิดข้อมูลไว้หน้าทุกเวิร์กโฟลว์ขององค์กร
          </p>
          <div className={ui('api-status')}>
            <span />
            เอกสารต้นแบบ · ยังไม่เปิดใช้งาน endpoint จริง
          </div>
        </div>
        <div className={ui('api-illustration')}>
          <span>
            <FileText size={27} />
          </span>
          <i />
          <span className={ui('api-shield')}>
            <ShieldCheck size={44} />
          </span>
          <i />
          <span>
            <Code2 size={28} />
          </span>
        </div>
      </Card>
      <div className={ui('api-layout')}>
        <Card as="section" className={ui('code-card')}>
          <div className={ui('code-header')}>
            <div>
              <Terminal size={16} />
              <b>ตัวอย่างคำขอ</b>
            </div>
            <div>
              {(['curl', 'javascript'] as const).map((t) => (
                <Button
                  variant="unstyled"
                  className={ui(apiTab === t ? 'active' : '')}
                  key={t}
                  onClick={() => setApiTab(t)}
                >
                  {t === 'curl' ? 'cURL' : 'JavaScript'}
                </Button>
              ))}
              <Button variant="unstyled" aria-label="คัดลอกโค้ด" onClick={() => void copy(apiCode)}>
                <Copy size={15} />
              </Button>
            </div>
          </div>
          <div className={ui('endpoint')}>
            <span>POST</span>/api/v1/redact
          </div>
          <pre>{apiCode}</pre>
          <div className={ui('code-response')}>
            <small>ตัวอย่าง response ที่ออกแบบไว้</small>
            <pre>{`{\n  "text": "อีเมล: xxxx@xxxxxxx.xxx",\n  "redacted_count": 1,\n  "entities": ["email"]\n}`}</pre>
          </div>
        </Card>
        <div className={ui('api-side')}>
          <Card as="section" className={ui('secondary-card')}>
            <KeyRound size={23} />
            <h3>API keys</h3>
            <p>จะเปิดใช้งานหลังเชื่อมระบบยืนยันตัวตนและกำหนดสิทธิ์ขององค์กร</p>
            <div className={ui('mock-key')}>
              <LockKeyhole size={14} />
              ยังไม่มี API key
            </div>
            <Button
              variant="outline"
              onClick={() => toast.info('API key จะสร้างได้เมื่อเชื่อม Backend และ Supabase แล้ว')}
            >
              การเชื่อมต่ออยู่ระหว่างเตรียมการ
            </Button>
          </Card>
          <Card as="section" className={ui('secondary-card')}>
            <h3>ออกแบบไว้สำหรับ</h3>
            {[
              'การยืนยันตัวตนด้วย API key',
              'นโยบายแยกตามแอปพลิเคชัน',
              'จำกัดอัตราการเรียกใช้งาน',
              'รองรับข้อความและไฟล์',
            ].map((s) => (
              <p className={ui('api-check')} key={s}>
                <Check size={15} />
                {s}
              </p>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}
