import Link from "next/link";
import { FOOTER_SECTIONS, SITE_NAME, SITE_TAGLINE } from "@/lib/utils/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-1 font-bold text-lg mb-3">
              <span className="gradient-text">LLM</span>
              <span className="text-cyan-500">.AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{SITE_TAGLINE}</p>
            <p className="text-xs text-muted-foreground mt-2">
              The super app for AI exploration & automation.
            </p>
          </div>

          {/* Link Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>Built with Claude + Gemini</p>
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <a
            href="https://github.com/subkhanibnuaji/llmai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
