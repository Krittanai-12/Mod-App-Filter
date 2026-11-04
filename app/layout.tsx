import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
export const metadata: Metadata = {title: 'Mod App Filter — Privacy starts here', description: 'พื้นที่ปกปิดข้อมูลส่วนบุคคลสำหรับองค์กร เตรียมข้อมูลให้พร้อมก่อนส่งต่อ'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="th"><body>{children}<Toaster position="bottom-right" richColors/></body></html> }
