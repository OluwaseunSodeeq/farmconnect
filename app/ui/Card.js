import * as React from 'react';
import { cn } from '../lib/utils';
// import { cn } from '../lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn('bg-white text-gray-900 flex flex-col gap-6 rounded-xl border shadow-sm', className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 px-6 pt-6 border-b border-gray-100', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn('ml-auto self-start justify-self-end', className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6 py-4', className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 pb-6 pt-4 border-t border-gray-100', className)}
      {...props}
    />
  );
}
