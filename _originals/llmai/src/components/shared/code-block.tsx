"use client";

import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  return (
    <div className="relative group rounded-lg border border-border bg-muted/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs text-muted-foreground font-mono">{filename}</span>
          )}
          <span className="text-xs text-muted-foreground uppercase">{language}</span>
        </div>
        <CopyButton text={code} />
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
