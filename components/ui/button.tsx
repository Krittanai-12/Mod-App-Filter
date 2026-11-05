import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ui } from '@/lib/ui-styles';

export const buttonVariants = cva('', {
  variants: {
    variant: {
      default: ui('ui-button btn-primary'),
      primary: ui('ui-button btn-primary'),
      outline: ui('ui-button btn-outline'),
      ghost: ui('ui-button btn-ghost'),
      secondary: cn(ui('ui-button'), 'border-border bg-secondary text-secondary-foreground hover:bg-accent'),
      destructive: cn(ui('ui-button'), 'bg-destructive text-white hover:bg-[#BE123C]'),
      link: 'text-primary underline-offset-4 hover:underline',
      unstyled: '',
    },
    size: {
      default: '',
      sm: ui('btn-sm'),
      icon: ui('btn-icon'),
      lg: 'min-h-[54px] rounded-[15px] px-5 text-sm',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
