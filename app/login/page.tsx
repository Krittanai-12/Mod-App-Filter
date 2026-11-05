'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { useState, type FormEvent, type PointerEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useMockAuth, type MockRole } from '@/components/mock-auth';
import styles from './login.styles';

const particlePositions = [
  'left-[7%] top-[24%] [animation-delay:-2s]',
  'left-[16%] top-[72%] [animation-delay:-9s]',
  'left-[24%] top-[12%] [animation-delay:-5s]',
  'left-[33%] top-[86%] [animation-delay:-12s]',
  'left-[43%] top-[28%] [animation-delay:-7s]',
  'left-[52%] top-[79%] [animation-delay:-3s]',
  'left-[61%] top-[10%] [animation-delay:-11s]',
  'left-[72%] top-[87%] [animation-delay:-6s]',
  'left-[81%] top-[32%] [animation-delay:-13s]',
  'left-[91%] top-[62%] [animation-delay:-4s]',
  'left-[95%] top-[16%] [animation-delay:-8s]',
  'left-[4%] top-[88%] [animation-delay:-10s]',
];

export default function LoginPage() {
  const { login, user } = useMockAuth();
  const [role, setRole] = useState<MockRole>('member');
  const [email, setEmail] = useState('member@example.com');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [greetingCount, setGreetingCount] = useState(0);

  const mascotMessage = submitting
    ? 'ไปกันเลย! น้องมดไปด้วยนะ'
    : focusedField === 'password'
      ? showPassword
        ? 'ใช้รหัสผ่านจำลองเท่านั้นนะ'
        : 'ความลับของคุณ น้องมดดูแลให้'
      : focusedField === 'email'
        ? 'ใส่อีเมล แล้วไปเริ่มงานกันเลย'
        : greetingCount > 0
          ? 'ไฮไฟว์! วันนี้ต้องเป็นวันที่ดีแน่'
          : role === 'admin'
            ? 'พร้อมแล้ว ไปดูแลทีมกัน!'
            : 'สวัสดี! น้องมดพร้อมช่วยแล้ว';

  function selectRole(next: MockRole) {
    setRole(next);
    setEmail(next === 'admin' ? 'admin@example.com' : 'member@example.com');
    setError('');
    setGreetingCount(0);
  }

  function moveGlow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
  }

  function moveMascot(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
    event.currentTarget.style.setProperty('--buddy-x', `${x * 5}px`);
    event.currentTarget.style.setProperty('--buddy-y', `${y * 3}px`);
  }

  function moveAmbient(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY}px`);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (password.length < 6) {
      setError('กรอกรหัสผ่านจำลองอย่างน้อย 6 ตัวอักษร');
      return;
    }
    setError('');
    setSubmitting(true);
    login(email, role);
  }

  return (
    <main className={styles.page} onPointerMove={moveAmbient}>
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/login-office.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.effects} aria-hidden="true">
        <div className={styles.pointerGlow} />
        <div className={styles.lightBlue} />
        <div className={styles.lightWarm} />
        <svg
          className={styles.lightTrails}
          viewBox="0 0 1600 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="login-light-trail"
              x1="0"
              y1="900"
              x2="1600"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="0.7" stopColor="#35A8FF" stopOpacity="0.5" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-100 840C180 840 80 100 480 100S1040 400 1700 30"
            stroke="url(#login-light-trail)"
            strokeWidth="1.5"
          />
          <path
            className={styles.flowLine}
            d="M-100 840C180 840 80 100 480 100S1040 400 1700 30"
            stroke="#F5FAFF"
            strokeWidth="2.5"
            strokeDasharray="6 92"
          />
          <path
            d="M-100 950C450 720 1040 1150 1700 450"
            stroke="url(#login-light-trail)"
            strokeWidth="1.5"
          />
        </svg>
        {particlePositions.map((position) => (
          <span key={position} className={`${styles.particle} ${position}`} />
        ))}
        <span className={`${styles.glassTile} ${styles.tileShield}`}>
          <ShieldCheck size={26} strokeWidth={1.4} />
        </span>
        <span className={`${styles.glassTile} ${styles.tileLock}`}>
          <LockKeyhole size={22} strokeWidth={1.4} />
        </span>
        <span className={`${styles.glassTile} ${styles.tileSparkle}`}>
          <Sparkles size={23} strokeWidth={1.4} />
        </span>
      </div>

      <div
        className={styles.stage}
        onPointerMove={moveMascot}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty('--buddy-x', '0px');
          event.currentTarget.style.setProperty('--buddy-y', '0px');
        }}
      >
        <div className={styles.brand}>
          <span>
            Mod App Filter<span className={styles.brandDot}>.</span>
          </span>
        </div>

        <div className={styles.content}>
          <aside
            className={styles.mascotScene}
            data-private={focusedField === 'password'}
            aria-label="น้องมด เพื่อนช่วยดูแลข้อมูล"
          >
            <div className={styles.mascotSpeech}>
              <span>
                <span className={styles.buddyDot} />
                น้องมด <span className={styles.buddyTag}>YOUR PRIVACY BUDDY</span>
              </span>
              <p key={mascotMessage}>{mascotMessage}</p>
            </div>
            <div className={styles.mascotFloat}>
              <Button
                variant="unstyled"
                type="button"
                className={styles.mascotHello}
                aria-label="ทักทายน้องมด"
                onClick={() => setGreetingCount((count) => count + 1)}
              >
                <span
                  key={greetingCount}
                  className={greetingCount > 0 ? styles.mascotWave : styles.mascotPose}
                >
                  <Image
                    src="/mascot-ant-transparent.png"
                    alt="น้องมด มาสคอต Mod App Filter พร้อมช่วยดูแลข้อมูล"
                    width={1122}
                    height={1402}
                    preload
                    className={styles.mascotImage}
                  />
                </span>
              </Button>
            </div>
            <span className={styles.buddyShield} aria-hidden="true">
              {focusedField === 'password' ? (
                <LockKeyhole size={19} strokeWidth={1.8} />
              ) : (
                <ShieldCheck size={20} strokeWidth={1.8} />
              )}
            </span>
            {greetingCount > 0 && (
              <div key={greetingCount} className={styles.greetingSparkles} aria-hidden="true">
                <span>✦</span>
                <span>✧</span>
                <span>✦</span>
                <span>✧</span>
              </div>
            )}
            <span className={styles.mascotCaption} aria-hidden="true">
              <Sparkles size={11} />
              แตะทักทายน้องมดได้เลย
            </span>
          </aside>
          <div className={styles.cardWrap}>
            <span className={styles.cardAccent} aria-hidden="true" />
            <Card
              as="section"
              className={styles.card}
              onPointerMove={moveGlow}
              aria-labelledby="login-heading"
            >
              <h1 id="login-heading" className={styles.srOnly}>
                เข้าสู่ระบบ Mod App Filter
              </h1>
              <div
                className={styles.rolePicker}
                role="group"
                aria-label="เลือกบทบาทสำหรับเข้าสู่ระบบทดลอง"
              >
                <span className={styles.roleIndicator} data-role={role} aria-hidden="true" />
                <Button
                  variant="unstyled"
                  type="button"
                  aria-pressed={role === 'member'}
                  className={styles.roleButton}
                  disabled={submitting}
                  onClick={() => selectRole('member')}
                >
                  <Users size={20} strokeWidth={1.8} aria-hidden="true" />
                  <span>
                    ผู้ใช้งาน<small>พื้นที่ปกปิดข้อมูล</small>
                  </span>
                  <span className={styles.roleCheck} aria-hidden="true">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                </Button>
                <Button
                  variant="unstyled"
                  type="button"
                  aria-pressed={role === 'admin'}
                  className={styles.roleButton}
                  disabled={submitting}
                  onClick={() => selectRole('admin')}
                >
                  <ShieldCheck size={21} strokeWidth={1.8} aria-hidden="true" />
                  <span>
                    ผู้ดูแลระบบ<small>Admin console</small>
                  </span>
                  <span className={styles.roleCheck} aria-hidden="true">
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                </Button>
              </div>

              <form onSubmit={submit} className={styles.form} aria-busy={submitting}>
                <div
                  className={styles.fieldGroup}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                >
                  <Label unstyled htmlFor="login-email">
                    อีเมลขององค์กร
                  </Label>
                  <div className={styles.field}>
                    <Mail size={19} strokeWidth={1.8} aria-hidden="true" />
                    <Input
                      unstyled
                      id="login-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      maxLength={254}
                      autoComplete="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      disabled={submitting}
                    />
                    <span className={styles.fieldFocus} aria-hidden="true" />
                  </div>
                </div>

                <div
                  className={styles.fieldGroup}
                  onFocus={() => setFocusedField('password')}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setFocusedField(null);
                  }}
                >
                  <div className={styles.passwordLabel}>
                    <Label unstyled htmlFor="login-password">
                      รหัสผ่าน
                    </Label>
                    <span id="password-hint">ใช้รหัสผ่านตัวอย่างได้เลย</span>
                  </div>
                  <div className={styles.field}>
                    <LockKeyhole size={19} strokeWidth={1.8} aria-hidden="true" />
                    <Input
                      unstyled
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className={showPassword ? undefined : styles.hiddenPassword}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError('');
                      }}
                      required
                      minLength={6}
                      maxLength={128}
                      autoComplete="off"
                      aria-describedby={error ? 'password-hint login-error' : 'password-hint'}
                      aria-invalid={!!error}
                      disabled={submitting}
                    />
                    <Button
                      variant="unstyled"
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                      aria-pressed={showPassword}
                      disabled={submitting}
                    >
                      {showPassword ? (
                        <EyeOff size={19} strokeWidth={1.8} />
                      ) : (
                        <Eye size={19} strokeWidth={1.8} />
                      )}
                    </Button>
                    <span className={styles.fieldFocus} aria-hidden="true" />
                  </div>
                </div>

                {error && (
                  <p id="login-error" className={styles.error} role="alert">
                    {error}
                  </p>
                )}
                <Button
                  variant="unstyled"
                  type="submit"
                  className={styles.submit}
                  disabled={submitting}
                >
                  <span>
                    {submitting
                      ? 'กำลังเปิดพื้นที่ทำงาน'
                      : role === 'admin'
                        ? 'เข้าสู่ระบบ Admin'
                        : 'เข้าสู่ระบบ'}
                  </span>
                  {submitting ? (
                    <LoaderCircle size={19} className={styles.spinner} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={20} className={styles.submitArrow} aria-hidden="true" />
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {user && (
          <div className={styles.belowCard}>
            <Link
              className={styles.existingSession}
              href={user.role === 'admin' ? '/admin' : '/home'}
            >
              กลับไปยังพื้นที่ทำงานของ {user.name}
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
