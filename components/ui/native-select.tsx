import * as React from 'react';
import { cn } from '@/lib/utils';
/** The native-select shadcn primitive preserves platform keyboard and form behavior. */
export function NativeSelect({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'select'> & { unstyled?: boolean }) {
  return (
    <select
      data-slot="native-select"
      className={cn(
        !unstyled &&
          'h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
export function NativeSelectOption(props: React.ComponentProps<'option'>) {
  return <option data-slot="native-select-option" {...props} />;
}
