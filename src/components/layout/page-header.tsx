import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: Array<{ label: string; href: string }>;
}

export function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumb && (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          {breadcrumb.map((item) => (
            <span key={item.href} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{description}</p>
      )}
    </div>
  );
}
