"use client";

import * as React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

function getGreeting() {
  const hour = new Date().getHours();
 console.log(hour)
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

export default function AdminTopbar() {
  const [greeting, setGreeting] = React.useState("");

  React.useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b bg-background/80 backdrop-blur px-6 py-3">
      <SidebarTrigger />
      <div className="text-sm text-muted-foreground">{greeting} Admin</div>
    </div>
  );
}
