/** Selected SUEA Safety recipes: navigation, buttons and tables. Application routes and permissions stay in their existing components. */
export const sueaRecipes: Record<string, string> = {
  'app-navbar':
    'sticky top-0 z-60 border-b border-border bg-white/95 shadow-[0_4px_18px_rgba(14,62,125,0.04)] backdrop-blur-xl',
  'navbar-inner':
    'relative flex min-h-16 w-full max-w-none items-center gap-4 px-6 max-[1200px]:min-h-[60px] max-sm:min-h-[56px] max-sm:gap-2 max-[651px]:px-4',
  'navbar-brand':
    'flex shrink-0 items-center text-foreground [&_b]:block [&_b]:text-xl [&_b]:font-extrabold [&_b]:tracking-tight max-sm:[&_b]:text-lg [&_b>span]:text-primary',
  'navbar-mascot':
    'relative block h-12 w-11 shrink-0 overflow-hidden rounded-[14px] border border-border bg-[#E0F0FF] max-sm:h-10 max-sm:w-9 [&_.mascot-image]:absolute [&_.mascot-image]:-top-2 [&_.mascot-image]:-left-[10px] [&_.mascot-image]:w-[65px] [&_.mascot-image]:max-w-none [&_.mascot-image]:mix-blend-multiply max-sm:[&_.mascot-image]:w-[55px]',
  'navbar-links':
    'hidden flex-1 items-center justify-center gap-1 min-[1200px]:flex max-[1200px]:absolute max-[1200px]:top-[calc(100%+8px)] max-[1200px]:right-4 max-[1200px]:left-4 max-[1200px]:max-h-[calc(100dvh-180px)] max-[1200px]:overflow-y-auto max-[1200px]:rounded-[20px] max-[1200px]:border max-[1200px]:border-border max-[1200px]:bg-white max-[1200px]:p-3 max-[1200px]:shadow-[0_12px_35px_rgba(14,62,125,0.12)]',
  'navbar-item':
    'inline-flex h-11 min-w-[100px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-transparent px-[15px] text-[14.5px] font-bold text-foreground transition-all hover:border-border hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&.is-active]:border-transparent [&.is-active]:bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] [&.is-active]:text-white [&.is-active]:shadow-[0_8px_20px_rgba(11,130,240,0.22)] [&_small]:rounded-full [&_small]:bg-accent [&_small]:px-1.5 [&_small]:py-0.5 [&_small]:text-[9px] [&_small]:text-primary [&.is-active_small]:bg-white/20 [&.is-active_small]:text-white max-[1200px]:justify-start',
  'navbar-actions': 'ml-auto flex shrink-0 items-center gap-3 max-sm:gap-2',
  'navbar-tool':
    'hidden size-10 place-items-center rounded-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-primary min-[1400px]:grid',
  'navbar-mode-link':
    'inline-flex min-h-10 items-center gap-1.5 rounded-[13px] border border-[#C5DCF8] bg-white px-3 text-xs font-bold text-[#0B3572] shadow-[inset_0_1px_0_rgba(255,255,255,.65)] transition-colors hover:bg-secondary max-sm:hidden',
  'navbar-divider': 'h-7 w-px bg-border max-sm:hidden',
  'navbar-account': 'relative',
  'navbar-account-trigger':
    'flex min-h-11 items-center gap-2 rounded-[13px] p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:size-3',
  'navbar-avatar':
    'grid size-9 shrink-0 place-items-center rounded-full border-2 border-white bg-accent text-xs font-extrabold text-primary ring-1 ring-border max-sm:size-8',
  'navbar-account-label':
    'hidden text-left min-[1400px]:block [&_b]:block [&_b]:text-xs [&_b]:font-bold [&_b]:text-foreground [&_small]:mt-0.5 [&_small]:block [&_small]:text-[10px] [&_small]:text-muted-foreground',
  'navbar-account-menu':
    'z-70 w-[264px] max-w-[calc(100vw-32px)] rounded-[20px] border border-border bg-white p-2 text-foreground shadow-[0_12px_35px_rgba(14,62,125,0.12)] [&_[role=menuitem]]:min-h-11 [&_[role=menuitem]]:gap-2 [&_[role=menuitem]]:rounded-xl [&_[role=menuitem]]:px-3 [&_[role=menuitem]]:text-sm [&_[role=menuitem]]:font-semibold [&_[role=menuitem]]:text-foreground [&_[role=menuitem]:focus]:bg-secondary [&_[role=menuitem]:focus]:text-primary [&_.navbar-signout]:mt-1 [&_.navbar-signout]:border-t [&_.navbar-signout]:border-border [&_.navbar-signout]:text-destructive',
  'navbar-account-info':
    'mb-1 border-b border-border px-3 py-4 break-words [&_b]:block [&_b]:text-sm [&_b]:font-bold [&_b]:text-foreground [&>span]:mt-1 [&>span]:block [&>span]:text-xs [&>span]:text-muted-foreground [&>small]:mt-2 [&>small]:block [&>small]:text-[10px] [&>small]:text-muted-foreground',
  'navbar-toggle':
    'grid size-10 place-items-center rounded-[13px] border border-border bg-white text-foreground transition-colors hover:bg-secondary hover:text-primary min-[1200px]:hidden',
  'navbar-mobile-tools':
    'col-span-full mt-2 grid gap-1 border-t border-border pt-2 min-[1200px]:hidden [&>button]:flex [&>button]:min-h-11 [&>button]:items-center [&>button]:gap-2 [&>button]:rounded-xl [&>button]:px-4 [&>button]:text-left [&>button]:text-sm [&>button]:font-semibold [&>button]:text-muted-foreground [&>button:hover]:bg-secondary [&>a]:flex [&>a]:min-h-11 [&>a]:items-center [&>a]:gap-2 [&>a]:rounded-xl [&>a]:px-4 [&>a]:text-sm [&>a]:font-semibold [&>a]:text-primary [&>a:hover]:bg-secondary',
  'menu-open': '[&_.navbar-links]:grid min-[1200px]:[&_.navbar-links]:flex',
  'mobile-bottom-nav':
    'fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-white/95 px-1 pt-[5px] pb-[calc(5px+env(safe-area-inset-bottom))] shadow-[0_-10px_28px_rgba(185,223,255,0.45)] backdrop-blur-[16px] min-[1200px]:hidden',
  'ui-button':
    'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-transparent px-4 py-2.5 text-sm leading-5 font-bold transition-all hover:-translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'btn-primary':
    'border-transparent bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] text-white shadow-[0_8px_20px_rgba(11,130,240,0.22)] hover:brightness-105',
  'btn-outline':
    'border-[#C5DCF8] bg-white text-[#0B3572] shadow-[inset_0_1px_0_rgba(255,255,255,.65)] hover:bg-secondary hover:text-primary',
  'btn-ghost': 'text-foreground shadow-none hover:bg-secondary hover:text-primary',
  'btn-sm': 'min-h-9 rounded-full px-4 py-2 text-xs',
  'btn-icon': 'size-11 min-h-11 p-0',
  'admin-members-table':
    'text-sm [&_select]:min-h-9 [&_select]:min-w-[88px] [&_select]:rounded-[10px] [&_select]:border [&_select]:border-input [&_select]:bg-white [&_select]:px-2 [&_select]:py-1.5 [&_select]:text-xs [&_select]:font-semibold [&_select]:text-foreground [&_select]:outline-offset-2 [&_select:disabled]:cursor-not-allowed [&_select:disabled]:opacity-50 [&_th]:bg-secondary [&_th]:text-xs [&_th]:font-bold [&_th]:text-muted-foreground [&_td]:border-border [&_td]:text-sm [&_td]:text-foreground [&_td:first-child]:min-w-[230px]',
  'member-cell':
    'flex items-center gap-3 [&_b]:block [&_b]:text-sm [&_b]:font-bold [&_b]:text-foreground [&_small]:mt-1 [&_small]:block [&_small]:text-xs [&_small]:text-muted-foreground [&_em]:ml-2 [&_em]:rounded-full [&_em]:bg-accent [&_em]:px-1.5 [&_em]:py-0.5 [&_em]:text-[10px] [&_em]:font-semibold [&_em]:text-primary [&_em]:not-italic',
  'member-status':
    'inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground [&_i]:size-1.5 [&_i]:rounded-full [&_i]:bg-muted-foreground [&.active]:bg-[#ECFDF5] [&.active]:text-[#16A34A] [&.active_i]:bg-[#16A34A]',
  'table-scroll': 'overflow-auto rounded-[14px] [&+.inline-notice]:mt-6',
};
