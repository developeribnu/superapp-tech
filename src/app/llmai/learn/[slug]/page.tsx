import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticleById } from "@/lib/data/articles";
import { articleCategories } from "@/lib/data/categories";
import { BackButton } from "@/components/shared/back-button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleById(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleById(slug);
  if (!article) notFound();

  const catInfo = articleCategories[article.category];

  const relatedArticles = article.relatedArticles
    ?.map((id) => getArticleById(id))
    .filter(Boolean) || [];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <BackButton href="/learn" label="Back to Learning Center" />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {catInfo?.label || article.category}
          </Badge>
          <Badge variant="outline" className="text-xs capitalize">
            {article.level}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        {article.subtitle && (
          <p className="text-lg text-muted-foreground mt-1">{article.subtitle}</p>
        )}
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {article.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {article.publishedDate}
          </span>
          {article.author && <span>by {article.author}</span>}
        </div>
      </header>

      {/* Key Takeaways */}
      {article.keyTakeaways.length > 0 && (
        <div className="glass-card p-5 rounded-xl mb-8">
          <h2 className="font-semibold mb-3">Key Takeaways</h2>
          <ul className="space-y-2">
            {article.keyTakeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-2 text-sm">
                <span className="text-primary font-bold">→</span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <article className="prose prose-sm dark:prose-invert max-w-none mb-8">
        {(() => {
          const lines = article.content.split("\n");
          const elements: React.ReactNode[] = [];
          let i = 0;

          // Inline formatting helper
          const fmt = (text: string) => {
            const parts: React.ReactNode[] = [];
            // Match **bold**, *italic*, `code`
            const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
            let lastIndex = 0;
            let match;
            let partKey = 0;
            while ((match = regex.exec(text)) !== null) {
              if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
              }
              if (match[2]) {
                parts.push(<strong key={partKey++}>{match[2]}</strong>);
              } else if (match[3]) {
                parts.push(<em key={partKey++}>{match[3]}</em>);
              } else if (match[4]) {
                parts.push(<code key={partKey++} className="bg-muted px-1.5 py-0.5 rounded text-xs">{match[4]}</code>);
              }
              lastIndex = match.index + match[0].length;
            }
            if (lastIndex < text.length) {
              parts.push(text.slice(lastIndex));
            }
            return parts.length > 0 ? parts : text;
          };

          while (i < lines.length) {
            const line = lines[i];

            // Tables: consecutive lines starting with |
            if (line.trim().startsWith("|")) {
              const tableLines: string[] = [];
              while (i < lines.length && lines[i].trim().startsWith("|")) {
                tableLines.push(lines[i]);
                i++;
              }
              // Parse table
              const rows = tableLines
                .filter((l) => !/^\|\s*[-:]+/.test(l.trim()))
                .map((l) =>
                  l.split("|").slice(1, -1).map((c) => c.trim())
                );
              if (rows.length > 0) {
                const header = rows[0];
                const body = rows.slice(1);
                elements.push(
                  <div key={`tbl-${i}`} className="overflow-x-auto my-4 rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          {header.map((cell, ci) => (
                            <th key={ci} className="px-3 py-2 text-left font-semibold border-b border-border whitespace-nowrap">
                              {fmt(cell)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {body.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/20"}>
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-3 py-2 border-b border-border/50">
                                {fmt(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              continue;
            }

            // Horizontal rule
            if (/^---+$/.test(line.trim())) {
              elements.push(<hr key={i} className="my-6 border-border" />);
              i++;
              continue;
            }

            // Headings
            if (line.startsWith("### ")) {
              elements.push(<h3 key={i}>{fmt(line.slice(4))}</h3>);
              i++;
              continue;
            }
            if (line.startsWith("## ")) {
              elements.push(<h2 key={i}>{fmt(line.slice(3))}</h2>);
              i++;
              continue;
            }
            if (line.startsWith("# ")) {
              elements.push(<h2 key={i}>{fmt(line.slice(2))}</h2>);
              i++;
              continue;
            }

            // Numbered lists
            if (/^\d+\.\s/.test(line)) {
              elements.push(
                <li key={i} className="ml-6 list-decimal">
                  {fmt(line.replace(/^\d+\.\s/, ""))}
                </li>
              );
              i++;
              continue;
            }

            // Unordered lists
            if (line.startsWith("- ")) {
              elements.push(
                <li key={i} className="ml-4">
                  {fmt(line.slice(2))}
                </li>
              );
              i++;
              continue;
            }

            // Code fence
            if (line.startsWith("```")) {
              i++;
              continue;
            }

            // Empty line
            if (line.trim() === "") {
              elements.push(<br key={i} />);
              i++;
              continue;
            }

            // Regular paragraph
            elements.push(<p key={i}>{fmt(line)}</p>);
            i++;
          }
          return elements;
        })()}
      </article>

      {article.embeddedResourcePath && (
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="font-semibold text-lg">Embedded Resource</h2>
            <div className="flex items-center gap-4">
              {article.sourcePdfPath && (
                <a
                  href={article.sourcePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Open PDF
                </a>
              )}
              <a
                href={article.embeddedResourcePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Open in new tab
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <iframe
              title={`${article.title} Resource`}
              src={article.embeddedResourcePath}
              className="h-[80vh] min-h-[640px] w-full"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-border pt-8">
          <h2 className="font-semibold text-lg mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedArticles.map((related) =>
              related ? (
                <Link
                  key={related.id}
                  href={`/learn/${related.id}`}
                  className="glass-card p-4 rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {related.excerpt}
                  </p>
                  <span className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
