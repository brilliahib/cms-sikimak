"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarUser } from "./SidenavUser";
import { Session } from "next-auth";
import Link from "next/link";
import { FilePen, LayoutDashboard, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";

interface SideNavProps extends React.ComponentProps<typeof Sidebar> {
  session: Session;
}

export function SideNav({ session, ...props }: SideNavProps) {
  const pathname = usePathname();

  const buttonClass = (href: string, exact = false) =>
    `hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
      exact
        ? pathname === href
          ? "bg-primary/10 text-primary dark:bg-slate-800"
          : ""
        : pathname.startsWith(href)
          ? "bg-primary/10 text-primary dark:bg-slate-800"
          : ""
    }`;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <span className="text-base font-semibold">SIKIMAK</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={buttonClass("/", true)}>
              <Link href={"/"}>
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={buttonClass("/applications")}>
              <Link href={"/applications"}>
                <FilePen />
                <span>Applications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild className={buttonClass("/settings")}>
              <Link href={"/settings"}>
                <Settings2 />
                <span>Setting</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
