import { Breadcrumbs } from "../breadcrumbs";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { useLogout, useMenu } from "@refinedev/core";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";
import {
  Home,
  HomeIcon,
  LogOutIcon,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
} from "lucide-react";
import { pathIconsMap } from "./path-icons";
import { cn } from "@lib/utils";
import Image from "next/image";

export const TopBar = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetTitle></SheetTitle>
          <nav className="grid gap-6 text-lg font-medium">
            {menuItems.map((item) => {
              const Icon = item.route ? pathIconsMap[item.route] : HomeIcon;

              return (
                <Link
                  href={item.route ?? "/"}
                  key={item.key}
                  className={cn(
                    "flex items-center gap-4 px-2.5 text-foreground",
                    item.key === selectedKey ? "underline" : ""
                  )}
                >
                  <Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              key={"logout"}
              href={"#"}
              className="flex items-center gap-4 px-2.5 text-foreground"
              onClick={() => logout()}
            >
              <LogOutIcon className="h-5 w-5 transition-all group-hover:scale-110" />
              Logout
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumbs />
      <div className="flex justify-end flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
