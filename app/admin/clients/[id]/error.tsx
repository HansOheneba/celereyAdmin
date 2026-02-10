"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Something went wrong!</CardTitle>
          </div>
          <CardDescription>
            We couldn&apos;t load the client details. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Error: {error.message}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/admin/clients">Back to Clients</a>
          </Button>
          <Button onClick={() => reset()}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
