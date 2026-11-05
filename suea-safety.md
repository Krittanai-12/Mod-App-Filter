# SUEA Safety (Safety Caring) — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ SUEA Safety (Safety Caring) มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

## คำแนะนำสำหรับผู้พัฒนาและ AI

- ใช้ข้อมูลทั้งหมดในไฟล์นี้ได้โดยไม่ต้องเปิด localhost:4000 หรือเข้าถึง repo ต้นทางเพิ่มเติม
- โค้ดตัวอย่างเป็น React + TypeScript + Tailwind CSS ถ้าใช้ framework อื่น ให้ใช้สเปกดีไซน์แล้วเขียนใหม่ให้ตรงกับโปรเจคปลายทาง
- เลือกเฉพาะ component ที่ต้องการ ไม่จำเป็นต้องคัดลอกทั้งหมด ตรวจ import ที่อ้างไฟล์ข้างเคียงและนำไฟล์นั้นไปด้วย (โค้ดทุก component อยู่ท้ายไฟล์นี้)
- ติดตั้งเฉพาะ package ที่ component ที่เลือก import และยังไม่มีในโปรเจค; การอ่านไฟล์นี้ไม่ต้องติดตั้งอะไร
- ใช้ cn เดิมของโปรเจคถ้ามี มิฉะนั้นใช้โค้ด lib/utils.ts ด้านล่าง และปรับ alias @/ ให้ตรงกับปลายทาง
- ธีม CSS ด้านล่างเป็นตัวแปรพื้นฐาน สำหรับ Tailwind v4 ให้ผูกผ่าน @theme inline; สำหรับ v3 ให้ผูกใน tailwind.config ของปลายทาง
- ตรวจฟอนต์ที่ใช้จริง: var(--font-...) ต้องตั้งค่า font ในโปรเจคปลายทางก่อน ไฟล์นี้ไม่ได้ฝังไฟล์ฟอนต์หรือรูปภาพ
- บาง component ใช้สีที่กำหนดใน class โดยตรง เปลี่ยนธีมอย่างเดียวอาจไม่เปลี่ยนสีทั้งหมด
- เมนูและข้อมูลเป็นตัวอย่าง ต้องต่อ routing, state, API และสิทธิ์กับระบบปลายทาง พร้อมตรวจ keyboard, focus และ responsive
- อย่าทับ global CSS หรือ component เดิมทั้งไฟล์ ให้รวมเฉพาะส่วนที่เลือกและตรวจผลกระทบกับหน้าเดิม

## ภาพรวม

ระบบส่งเสริมความปลอดภัยแบบ gamification (สะสม Coin, Leaderboard, Streak) โทนฟ้าสดใสบนพื้นฟ้าอ่อน มีมาสคอตพนักงาน CPAC และภาพ hero ขนาดใหญ่ ใช้บนมือถือเป็นหลัก มี bottom nav

แนวเทคโนโลยีต้นแบบ: Next.js 15, React 18, Tailwind CSS 4, shadcn (Radix + base-ui), ECharts / Recharts, Leaflet, lucide-react

### บุคลิกของดีไซน์

- สดใส เป็นมิตร ชวนให้กลับมาใช้ทุกวัน
- ฟ้าสด #0B82F0 + gradient ในปุ่ม/เมนู active
- มุมมนใหญ่ 13–20px เงาฟ้าอ่อน
- Gamification: Coin, ทำต่อเนื่อง N วัน, ปฏิทินรายวัน

### เหมาะกับงาน

- แอปที่อยากให้พนักงานเข้ามาใช้ทุกวัน (engagement)
- ระบบที่ใช้บนมือถือเป็นหลัก
- หน้าที่ต้องการมาสคอต/ภาพประกอบให้รู้สึกเป็นกันเอง

## สี

### Base (จากเว็บจริง)

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Background | #EEF7FF | พื้นหลังหน้า |
| Surface | #FFFFFF | card |
| Ink | #0B2F6B | ข้อความหลัก, เมนู |
| Ink deep | #0B3572 | ข้อความบนปุ่ม outline |
| Muted | #55739B | bottom nav ปกติ, คำอธิบาย |
| Border | #D7EAFE | เส้นขอบ, hover |
| Border card | #D7E6F6 | การ์ด |
| Border button | #C5DCF8 | ปุ่ม outline |
| Hover | #F5FAFF | เมนู hover |

### Primary

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Sky light | #35A8FF | จุดเริ่ม gradient |
| Primary | #0B82F0 | เมนู active, badge, ไอคอน |
| Primary deep | #006AD6 | จุดจบ gradient |

### Gamification & Status

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Done (ทำแล้ว) | #ECFDF5 | ขอบ/ข้อความเขียว #16A34A |
| Missed (ไม่ได้ทำ) | #FFF1F2 | ข้อความ #E11D48 |
| Today | #E0F0FF | ขอบ #0B82F0 + เงา |
| Streak | #FFF7ED | ไฟ 🔥 ข้อความ #EA580C |
| Coin gold | #F5BB00 | เหรียญ Coin |
| Brand brown (เดิม) | #3B1D07 | ธีมเก่าใน globals.css ยังไม่ได้ใช้บนหน้าเว็บ |

## ฟอนต์และตัวอักษร

Font family: `var(--font-sarabun), 'TH Sarabun New', sans-serif`

Sarabun (สำรอง TH Sarabun New, Prompt) ตัวเลขสำคัญใช้ font-black (900)

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Coin number | 48–56px | 900 | จำนวน Coin |
| Hero title | 24–28px | 800 | ระบบ Safety Caring |
| Section title | 16–17px | 800 | หัวการ์ด |
| Menu | 14.5px | 700 | topbar |
| Body | 14px | 400–600 | ทั่วไป |
| Small | 10–12px | 700–900 | วันในปฏิทิน, ป้าย |
| Bottom nav | 8.5px | 700 / 900 active | label ใต้ icon |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Page margin | 10px มือถือ / 24px desktop | mx-2.5 / lg:mx-6 |
| Card padding | 12–20px |  |
| Hero | min-h 212 → 330px | ตามขนาดจอ |
| Day tile | aspect-square, p 6–10px | ปฏิทิน |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Menu | 13px | topbar |
| Button outline | 15px | ปุ่มใหญ่ |
| Hero | 18px |  |
| Card | 20px | การ์ดหลัก |
| Day tile | 12–16px | rounded-xl / 2xl |
| Pill | 9999px | ป้าย streak, coin |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Card | 0 8px 22px rgba(14,62,125,.055) | การ์ด |
| Active menu | 0 8px 20px rgba(11,130,240,.22) | เมนูที่เลือก |
| Bottom nav | 0 -10px 28px rgba(185,223,255,.45) | เงาด้านบน |
| Button inset | inset 0 1px 0 rgba(255,255,255,.65) | ปุ่ม outline |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Hero | ภาพเต็มกว้าง + การ์ดแก้วโปร่งด้านขวา + มาสคอต | หน้า Home |
| Grid | 2 คอลัมน์ (เนื้อหา ~70% / ข่าว ~30%) | desktop |
| Mobile | 1 คอลัมน์ + bottom nav | padding ล่างเผื่อ nav |

## เมนูและการนำทาง

Top navbar (desktop) + Bottom nav (มือถือ)

Desktop: แถบบนพื้นขาว โลโก้ตัวอักษรใหญ่ซ้าย เมนูเป็นปุ่มสูง 44px มุม 13px ตัวหนา เมนูที่เลือกเป็น gradient ฟ้า + เงาฟ้า บางเมนูเปิด dropdown (Safety Culture, Dashboard & Report, Admin) ขวาสุดมีกระดิ่งและรูปโปรไฟล์ มือถือ: bottom nav 4 ปุ่ม (Home, Safety Effort, Safety Culture, Notice) icon ในวงกลม 26px ตัวที่เลือกเป็นวงกลมฟ้าทึบ + ขีดฟ้าด้านบน

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| เมนู desktop | h-11, min-w 100px, radius 13px, px 15px | 14.5px / 700, สี #0B2F6B |
| Active | linear-gradient(135deg,#35A8FF,#0B82F0 55%,#006AD6) | ตัวขาว + เงา 0 8px 20px rgba(11,130,240,.22) |
| Hover | border #D7EAFE, bg #F5FAFF, text #0B82F0 |  |
| Bottom nav | สูง 60px + safe-area, 4 คอลัมน์ | พื้นขาว 95% + blur 16px, border-top #D7EAFE |
| Bottom item | icon 18px ในวงกลม 26px, label 8.5px | active: วงกลม #0B82F0 + ขีดบน 3×24px |
| Badge แจ้งเตือน | 16px วงกลม #0B82F0 ring ขาว | 9+ เมื่อเกิน 9 |

### Desktop topbar

- Home (icon: Home)
- Safety Effort (icon: ShieldCheck)
- Safety Culture (icon: Heart) — dropdown: Leaderboard, Rewards
- Plant Manager (icon: ClipboardList)
- Dashboard & Report (icon: LayoutGrid) — dropdown: SDA, KYT summary
- Admin (icon: User) — dropdown: จัดการข้อมูล, ข่าว, รางวัล, คะแนน ฯลฯ
- SuperAdmin (icon: Shield)

### Mobile bottom nav

- Home (icon: Home)
- Safety Effort (icon: ShieldCheck)
- Safety Culture (icon: UsersRound)
- Notice (icon: Bell)

- เมนูที่ยังไม่เปิดใช้แสดงจางลง (opacity .56) และกดไม่ได้
- Bottom nav ซ่อนอัตโนมัติได้ตอนเลื่อน (class is-hidden)

## กติกาดีไซน์

### ควรทำ

- ให้ผู้ใช้เห็นความคืบหน้าของตัวเองทันที (Coin, % เข้าร่วม, ทำต่อเนื่อง N วัน)
- ใช้ภาพประกอบ/มาสคอตใน hero และ empty state ให้รู้สึกเป็นกันเอง
- บนมือถือใช้ bottom nav 4 ปุ่มหลัก เมนูอื่นอยู่ในหน้า
- เมนูที่ยังไม่เปิดให้ใช้ แสดงจางและกดไม่ได้ แทนการซ่อน
- ปฏิทินรายวันใช้สีบอกสถานะ + ข้อความ 'ทำแล้ว / ไม่ได้ทำ / มีงาน'

### ควรเลี่ยง

- ใช้ gradient กับทุกปุ่ม ใช้เฉพาะ action หลักและเมนู active
- ใส่ข้อความยาวบน hero จนบังมาสคอต
- ใช้ธีมน้ำตาล/ทองเดิมใน globals.css กับหน้าใหม่ (เว็บจริงเปลี่ยนเป็นฟ้าแล้ว)
- ลืมเผื่อ safe-area และความสูง bottom nav ด้านล่างของหน้า

### ส่วนประกอบหน้า Home

- Hero: Coin ของฉัน + ปุ่มดูของรางวัล/Leaderboard + การ์ดต้อนรับ + มาสคอต
- Safety Awareness: % เข้าร่วม, ทำต่อเนื่อง, ปฏิทินย้อนหลัง 5 วัน/ล่วงหน้า 5 วัน
- ข่าวสาร Safety Culture (ภาพ)
- รายการล่าสุด, ประวัติ Line Walk & Safety Contact (กราฟแท่ง)

## ธีม CSS


```css
:root {
  --background: #EEF7FF;
  --foreground: #0B2F6B;
  --card: #FFFFFF;
  --card-foreground: #0B2F6B;
  --popover: #FFFFFF;
  --popover-foreground: #0B2F6B;
  --primary: #0B82F0;
  --primary-foreground: #FFFFFF;
  --secondary: #F5FAFF;
  --secondary-foreground: #0B3572;
  --muted: #F5FAFF;
  --muted-foreground: #55739B;
  --accent: #E0F0FF;
  --accent-foreground: #0B82F0;
  --destructive: #E11D48;
  --border: #D7EAFE;
  --input: #CFE4FB;
  --ring: #35A8FF;
  --radius: 14px;
}
```


### ผูกตัวแปรกับ Tailwind v4


```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
```


## โค้ดตัวช่วย lib/utils.ts


```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ตัวช่วยรวม className แบบเดียวกับ shadcn (ทุก component ใน registry ใช้ตัวนี้)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```


## รายการ component

| ID ที่บอก AI ได้ | ชื่อ | หน้าที่ |
| --- | --- | --- |
| top-navbar | Top Navbar (gradient active) | เมนูบน desktop ปุ่มตัวหนา ตัวที่เลือกเป็น gradient ฟ้า |
| bottom-nav | Mobile Bottom Nav | แถบล่าง 4 ปุ่ม icon ในวงกลม badge แจ้งเตือน รองรับ safe-area |
| hero | Hero Banner | ภาพ hero + การ์ดต้อนรับแบบแก้วโปร่ง + พื้นที่มาสคอต |
| coin-card | Coin Card | การ์ดแสดง Coin สะสม + ส่วนต่างสัปดาห์ + ปุ่มของรางวัล |
| streak-calendar | Streak Calendar | ปฏิทินรายวัน: ไม่ได้ทำ / ทำแล้ว / วันนี้ / มีงาน |
| section-card | Section Card | การ์ดมุม 20px หัวการ์ดมี icon ฟ้า + ลิงก์ดูทั้งหมด |
| button | Button | ปุ่ม gradient หลัก / outline ฟ้า / ghost |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### top-navbar — Top Navbar (gradient active)

เมนูบน desktop ปุ่มตัวหนา ตัวที่เลือกเป็น gradient ฟ้า

ตำแหน่งไฟล์แนะนำ: `components/suea-safety/top-navbar.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { Bell, ChevronDown, ClipboardList, Heart, Home, LayoutGrid, Shield, ShieldCheck, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon; dropdown?: boolean };

const ITEMS: Item[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "effort", label: "Safety Effort", icon: ShieldCheck },
  { id: "culture", label: "Safety Culture", icon: Heart, dropdown: true },
  { id: "manager", label: "Plant Manager", icon: ClipboardList },
  { id: "dashboard", label: "Dashboard & Report", icon: LayoutGrid, dropdown: true },
  { id: "admin", label: "Admin", icon: User, dropdown: true },
  { id: "super", label: "SuperAdmin", icon: Shield },
];

const base =
  "inline-flex h-11 min-w-[100px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-transparent px-[15px] text-[14.5px] font-bold transition-all";
const idle = "bg-transparent text-[#0B2F6B] hover:border-[#D7EAFE] hover:bg-[#F5FAFF] hover:text-[#0B82F0]";
const active = "bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] text-white shadow-[0_8px_20px_rgba(11,130,240,0.22)]";

export function TopNavbar({ items = ITEMS, unread = 3 }: { items?: Item[]; unread?: number }) {
  const [current, setCurrent] = useState("home");
  return (
    <header className="flex h-[66px] items-center gap-3 border-b border-[#D7EAFE] bg-white px-4">
      <span className="shrink-0 text-[22px] font-black italic tracking-tight text-[#0B82F0] [text-shadow:0_2px_0_#0B2F6B]">SAFETY<span className="text-[#0B2F6B]">Caring</span></span>
      <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
        {items.map((item) => (
          <button key={item.id} type="button" aria-current={current === item.id ? "page" : undefined} onClick={() => setCurrent(item.id)} className={cn(base, current === item.id ? active : idle)}>
            <item.icon className="size-4" />
            {item.label}
            {item.dropdown ? <ChevronDown className="size-3.5" /> : null}
          </button>
        ))}
      </nav>
      <button type="button" aria-label="การแจ้งเตือน" className="relative flex size-10 shrink-0 items-center justify-center rounded-full text-[#0B82F0] hover:bg-[#F5FAFF]">
        <Bell className="size-5" />
        {unread > 0 ? (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0B82F0] px-[3px] text-[9px] font-black text-white ring-[1.5px] ring-white">{unread > 9 ? "9+" : unread}</span>
        ) : null}
      </button>
      <span className="size-10 shrink-0 rounded-full border-2 border-[#35A8FF] bg-[#E0F0FF]" />
    </header>
  );
}
```


### bottom-nav — Mobile Bottom Nav

แถบล่าง 4 ปุ่ม icon ในวงกลม badge แจ้งเตือน รองรับ safe-area

ตำแหน่งไฟล์แนะนำ: `components/suea-safety/bottom-nav.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { Bell, Home, ShieldCheck, UsersRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon; enabled?: boolean };

const ITEMS: Item[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "effort", label: "Safety Effort", icon: ShieldCheck },
  { id: "culture", label: "Safety Culture", icon: UsersRound },
  { id: "notifications", label: "Notice", icon: Bell },
];

// แถบเมนูล่างบนมือถือ (ซ่อนบน desktop ด้วย lg:hidden ในโปรเจคจริง)
// fixed = false เพื่อให้วางในตัวอย่างได้ ในแอปจริงให้ใส่ fixed
export function BottomNav({ items = ITEMS, unread = 0, fixed = false }: { items?: Item[]; unread?: number; fixed?: boolean }) {
  const [current, setCurrent] = useState("home");
  return (
    <nav
      aria-label="Mobile main navigation"
      className={cn(
        "border-t border-[#D7EAFE] bg-white/95 shadow-[0_-10px_28px_rgba(185,223,255,0.45)] backdrop-blur-[16px]",
        fixed && "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
      )}
      style={{ paddingBottom: "calc(5px + env(safe-area-inset-bottom))" }}
    >
      <div className="grid min-h-[60px] w-full px-1 pt-[5px]" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const enabled = item.enabled !== false;
          const isActive = current === item.id && enabled;
          return (
            <button
              key={item.id}
              type="button"
              disabled={!enabled}
              onClick={() => setCurrent(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-[54px] select-none flex-col items-center gap-[2px] rounded-[10px] pt-1 text-center text-[8.5px] leading-[1.05] [-webkit-tap-highlight-color:transparent]",
                isActive ? "font-black text-[#0B82F0]" : "font-bold text-[#55739B]",
                !enabled && "cursor-not-allowed opacity-[0.56]",
              )}
            >
              <span className={cn("absolute -top-[1px] left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#0B82F0] transition-opacity", isActive ? "opacity-100" : "opacity-0")} />
              <span className={cn("relative flex size-[26px] items-center justify-center rounded-full transition-colors", isActive && "bg-[#0B82F0] text-white shadow-[0_8px_16px_rgba(11,130,240,0.22)]")}>
                <item.icon className="size-[18px]" strokeWidth={isActive ? 2.45 : 2.1} />
                {item.id === "notifications" && unread > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0B82F0] px-[3px] text-[9px] font-black text-white ring-[1.5px] ring-white">{unread > 9 ? "9+" : unread}</span>
                ) : null}
              </span>
              <span className="line-clamp-2 max-w-[52px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
```


### hero — Hero Banner

ภาพ hero + การ์ดต้อนรับแบบแก้วโปร่ง + พื้นที่มาสคอต

ตำแหน่งไฟล์แนะนำ: `components/suea-safety/hero.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";

// Hero: ภาพพื้นหลัง (ทับฟ้าอ่อนบางๆ) + การ์ดแก้วโปร่ง + พื้นที่มาสคอตด้านขวา
export function Hero({ image, eyebrow, title, description, left, mascot }: { image?: string; eyebrow: string; title: string; description: string; left?: ReactNode; mascot?: ReactNode }) {
  return (
    <section
      className="relative min-h-[212px] overflow-hidden rounded-[18px] border border-[rgba(215,234,254,.72)] bg-cover bg-center text-[#0B2F6B] lg:min-h-[280px]"
      style={{
        backgroundImage: image
          ? `linear-gradient(rgba(226,241,255,.26), rgba(226,241,255,.26)), url("${image}")`
          : "linear-gradient(160deg,#cfe7ff 0%,#eaf5ff 45%,#b9dcff 100%)",
      }}
    >
      <div className="relative grid gap-4 p-4 md:grid-cols-[minmax(0,320px)_1fr_auto] md:items-center md:p-6">
        <div>{left}</div>
        <div className="max-w-sm rounded-2xl border border-white/70 bg-white/55 p-5 shadow-[0_8px_22px_rgba(14,62,125,0.08)] backdrop-blur-md md:justify-self-end">
          <p className="text-[11px] font-bold tracking-[0.12em] text-[#0B82F0]">{eyebrow}</p>
          <h2 className="mt-1 text-[24px] font-extrabold leading-tight">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#3b5b86]">{description}</p>
        </div>
        {mascot ? <div className="hidden md:block">{mascot}</div> : null}
      </div>
    </section>
  );
}
```


### coin-card — Coin Card

การ์ดแสดง Coin สะสม + ส่วนต่างสัปดาห์ + ปุ่มของรางวัล

ตำแหน่งไฟล์แนะนำ: `components/suea-safety/coin-card.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { Gift, Trophy } from "lucide-react";

function Coin({ size = 20 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#d99a00] bg-[radial-gradient(circle_at_35%_30%,#ffe27a,#f5bb00_60%,#c98a00)] font-black text-[#7a4a00]"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden
    >
      ฿
    </span>
  );
}

// การ์ด Coin: ตัวเลขใหญ่ 900 + ป้ายส่วนต่าง + ปุ่มของรางวัล / Leaderboard
export function CoinCard({ coins, weeklyDelta, onRewards, onLeaderboard }: { coins: number; weeklyDelta: number; onRewards?: () => void; onLeaderboard?: () => void }) {
  return (
    <div className="space-y-3">
      <div className="rounded-[20px] border border-[#d7e6f6] bg-white p-4 shadow-[0_8px_22px_rgba(14,62,125,0.055)]">
        <p className="flex items-center gap-2 text-xs font-bold text-[#0B2F6B]">
          <Coin /> Coin SAFETY ของฉัน
        </p>
        <p className="mt-1 text-[52px] font-black leading-none text-[#0B82F0] [font-feature-settings:'tnum']">
          {coins.toLocaleString()} <span className="text-base font-bold text-[#0B2F6B]">Coin</span>
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] px-3 py-1 text-xs font-bold text-white">
          <Coin size={14} /> {weeklyDelta >= 0 ? "+" : ""}
          {weeklyDelta} Coin จากสัปดาห์ที่แล้ว
        </span>
      </div>
      <div className="rounded-[20px] border border-[#d7e6f6] bg-white p-4 shadow-[0_8px_22px_rgba(14,62,125,0.055)]">
        <div className="flex items-center gap-3">
          <Coin size={44} />
          <div>
            <p className="text-[15px] font-extrabold leading-tight text-[#0B2F6B]">Coin ของคุณสามารถนำมาแลกของรางวัลได้</p>
            <p className="text-xs text-[#55739B]">ใช้ Coin Safety เพื่อรับสิทธิ์แลกรางวัล</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={onRewards} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] px-4 text-xs font-bold text-white shadow-[0_8px_20px_rgba(11,130,240,0.22)]">
            <Gift className="size-3.5" /> ดูของรางวัลที่นี่
          </button>
          <button type="button" onClick={onLeaderboard} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#C5DCF8] bg-white px-4 text-xs font-bold text-[#0B82F0]">
            <Trophy className="size-3.5" /> ดูอันดับ Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
```


### streak-calendar — Streak Calendar

ปฏิทินรายวัน: ไม่ได้ทำ / ทำแล้ว / วันนี้ / มีงาน

ตำแหน่งไฟล์แนะนำ: `components/suea-safety/streak-calendar.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type DayState = "missed" | "done" | "today" | "upcoming";
export type Day = { weekday: string; date: number; state: DayState; note?: string };

const style: Record<DayState, string> = {
  missed: "border-[#fecdd3] bg-[#FFF1F2] text-[#E11D48]",
  done: "border-[#bbf7d0] bg-[#ECFDF5] text-[#16A34A]",
  today: "border-[#0B82F0] bg-[#E0F0FF] text-[#0B82F0] shadow-[0_8px_20px_rgba(11,130,240,0.22)] ring-2 ring-[#bfe0ff]",
  upcoming: "border-[#D7EAFE] bg-white text-[#0B2F6B] hover:-translate-y-0.5 hover:shadow-md",
};

const defaultNote: Record<DayState, string> = { missed: "ไม่ได้ทำ", done: "", today: "", upcoming: "มีงาน" };

// ปฏิทินรายวันแบบ streak: ย้อนหลัง → วันนี้ → ล่วงหน้า
export function StreakCalendar({ days, streak }: { days: Day[]; streak?: number }) {
  return (
    <div>
      {streak ? (
        <span className="mb-3 inline-flex items-center gap-1 rounded-full border border-[#fed7aa] bg-[#FFF7ED] px-3 py-1 text-xs font-bold text-[#EA580C]">🔥 ทำต่อเนื่อง {streak} วัน</span>
      ) : null}
      <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(44px, 1fr))` }}>
        {days.map((d) => (
          <div key={`${d.weekday}-${d.date}`} className={cn("flex aspect-square flex-col items-center justify-center rounded-xl border p-1.5 text-center font-black transition-all duration-300 sm:rounded-2xl", style[d.state])}>
            <span className="text-[9px] font-bold opacity-80">{d.weekday}</span>
            <span className="text-base leading-tight sm:text-lg">{d.date}</span>
            {d.state === "done" || d.state === "today" ? <CheckCircle2 className="size-3.5" /> : <span className="text-[8.5px] font-bold">{d.note ?? defaultNote[d.state]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
```


### section-card — Section Card

การ์ดมุม 20px หัวการ์ดมี icon ฟ้า + ลิงก์ดูทั้งหมด

ตำแหน่งไฟล์แนะนำ: `components/suea-safety/section-card.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// การ์ดหลักของหน้า: มุม 20px, เงาฟ้าอ่อน, หัวการ์ดมี icon สีฟ้า + ลิงก์ดูทั้งหมด
export function SectionCard({ icon, title, badge, linkLabel, onLink, children, className }: { icon?: ReactNode; title: string; badge?: ReactNode; linkLabel?: string; onLink?: () => void; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[20px] border border-[#d7e6f6] bg-white p-4 shadow-[0_8px_22px_rgba(14,62,125,0.055)]", className)}>
      <header className="mb-3 flex items-center gap-2">
        {icon ? <span className="text-[#0B82F0] [&_svg]:size-[18px]">{icon}</span> : null}
        <h3 className="text-[16px] font-extrabold text-[#0B2F6B]">{title}</h3>
        {badge}
        {linkLabel ? (
          <button type="button" onClick={onLink} className="ml-auto inline-flex items-center gap-0.5 text-xs font-bold text-[#55739B] hover:text-[#0B82F0]">
            {linkLabel} <ChevronRight className="size-3.5" />
          </button>
        ) : null}
      </header>
      {children}
    </section>
  );
}
```


### button — Button

ปุ่ม gradient หลัก / outline ฟ้า / ghost

ตำแหน่งไฟล์แนะนำ: `components/suea-safety/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all hover:-translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35A8FF] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] text-white shadow-[0_8px_20px_rgba(11,130,240,0.22)]",
        outline: "border border-[#C5DCF8] bg-white text-[#0B3572] shadow-[inset_0_1px_0_rgba(255,255,255,.65)] hover:bg-[#F5FAFF]",
        ghost: "text-[#0B2F6B] hover:bg-[#F5FAFF] hover:text-[#0B82F0]",
        danger: "bg-[#E11D48] text-white hover:bg-[#BE123C]",
      },
      size: {
        default: "h-11 rounded-[13px] px-4 text-sm",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "min-h-[54px] rounded-[15px] px-5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
```

