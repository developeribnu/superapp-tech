"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-4">
        An unexpected error occurred. Please try again.
      </p>
      {error.message && (
        <p className="text-sm text-muted-foreground mb-6 font-mono">
          {error.message}
        </p>
      )}
      <div className="flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <a href="/">
          <Button variant="outline">Back to Home</Button>
        </a>
      </div>
    </div>
  );
}
