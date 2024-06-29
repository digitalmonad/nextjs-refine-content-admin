"use client";

import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

type ToastProviderProps = {
  children: React.ReactNode;
};

export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return <ToastProvider {...props}>{children}</ToastProvider>;
}
