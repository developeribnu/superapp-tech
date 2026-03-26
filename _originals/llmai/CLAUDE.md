# LLM.AI — Claude Code Project Memory

## Architecture Decisions
- **SSG-first**: All pages are statically generated. No runtime DB calls for content.
- **Data in TypeScript files**: All LLM, benchmark, prompt data lives in `/src/lib/data/`.
- **URL state for compare**: Model selections in compare tool are in URL via nuqs.
- **Dark mode default**: Using next-themes with dark as default.
- **No Supabase in v1**: Pure static site. Supabase reserved for future user features.

## Conventions
- **Components**: PascalCase files, named exports
- **Data files**: camelCase files, named exports for arrays, helper functions
- **Types**: Separate files in `/src/lib/types/`, exported via index.ts barrel
- **Styling**: Tailwind utility classes, CSS variables for brand colors, `cn()` for conditional classes
- **Icons**: Lucide React only. Import individually: `import { Code } from "lucide-react"`

## Key Component Patterns
- **ModelCard**: Used in LLM Explorer grid and comparison selector
- **CopyButton**: Reusable copy-to-clipboard with toast feedback
- **PageHeader**: Consistent page title + subtitle + optional breadcrumb
- **CodeBlock**: Shiki-highlighted code with copy button and language label

## Data Accuracy
- All benchmark scores must be sourced and dated
- Pricing must include `dataLastUpdated` field
- When in doubt, omit rather than guess

## Responsive Breakpoints
- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1280px+
- All layouts must be tested at all three breakpoints
