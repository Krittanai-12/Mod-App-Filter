'use client';
import { toast } from 'sonner';
import { redact, sampleText, type EntityType, type Finding, type MaskMode } from '@/lib/redact';
import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { Page, RecordItem } from './config';
import { workspacePaths } from '@/lib/routes';

function useWorkspaceState() {
  const router = useRouter();
  const [tab, setTab] = useState<'text' | 'file'>('text');
  const [input, setInput] = useState(sampleText);
  const [result, setResult] = useState<{
    text: string;
    findings: Finding[];
    source: string;
  } | null>(null);
  const [demoMasked, setDemoMasked] = useState(true);
  const [resultView, setResultView] = useState<'masked' | 'compare'>('masked');
  const [enabled, setEnabled] = useState<EntityType[]>(['name', 'id', 'email', 'phone']);
  const [mode, setMode] = useState<MaskMode>('full');
  const [busy, setBusy] = useState(false);
  const [filename, setFilename] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [custom, setCustom] = useState('');
  const [customOpen, setCustomOpen] = useState(false);
  const [help, setHelp] = useState(false);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [historyQuery, setHistoryQuery] = useState('');
  const [apiTab, setApiTab] = useState<'curl' | 'javascript'>('curl');
  const fileRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLElement>(null);
  const options = { enabled, mode, custom: custom.split('\n').filter(Boolean) };
  const changeInput = (value: string) => {
    setInput(value);
    setResult(null);
  };
  const toggle = (type: EntityType) => {
    setEnabled((v) => (v.includes(type) ? v.filter((x) => x !== type) : [...v, type]));
    setResult(null);
  };
  const navigate = (id: Page) => {
    router.push(workspacePaths[id]);
  };
  async function loadFile(file?: File) {
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['txt', 'csv', 'json', 'md'].includes(extension ?? '')) {
      toast.error('เวอร์ชันนี้รองรับ TXT, CSV, JSON และ Markdown เท่านั้น');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('กรุณาเลือกไฟล์ขนาดไม่เกิน 5 MB');
      return;
    }
    try {
      const value = await file.text();
      if (value.includes('\uFFFD')) {
        toast.error('กรุณาบันทึกไฟล์เป็น UTF-8 ก่อนอัปโหลด');
        return;
      }
      if (extension === 'json') {
        try {
          JSON.parse(value);
        } catch {
          toast.error('ไฟล์ JSON มีรูปแบบไม่ถูกต้อง');
          return;
        }
      }
      setFilename(file.name);
      setFileSize(file.size);
      changeInput(value);
      toast.success('เปิดไฟล์แล้ว พร้อมตรวจสอบข้อมูล');
    } catch {
      toast.error('ไม่สามารถอ่านไฟล์ได้ กรุณาลองใหม่');
    }
  }
  async function process() {
    if (!input.trim()) {
      toast.error('เพิ่มข้อความหรือไฟล์ก่อนเริ่มปกปิดข้อมูล');
      return;
    }
    if (!enabled.length) {
      toast.error('เลือกประเภทข้อมูลอย่างน้อย 1 ประเภท');
      return;
    }
    const source = input;
    setBusy(true);
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const next = redact(source, options);
    setResult({ ...next, source });
    setBusy(false);
    setRecords((v) => [
      {
        id: Date.now(),
        name: tab === 'file' ? filename || 'ไฟล์ข้อความ' : 'ข้อความที่ปกปิด',
        count: next.findings.length,
        time: new Date().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Bangkok',
        }),
        kind: tab === 'file' ? 'ไฟล์' : 'ข้อความ',
      },
      ...v,
    ]);
    toast.success(`ปกปิดข้อมูลแล้ว ${next.findings.length} รายการ`);
    requestAnimationFrame(() =>
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
    );
  }
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('คัดลอกแล้ว');
    } catch {
      toast.error('คัดลอกไม่ได้ กรุณาเลือกข้อความแล้วคัดลอกด้วยตนเอง');
    }
  }
  function download() {
    if (!result) return;
    const ext = filename.split('.').pop();
    const type = ext === 'json' ? 'application/json' : ext === 'csv' ? 'text/csv' : 'text/plain';
    const blob = new Blob([result.text], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename ? filename.replace(/(\.[^.]+)$/, '-protected$1') : 'protected-text.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('ดาวน์โหลดผลลัพธ์แล้ว');
  }
  const apiCode =
    apiTab === 'curl'
      ? `curl -X POST https://YOUR_DOMAIN/api/v1/redact \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"text":"อีเมล: user@example.com",\n       "entities":["email"], "mode":"full"}'`
      : `const response = await fetch('/api/v1/redact', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    text: 'อีเมล: user@example.com',\n    entities: ['email'], mode: 'full'\n  })\n});\nconst data = await response.json();`;
  return {
    tab,
    setTab,
    input,
    setInput,
    result,
    setResult,
    demoMasked,
    setDemoMasked,
    resultView,
    setResultView,
    enabled,
    setEnabled,
    mode,
    setMode,
    busy,
    setBusy,
    filename,
    setFilename,
    fileSize,
    setFileSize,
    dragging,
    setDragging,
    custom,
    setCustom,
    customOpen,
    setCustomOpen,
    help,
    setHelp,
    records,
    setRecords,
    historyQuery,
    setHistoryQuery,
    apiTab,
    setApiTab,
    fileRef,
    outputRef,
    editorRef,
    options,
    changeInput,
    toggle,
    navigate,
    loadFile,
    process,
    copy,
    download,
    apiCode,
  };
}

const WorkspaceContext = createContext<ReturnType<typeof useWorkspaceState> | null>(null);

// This provider lives in the shared layout, so in-memory data survives menu navigation.
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const state = useWorkspaceState();
  return <WorkspaceContext.Provider value={state}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const state = useContext(WorkspaceContext);
  if (!state) throw new Error('useWorkspace requires WorkspaceProvider');
  return state;
}
