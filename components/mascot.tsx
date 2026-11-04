import Image from 'next/image';

export function Mascot({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/mascot-ant.png" alt="มาสคอตมด Mod App Filter พร้อมช่วยปกป้องข้อมูลของคุณ" width={1122} height={1402} priority={priority} className={`mascot-image ${className}`} />;
}
