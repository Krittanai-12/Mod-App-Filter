/** Tailwind utilities for the office login, transparent mascot, and ambient effects. */
const styles = {
  page: 'auth-page relative isolate grid min-h-svh w-full place-items-center overflow-x-clip bg-[#DDEAF5] px-6 py-10 text-[#0B2F6B] [--accent:#0B82F0] max-[960px]:px-5 max-[960px]:py-7 max-[360px]:px-4 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-primary [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-primary motion-reduce:[&_*]:animate-none! motion-reduce:[&_*]:transition-none! motion-reduce:[&_*::before]:animate-none! motion-reduce:[&_*::before]:transition-none! motion-reduce:[&_*::after]:animate-none! motion-reduce:[&_*::after]:transition-none!',
  stage: 'auth-stage relative z-10 w-full max-w-[1200px]',
  brand:
    'auth-brand mx-auto mb-8 flex w-fit items-center justify-center rounded-full border border-white/80 bg-white/90 px-7 py-3 text-[22px] font-bold tracking-tight text-[#0B2F6B] shadow-[0_6px_24px_rgba(11,47,107,0.08)] backdrop-blur-xl [animation:auth-reveal_.75s_both] max-[960px]:mb-6 max-[960px]:px-6 max-[960px]:py-2.5 max-[960px]:text-lg',
  brandDot: 'auth-brandDot text-[var(--accent)]',
  cardWrap: 'auth-cardWrap relative min-w-0 [animation:auth-reveal_.85s_.08s_both]',
  card: "auth-card relative isolate rounded-[34px] border border-white/95 bg-white/90 p-10 shadow-[0_28px_80px_-20px_rgba(11,47,107,0.28),inset_0_1px_0_white] backdrop-blur-2xl [--glow-x:50%] [--glow-y:0%] max-[540px]:rounded-[28px] max-[540px]:p-[26px] max-[360px]:px-[18px] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] before:bg-[radial-gradient(420px_circle_at_var(--glow-x)_var(--glow-y),rgba(191,226,255,0.55),transparent_75%)] hover:before:opacity-100",
  rolePicker:
    'auth-rolePicker relative isolate mb-8 grid grid-cols-2 gap-3 max-[540px]:mb-6 max-[540px]:gap-[9px]',
  roleIndicator: [
    'auth-roleIndicator absolute z-[-1] inset-[0_auto_0_0] w-[calc((100%_-_12px)_/_2)]',
    '[@media_(width<=540px)]:w-[calc((100%_-_9px)_/_2)] [border-width:1px] [border-style:solid]',
    'border-[#0B82F0] rounded-[12px] [background:#F5FAFF] [box-shadow:0_3px_10px_#7a9bcc0a,_inset_0_1px_0_#fff]',
    '[transition:transform_.45s_cubic-bezier(.22,_1,_.36,_1)]',
    "[&[data-role='admin']]:[transform:translateX(calc(100%_+_12px))]",
    "[@media_(width<=540px)]:[&[data-role='admin']]:[transform:translateX(calc(100%_+_9px))]",
  ].join(' '),
  roleButton:
    'auth-roleButton flex min-h-20 min-w-0 items-center gap-3 rounded-[15px] border border-[#D7EAFE] bg-white/90 px-4 py-3 text-left text-[#55739B] transition-colors [&[aria-pressed=true]]:border-transparent [&[aria-pressed=true]]:bg-transparent [&[aria-pressed=true]]:text-primary [&>span:not(.auth-roleCheck)]:flex-1 [&>span:not(.auth-roleCheck)]:whitespace-nowrap [&>span:not(.auth-roleCheck)]:text-sm [&>span:not(.auth-roleCheck)]:font-semibold [&_small]:mt-1 [&_small]:block [&_small]:text-[10px] [&_small]:font-normal [&_small]:text-[#55739B] [&[aria-pressed=true]_.auth-roleCheck]:scale-100 [&[aria-pressed=true]_.auth-roleCheck]:opacity-100 hover:bg-[#F5FAFF] max-[540px]:min-h-[70px] max-[540px]:gap-2 max-[540px]:rounded-xl max-[540px]:px-2.5 max-[540px]:[&>span:not(.auth-roleCheck)]:text-xs max-[540px]:[&_small]:text-[9px] max-[540px]:[&>svg]:size-[18px] max-[360px]:gap-1.5 max-[360px]:px-2 max-[360px]:[&>span:not(.auth-roleCheck)]:text-[10px] max-[360px]:[&_small]:text-[8px]',
  roleCheck: [
    'auth-roleCheck grid [place-items:center] w-[17px] [@media_(width<=360px)]:w-[13px]',
    '[@media_(width>360px)_and_(width<=540px)]:w-[15px] h-[17px] [@media_(width<=360px)]:h-[13px]',
    '[@media_(width>360px)_and_(width<=540px)]:h-[15px] rounded-[50%] [background:#F5FAFF] text-[#55739B]',
    'opacity-[0] [transform:scale(.5)]',
    '[transition:opacity_.25s,_transform_.35s_cubic-bezier(.34,_1.56,_.64,_1)]',
  ].join(' '),
  form: 'auth-form flex flex-col gap-7 max-[540px]:gap-[22px]',
  fieldGroup:
    'auth-fieldGroup min-w-0 [&_label]:mb-2.5 [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-[#55739B] max-[540px]:[&_label]:text-xs',
  passwordLabel:
    'auth-passwordLabel flex items-baseline justify-between gap-2 [&>span]:text-[11px] [&>span]:text-[#55739B] max-[540px]:[&>span]:text-[9px]',
  field:
    'auth-field relative flex min-h-[60px] items-center gap-3 rounded-[13px] border border-[#D7EAFE] bg-white/95 px-4 text-[#55739B] transition-[border-color,box-shadow,background,color] focus-within:border-primary/50 focus-within:bg-white focus-within:text-primary focus-within:shadow-[0_0_0_4px_rgba(53,168,255,0.12),0_6px_20px_rgba(11,47,107,0.06)] [&_input]:relative [&_input]:z-10 [&_input]:h-[58px] [&_input]:w-full [&_input]:min-w-0 [&_input]:flex-1 [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-base [&_input]:leading-relaxed [&_input]:text-[#0B2F6B] [&_input]:outline-none [&_input::placeholder]:text-muted-foreground [&>button]:grid [&>button]:place-items-center [&>button]:text-[#55739B] [&_.auth-hiddenPassword]:tracking-[4px] [&:focus-within_.auth-fieldFocus]:scale-x-100 [&:focus-within_.auth-fieldFocus]:opacity-100 max-[540px]:min-h-14 max-[540px]:px-3 max-[540px]:[&_input]:h-[54px]',
  hiddenPassword: 'auth-hiddenPassword ',
  fieldFocus: [
    'auth-fieldFocus absolute right-[14px] bottom-[-1px] left-[14px] h-[2px]',
    '[background:linear-gradient(90deg,_transparent,_#E0F0FF,_transparent)] opacity-[0] [transform:scaleX(.4)]',
    '[transition:opacity_.3s,_transform_.4s]',
  ].join(' '),
  passwordToggle: [
    'auth-passwordToggle relative z-[1] grid [place-items:center] w-[36px] h-[36px] mr-[-7px] rounded-[8px]',
    'text-[#55739B] [&:hover]:[background:#F5FAFF] [&:hover]:text-[#55739B]',
  ].join(' '),
  submit:
    "auth-submit relative isolate mt-1 flex min-h-[60px] w-full items-center justify-between overflow-hidden rounded-[13px] border border-primary/10 bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(11,130,240,0.18)] transition-[transform,box-shadow,filter] before:pointer-events-none before:absolute before:top-0 before:-left-[65%] before:-z-10 before:h-full before:w-[45%] before:skew-x-[-20deg] before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] before:content-[''] before:[animation:auth-sheen_7s_1.5s_ease-in-out_infinite] hover:shadow-[0_14px_30px_rgba(11,130,240,0.28)] hover:brightness-105 motion-safe:hover:-translate-y-0.5 motion-safe:hover:[&_.auth-submitArrow]:translate-x-1 active:translate-y-0 disabled:cursor-wait disabled:opacity-80 max-[540px]:min-h-14 max-[540px]:text-sm",
  submitArrow: 'auth-submitArrow [transition:transform_.3s]',
  error: 'auth-error text-[#a13c59] text-[11px] leading-[1.7] mt-[-9px]',
  spinner: 'auth-spinner [animation:auth-spin_1s_linear_infinite]',
  belowCard:
    'auth-belowCard mt-6 flex justify-end [animation:auth-reveal_.8s_.22s_both] max-[960px]:justify-center',
  existingSession:
    'auth-existingSession flex w-[560px] max-w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2.5 text-xs text-[#0B2F6B] shadow-sm backdrop-blur-xl hover:text-primary',
  srOnly: [
    'auth-srOnly absolute w-[1px] h-[1px] pt-[0] pr-[0] pb-[0] pl-[0] overflow-hidden [clip-path:inset(50%)]',
    'whitespace-nowrap [border-width:0] [border-style:none]',
  ].join(' '),
  mascotScene:
    'auth-mascotScene pointer-events-none relative isolate mx-auto h-[600px] w-full max-w-[440px] [animation:auth-reveal_.85s_.16s_both] max-[1200px]:h-[560px] max-[960px]:h-[240px] max-[960px]:max-w-none max-[360px]:h-[212px] [&[data-private=true]_.auth-mascotPose]:rotate-[-6deg] [&[data-private=true]_.auth-buddyShield]:bg-[#FFF7EC] [&[data-private=true]_.auth-buddyShield]:text-[#ad875e]',
  mascotSpeech:
    "auth-mascotSpeech absolute top-0 left-1/2 z-30 w-[340px] max-w-full -translate-x-1/2 rounded-[22px_22px_6px_22px] border border-white/95 bg-white/95 px-6 py-[18px] shadow-[0_10px_35px_rgba(11,47,107,0.1)] backdrop-blur-xl max-[960px]:top-10 max-[960px]:left-0 max-[960px]:w-[calc(100%_-_196px)] max-[960px]:translate-x-0 max-[960px]:rounded-[17px_17px_6px_17px] max-[960px]:p-3.5 max-[360px]:w-[calc(100%_-_168px)] max-[360px]:p-3 after:absolute after:right-8 after:-bottom-1 after:size-2 after:rotate-45 after:bg-white after:content-[''] max-[960px]:after:top-5 max-[960px]:after:-right-1 max-[960px]:after:bottom-auto [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[11px] [&>span]:font-semibold [&>span]:text-[#A47F5E] [&_p]:mt-2 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-[#0B2F6B] [&_p]:[animation:auth-bubbleIn_.3s_ease-out_both] max-[960px]:[&_p]:text-xs max-[360px]:[&_p]:text-[11px]",
  buddyTag:
    'auth-buddyTag ml-auto text-[7px] font-medium tracking-wider text-[#55739B] max-[960px]:hidden',
  buddyDot:
    'auth-buddyDot w-[4px] h-[4px] rounded-[50%] [background:#efb987] [box-shadow:0_0_0_3px_#fff3e7]',
  mascotFloat:
    'auth-mascotFloat absolute bottom-6 left-1/2 aspect-[1122/1402] w-full max-w-[390px] -translate-x-1/2 max-[1200px]:max-w-[360px] max-[960px]:right-0 max-[960px]:bottom-0 max-[960px]:left-auto max-[960px]:w-[184px] max-[960px]:translate-x-0 max-[360px]:w-[160px]',
  mascotHello:
    'auth-mascotHello pointer-events-auto block size-full rounded-[35%] p-0 focus-visible:outline-offset-[-10px]! motion-safe:[@media(hover:hover)]:hover:[&_.auth-mascotPose]:rotate-[-4deg]',
  mascotPose: [
    'auth-mascotPose block [transform:translate(var(--buddy-x,_0px),_var(--buddy-y,_0px))]',
    '[@media_(prefers-reduced-motion:reduce)]:[transform:none] [transform-origin:50%_85%]',
    '[transition:transform_.4s_ease-out,_rotate_.5s] [animation:auth-buddyFloat_6s_ease-in-out_infinite]',
    '[@media_(prefers-reduced-motion:reduce)]:[rotate:0deg]',
  ].join(' '),
  mascotWave: [
    'auth-mascotWave block [transform:translate(var(--buddy-x,_0px),_var(--buddy-y,_0px))]',
    '[@media_(prefers-reduced-motion:reduce)]:[transform:none] [transform-origin:50%_85%]',
    '[transition:transform_.4s_ease-out,_rotate_.5s] [animation:auth-buddyWave_.85s_ease-in-out_both]',
    '[@media_(prefers-reduced-motion:reduce)]:[rotate:0deg]',
  ].join(' '),
  mascotImage:
    'auth-mascotImage h-auto w-full max-w-none object-contain drop-shadow-[0_18px_18px_rgba(11,47,107,0.2)]',
  buddyShield:
    'auth-buddyShield absolute top-[150px] right-0 z-20 grid size-12 rotate-6 place-items-center rounded-2xl border border-white/90 bg-white/95 text-[#0B82F0] shadow-[0_8px_24px_rgba(11,47,107,0.1)] [animation:auth-float_6s_-2s_ease-in-out_infinite] max-[960px]:top-4 max-[960px]:right-0 max-[960px]:size-9 max-[960px]:rounded-xl max-[960px]:[&>svg]:size-[18px]',
  mascotCaption:
    'auth-mascotCaption absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] text-[#55739B] backdrop-blur-md max-[960px]:hidden',
  greetingSparkles: [
    'auth-greetingSparkles absolute z-[4] inset-[0] overflow-visible pointer-events-none [&_span]:absolute',
    '[&_span]:text-[#e8b07d] [&_span]:text-[23px] [&_span]:opacity-[0]',
    '[&_span]:[animation:auth-greetingPop_.9s_ease-out_both] [&_span:nth-child(1)]:top-[80px]',
    '[@media_(width<=959px)]:[&_span:nth-child(1)]:top-[0] [&_span:nth-child(1)]:left-[24px]',
    '[@media_(width<=959px)]:[&_span:nth-child(1)]:left-[auto]',
    '[@media_(width<=959px)]:[&_span:nth-child(1)]:right-[85px] [&_span:nth-child(2)]:top-[160px]',
    '[@media_(width<=959px)]:[&_span:nth-child(2)]:top-[70px] [&_span:nth-child(2)]:right-[4px]',
    '[@media_(width<=959px)]:[&_span:nth-child(2)]:right-[0] [&_span:nth-child(2)]:text-[#0B82F0]',
    '[&_span:nth-child(2)]:[animation-delay:.08s] [&_span:nth-child(3)]:top-[240px]',
    '[@media_(width<=959px)]:[&_span:nth-child(3)]:top-[90px] [&_span:nth-child(3)]:left-[-2px]',
    '[@media_(width<=959px)]:[&_span:nth-child(3)]:left-[auto] [&_span:nth-child(3)]:text-[#55739B]',
    '[&_span:nth-child(3)]:[animation-delay:.15s] [@media_(width<=959px)]:[&_span:nth-child(3)]:right-[110px]',
    '[&_span:nth-child(4)]:top-[100px] [@media_(width<=959px)]:[&_span:nth-child(4)]:top-[25px]',
    '[&_span:nth-child(4)]:right-[30px] [@media_(width<=959px)]:[&_span:nth-child(4)]:right-[0]',
    '[&_span:nth-child(4)]:text-[16px] [&_span:nth-child(4)]:[animation-delay:.2s]',
  ].join(' '),
  background: 'auth-background pointer-events-none fixed inset-0 -z-10 overflow-hidden',
  backgroundImage:
    'auth-backgroundImage object-cover object-center max-[960px]:object-[42%_center]',
  backgroundOverlay:
    'auth-backgroundOverlay absolute inset-0 bg-[linear-gradient(110deg,rgba(230,243,255,0.25)_0%,rgba(239,247,255,0.38)_50%,rgba(230,241,252,0.5)_100%)] max-[960px]:bg-[linear-gradient(180deg,rgba(235,245,255,0.48),rgba(225,240,253,0.62))]',
  content:
    'auth-content grid grid-cols-[minmax(0,1fr)_minmax(0,560px)] items-center gap-20 max-[1200px]:grid-cols-[minmax(0,1fr)_minmax(0,500px)] max-[1200px]:gap-12 max-[960px]:mx-auto max-[960px]:max-w-[560px] max-[960px]:grid-cols-1 max-[960px]:gap-7',
  effects: 'auth-effects pointer-events-none fixed inset-0 z-0 overflow-hidden',
  pointerGlow:
    'auth-pointerGlow absolute inset-0 bg-[radial-gradient(440px_circle_at_var(--pointer-x,65%)_var(--pointer-y,40%),rgba(224,244,255,0.38),transparent_75%)] motion-reduce:opacity-0',
  lightBlue:
    'auth-lightBlue absolute -top-32 -right-32 size-[600px] rounded-full bg-[#74CFFF]/20 blur-[90px] [animation:auth-lightDrift_24s_ease-in-out_infinite_alternate] max-[540px]:size-[360px] motion-reduce:opacity-30',
  lightWarm:
    'auth-lightWarm absolute -bottom-40 -left-32 size-[560px] rounded-full bg-[#FFDEAF]/20 blur-[90px] [animation:auth-lightDrift_28s_-10s_ease-in-out_infinite_alternate-reverse] max-[540px]:size-[320px] motion-reduce:opacity-30',
  lightTrails:
    'auth-lightTrails absolute inset-0 h-full w-full opacity-70 max-[540px]:opacity-40 motion-reduce:opacity-20',
  flowLine: 'auth-flowLine opacity-80 [animation:auth-lightFlow_18s_linear_infinite]',
  particle:
    'auth-particle absolute size-[5px] rounded-full bg-white/90 shadow-[0_0_14px_3px_rgba(123,206,255,0.55)] [animation:auth-particleDrift_16s_ease-in-out_infinite] even:size-[3px] even:bg-[#7CCBFF]/80 max-[540px]:opacity-50 motion-reduce:hidden',
  glassTile:
    'auth-glassTile absolute grid size-14 place-items-center rounded-[18px] border border-white/70 bg-white/25 text-[#0B82F0]/70 shadow-[0_8px_30px_rgba(11,47,107,0.05),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md [animation:auth-tileFloat_12s_ease-in-out_infinite] max-[960px]:size-10 max-[960px]:rounded-[13px] max-[960px]:[&>svg]:size-5 motion-reduce:opacity-40',
  tileShield:
    'auth-tileShield top-[23%] left-[5%] rotate-[-12deg] max-[960px]:top-[14%] max-[960px]:left-[3%]',
  tileLock:
    'auth-tileLock top-[17%] right-[6%] rotate-12 [animation-delay:-4s] max-[960px]:top-[8%] max-[960px]:right-[4%]',
  tileSparkle:
    'auth-tileSparkle right-[12%] bottom-[12%] rotate-[-8deg] [animation-delay:-8s] max-[960px]:right-[4%] max-[960px]:bottom-[5%]',
  cardAccent:
    'auth-cardAccent pointer-events-none absolute -top-px right-12 left-12 z-20 h-[2px] rounded-full bg-[linear-gradient(90deg,transparent,#FFFFFF,#35A8FF,#FFFFFF,transparent)] shadow-[0_0_20px_3px_rgba(53,168,255,0.3)] [animation:auth-edgeGlow_5s_ease-in-out_infinite]',
};
export default styles;
