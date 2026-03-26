"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/lib/hooks/use-copy";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "ghost" | "outline" | "secondary";
  size?: "sm" | "icon" | "default";
}

export function CopyButton({ text, label, variant = "ghost", size = "icon" }: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(text)}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className="gap-1.5"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      {label && <span className="text-xs">{copied ? "Copied!" : label}</span>}
    </Button>
  );
}
