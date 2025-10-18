"use client";
import * as React from "react";
import { cn } from "../lib/utils";

export function TextArea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/50 aria-invalid:ring-red-300 aria-invalid:border-red-400 dark:bg-gray-800 flex min-h-[4rem] w-full rounded-md border-gray-300 bg-white px-3 py-2 text-base transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}
