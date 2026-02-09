"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Insights", href: "/admin/insights", icon: FileText },
  { label: "Billing", href: "/admin/billing", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className=" pt-2">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-md py-2"
        >
          <div className="h-9 w-9 rounded-xl bg-sidebar-accent grid place-items-center font-semibold">
            C
          </div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-semibold">Celerey Admin</div>
            <div className="text-xs text-muted-foreground">Control center</div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={item.label}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <SidebarSeparator className="my-2" />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Support">
              <Link href="/admin/support" className="flex items-center gap-2">
                <LifeBuoy />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              onClick={() => {
                // replace with your auth signOut()
                console.log("sign out");
              }}
            >
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
