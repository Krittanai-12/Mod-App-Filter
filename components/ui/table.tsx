import * as React from 'react';
import { cn } from '@/lib/utils';
export function Table({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'table'> & { unstyled?: boolean }) {
  return (
    <table
      data-slot="table"
      className={cn(!unstyled && 'w-full border-collapse caption-bottom text-sm text-foreground', className)}
      {...props}
    />
  );
}
export function TableHeader({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'thead'> & { unstyled?: boolean }) {
  return (
    <thead
      data-slot="table-header"
      className={cn(!unstyled && 'bg-secondary [&_tr]:border-b [&_tr]:border-border', className)}
      {...props}
    />
  );
}
export function TableBody({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'tbody'> & { unstyled?: boolean }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(!unstyled && '[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}
export function TableFooter({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'tfoot'> & { unstyled?: boolean }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(!unstyled && 'border-t bg-muted/50 font-medium', className)}
      {...props}
    />
  );
}
export function TableRow({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'tr'> & { unstyled?: boolean }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        !unstyled &&
          'border-b border-border transition-colors hover:bg-secondary data-[state=selected]:bg-accent',
        className,
      )}
      {...props}
    />
  );
}
export function TableHead({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'th'> & { unstyled?: boolean }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        !unstyled && 'h-11 px-4 py-3 text-left align-middle text-xs font-bold text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
export function TableCell({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'td'> & { unstyled?: boolean }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        !unstyled && 'border-b border-border px-4 py-4 align-middle text-sm text-foreground',
        className,
      )}
      {...props}
    />
  );
}
export function TableCaption({
  className,
  unstyled = false,
  ...props
}: React.ComponentProps<'caption'> & { unstyled?: boolean }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(!unstyled && 'mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
