'use client';
import { Textarea } from '@/components/ui/textarea';
import { ui } from '@/lib/ui-styles';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Layers3,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { AppNavbar } from '@/components/app-navbar';
import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { nav } from './config';
import { workspacePaths, pageForPath } from '@/lib/routes';
import { useWorkspace } from './state';

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const page = pageForPath(workspacePaths, usePathname(), 'workspace');
  const {
    setResult,
    enabled,
    setEnabled,
    custom,
    setCustom,
    customOpen,
    setCustomOpen,
    help,
    setHelp,
    navigate,
  } = useWorkspace();
  return (
    <div className={ui('app-shell navbar-layout')}>
      <AppNavbar
        items={nav.map((item) => ({
          id: item.id,
          label: item.label,
          icon: item.icon,
          active: page === item.id,
          badge: item.id === 'api' ? 'BETA' : undefined,
          href: workspacePaths[item.id],
        }))}
        onSettings={() => navigate('settings')}
        onHelp={() => setHelp(true)}
      />
      <div className={ui('main-shell')}>
        <main>
          {page === 'workspace' ? (
            <h1 className="sr-only">พื้นที่ปกปิดข้อมูล</h1>
          ) : (
            <div className={ui('page-heading')}>
              <div>
                <div className={ui('eyebrow')}>
                  <span />
                  {page === 'api' ? 'BUILT TO CONNECT' : 'YOUR ORGANIZATION, PROTECTED'}
                </div>
                <h1>
                  {page === 'history'
                    ? 'ทุกการปกป้อง มีเรื่องราว'
                    : page === 'policies'
                      ? 'กำหนดการปกป้อง ในแบบขององค์กร'
                      : page === 'api'
                        ? 'เชื่อมต่อได้ ทุกเวิร์กโฟลว์'
                        : 'พื้นที่ทำงานของคุณ'}
                </h1>
                <p>
                  {page === 'history'
                    ? 'รายการที่คุณปกปิดในเซสชันนี้ โดยไม่จัดเก็บเนื้อหาต้นฉบับ'
                    : page === 'policies'
                      ? 'เลือกข้อมูลและรูปแบบการปกปิดที่เหมาะกับงานของคุณ'
                      : page === 'api'
                        ? 'วางแผนเชื่อมต่อเว็บไซต์และแอปพลิเคชันภายในองค์กรผ่าน API เดียว'
                        : 'จัดการองค์กรและเตรียมการเชื่อมต่อสำหรับการใช้งานจริง'}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setHelp(true)}>
                <BookOpen size={15} />
                คู่มือการใช้งาน
                <ArrowUpRight size={14} />
              </Button>
            </div>
          )}
          {children}

          <footer>
            <span className={ui('footer-brand')}>
              <Layers3 size={14} /> Mod App Filter.
            </span>
            <span>Designed for privacy. Built for your workflow.</span>
            <Button variant="unstyled" onClick={() => setHelp(true)}>
              นโยบายและการใช้งาน <ArrowUpRight size={11} />
            </Button>
            <span className={ui('version')}>v0.1 · Preview</span>
          </footer>
        </main>
      </div>
      <Dialog open={customOpen} onOpenChange={setCustomOpen}>
        <DialogContent>
          <span className={ui('dialog-icon')}>
            <SlidersHorizontal size={24} />
          </span>
          <DialogTitle>กำหนดคำที่ต้องการปกปิด</DialogTitle>
          <DialogDescription>
            เพิ่มชื่อบุคคล ชื่อบริษัท หรือคำเฉพาะ หนึ่งคำหรือวลีต่อบรรทัด
            คำที่ตรงกันจะถูกปกปิดทุกตำแหน่ง
          </DialogDescription>
          <Textarea
            unstyled
            className={ui('custom-textarea')}
            aria-label="คำที่กำหนดเอง"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder={'บริษัท ตัวอย่าง จำกัด\nสมชาย ใจดี'}
          />
          <Button
            onClick={() => {
              if (custom.trim() && !enabled.includes('custom')) setEnabled((v) => [...v, 'custom']);
              setResult(null);
              setCustomOpen(false);
              toast.success('ใช้รายการคำที่กำหนดแล้ว');
            }}
          >
            ใช้รายการนี้
            <Check size={16} />
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={help} onOpenChange={setHelp}>
        <DialogContent>
          <span className={ui('dialog-icon')}>
            <ShieldCheck size={26} />
          </span>
          <DialogTitle>ให้ข้อมูลไปต่อ อย่างเป็นส่วนตัว</DialogTitle>
          <DialogDescription>
            Mod App Filter เป็นพื้นที่เตรียมข้อมูลก่อนส่งต่อให้ AI หรือระบบอื่นภายในองค์กร
          </DialogDescription>
          <ol className={ui('help-steps')}>
            <li>
              <span>1</span>
              <div>
                <b>เพิ่มข้อความหรือไฟล์</b>
                <p>รองรับ TXT, CSV, JSON, Markdown แบบ UTF-8 สูงสุด 5 MB</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <b>เลือกข้อมูลที่ต้องการปกปิด</b>
                <p>ชื่อ เลขบัตรประชาชน อีเมล เบอร์โทร หรือคำที่กำหนดเอง</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <b>ตรวจสอบ แล้วส่งต่อ</b>
                <p>คัดลอกหรือดาวน์โหลดผลลัพธ์เป็นไฟล์ชนิดเดิม</p>
              </div>
            </li>
          </ol>
          <div className={ui('inline-notice')}>
            เวอร์ชันทดลองใช้กฎในการตรวจจับ อาจพบข้อมูลไม่ครบ โดยเฉพาะชื่อที่ไม่มีป้ายกำกับ
            ควรตรวจผลลัพธ์ด้วยตนเองก่อนนำไปใช้ ระบบยังไม่เชื่อม Supabase และ API
          </div>
          <Button
            onClick={() => {
              setHelp(false);
              navigate('workspace');
            }}
          >
            เริ่มปกปิดข้อมูล
            <ArrowRight size={16} />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
