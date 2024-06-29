"use client";

import * as React from "react";
import { Toaster } from "sonner";

type ToastProviderProps = {
  children: React.ReactNode;
};

export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster richColors {...props} />
    </>
  );
}
