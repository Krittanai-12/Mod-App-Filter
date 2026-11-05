'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ui } from '@/lib/ui-styles';
import { cn } from '@/lib/utils';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  LogOut,
  Menu,
  Settings2,
  ShieldCheck,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useMockAuth } from '@/components/mock-auth';

export type NavbarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
  href: string;
};

export function AppNavbar({
  items,
  admin = false,
  onSettings,
  onHelp,
}: {
  items: NavbarItem[];
  admin?: boolean;
  onSettings?: () => void;
  onHelp?: () => void;
}) {
  const { user, logout } = useMockAuth();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  function closeMenus() {
    setOpen(false);
    setAccountOpen(false);
  }

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && toggleRef.current?.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggleRef.current.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <>
      <header className={ui(`app-navbar ${open ? 'menu-open' : ''}`)}>
        <div className={ui('navbar-inner')}>
          <Link
            className={ui('navbar-brand')}
            href={admin ? '/admin' : '/home'}
            onClick={closeMenus}
          >
            <span>
              <b>
                Mod App Filter<span>.</span>
              </b>
            </span>
          </Link>
          <nav
            className={ui('navbar-links')}
            id={menuId}
            aria-label={admin ? 'เมนูผู้ดูแลระบบ' : 'เมนูหลัก'}
          >
            {items.map((item) => (
              <Button
                variant="unstyled"
                asChild
                key={item.id}
                className={ui(`navbar-item ${item.active ? 'is-active' : ''}`)}
                aria-current={item.active ? 'page' : undefined}
                onClick={closeMenus}
              >
                <Link href={item.href}>
                  <item.icon size={16} />
                  <span>{item.label}</span>
                  {item.badge && <small>{item.badge}</small>}
                </Link>
              </Button>
            ))}
            <div className={ui('navbar-mobile-tools')}>
              {onSettings && (
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => {
                    onSettings();
                    closeMenus();
                  }}
                >
                  <Settings2 size={16} />
                  ตั้งค่าพื้นที่ทำงาน
                </Button>
              )}
              {onHelp && (
                <Button
                  variant="unstyled"
                  type="button"
                  onClick={() => {
                    onHelp();
                    closeMenus();
                  }}
                >
                  <CircleHelp size={16} />
                  ศูนย์ช่วยเหลือ
                </Button>
              )}
              {user?.role === 'admin' && (
                <Link href={admin ? '/home' : '/admin'} onClick={closeMenus}>
                  <ShieldCheck size={16} />
                  {admin ? 'ไปพื้นที่ทำงาน' : 'Admin console'}
                  <ArrowUpRight size={13} />
                </Link>
              )}
            </div>
          </nav>
          <div className={ui('navbar-actions')}>
            {onHelp && (
              <Button
                variant="unstyled"
                type="button"
                className={ui('navbar-tool')}
                aria-label="ศูนย์ช่วยเหลือ"
                title="ศูนย์ช่วยเหลือ"
                onClick={onHelp}
              >
                <CircleHelp size={18} />
              </Button>
            )}
            {user?.role === 'admin' && (
              <Link className={ui('navbar-mode-link')} href={admin ? '/home' : '/admin'}>
                <ShieldCheck size={14} />
                {admin ? 'Workspace' : 'Admin'}
                <ArrowUpRight size={12} />
              </Link>
            )}
            <span className={ui('navbar-divider')} />
            <div className={ui('navbar-account')}>
              <DropdownMenu open={accountOpen} onOpenChange={setAccountOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="unstyled"
                    className={ui('navbar-account-trigger')}
                    aria-label="เมนูบัญชีผู้ใช้งาน"
                  >
                    <span className={ui('navbar-avatar')}>
                      {user?.role === 'admin' ? 'AD' : 'MD'}
                    </span>
                    <span className={ui('navbar-account-label')}>
                      <b>{user?.name}</b>
                      <small>{user?.role === 'admin' ? 'Administrator' : 'Member'}</small>
                    </span>
                    <ChevronDown size={12} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className={ui('navbar-account-menu')}
                >
                  <div className={ui('navbar-account-info')}>
                    <b>{user?.name}</b>
                    <span>{user?.email}</span>
                    <small>Acme Organization · Mock session</small>
                  </div>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem
                      asChild
                      className="gap-[9px] rounded-[7px] p-[11px] text-[10px] text-[#8ca2c3]"
                    >
                      <Link href={admin ? '/home' : '/admin'} onClick={closeMenus}>
                        <ShieldCheck size={15} />
                        {admin ? 'ไปพื้นที่ทำงาน' : 'ไปหน้า Admin'}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className={ui('navbar-signout', 'gap-[9px] p-[11px] text-[10px]')}
                    onSelect={() => {
                      closeMenus();
                      logout();
                    }}
                  >
                    <LogOut size={15} />
                    ออกจากระบบ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              variant="unstyled"
              ref={toggleRef}
              type="button"
              className={ui('navbar-toggle')}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'ปิดเมนูหลัก' : 'เปิดเมนูหลัก'}
              onClick={() => {
                setAccountOpen(false);
                setOpen(!open);
              }}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </Button>
          </div>
        </div>
      </header>
      <nav
        className={ui('mobile-bottom-nav')}
        aria-label={admin ? 'เมนูผู้ดูแลระบบบนมือถือ' : 'เมนูหลักบนมือถือ'}
      >
        <div className="grid min-h-[60px] grid-cols-4">
          {items.map((item) => (
            <Button
              key={item.id}
              asChild
              variant="unstyled"
              aria-current={item.active ? 'page' : undefined}
              onClick={closeMenus}
              className={cn(
                'relative flex min-h-[54px] min-w-0 flex-col items-center justify-start gap-1 rounded-[10px] px-1 pt-1 text-center text-[10px] leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                item.active ? 'font-extrabold text-primary' : 'font-bold text-muted-foreground',
              )}
            >
              <Link href={item.href}>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -top-[5px] left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-primary transition-opacity',
                    item.active ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'relative grid size-[26px] place-items-center rounded-full transition-colors',
                    item.active &&
                      'bg-primary text-white shadow-[0_8px_16px_rgba(11,130,240,0.22)]',
                  )}
                >
                  <item.icon size={18} strokeWidth={item.active ? 2.45 : 2.1} aria-hidden="true" />
                  {item.badge && item.badge !== 'BETA' && (
                    <span className="absolute -top-1 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-white ring-2 ring-white">
                      {Number(item.badge) > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </span>
                <span className="line-clamp-2 max-w-full">{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </nav>
    </>
  );
}
