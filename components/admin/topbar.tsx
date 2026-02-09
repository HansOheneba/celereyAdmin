"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminTopbar() {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/80 backdrop-blur px-6 py-3">
      <SidebarTrigger />
      <div className="text-sm text-muted-foreground">Welcome back</div>
    </div>
  );
}
