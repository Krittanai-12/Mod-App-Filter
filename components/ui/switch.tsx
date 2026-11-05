'use client';
import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import { ui } from '@/lib/ui-styles';
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root data-slot="switch" className={cn(ui('ui-switch'), className)} {...props} ref={ref}>
    <SwitchPrimitive.Thumb data-slot="switch-thumb" className={ui('switch-thumb')} />
  </SwitchPrimitive.Root>
));
Switch.displayName = 'Switch';
