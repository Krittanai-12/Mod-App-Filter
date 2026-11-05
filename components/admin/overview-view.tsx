'use client';
import { AuditList } from './audit-list';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ui } from '@/lib/ui-styles';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Code2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/mascot';
import { useAdmin } from './state';

export default function AdminOverview() {
  const { members, events, role, policy, activeMembers, go } = useAdmin();
  return (
    <>
      <Card as="section" className={ui('admin-welcome')}>
        <div>
          <span className={ui('admin-welcome-label')}>
            <Sparkles size={13} /> A SAFER WORKSPACE STARTS HERE
          </span>
          <h2>
            ทีมทำงานเต็มที่
            <br />
            <span>น้องมดช่วยดูแลความเป็นส่วนตัว</span>
          </h2>
          <p>
            จัดการสมาชิก เลือกนโยบาย และติดตามกิจกรรม
            <br />
            ให้ทุกคนพร้อมส่งต่อข้อมูลอย่างมั่นใจ
          </p>
          <Button variant="unstyled" onClick={() => go('members')}>
            จัดการทีมของคุณ
            <ArrowRight size={15} />
          </Button>
        </div>
        <Card as="div" className={ui('admin-welcome-art')}>
          <div />
          <Mascot priority />
          <span>
            <ShieldCheck size={15} /> Better together.
          </span>
        </Card>
      </Card>
      <div className={ui('admin-stats')}>
        {[
          {
            label: 'สมาชิกในองค์กร',
            value: members.length,
            unit: 'คน',
            icon: Users,
            color: 'blue',
            hint: 'สมาชิกตัวอย่างทั้งหมด',
          },
          {
            label: 'พร้อมใช้งาน',
            value: activeMembers,
            unit: 'คน',
            icon: UserCheck,
            color: 'green',
            hint: 'สถานะเปิดใช้งานในหน้าจำลอง',
          },
          {
            label: 'ประเภทข้อมูลที่ปกปิด',
            value: policy.length,
            unit: 'ประเภท',
            icon: ShieldCheck,
            color: 'orange',
            hint: 'นโยบายตัวอย่างปัจจุบัน',
          },
          {
            label: 'บันทึกกิจกรรม',
            value: events.length,
            unit: 'รายการ',
            icon: Activity,
            color: 'purple',
            hint: 'ข้อมูลตัวอย่างและเซสชันนี้',
          },
        ].map((stat) => (
          <div className={ui('admin-stat')} key={stat.label}>
            <div>
              <span className={ui(`entity-icon ${stat.color}`)}>
                <stat.icon size={18} />
              </span>
              <span>{stat.label}</span>
            </div>
            <strong>
              {stat.value}
              <small>{stat.unit}</small>
            </strong>
            <p>{stat.hint}</p>
          </div>
        ))}
      </div>
      <div className={ui('admin-overview-grid')}>
        <Card as="section" className={ui('secondary-card')}>
          <div className={ui('section-title')}>
            <div>
              <h2>กิจกรรมในพื้นที่ทำงาน</h2>
              <p className={ui('admin-card-subtitle')}>จำนวนการประมวลผล · ข้อมูลตัวอย่าง 7 วัน</p>
            </div>
            <Badge variant="unstyled" className={ui('subtle-badge')}>
              DEMO DATA
            </Badge>
          </div>
          <div
            className={ui('admin-chart')}
            role="img"
            aria-label="กราฟตัวอย่างจำนวนการประมวลผล: จันทร์ 32 อังคาร 48 พุธ 39 พฤหัส 61 ศุกร์ 52 เสาร์ 24 อาทิตย์ 43"
          >
            <div className={ui('chart-grid')}>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            {[32, 48, 39, 61, 52, 24, 43].map((value, i) => (
              <div className={ui('chart-column')} key={i}>
                <div
                  className={ui(`chart-bar ${i === 3 ? 'highlight' : ''}`)}
                  style={{ height: `${(value / 65) * 100}%` }}
                  title={`${['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'][i]}: ${value} รายการ`}
                >
                  <span>{value}</span>
                </div>
                <small>{['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'][i]}</small>
              </div>
            ))}
          </div>
          <div className={ui('chart-legend')}>
            <span />
            การประมวลผลตัวอย่าง <b>299 รายการ / 7 วัน</b>
          </div>
        </Card>
        <Card as="section" className={ui('secondary-card admin-recent')}>
          <div className={ui('section-title')}>
            <h2>กิจกรรมล่าสุด</h2>
            <Button variant="unstyled" onClick={() => go('activity')}>
              ดูทั้งหมด
              <ArrowUpRight size={13} />
            </Button>
          </div>
          <AuditList events={events.slice(0, 3)} />
        </Card>
      </div>
      <div className={ui('admin-quick-links')}>
        <Button variant="unstyled" onClick={() => go('policies')}>
          <span className={ui('entity-icon orange')}>
            <SlidersHorizontal size={21} />
          </span>
          <div>
            <b>ปรับการปกปิดให้เหมาะกับทีม</b>
            <p>เลือกข้อมูลที่ต้องการปกปิดเป็นมาตรฐานขององค์กร</p>
          </div>
          <ArrowUpRight size={18} />
        </Button>
        <Link href="/home">
          <span className={ui('entity-icon blue')}>
            <Code2 size={21} />
          </span>
          <div>
            <b>พร้อมเชื่อมทุกเวิร์กโฟลว์</b>
            <p>ดูตัวอย่าง API ได้จากเมนูในพื้นที่ทำงาน</p>
          </div>
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}
