'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { ui } from '@/lib/ui-styles';
import { LockKeyhole, Search, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { type MockRole } from '@/components/mock-auth';
import { useAdmin } from './state';

export default function AdminMembers() {
  const {
    user,
    members,
    setMembers,
    query,
    setQuery,
    filter,
    setFilter,
    name,
    email,
    department,
    role,
    filteredMembers,
    audit,
    setMemberRole,
    toggleMember,
  } = useAdmin();
  return (
    <Card as="section" className={ui('secondary-card')}>
      <div className={ui('section-title')}>
        <h2>
          สมาชิกในองค์กร
          <Badge variant="unstyled" className={ui('subtle-badge')}>
            {members.length} คน
          </Badge>
        </h2>
        <span className={ui('admin-card-subtitle')}>บัญชีตัวอย่างทั้งหมด</span>
      </div>
      <div className={ui('admin-table-tools')}>
        <div className={ui('search-input')}>
          <Search size={17} />
          <Input
            unstyled
            aria-label="ค้นหาสมาชิก"
            placeholder="ค้นหาชื่อ อีเมล หรือแผนก…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <NativeSelect
          unstyled
          aria-label="กรองสมาชิก"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <NativeSelectOption value="all">สมาชิกทั้งหมด</NativeSelectOption>
          <NativeSelectOption value="active">เปิดใช้งาน</NativeSelectOption>
          <NativeSelectOption value="inactive">ปิดใช้งาน</NativeSelectOption>
          <NativeSelectOption value="admin">ผู้ดูแลระบบ</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className={ui('table-scroll')}>
        <Table className={ui('admin-members-table')}>
          <TableHeader>
            <TableRow>
              <TableHead>สมาชิก</TableHead>
              <TableHead>แผนก</TableHead>
              <TableHead>บทบาท</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className={ui('member-cell')}>
                    <span className={ui(`member-avatar ${member.color}`)}>
                      {member.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span>
                      <b>
                        {member.name}
                        {member.email === user?.email && <em>คุณ</em>}
                      </b>
                      <small>{member.email}</small>
                    </span>
                  </div>
                </TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>
                  <NativeSelect
                    unstyled
                    aria-label={`บทบาทของ ${member.name}`}
                    value={member.role}
                    disabled={member.email === user?.email}
                    onChange={(e) => setMemberRole(member, e.target.value as MockRole)}
                  >
                    <NativeSelectOption value="member">User</NativeSelectOption>
                    <NativeSelectOption value="admin">Admin</NativeSelectOption>
                  </NativeSelect>
                </TableCell>
                <TableCell>
                  <span className={ui(`member-status ${member.active ? 'active' : ''}`)}>
                    <i />
                    {member.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className={ui('member-actions')}>
                    <Switch
                      aria-label={`เปิดใช้งาน ${member.name}`}
                      checked={member.active}
                      disabled={member.email === user?.email}
                      onCheckedChange={() => toggleMember(member)}
                    />
                    <Button
                      variant="unstyled"
                      className={ui('icon-button')}
                      aria-label={`นำ ${member.name} ออกจากรายชื่อจำลอง`}
                      disabled={member.email === user?.email}
                      onClick={() => {
                        setMembers((items) => items.filter((m) => m.id !== member.id));
                        audit('นำสมาชิกออกจากรายชื่อจำลอง', member.name, 'member');
                        toast.success('นำสมาชิกออกจากหน้าจำลองแล้ว');
                      }}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {!filteredMembers.length && (
        <div className={ui('large-empty')}>
          <Users size={32} />
          <h3>ไม่พบสมาชิกที่ค้นหา</h3>
          <p>ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
        </div>
      )}
      <div className={ui('admin-table-footer')}>
        <span>
          แสดง {filteredMembers.length} จาก {members.length} คน
        </span>
        <span>
          <LockKeyhole size={12} />
          บัญชีปัจจุบันไม่สามารถลดสิทธิ์หรือปิดสถานะตัวเองในหน้าจำลอง
        </span>
      </div>
    </Card>
  );
}
