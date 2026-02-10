"use client";

import Link from "next/link";
import Image from "next/image";
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
Mic,
Glasses,
  LifeBuoy,
  LogOut,
} from "lucide-react";


const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Insights", href: "/admin/insights", icon: FileText },
  { label: "Stories", href: "/admin/stories", icon: Glasses },
  { label: "Podcasts", href: "/admin/podcasts", icon: Mic },
  // { label: "Billing", href: "/admin/billing", icon: CreditCard },
  // { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className=" pt-2">
        <Link href="/admin" className="flex items-center gap-3 rounded-md py-2">
          <div className="flex justify-center w-full">
            <Image
              src="https://i.ibb.co/PGVKSsV1/image.png"
              alt="Celerey Logo"
              width={100}
              height={50}
              className="rounded-xl"
            />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={item.label}
                  className="data-[active=true]:bg-[#1B1856] data-[active=true]:text-white hover:data-[active=true]:bg-[#1B1856]"
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
