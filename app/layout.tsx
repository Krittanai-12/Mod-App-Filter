import type { Metadata } from 'next';
import './globals.css';
import './redesign.css';
import './auth-admin.css';
import { Toaster } from 'sonner';
import { MockAuthProvider } from '@/components/mock-auth';
export const metadata: Metadata = {title: 'Mod App Filter — Privacy starts here', description: 'พื้นที่ปกปิดข้อมูลส่วนบุคคลสำหรับองค์กร เตรียมข้อมูลให้พร้อมก่อนส่งต่อ'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="th"><body><MockAuthProvider>{children}</MockAuthProvider><Toaster position="bottom-right" richColors/></body></html> }
