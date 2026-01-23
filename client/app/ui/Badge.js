// 'use client';
import { cn } from "../lib/utils";



export function Badge({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-transparent bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
