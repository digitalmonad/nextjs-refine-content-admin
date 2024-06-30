"use client";

import type { PropsWithChildren } from "react";
import { SideBar } from "../navigation/side-bar";
import { TopBar } from "@components/navigation/top-bar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <SideBar />
        <div className="content space-y-4">
          <TopBar />
          <div className="px-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
