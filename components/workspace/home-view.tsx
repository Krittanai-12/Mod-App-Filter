'use client';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ui } from '@/lib/ui-styles';
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  Check,
  CheckCheck,
  CircleHelp,
  Copy,
  FileCheck2,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Plus,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Upload,
  Users,
  WandSparkles,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Mascot } from '@/components/mascot';
import { entityLabels, sampleText, type Finding } from '@/lib/redact';
import { entities } from './config';
import { useWorkspace } from './state';

export default function WorkspaceHome() {
  const {
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
    mode,
    setMode,
    busy,
    filename,
    setFilename,
    fileSize,
    dragging,
    setDragging,
    setCustomOpen,
    setHelp,
    records,
    fileRef,
    outputRef,
    editorRef,
    changeInput,
    toggle,
    loadFile,
    process,
    copy,
    download,
  } = useWorkspace();
  return (
    <>
      <Card as="section" className={ui('hero-banner')}>
        <div className={ui('hero-grid-pattern')} />
        <div className={ui('hero-copy')}>
          <h2>
            เรื่องข้อมูลส่วนตัว
            <br />
            <span>ให้น้องมดช่วยดูแล</span>
          </h2>
          <p>
            เก็บความหมาย ซ่อนความลับ เตรียมข้อมูลให้พร้อม
            <br />
            ก่อนส่งต่อให้ AI หรือทุกระบบที่คุณใช้
          </p>
          <div className={ui('hero-buttons')}>
            <Button
              onClick={() => {
                editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                editorRef.current?.querySelector('textarea')?.focus({ preventScroll: true });
              }}
            >
              <WandSparkles size={17} />
              เริ่มปกปิดข้อมูล
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <div className={ui('hero-art')}>
          <div className={ui('mascot-stage')}>
            <div className={ui('mascot-ring ring-one')} />
            <div className={ui('mascot-ring ring-two')} />
            <div className={ui('mascot-glow')} />
            <Mascot priority className={ui('hero-mascot')} />
          </div>
          <div className={ui('mascot-speech')}>
            <span>✦</span>ส่งต่องานได้ ส่งต่อความลับไม่ได้นะ!
          </div>
          <div className={ui('art-spark spark-one')}>✧</div>
          <div className={ui('art-spark spark-two')}>✦</div>
          <Button
            variant="unstyled"
            className={ui(`live-demo-card ${demoMasked ? 'is-masked' : ''}`)}
            onClick={() => setDemoMasked(!demoMasked)}
            aria-label={
              demoMasked ? 'แสดงข้อความตัวอย่างก่อนปกปิด' : 'แสดงข้อความตัวอย่างหลังปกปิด'
            }
          >
            <div className={ui('demo-card-top')}>
              <span>
                <ShieldCheck size={14} /> PRIVACY IN ACTION
              </span>
              <span className={ui('demo-live-dot')} />
            </div>
            <div className={ui('demo-person')}>
              <span className={ui('demo-person-icon')}>
                <Users size={17} />
              </span>
              <div>
                <small>ชื่อ–นามสกุล</small>
                <b key={String(demoMasked)}>{demoMasked ? 'xxxxxx xxxx' : 'สมชาย ใจดี'}</b>
              </div>
              <span className={ui('demo-check')}>
                {demoMasked ? <Check size={15} /> : <ScanLine size={15} />}
              </span>
            </div>
            <div className={ui('demo-card-bottom')}>
              <span>{demoMasked ? 'ข้อมูลตัวอย่างถูกปกปิดแล้ว' : 'ข้อความตัวอย่างก่อนปกปิด'}</span>
              <span>
                คลิกเพื่อลอง <ArrowLeftRight size={11} />
              </span>
            </div>
          </Button>
          <div className={ui('mascot-name-tag')}>
            <span />
            น้องมด <span className={ui('mascot-role')}>Privacy buddy</span>
          </div>
        </div>
      </Card>

      <div className={ui('workbench-grid', 'mt-5 max-[651px]:mt-4')}>
        <Card
          as="section"
          ref={editorRef}
          className={ui(`editor-card ${busy ? 'is-processing' : ''}`)}
        >
          <div className={ui('input-tabs')}>
            <div>
              <Button
                variant="unstyled"
                className={ui(tab === 'text' ? 'selected' : '')}
                onClick={() => {
                  setTab('text');
                  setResult(null);
                }}
              >
                <FileText size={16} />
                ข้อความ
              </Button>
              <Button
                variant="unstyled"
                className={ui(tab === 'file' ? 'selected' : '')}
                onClick={() => {
                  setTab('file');
                  setResult(null);
                  if (!filename) setInput('');
                }}
              >
                <Upload size={16} />
                อัปโหลดไฟล์<span className={ui('new-tag')}>DROP IT</span>
              </Button>
            </div>
            <Button
              variant="unstyled"
              className={ui('icon-button')}
              aria-label="ล้างข้อมูล"
              onClick={() => {
                changeInput('');
                setFilename('');
              }}
            >
              <Trash2 size={15} />
            </Button>
          </div>
          <div className={ui('editor-label')}>
            <span>{tab === 'text' ? 'ข้อความต้นฉบับ' : 'ไฟล์ต้นฉบับ'}</span>
            <Button
              variant="unstyled"
              onClick={() => {
                setTab('text');
                setFilename('');
                changeInput(sampleText);
              }}
            >
              <Sparkles size={13} />
              ลองข้อความตัวอย่าง
            </Button>
          </div>
          {tab === 'file' && !filename ? (
            <div
              className={ui(`drop-zone ${dragging ? 'dragging' : ''}`)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                void loadFile(e.dataTransfer.files[0]);
              }}
            >
              <span className={ui('upload-icon')}>
                <Upload size={29} />
              </span>
              <h3>วางไฟล์ของคุณที่นี่</h3>
              <p>หรือเลือกไฟล์จากอุปกรณ์ของคุณ</p>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                <Plus size={15} />
                เลือกไฟล์
              </Button>
              <small>TXT, CSV, JSON, MD · สูงสุด 5 MB · UTF-8</small>
              <span className={ui('coming-format')}>PDF และ DOCX จะรองรับในเวอร์ชันถัดไป</span>
            </div>
          ) : (
            <>
              <div className={ui('text-area-wrap')}>
                {filename && tab === 'file' && (
                  <div className={ui('loaded-file')}>
                    <FileCheck2 size={16} />
                    <b>{filename}</b>
                    <small>{(fileSize / 1024).toFixed(1)} KB</small>
                    <Button
                      variant="unstyled"
                      aria-label="นำไฟล์ออก"
                      onClick={() => {
                        setFilename('');
                        changeInput('');
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
                <Textarea
                  unstyled
                  aria-label="ข้อความต้นฉบับ"
                  spellCheck={false}
                  value={input}
                  onChange={(e) => changeInput(e.target.value)}
                  placeholder="วางข้อความที่ต้องการปกปิดข้อมูลส่วนบุคคลที่นี่…"
                />
              </div>
            </>
          )}
          <Input
            unstyled
            ref={fileRef}
            type="file"
            hidden
            accept=".txt,.csv,.json,.md"
            onChange={(e) => {
              void loadFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
          <div className={ui('editor-status')}>
            <span>
              <LockKeyhole size={12} />
              ข้อมูลไม่ถูกอัปโหลดไปยังเซิร์ฟเวอร์
            </span>
            <span>{input.length.toLocaleString()} ตัวอักษร</span>
          </div>
          <div className={ui('editor-action')}>
            <span>
              <span className={ui('step-number')}>1</span>เพิ่มข้อมูล
              <span className={ui('step-line')} />
              <span className={ui('step-number muted')}>2</span>ปกปิดและส่งต่อ
            </span>
            <Button disabled={busy || !input.trim()} onClick={() => void process()}>
              {busy ? (
                <LoaderCircle size={17} className={ui('spin')} />
              ) : (
                <WandSparkles size={17} />
              )}{' '}
              {busy ? 'กำลังปกปิดข้อมูล…' : 'ปกปิดข้อมูล'}
              {!busy && <ArrowRight size={16} />}
            </Button>
          </div>
        </Card>
        <Card as="aside" className={ui('config-card')}>
          <div className={ui('config-header')}>
            <SlidersHorizontal size={17} />
            <h3>ตั้งค่าการปกปิด</h3>
            <Button
              variant="unstyled"
              aria-label="วิธีตั้งค่า"
              className={ui('icon-button')}
              onClick={() => setHelp(true)}
            >
              <CircleHelp size={15} />
            </Button>
          </div>
          <div className={ui('config-content')}>
            <div className={ui('config-section-label')}>
              ประเภทข้อมูลที่ต้องการปกปิด<span>{enabled.length} ประเภท</span>
            </div>
            <div className={ui('entity-list')}>
              {entities.map(({ type, icon: Icon, color }) => (
                <div className={ui('entity-row')} key={type}>
                  <span className={ui(`entity-icon ${color}`)}>
                    <Icon size={16} />
                  </span>
                  <Label unstyled htmlFor={`entity-${type}`}>
                    {entityLabels[type]}
                  </Label>
                  {type === 'custom' && (
                    <Button
                      variant="unstyled"
                      className={ui('custom-edit')}
                      aria-label="กำหนดคำ"
                      onClick={() => setCustomOpen(true)}
                    >
                      <Plus size={13} />
                    </Button>
                  )}
                  <Switch
                    id={`entity-${type}`}
                    checked={enabled.includes(type)}
                    onCheckedChange={() => toggle(type)}
                  />
                </div>
              ))}
            </div>
            <div className={ui('config-divider')} />
            <div className={ui('config-section-label')}>รูปแบบการปกปิด</div>
            <div className={ui('mode-options')}>
              {(
                [
                  { id: 'full', title: 'ปกปิดทั้งหมด', example: 'xxx-xxx-xxxx' },
                  { id: 'partial', title: 'ปกปิดบางส่วน', example: 'xxx-xxx-x678' },
                  { id: 'label', title: 'แทนที่ด้วยประเภท', example: '[PHONE]' },
                ] as const
              ).map((m) => (
                <Button
                  variant="unstyled"
                  key={m.id}
                  className={ui(`mode-option ${mode === m.id ? 'chosen' : ''}`)}
                  onClick={() => {
                    setMode(m.id);
                    setResult(null);
                  }}
                >
                  <span className={ui('radio-dot')} />
                  <span>{m.title}</span>
                  <code>{m.example}</code>
                </Button>
              ))}
            </div>
            <div className={ui('config-tip')}>
              <Sparkles size={15} />
              <p>
                ชื่อจะตรวจจากป้ายกำกับและคำนำหน้า
                <br />
                เพิ่มคำเฉพาะเพื่อช่วยปกปิดให้ครอบคลุม
              </p>
            </div>
          </div>
        </Card>
      </div>
      <Card
        as="section"
        ref={outputRef}
        className={ui(`result-card ${result ? 'has-result' : ''}`)}
        aria-live="polite"
      >
        <div className={ui('result-heading')}>
          <div>
            <span className={ui('section-icon')}>
              <FileCheck2 size={18} />
            </span>
            <h2>ผลลัพธ์ที่พร้อมส่งต่อ</h2>
            {result && (
              <span className={ui('result-count')}>ปกปิด {result.findings.length} รายการ</span>
            )}
          </div>
          <div className={ui('result-actions')}>
            <Button
              size="sm"
              variant="ghost"
              disabled={!result}
              onClick={() => result && void copy(result.text)}
            >
              <Copy size={14} />
              คัดลอก
            </Button>
            <Button size="sm" variant="outline" disabled={!result} onClick={download}>
              <ArrowDownToLine size={14} />
              ดาวน์โหลด
            </Button>
          </div>
        </div>
        {result ? (
          <>
            <div className={ui('success-banner')} key={records[0]?.id}>
              <span className={ui('success-check')}>
                <CheckCheck size={23} />
              </span>
              <div>
                <b>
                  {result.findings.length
                    ? 'เรียบร้อย! ข้อมูลพร้อมไปต่อแล้ว'
                    : 'ตรวจเสร็จแล้ว ไม่พบข้อมูลตามกฎที่เลือก'}
                </b>
                <p>
                  น้องมดช่วยปกปิดข้อมูลที่ตรวจพบ {result.findings.length} รายการ ·
                  ตรวจทานอีกครั้งก่อนส่งต่อ
                </p>
              </div>
              <Sparkles size={26} className={ui('success-spark')} />
            </div>
            <div className={ui('output-toolbar')}>
              <div className={ui('output-view-tabs')}>
                <Button
                  variant="unstyled"
                  className={ui(resultView === 'masked' ? 'selected' : '')}
                  onClick={() => setResultView('masked')}
                >
                  <ShieldCheck size={14} />
                  ผลลัพธ์
                </Button>
                <Button
                  variant="unstyled"
                  className={ui(resultView === 'compare' ? 'selected' : '')}
                  onClick={() => setResultView('compare')}
                >
                  <ArrowLeftRight size={14} />
                  เปรียบเทียบ
                </Button>
              </div>
              <div className={ui('finding-chips')}>
                {entities
                  .filter((e) => result.findings.some((f) => f.type === e.type))
                  .map((e) => (
                    <span key={e.type} className={ui(e.color)}>
                      {entityLabels[e.type]}
                      <b>{result.findings.filter((f) => f.type === e.type).length}</b>
                    </span>
                  ))}
              </div>
            </div>
            <div className={ui(`result-columns ${resultView === 'compare' ? 'compare' : ''}`)}>
              {resultView === 'compare' && (
                <div>
                  <div className={ui('column-caption')}>
                    ต้นฉบับ <span>ข้อมูลก่อนปกปิด</span>
                  </div>
                  <div className={ui('result-text source-text')}>{result.source}</div>
                </div>
              )}
              <div>
                {resultView === 'compare' && (
                  <div className={ui('column-caption')}>
                    ผลลัพธ์{' '}
                    <span>
                      <ShieldCheck size={12} />
                      ปกปิดแล้ว
                    </span>
                  </div>
                )}
                <div className={ui('result-text')}>
                  {renderResult(result.source, result.findings)}
                </div>
              </div>
            </div>
            <div className={ui('result-footer')}>
              <span>
                <LockKeyhole size={14} />
                ประมวลผลภายในเบราว์เซอร์ของคุณ
              </span>
              <small>การตรวจจับด้วยกฎอาจไม่ครอบคลุมข้อมูลทั้งหมด</small>
            </div>
          </>
        ) : (
          <div className={ui('empty-result')}>
            <span className={ui('empty-mascot')}>
              <Mascot />
            </span>
            <div>
              <span className={ui('empty-eyebrow')}>READY WHEN YOU ARE</span>
              <b>น้องมดรอช่วยอยู่ตรงนี้!</b>
              <p>
                เพิ่มข้อความหรือไฟล์ แล้วกด “ปกปิดข้อมูล”
                <br />
                ข้อมูลที่พร้อมส่งต่อจะปรากฏที่นี่
              </p>
            </div>
            <div className={ui('empty-motif')}>
              <span>Aa</span>
              <ArrowRight size={19} />
              <span>xx</span>
              <Sparkles size={17} />
            </div>
          </div>
        )}
      </Card>
    </>
  );
}

function renderResult(input: string, findings: Finding[]) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  findings.forEach((f, i) => {
    parts.push(input.slice(cursor, f.start));
    parts.push(
      <mark className={ui(`masked-mark ${f.type}`)} key={i} title={`ปกปิด${entityLabels[f.type]}`}>
        {f.masked}
      </mark>,
    );
    cursor = f.end;
  });
  parts.push(input.slice(cursor));
  return parts;
}
