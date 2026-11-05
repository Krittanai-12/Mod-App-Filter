import { Users, ShieldCheck, Activity } from 'lucide-react';
import { ui } from '@/lib/ui-styles';
import type { AuditEvent } from './config';

export function AuditList({ events }: { events: AuditEvent[] }) {
  return (
    <div className={ui('audit-list')}>
      {events.map((event) => (
        <div className={ui('audit-item')} key={event.id}>
          <span
            className={ui(
              `entity-icon ${event.type === 'member' ? 'blue' : event.type === 'policy' ? 'orange' : 'green'}`,
            )}
          >
            {event.type === 'member' ? (
              <Users size={17} />
            ) : event.type === 'policy' ? (
              <ShieldCheck size={17} />
            ) : (
              <Activity size={17} />
            )}
          </span>
          <div>
            <b>{event.action}</b>
            <p>{event.detail}</p>
            <small>{event.time}</small>
          </div>
          <span className={ui('audit-dot')} />
        </div>
      ))}
    </div>
  );
}
