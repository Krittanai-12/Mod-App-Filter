import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const badgeVariants = cva('', {
  variants: {
    variant: {
      default:
        'inline-flex items-center rounded-md border border-transparent bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground',
      secondary:
        'inline-flex items-center rounded-md border border-transparent bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground',
      outline: 'inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-medium',
      destructive:
        'inline-flex items-center rounded-md bg-destructive px-2 py-0.5 text-xs font-medium text-white',
      unstyled: '',
    },
  },
  defaultVariants: { variant: 'default' },
});
export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { badgeVariants };
