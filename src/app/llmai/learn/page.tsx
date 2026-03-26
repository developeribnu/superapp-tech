"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { articles } from "@/lib/data/articles";
import { articleCategories } from "@/lib/data/categories";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  BookOpen,
  ArrowRight,
  Search,
  Grid3X3,
  List,
  Filter,
  Sparkles,
  Library,
  FileText,
  Star,
} from "lucide-react";
import type { ArticleCategory, ContentSource } from "@/lib/types/article";

const levelColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

const sourceColors: Record<string, string> = {
  original: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  curated: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

const sourceLabels: Record<string, string> = {
  original: "Original",
  curated: "Curated",
};

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "readingTime" | "title";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | "all">("all");
  const [selectedSource, setSelectedSource] = useState<ContentSource | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate stats
  const stats = useMemo(() => {
    const total = articles.length;
    const curated = articles.filter((a) => a.contentSource === "curated").length;
    const original = articles.filter((a) => a.contentSource === "original").length;
    const withDetails = articles.filter((a) => a.contentSource === "curated").length;
    return { total, curated, original, withDetails };
  }, []);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((article) => article.category === selectedCategory);
    }

    // Source filter
    if (selectedSource !== "all") {
      result = result.filter((article) => article.contentSource === selectedSource);
    }

    // Level filter
    if (selectedLevel !== "all") {
      result = result.filter((article) => article.level === selectedLevel);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case "oldest":
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        case "readingTime":
          return a.readingTime - b.readingTime;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, selectedSource, selectedLevel, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get featured article (most recent curated)
  const featuredArticle = useMemo(() => {
    return articles
      .filter((a) => a.contentSource === "curated")
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())[0];
  }, []);

  const categories = Object.entries(articleCategories) as [
    ArticleCategory,
    { label: string; icon: string },
  ][];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Library className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Library Knowledge Base</h1>
            <p className="text-muted-foreground">
              Curated collection of LLM guides, articles, and resources
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4 pb-6 border-b">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium text-foreground">{stats.total}</span> Articles
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="font-medium text-foreground">{stats.curated}</span> Curated
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-foreground">{stats.original}</span> Original
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium text-foreground">{stats.withDetails}</span> with Full Details
          </div>
        </div>
      </div>

      {/* Featured Article Card */}
      {featuredArticle && !searchQuery && selectedCategory === "all" && selectedSource === "all" && currentPage === 1 && (
        <Link
          href={`/learn/${featuredArticle.id}`}
          className="block mb-8 group"
        >
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-primary/2 to-background p-6 hover:border-primary/50 transition-all">
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                Latest Curated
              </Badge>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={sourceColors[featuredArticle.contentSource || "original"]}>
                    {sourceLabels[featuredArticle.contentSource || "original"]}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`capitalize ${levelColors[featuredArticle.level] || ""}`}
                  >
                    {featuredArticle.level}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground mb-4">{featuredArticle.subtitle}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {featuredArticle.readingTime} min read
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Source Filter */}
          <Select
            value={selectedSource}
            onValueChange={(value) => {
              setSelectedSource(value as ContentSource | "all");
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="curated">🎯 Curated</SelectItem>
              <SelectItem value="original">📝 Original</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value as ArticleCategory | "all");
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <BookOpen className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(([id, info]) => (
                <SelectItem key={id} value={id}>
                  {info.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Level Filter */}
          <Select
            value={selectedLevel}
            onValueChange={(value) => {
              setSelectedLevel(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="readingTime">Reading Time</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>
          Showing {paginatedArticles.length} of {filteredArticles.length} articles
        </span>
        {totalPages > 1 && (
          <span>
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Articles Grid/List */}
      {paginatedArticles.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {paginatedArticles.map((article) => (
            <Link
              key={article.id}
              href={`/learn/${article.id}`}
              className={`group relative overflow-hidden rounded-xl border bg-card hover:border-primary/50 transition-all ${
                viewMode === "list" ? "flex items-start gap-4 p-4" : "flex flex-col"
              }`}
            >
              {/* Source Badge - Top Right */}
              <div className={`absolute top-3 right-3 z-10 ${viewMode === "list" ? "static mb-2 ml-auto order-last" : ""}`}>
                <Badge
                  variant="outline"
                  className={`text-xs ${sourceColors[article.contentSource || "original"]} ${
                    article.contentSource === "curated" ? "font-medium" : ""
                  }`}
                >
                  {article.contentSource === "curated" && (
                    <Sparkles className="h-3 w-3 mr-1" />
                  )}
                  {sourceLabels[article.contentSource || "original"]}
                </Badge>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${viewMode === "list" ? "hidden" : ""}`} />

              <div className={`${viewMode === "list" ? "flex-1" : "p-5"}`}>
                {/* Category & Level */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {articleCategories[article.category]?.label || article.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize ${levelColors[article.level] || ""}`}
                  >
                    {article.level}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className={`font-semibold group-hover:text-primary transition-colors ${
                  viewMode === "list" ? "text-base mb-1" : "text-sm mb-2"
                }`}>
                  {article.title}
                </h3>

                {/* Subtitle */}
                {article.subtitle && viewMode === "grid" && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {article.subtitle}
                  </p>
                )}

                {/* Excerpt */}
                <p className={`text-muted-foreground ${viewMode === "list" ? "text-sm line-clamp-2" : "text-sm line-clamp-2 mb-3"}`}>
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className={`flex items-center gap-3 ${viewMode === "list" ? "mt-2" : ""}`}>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {article.readingTime} min
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(article.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {article.contentSource === "curated" && (
                    <span className="text-xs text-purple-500 font-medium flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Detailed
                    </span>
                  )}
                </div>

                {/* Read More - Only on Grid */}
                {viewMode === "grid" && (
                  <div className="flex items-center gap-1 mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
