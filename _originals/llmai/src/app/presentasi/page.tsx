import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, FileText, Presentation, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { SITE_URL } from "@/lib/utils/constants";

const PPT_FILE_PATH = "/presentations/agentic-ai-explained.pptx";
const PPT_FILE_NAME = "Agentic AI Explained.pptx";
const PPT_FILE_SIZE = "7.2 MB";
const SLIDE_COUNT = 18;

export const metadata: Metadata = {
  title: "Presentasi: Agentic AI Explained",
  description:
    "Halaman khusus untuk menampilkan presentasi Agentic AI Explained lengkap dengan preview slide dan link download file PPT.",
};

export default function PresentasiPage() {
  const publicPptUrl = `${SITE_URL}${PPT_FILE_PATH}`;
  const officeEmbedUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    publicPptUrl
  )}`;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.16),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.14),transparent_45%)]" />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Badge className="border-cyan-500/30 bg-cyan-500/10 text-cyan-500">Deck Showcase</Badge>
          <Badge variant="outline">{SLIDE_COUNT} Slides</Badge>
          <Badge variant="outline">{PPT_FILE_SIZE}</Badge>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Agentic AI Explained</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Halaman khusus untuk menampilkan presentasi secara langsung di web, dengan akses unduh
              penuh ke file PowerPoint aslinya.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a href={PPT_FILE_PATH} download={PPT_FILE_NAME}>
              <Button className="gap-1.5">
                <Download className="h-4 w-4" />
                Download PPT
              </Button>
            </a>
            <a href={PPT_FILE_PATH} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-1.5">
                <ExternalLink className="h-4 w-4" />
                Buka File Asli
              </Button>
            </a>
            <CopyButton text={publicPptUrl} label="Copy Link" variant="outline" size="default" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-2 sm:p-3">
          <div className="mb-2 flex items-center justify-between px-3 py-2 text-xs text-muted-foreground sm:text-sm">
            <span className="flex items-center gap-1.5">
              <Presentation className="h-4 w-4" />
              Office Web Viewer
            </span>
            <a
              href={officeEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Fullscreen <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border bg-black/20">
            <iframe
              title="Agentic AI Explained Presentation"
              src={officeEmbedUrl}
              className="h-[70vh] w-full min-h-[560px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-card/70 p-4">
            <p className="mb-1 text-sm text-muted-foreground">Judul</p>
            <p className="font-medium">Agentic AI Explained</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/70 p-4">
            <p className="mb-1 text-sm text-muted-foreground">Jumlah Slide</p>
            <p className="font-medium">{SLIDE_COUNT} slide</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/70 p-4">
            <p className="mb-1 text-sm text-muted-foreground">Ukuran File</p>
            <p className="font-medium">{PPT_FILE_SIZE}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-200">
          <p className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            Jika viewer diblokir jaringan, presentasi tetap bisa diakses lewat tombol
            <span className="font-semibold"> Download PPT</span> atau
            <span className="font-semibold"> Buka File Asli</span>.
          </p>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground">
            <FileText className="h-4 w-4" />
            Kembali ke Home
          </Link>
        </div>
      </section>
    </div>
  );
}
