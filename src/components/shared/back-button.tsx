"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href, label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 mb-4 -ml-2"
      onClick={() => (href ? router.push(href) : router.back())}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
