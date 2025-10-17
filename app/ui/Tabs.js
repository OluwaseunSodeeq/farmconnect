'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../lib/utils';


export function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-gray-100 text-gray-600 inline-flex h-9 items-center justify-start rounded-xl p-1',
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'flex-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('mt-2 outline-none', className)}
      {...props}
    />
  );
}
