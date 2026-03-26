"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Github, ChevronDown, Cpu, GitCompare, BarChart3, GitBranch, Wrench, Workflow, MessageSquare, BookOpen, Presentation, Bot } from "lucide-react";
import { NAV_GROUPS, NAV_STANDALONE } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useState, useRef } from "react";

const iconMap: Record<string, React.ElementType> = {
  Cpu, GitCompare, BarChart3, GitBranch, Wrench, Workflow, MessageSquare, BookOpen, Presentation, Bot,
};

function NavDropdown({ group, pathname }: { group: typeof NAV_GROUPS[0]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const isGroupActive = group.children.some((c) => pathname.startsWith(c.href));

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isGroupActive
            ? "text-primary bg-accent"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
        onClick={() => setOpen(!open)}
      >
        {group.label}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 p-2 rounded-xl border border-border bg-popover/95 backdrop-blur-xl shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 duration-150">
          {group.children.map((child) => {
            const Icon = iconMap[child.icon] || Cpu;
            const isActive = pathname.startsWith(child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors group/item",
                  isActive
                    ? "bg-accent text-primary"
                    : "hover:bg-accent/60"
                )}
              >
                <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/15 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">{child.label}</div>
                  <div className="text-xs text-muted-foreground">{child.description}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 font-bold text-lg">
          <span className="gradient-text">LLM</span>
          <span className="text-cyan-500">.AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_GROUPS.map((group) => (
            <NavDropdown key={group.label} group={group} pathname={pathname} />
          ))}
          {NAV_STANDALONE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname.startsWith(item.href)
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/subkhanibnuaji/llmai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
          >
            <Button variant="outline" size="sm" className="gap-1.5">
              <Github className="h-4 w-4" />
              Star
            </Button>
          </a>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label}>
                    <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 px-3">
                      {group.label}
                    </div>
                    <div className="space-y-0.5">
                      {group.children.map((child) => {
                        const Icon = iconMap[child.icon] || Cpu;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                              pathname.startsWith(child.href)
                                ? "text-primary bg-accent"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div>
                  <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 px-3">
                    More
                  </div>
                  {NAV_STANDALONE.map((item) => {
                    const Icon = iconMap[item.icon] || Cpu;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                          pathname.startsWith(item.href)
                            ? "text-primary bg-accent"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="border-t pt-4">
                  <a
                    href="https://github.com/subkhanibnuaji/llmai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-1.5 w-full">
                      <Github className="h-4 w-4" />
                      Star on GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
