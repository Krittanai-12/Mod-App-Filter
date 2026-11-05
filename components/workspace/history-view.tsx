'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { ui } from '@/lib/ui-styles';
import { ArrowRight, Check, FileText, History, LockKeyhole, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useWorkspace } from './state';

export default function WorkspaceHistory() {
  const { records, setRecords, historyQuery, setHistoryQuery, navigate } = useWorkspace();
  return (
    <Card as="section" className={ui('secondary-card')}>
      <div className={ui('section-title')}>
        <h2>
          ประวัติในเซสชันนี้{' '}
          <Badge variant="unstyled" className={ui('subtle-badge')}>
            {records.length} รายการ
          </Badge>
        </h2>
        <Button
          variant="outline"
          size="sm"
          disabled={!records.length}
          onClick={() => {
            setRecords([]);
            toast.success('ล้างประวัติแล้ว');
          }}
        >
          <Trash2 size={14} />
          ล้างประวัติ
        </Button>
      </div>
      <div className={ui('search-input')}>
        <Search size={17} />
        <Input
          unstyled
          aria-label="ค้นหาประวัติ"
          value={historyQuery}
          onChange={(e) => setHistoryQuery(e.target.value)}
          placeholder="ค้นหาชื่อไฟล์หรือข้อความ…"
        />
      </div>
      {records.filter((r) => r.name.toLowerCase().includes(historyQuery.toLowerCase())).length ? (
        <div className={ui('table-scroll')}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>รายการ</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead>ปกปิดแล้ว</TableHead>
                <TableHead>เวลา (กรุงเทพฯ)</TableHead>
                <TableHead>สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records
                .filter((r) => r.name.toLowerCase().includes(historyQuery.toLowerCase()))
                .map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <FileText size={16} />
                      {r.name}
                    </TableCell>
                    <TableCell>{r.kind}</TableCell>
                    <TableCell>{r.count} รายการ</TableCell>
                    <TableCell>{r.time}</TableCell>
                    <TableCell>
                      <span className={ui('status-success')}>
                        <Check size={12} />
                        สำเร็จ
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className={ui('large-empty')}>
          <History size={35} />
          <h3>{historyQuery ? 'ไม่พบรายการที่ค้นหา' : 'ทุกการปกป้อง เริ่มจากครั้งแรก'}</h3>
          <p>ประวัติจะแสดงเมื่อคุณปกปิดข้อความหรือไฟล์ และจะหายเมื่อรีเฟรชหน้า</p>
          <Button onClick={() => navigate('workspace')}>
            ไปพื้นที่ปกปิดข้อมูล
            <ArrowRight size={15} />
          </Button>
        </div>
      )}
      <div className={ui('inline-notice')}>
        <LockKeyhole size={15} />
        บันทึกเฉพาะชื่อรายการ จำนวน และเวลาในหน่วยความจำของแท็บนี้ ไม่มีการบันทึกเนื้อหาต้นฉบับ
      </div>
    </Card>
  );
}
