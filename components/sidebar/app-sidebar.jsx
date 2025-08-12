"use client";

import * as React from "react";
import { LucideVegan, LucideUser,LucideLayoutDashboard, LucideImage, LucideListChecks, Sprout, Package, Landmark, BookOpen } from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LucideLayoutDashboard,
    },
    {
      title: "User Master",
      url: "/admin/users-list",
      icon: LucideUser,
    },
    {
      title: "Crop Master",
      url: "/admin/crops-list",
      icon: Sprout,
    },
    {
      title: "Product Master",
      url: "/admin/products-list",
      icon: Package,
    },
    {
      title: "Crops Sale Requests",
      url: "/admin/sale-requests",
      icon: LucideListChecks,
    },
    {
      title: "Govt Schemes Master",
      url: "/admin/list-schemes",
      icon: Landmark,
    },
    {
      title: "Media Master",
      url: "/admin/media-master",
      icon: LucideImage,
    },
    {
      title: "Tutorials Master",
      url: "/admin/tutorials-list",
      icon: BookOpen,
    }
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin/dashboard">
                <LucideVegan color="green" className="!size-5" />
                <span className="text-base font-semibold text-green-700">AgriTech</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
