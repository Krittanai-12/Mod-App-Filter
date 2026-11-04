'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Activity, ArrowRight, ArrowUpRight, Check, CheckCheck, ChevronRight, CircleHelp, Code2, Download, FileCheck2, FlaskConical, LayoutDashboard, LockKeyhole, LogOut, Menu, Plus, Search, ShieldCheck, SlidersHorizontal, Sparkles, Trash2, UserCheck, Users, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Mascot } from '@/components/mascot';
import { RequireMockSession, useMockAuth, type MockRole } from '@/components/mock-auth';

type AdminTab = 'overview' | 'members' | 'policies' | 'activity';
type Member = { id: number; name: string; email: string; department: string; role: MockRole; active: boolean; color: string };
type AuditEvent = { id: number; action: string; detail: string; time: string; type: 'member' | 'policy' | 'system' };
const initialMembers: Member[] = [
  { id: 1, name: 'Admin Demo', email: 'admin@example.com', department: 'IT & Security', role: 'admin', active: true, color: 'blue' },
  { id: 2, name: 'พิมพ์ชนก ตัวอย่าง', email: 'pim@example.com', department: 'Human Resources', role: 'member', active: true, color: 'pink' },
  { id: 3, name: 'ธนกร ตัวอย่าง', email: 'thanakorn@example.com', department: 'Operations', role: 'member', active: true, color: 'orange' },
  { id: 4, name: 'Member Demo', email: 'member@example.com', department: 'Marketing', role: 'member', active: true, color: 'purple' },
  { id: 5, name: 'นรินทร์ ตัวอย่าง', email: 'narin@example.com', department: 'IT & Security', role: 'admin', active: true, color: 'green' },
  { id: 6, name: 'กมล ตัวอย่าง', email: 'kamon@example.com', department: 'Finance', role: 'member', active: false, color: 'gray' },
];
const initialEvents: AuditEvent[] = [
  { id: 1, action: 'อัปเดตนโยบายการปกปิด', detail: 'เปิดใช้งานการปกปิดเลขบัตรประชาชน', time: '10:42 · ตัวอย่าง', type: 'policy' },
  { id: 2, action: 'เพิ่มสมาชิกเข้าพื้นที่ทำงาน', detail: 'พิมพ์ชนก ตัวอย่าง · Human Resources', time: '10:15 · ตัวอย่าง', type: 'member' },
  { id: 3, action: 'เปิดใช้งานพื้นที่ทำงาน', detail: 'Acme Organization · โหมดทดลอง', time: '09:30 · ตัวอย่าง', type: 'system' },
];
const policyTypes = [
  { id: 'name', label: 'ชื่อและนามสกุล', description: 'ชื่อที่มีป้ายกำกับหรือคำนำหน้า', sample: 'สมชาย ใจดี', mask: 'xxxxxx xxxx', color: 'purple' },
  { id: 'id', label: 'เลขบัตรประชาชน', description: 'เลขประจำตัวประชาชน 13 หลัก', sample: '1-2345-67890-12-3', mask: 'x-xxxx-xxxxx-xx-x', color: 'orange' },
  { id: 'email', label: 'อีเมล', description: 'ที่อยู่อีเมลภายในเนื้อหา', sample: 'user@example.com', mask: 'xxxx@xxxxxxx.xxx', color: 'blue' },
  { id: 'phone', label: 'เบอร์โทรศัพท์', description: 'รูปแบบหมายเลขโทรศัพท์ประเทศไทย', sample: '081-234-5678', mask: 'xxx-xxx-xxxx', color: 'pink' },
];
const adminTabs = [{ id: 'overview', name: 'ภาพรวมองค์กร', icon: LayoutDashboard }, { id: 'members', name: 'จัดการสมาชิก', icon: Users }, { id: 'policies', name: 'นโยบายขององค์กร', icon: ShieldCheck }, { id: 'activity', name: 'บันทึกกิจกรรม', icon: Activity }] as const;

export default function AdminPage() { return <RequireMockSession admin><AdminConsole/></RequireMockSession>; }

function AdminConsole() {
  const { user, logout } = useMockAuth();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [mobile, setMobile] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const [events, setEvents] = useState(initialEvents);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [memberError, setMemberError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Operations');
  const [role, setRole] = useState<MockRole>('member');
  const [policy, setPolicy] = useState(['name', 'id', 'email', 'phone']);
  const [policyDraft, setPolicyDraft] = useState(policy);
  const [savedAt, setSavedAt] = useState('ยังไม่มีการเปลี่ยนแปลง');
  const activeMembers = members.filter(m => m.active).length;
  const filteredMembers = members.filter(m => `${m.name} ${m.email} ${m.department}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'all' || filter === 'active' && m.active || filter === 'inactive' && !m.active || filter === 'admin' && m.role === 'admin'));

  function audit(action: string, detail: string, type: AuditEvent['type']) {
    setEvents(items => [{ id: Date.now(), action, detail, type, time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Bangkok' }) + ' · เซสชันนี้' }, ...items]);
  }
  function go(next: AdminTab) { setTab(next); setMobile(false); }
  function addMember(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) { setMemberError('กรุณาระบุชื่อสมาชิก'); return; }
    if (members.some(m => m.email.toLowerCase() === email.trim().toLowerCase())) { setMemberError('อีเมลนี้มีอยู่ในรายชื่อแล้ว'); return; }
    setMembers(items => [...items, { id: Date.now(), name: name.trim(), email: email.trim(), department, role, active: true, color: 'blue' }]);
    audit('เพิ่มสมาชิกจำลอง', `${name.trim()} · ${department}`, 'member');
    setAddOpen(false); setName(''); setEmail(''); setMemberError('');
    toast.success('เพิ่มสมาชิกในหน้าจำลองแล้ว ไม่มีการส่งอีเมล');
  }
  function setMemberRole(member: Member, next: MockRole) {
    setMembers(items => items.map(m => m.id === member.id ? { ...m, role: next } : m));
    audit('เปลี่ยนบทบาทสมาชิก', `${member.name} → ${next === 'admin' ? 'Admin' : 'User'}`, 'member');
    toast.success('เปลี่ยนบทบาทในหน้าจำลองแล้ว');
  }
  function toggleMember(member: Member) {
    setMembers(items => items.map(m => m.id === member.id ? { ...m, active: !m.active } : m));
    audit(member.active ? 'ปิดสถานะสมาชิกจำลอง' : 'เปิดสถานะสมาชิกจำลอง', member.name, 'member');
  }
  function savePolicy() {
    setPolicy([...policyDraft]);
    setSavedAt('บันทึกแล้วในเซสชันนี้');
    audit('บันทึกนโยบายจำลอง', `เปิดการปกปิด ${policyDraft.length} ประเภท`, 'policy');
    toast.success('บันทึกนโยบายตัวอย่างแล้ว');
  }
  function exportEvents() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(events, null, 2)], { type: 'application/json;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'mock-admin-activity.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="app-shell admin-shell">
    {mobile && <div className="mobile-backdrop" onClick={() => setMobile(false)}/>}
    <aside className={`sidebar ${mobile ? 'is-open' : ''}`}><Link href="/" className="brand"><span className="brand-symbol"><Mascot priority/></span><span>Mod App<span className="brand-second">Filter<span className="brand-dot">.</span></span></span></Link><div className="admin-space-badge"><ShieldCheck size={16}/><span>ADMIN CONSOLE</span><span>MOCK</span></div><div className="nav-caption">ORGANIZATION</div><nav>{adminTabs.map(item => <button className={`nav-item ${tab === item.id ? 'active' : ''}`} key={item.id} onClick={() => go(item.id)}><item.icon size={19}/><span>{item.name}</span>{item.id === 'members' && <span className="nav-count">{members.length}</span>}</button>)}</nav><div className="nav-caption second-caption">WORKSPACE</div><Link className="nav-item" href="/"><FileCheck2 size={19}/><span>ไปพื้นที่ปกปิดข้อมูล</span><ArrowUpRight size={14}/></Link><div className="sidebar-bottom"><div className="privacy-card"><span className="small-shield"><ShieldCheck size={20}/></span><b>ทีมพร้อม ข้อมูลก็พร้อม</b><p>จัดการสิทธิ์และแนวทางการปกปิด<br/>จากพื้นที่เดียวขององค์กร</p><span className="sidebar-mascot"><Mascot/></span></div><div className="session-profile"><div className="profile"><span className="profile-avatar">AD</span><span><b>{user?.name}</b><small>ผู้ดูแลระบบ · Mock session</small></span></div><button className="session-logout" aria-label="ออกจากระบบ" onClick={logout}><LogOut size={17}/></button></div></div></aside>
    <div className="main-shell"><header className="topbar"><div className="breadcrumb"><button className="mobile-menu icon-button" aria-label="เปิดเมนู" onClick={() => setMobile(true)}><Menu size={20}/></button><span>Admin console</span><ChevronRight size={13}/><b>{adminTabs.find(t => t.id === tab)?.name}</b></div><div className="topbar-right"><span className="mock-badge"><FlaskConical size={12}/>ข้อมูลจำลอง</span><Link className="admin-back-link" href="/">พื้นที่ทำงาน<ArrowUpRight size={13}/></Link><span className="top-avatar">AD</span></div></header>
      <main className="admin-main"><div className="page-heading"><div><div className="eyebrow"><span/>YOUR TEAM. YOUR PRIVACY. YOUR CONTROL.</div><h1>{tab === 'overview' ? 'ดูแลทั้งทีม จากที่เดียว' : tab === 'members' ? 'คนที่ใช่ ในพื้นที่ที่ปลอดภัย' : tab === 'policies' ? 'มาตรฐานเดียวกัน สำหรับทั้งองค์กร' : 'มองเห็นทุกความเคลื่อนไหว'}</h1><p>{tab === 'overview' ? 'ภาพรวมสมาชิก นโยบาย และกิจกรรมในพื้นที่ทำงานขององค์กร' : tab === 'members' ? 'จัดการสมาชิกและบทบาทในหน้าจำลอง โดยไม่มีการส่งคำเชิญจริง' : tab === 'policies' ? 'ทดลองตั้งค่าการปกปิดสำหรับองค์กร ก่อนเชื่อมต่อระบบจริง' : 'กิจกรรมตัวอย่างและการเปลี่ยนแปลงที่คุณทดลองทำในหน้านี้'}</p></div><Button size="sm" onClick={() => { setAddOpen(true); setMemberError(''); }}><Plus size={15}/>เพิ่มสมาชิก</Button></div>
      <div className="admin-preview-note"><FlaskConical size={15}/><span><b>Admin preview</b> · ข้อมูลและการเปลี่ยนแปลงเป็นตัวอย่างเฉพาะหน้านี้ รีเฟรชเพื่อเริ่มใหม่</span><span>ไม่เชื่อมฐานข้อมูล</span></div>
      {tab === 'overview' && <><section className="admin-welcome"><div><span className="admin-welcome-label"><Sparkles size={13}/> A SAFER WORKSPACE STARTS HERE</span><h2>ทีมทำงานเต็มที่<br/><span>น้องมดช่วยดูแลความเป็นส่วนตัว</span></h2><p>จัดการสมาชิก เลือกนโยบาย และติดตามกิจกรรม<br/>ให้ทุกคนพร้อมส่งต่อข้อมูลอย่างมั่นใจ</p><button onClick={() => go('members')}>จัดการทีมของคุณ<ArrowRight size={15}/></button></div><div className="admin-welcome-art"><div/><Mascot priority/><span><ShieldCheck size={15}/> Better together.</span></div></section><div className="admin-stats">{[{label:'สมาชิกในองค์กร',value:members.length,unit:'คน',icon:Users,color:'blue',hint:'สมาชิกตัวอย่างทั้งหมด'},{label:'พร้อมใช้งาน',value:activeMembers,unit:'คน',icon:UserCheck,color:'green',hint:'สถานะเปิดใช้งานในหน้าจำลอง'},{label:'ประเภทข้อมูลที่ปกปิด',value:policy.length,unit:'ประเภท',icon:ShieldCheck,color:'orange',hint:'นโยบายตัวอย่างปัจจุบัน'},{label:'บันทึกกิจกรรม',value:events.length,unit:'รายการ',icon:Activity,color:'purple',hint:'ข้อมูลตัวอย่างและเซสชันนี้'}].map(stat => <div className="admin-stat" key={stat.label}><div><span className={`entity-icon ${stat.color}`}><stat.icon size={18}/></span><span>{stat.label}</span></div><strong>{stat.value}<small>{stat.unit}</small></strong><p>{stat.hint}</p></div>)}</div><div className="admin-overview-grid"><section className="secondary-card"><div className="section-title"><div><h2>กิจกรรมในพื้นที่ทำงาน</h2><p className="admin-card-subtitle">จำนวนการประมวลผล · ข้อมูลตัวอย่าง 7 วัน</p></div><span className="subtle-badge">DEMO DATA</span></div><div className="admin-chart" role="img" aria-label="กราฟตัวอย่างจำนวนการประมวลผล: จันทร์ 32 อังคาร 48 พุธ 39 พฤหัส 61 ศุกร์ 52 เสาร์ 24 อาทิตย์ 43"><div className="chart-grid"><span>60</span><span>40</span><span>20</span><span>0</span></div>{[32,48,39,61,52,24,43].map((value,i) => <div className="chart-column" key={i}><div className={`chart-bar ${i === 3 ? 'highlight' : ''}`} style={{height:`${value / 65 * 100}%`}} title={`${['จ.','อ.','พ.','พฤ.','ศ.','ส.','อา.'][i]}: ${value} รายการ`}><span>{value}</span></div><small>{['จ.','อ.','พ.','พฤ.','ศ.','ส.','อา.'][i]}</small></div>)}</div><div className="chart-legend"><span/>การประมวลผลตัวอย่าง <b>299 รายการ / 7 วัน</b></div></section><section className="secondary-card admin-recent"><div className="section-title"><h2>กิจกรรมล่าสุด</h2><button onClick={() => go('activity')}>ดูทั้งหมด<ArrowUpRight size={13}/></button></div><AuditList events={events.slice(0,3)}/></section></div><div className="admin-quick-links"><button onClick={() => go('policies')}><span className="entity-icon orange"><SlidersHorizontal size={21}/></span><div><b>ปรับการปกปิดให้เหมาะกับทีม</b><p>เลือกข้อมูลที่ต้องการปกปิดเป็นมาตรฐานขององค์กร</p></div><ArrowUpRight size={18}/></button><Link href="/"><span className="entity-icon blue"><Code2 size={21}/></span><div><b>พร้อมเชื่อมทุกเวิร์กโฟลว์</b><p>ดูตัวอย่าง API ได้จากเมนูในพื้นที่ทำงาน</p></div><ArrowUpRight size={18}/></Link></div></>}
      {tab === 'members' && <section className="secondary-card"><div className="section-title"><h2>สมาชิกในองค์กร<span className="subtle-badge">{members.length} คน</span></h2><span className="admin-card-subtitle">บัญชีตัวอย่างทั้งหมด</span></div><div className="admin-table-tools"><div className="search-input"><Search size={17}/><input aria-label="ค้นหาสมาชิก" placeholder="ค้นหาชื่อ อีเมล หรือแผนก…" value={query} onChange={e => setQuery(e.target.value)}/></div><select aria-label="กรองสมาชิก" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">สมาชิกทั้งหมด</option><option value="active">เปิดใช้งาน</option><option value="inactive">ปิดใช้งาน</option><option value="admin">ผู้ดูแลระบบ</option></select></div><div className="table-scroll"><table className="admin-members-table"><thead><tr><th>สมาชิก</th><th>แผนก</th><th>บทบาท</th><th>สถานะ</th><th>จัดการ</th></tr></thead><tbody>{filteredMembers.map(member => <tr key={member.id}><td><div className="member-cell"><span className={`member-avatar ${member.color}`}>{member.name.slice(0,2).toUpperCase()}</span><span><b>{member.name}{member.email === user?.email && <em>คุณ</em>}</b><small>{member.email}</small></span></div></td><td>{member.department}</td><td><select aria-label={`บทบาทของ ${member.name}`} value={member.role} disabled={member.email === user?.email} onChange={e => setMemberRole(member,e.target.value as MockRole)}><option value="member">User</option><option value="admin">Admin</option></select></td><td><span className={`member-status ${member.active ? 'active' : ''}`}><i/>{member.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span></td><td><div className="member-actions"><Switch aria-label={`เปิดใช้งาน ${member.name}`} checked={member.active} disabled={member.email === user?.email} onCheckedChange={() => toggleMember(member)}/><button className="icon-button" aria-label={`นำ ${member.name} ออกจากรายชื่อจำลอง`} disabled={member.email === user?.email} onClick={() => {setMembers(items => items.filter(m => m.id !== member.id));audit('นำสมาชิกออกจากรายชื่อจำลอง',member.name,'member');toast.success('นำสมาชิกออกจากหน้าจำลองแล้ว');}}><Trash2 size={15}/></button></div></td></tr>)}</tbody></table></div>{!filteredMembers.length && <div className="large-empty"><Users size={32}/><h3>ไม่พบสมาชิกที่ค้นหา</h3><p>ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p></div>}<div className="admin-table-footer"><span>แสดง {filteredMembers.length} จาก {members.length} คน</span><span><LockKeyhole size={12}/>บัญชีปัจจุบันไม่สามารถลดสิทธิ์หรือปิดสถานะตัวเองในหน้าจำลอง</span></div></section>}
      {tab === 'policies' && <div className="admin-policy-grid"><section className="secondary-card"><div className="section-title"><h2>นโยบายการปกปิดมาตรฐาน</h2><span className="subtle-badge">DRAFT PREVIEW</span></div><p className="admin-card-subtitle">กำหนดประเภทข้อมูลที่ต้องการปกปิดในตัวอย่างนโยบายขององค์กร</p>{policyTypes.map(item => <div className="admin-policy-row" key={item.id}><span className={`entity-icon ${item.color}`}><ShieldCheck size={19}/></span><div><b>{item.label}</b><p>{item.description}</p><code>{item.sample}<ArrowRight size={12}/><span>{policyDraft.includes(item.id) ? item.mask : item.sample}</span></code></div><Switch aria-label={`นโยบาย ${item.label}`} checked={policyDraft.includes(item.id)} onCheckedChange={checked => setPolicyDraft(items => checked ? [...items,item.id] : items.filter(id => id !== item.id))}/></div>)}<div className="admin-policy-save"><span><CheckCheck size={14}/>{savedAt}</span><Button disabled={JSON.stringify([...policy].sort()) === JSON.stringify([...policyDraft].sort())} onClick={savePolicy}><Check size={16}/>บันทึกนโยบายตัวอย่าง</Button></div></section><section className="secondary-card admin-policy-help"><span className="entity-icon blue"><ShieldCheck size={25}/></span><h2>เริ่มที่นโยบายที่เหมาะสม</h2><p>เลือกสิ่งที่ต้องการปกปิดให้ครอบคลุมข้อมูลในองค์กร และตรวจผลลัพธ์ก่อนนำไปใช้จริง</p><div className="policy-summary-number"><strong>{policyDraft.length}</strong><span>ประเภทที่เลือก</span></div><div className="inline-notice"><FlaskConical size={17}/>นโยบายหน้านี้เป็น mockup ยังไม่บังคับใช้กับพื้นที่ปกปิดข้อมูล และจะรีเซ็ตเมื่อโหลดหน้าใหม่</div></section></div>}
      {tab === 'activity' && <section className="secondary-card"><div className="section-title"><div><h2>บันทึกกิจกรรมขององค์กร</h2><p className="admin-card-subtitle">รายการตัวอย่างและการเปลี่ยนแปลงในเซสชันนี้ · เวลา Asia/Bangkok</p></div><Button variant="outline" size="sm" onClick={exportEvents}><Download size={14}/>ส่งออก JSON</Button></div><AuditList events={events}/><div className="inline-notice"><LockKeyhole size={16}/>บันทึกเฉพาะกิจกรรมการจัดการตัวอย่าง ไม่มีข้อมูลต้นฉบับที่นำมาปกปิด</div></section>}
      <footer><span className="footer-brand"><ShieldCheck size={14}/>Mod App Filter · Admin</span><span>Built for your team. Designed for privacy.</span><span className="version">Mockup · v0.2</span></footer></main>
    </div>
    <Dialog open={addOpen} onOpenChange={setAddOpen}><DialogContent><span className="dialog-icon"><Users size={25}/></span><DialogTitle>เพิ่มสมาชิกในทีม</DialogTitle><DialogDescription>เพิ่มข้อมูลเพื่อทดลองหน้าจัดการเท่านั้น ไม่มีการสร้างบัญชีหรือส่งอีเมลจริง</DialogDescription><form className="admin-add-form" onSubmit={addMember}><label htmlFor="member-name">ชื่อที่แสดง</label><input id="member-name" value={name} onChange={e => setName(e.target.value)} required maxLength={80} placeholder="ชื่อสมาชิกตัวอย่าง"/><label htmlFor="member-email">อีเมล</label><input id="member-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required maxLength={254} placeholder="name@example.com"/><div><label>แผนก<select aria-label="แผนกสมาชิกใหม่" value={department} onChange={e => setDepartment(e.target.value)}>{['Operations','IT & Security','Human Resources','Marketing','Finance'].map(d => <option key={d}>{d}</option>)}</select></label><label>บทบาท<select aria-label="บทบาทสมาชิกใหม่" value={role} onChange={e => setRole(e.target.value as MockRole)}><option value="member">User</option><option value="admin">Admin</option></select></label></div>{memberError && <p className="form-error" role="alert">{memberError}</p>}<Button type="submit"><Plus size={16}/>เพิ่มสมาชิกจำลอง</Button></form></DialogContent></Dialog>
  </div>;
}

function AuditList({ events }: { events: AuditEvent[] }) {
  return <div className="audit-list">{events.map(event => <div className="audit-item" key={event.id}><span className={`entity-icon ${event.type === 'member' ? 'blue' : event.type === 'policy' ? 'orange' : 'green'}`}>{event.type === 'member' ? <Users size={17}/> : event.type === 'policy' ? <ShieldCheck size={17}/> : <Activity size={17}/>}</span><div><b>{event.action}</b><p>{event.detail}</p><small>{event.time}</small></div><span className="audit-dot"/></div>)}</div>;
}
