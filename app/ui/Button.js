'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';


const buttonVariants = ({ variant, size }) => {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2';

  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    ghost: 'text-gray-700 hover:bg-gray-100',
    link: 'text-emerald-600 underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-10 px-6 text-base',
    icon: 'h-9 w-9 p-0',
  };

  return cn(base, variants[variant] || variants.default, sizes[size] || sizes.default);
};

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
