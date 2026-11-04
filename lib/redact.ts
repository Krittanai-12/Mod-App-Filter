export type EntityType = 'name' | 'id' | 'email' | 'phone' | 'custom';
export type MaskMode = 'full' | 'partial' | 'label';
export type Finding = { start:number; end:number; type:EntityType; value:string; masked:string };
export type RedactOptions = { enabled: EntityType[]; mode: MaskMode; custom?: string[] };
export const entityLabels: Record<EntityType,string> = { name:'ชื่อ–นามสกุล', id:'เลขบัตรประชาชน', email:'อีเมล', phone:'เบอร์โทรศัพท์', custom:'คำที่กำหนดเอง' };
export const sampleText = `เรียน ทีมงานฝ่ายบริการลูกค้า\n\nขอส่งข้อมูลสำหรับดำเนินการตามคำร้อง ดังนี้\n\nชื่อ–นามสกุล: สมชาย ใจดี\nเลขบัตรประชาชน: 1-2345-67890-12-3\nอีเมล: somchai.j@example.com\nเบอร์โทรศัพท์: 081-234-5678\n\nกรุณาติดต่อกลับผ่านอีเมลหรือหมายเลขโทรศัพท์ข้างต้น\nเพื่อยืนยันรายละเอียดการนัดหมายในวันจันทร์ เวลา 10:00 น.\n\nขอบคุณครับ\nสมชาย ใจดี`;
function mask(value:string,type:EntityType,mode:MaskMode) { if(mode==='label') return `[${type.toUpperCase()}]`; if(mode==='partial') { const chars=Array.from(value); let remaining=3; return chars.map((c,i)=>{ if(/[\p{L}\p{N}\p{M}]/u.test(c)) { if(i>=chars.length-remaining) return c; return 'x'; } return c; }).join(''); } return value.replace(/[\p{L}\p{N}\p{M}]/gu,'x'); }
export function redact(text:string, options:RedactOptions): {text:string; findings:Finding[]} {
 const candidates:Omit<Finding,'masked'>[]=[];
 const add=(start:number,value:string,type:EntityType)=>{if(value && options.enabled.includes(type))candidates.push({start,end:start+value.length,value,type});};
 const scan=(regex:RegExp,type:EntityType)=>{for(const m of text.matchAll(regex))add(m.index!,m[0],type);};
 scan(/(?<!\d)(?:\d{1}[- ]\d{4}[- ]\d{5}[- ]\d{2}[- ]\d{1}|\d{13})(?!\d)/g,'id');
 scan(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+/g,'email');
 scan(/(?<!\d)(?:(?:\+66|0)[- ]?[2-9](?:[- ]?\d){7,8})(?!\d)/g,'phone');
 if(options.enabled.includes('name')) {
  const names=new Set<string>();
  for(const m of text.matchAll(/(?:ชื่อ(?:จริง)?(?:\s*[–—-]\s*นามสกุล|\s*นามสกุล)?|นามสกุล|full\s*name|first\s*name|last\s*name|name)["']?\s*[:：=]\s*["']?([^\n\r,"'<>;]{2,100})/gi)) { const name=m[1].trim(); if(name)names.add(name); }
  for(const m of text.matchAll(/(?:นาย|นางสาว|นาง|คุณ)\s*([\p{L}\p{M}]+\s+[\p{L}\p{M}]+)/gu))names.add(m[1]);
  for(const name of names){ let index=text.indexOf(name); while(index>=0){add(index,name,'name');index=text.indexOf(name,index+name.length);} }
 }
 for(const term of options.custom??[]){const value=term.trim();if(!value)continue;let index=text.toLocaleLowerCase().indexOf(value.toLocaleLowerCase());while(index>=0){add(index,text.slice(index,index+value.length),'custom');index=text.toLocaleLowerCase().indexOf(value.toLocaleLowerCase(),index+value.length);}}
 candidates.sort((a,b)=>a.start-b.start||b.end-a.end);
 const findings:Finding[]=[];let end=0;
 for(const item of candidates){if(item.start>=end){findings.push({...item,masked:mask(item.value,item.type,options.mode)});end=item.end;}}
 let output='';let cursor=0;for(const item of findings){output+=text.slice(cursor,item.start)+item.masked;cursor=item.end;}output+=text.slice(cursor);
 return {text:output,findings};
}
