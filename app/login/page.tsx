'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCheck, Eye, EyeOff, FlaskConical, LockKeyhole, Mail, ShieldCheck, Sparkles, UserRound, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/mascot';
import { useMockAuth, type MockRole } from '@/components/mock-auth';

export default function LoginPage() {
  const { login, user } = useMockAuth();
  const [role, setRole] = useState<MockRole>('member');
  const [email, setEmail] = useState('member@example.com');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function selectRole(next: MockRole) { setRole(next); setEmail(next === 'admin' ? 'admin@example.com' : 'member@example.com'); setError(''); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 6) { setError('กรอกรหัสผ่านจำลองอย่างน้อย 6 ตัวอักษร'); return; }
    setError('');
    login(email, role);
  }

  return <div className="login-page">
    <section className="login-story">
      <Link href="/login" className="brand login-brand"><span className="brand-symbol"><Mascot priority/></span><span>Mod App<span className="brand-second">Filter<span className="brand-dot">.</span></span></span></Link>
      <div className="login-story-copy"><div className="login-eyebrow"><Sparkles size={14}/> YOUR LITTLE PRIVACY GUARDIAN</div><h1>เริ่มงานได้อย่างมั่นใจ<br/><span>เรื่องข้อมูล ให้น้องมดดูแล</span></h1><p>พื้นที่ปลอดภัยก่อนส่งต่อข้อมูล<br/>ให้คุณและทีมทำงานต่อได้อย่างเป็นส่วนตัว</p></div>
      <div className="login-mascot-scene"><div className="login-orbit"/><div className="login-orbit outer"/><div className="login-mascot-base"/><Mascot priority className="login-mascot"/><div className="login-bubble"><ShieldCheck size={17}/><span>พร้อมปกป้องข้อมูลของทีมคุณ!</span></div><div className="login-float-chip"><CheckCheck size={17}/> Privacy starts with you.</div><span className="login-star">✦</span></div>
      <div className="login-story-footer"><span><LockKeyhole size={13}/>ข้อมูลของคุณ อยู่ในการควบคุมของคุณ</span><span>MAF / 01</span></div>
    </section>
    <section className="login-form-side"><div className="login-top-note"><span>ORGANIZATION WORKSPACE</span><span className="mock-badge"><FlaskConical size={12}/> MOCKUP</span></div>
      <div className="login-form-container"><span className="login-welcome-icon"><UserRound size={26}/></span><div className="eyebrow">WELCOME TO MOD APP FILTER</div><h2>ยินดีต้อนรับกลับมา<span> 👋</span></h2><p className="login-subtitle">เข้าสู่พื้นที่ทำงานของคุณ แล้วให้น้องมดช่วยจัดการต่อ</p>
        <div className="login-role-picker" aria-label="เลือกบทบาทสำหรับทดลอง"><button type="button" aria-pressed={role === 'member'} className={role === 'member' ? 'selected' : ''} onClick={() => selectRole('member')}><Users size={17}/><span>ผู้ใช้งาน<small>พื้นที่ปกปิดข้อมูล</small></span>{role === 'member' && <span className="role-check">✓</span>}</button><button type="button" aria-pressed={role === 'admin'} className={role === 'admin' ? 'selected' : ''} onClick={() => selectRole('admin')}><ShieldCheck size={18}/><span>ผู้ดูแลระบบ<small>Admin console</small></span>{role === 'admin' && <span className="role-check">✓</span>}</button></div>
        <form onSubmit={submit} className="login-form"><label htmlFor="login-email">อีเมลขององค์กร</label><div className="auth-field"><Mail size={17}/><input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required maxLength={254} autoComplete="off"/></div><div className="password-label"><label htmlFor="login-password">รหัสผ่าน</label><span>ใช้รหัสผ่านจำลองเท่านั้น</span></div><div className="auth-field"><LockKeyhole size={17}/><input id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} maxLength={128} autoComplete="off" aria-describedby="mock-login-note"/><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{error && <p className="form-error" role="alert">{error}</p>}<Button type="submit">เข้าสู่ระบบ{role === 'admin' ? ' Admin' : ''}<ArrowRight size={17}/></Button></form>
        <div className="login-divider"><span/>หรือลองเข้าใช้งานได้ทันที<span/></div><div className="demo-login-buttons"><Button variant="outline" onClick={() => login('member@example.com', 'member')}><Users size={16}/>ทดลองเป็น User</Button><Button variant="outline" onClick={() => login('admin@example.com', 'admin')}><ShieldCheck size={16}/>ทดลองเป็น Admin</Button></div>
        <div className="mock-login-note" id="mock-login-note"><FlaskConical size={18}/><p><b>คุณกำลังอยู่ในโหมดทดลอง</b>ใช้อีเมลและรหัสผ่านตัวอย่างที่กรอกไว้ได้เลย ระบบไม่ตรวจสอบหรือจัดเก็บรหัสผ่าน และยังไม่เชื่อม Supabase</p></div>
        {user && <Link className="existing-session" href={user.role === 'admin' ? '/admin' : '/'}>คุณมีเซสชัน {user.name} อยู่แล้ว · กลับไปทำงาน <ArrowRight size={13}/></Link>}
      </div><footer className="login-footer"><span>© Mod App Filter</span><span>Designed for privacy. Built for your team.</span></footer>
    </section>
  </div>;
}
