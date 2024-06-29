"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@components/ui/tooltip";
import { cn } from "@lib/utils";
import { useLogout, useMenu } from "@refinedev/core";
import Link from "next/link";
import { HomeIcon, Layers3Icon, LogOutIcon } from "lucide-react";
import { ThemeToggle } from "@components/theme/theme-toggle";
import { Button } from "@components/ui/button";
import { pathIconsMap } from "./path-icons";

export const SideBar = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex justify-between">
      <nav className="flex flex-1 flex-col items-center gap-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.route ? pathIconsMap[item.route] : HomeIcon;

          return (
            <Tooltip key={item.key}>
              <TooltipTrigger asChild>
                <Link href={item.route ?? "/"}>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className={cn(
                      selectedKey === item.key ? "bg-accent/50" : ""
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{item.label}</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
      <div className="flex flex-col items-center gap-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <ThemeToggle />
          </TooltipTrigger>
          <TooltipContent side="right">Dark/Light mode</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={"#"}>
              <Button variant={"outline"} size={"icon"}>
                <LogOutIcon className="h-4 w-4" onClick={() => logout()} />
                <span className="sr-only">Logout</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};
