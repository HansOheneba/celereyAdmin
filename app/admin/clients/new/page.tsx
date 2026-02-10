"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewClientPage() {
  const router = useRouter();

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    status: "Active",
    riskProfile: "Balanced",
    subscriptionType: "Essentials",
    aua: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newClient = {
      id: `cl_${Date.now()}`,
      ...form,
      aua: Number(form.aua),
      lastContactedAt: new Date().toISOString(),
    };

    console.log("New client:", newClient);

    // TODO: replace with API call
    // await fetch("/api/clients", { method: "POST", body: JSON.stringify(newClient) })

    router.push("/admin/clients");
  }

  return (
    <div className=" space-y-8">
      {/* Header */}
      <div>
      <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">
          Add new client
        </h1>
      </div>
        <p className="mt-2 text-muted-foreground">
          Create a new client profile.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border p-6 bg-background max-w-2xl mx-auto"
      >
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First name</Label>
            <Input
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="Marie"
            />
          </div>

          <div className="space-y-2">
            <Label>Last name</Label>
            <Input
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Dubois"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="marie@example.com"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Paris"
            />
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Input
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              placeholder="France"
            />
          </div>
        </div>

        {/* Status + Risk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => update("status", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Prospect">Prospect</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Risk profile</Label>
            <Select
              value={form.riskProfile}
              onValueChange={(v) => update("riskProfile", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conservative">Conservative</SelectItem>
                <SelectItem value="Balanced">Balanced</SelectItem>
                <SelectItem value="Growth">Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Subscription + AUA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Subscription type</Label>
            <Select
              value={form.subscriptionType}
              onValueChange={(v) => update("subscriptionType", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Essentials">Essentials</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Concierge">Concierge</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Assets under advisory (AUA)</Label>
            <Input
              type="number"
              value={form.aua}
              onChange={(e) => update("aua", e.target.value)}
              placeholder="520000"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/clients")}
          >
            Cancel
          </Button>
          <Button type="submit">Create client</Button>
        </div>
      </form>
    </div>
  );
}
