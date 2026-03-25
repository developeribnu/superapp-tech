"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Database,
  Globe,
  Code,
  Zap,
  Search,
  BarChart3,
} from "lucide-react";

const apiCategories = [
  {
    category: "Weather & Climate",
    apis: [
      "OpenWeatherMap",
      "WeatherAPI",
      "NOAA",
      "Dark Sky",
      "Visual Crossing",
    ],
  },
  {
    category: "Finance & Stocks",
    apis: ["Alpha Vantage", "IEX Cloud", "Finnhub", "Polygon.io", "CoinGecko"],
  },
  {
    category: "News & Media",
    apis: [
      "NewsAPI",
      "Guardian API",
      "NY Times API",
      "YouTube Data API",
      "Giphy",
    ],
  },
  {
    category: "E-commerce",
    apis: [
      "Shopify API",
      "Amazon PA API",
      "eBay API",
      "WooCommerce API",
      "Stripe",
    ],
  },
  {
    category: "Social Media",
    apis: [
      "Twitter API",
      "Instagram Graph API",
      "Facebook API",
      "TikTok API",
      "LinkedIn API",
    ],
  },
  {
    category: "Geolocation & Maps",
    apis: [
      "Google Maps API",
      "Mapbox",
      "OpenStreetMap",
      "IP Geolocation",
      "HERE Maps",
    ],
  },
  {
    category: "Job Listings",
    apis: [
      "LinkedIn Jobs API",
      "Indeed API",
      "Glassdoor API",
      "RemoteOK API",
      "JustJoinIT",
    ],
  },
  {
    category: "Cryptocurrency",
    apis: [
      "CoinMarketCap",
      "CoinGecko",
      "Binance API",
      "Kraken API",
      "Crypto APIs",
    ],
  },
  {
    category: "Real Estate",
    apis: [
      "Zillow API",
      "Redfin API",
      "Realtor.com API",
      "OpenHouse API",
      "Property Listings",
    ],
  },
  {
    category: "Transportation",
    apis: [
      "Google Distance Matrix",
      "Uber API",
      "Lyft API",
      "Transit APIs",
      "Flight APIs",
    ],
  },
];

const scrapingTools = [
  {
    name: "Beautiful Soup",
    language: "Python",
    description: "HTML/XML parsing library for web scraping",
    best: "Static pages, HTML parsing",
    difficulty: "Beginner",
  },
  {
    name: "Scrapy",
    language: "Python",
    description: "Full-featured web scraping framework",
    best: "Large-scale crawling, production",
    difficulty: "Intermediate",
  },
  {
    name: "Selenium",
    language: "Multiple",
    description: "Browser automation for JavaScript rendering",
    best: "Single Page Apps, dynamic content",
    difficulty: "Intermediate",
  },
  {
    name: "Puppeteer",
    language: "JavaScript",
    description: "Headless browser automation",
    best: "JS rendering, screenshots, PDFs",
    difficulty: "Intermediate",
  },
  {
    name: "Playwright",
    language: "JavaScript/Python",
    description: "Cross-browser automation library",
    best: "Modern web apps, cross-browser testing",
    difficulty: "Intermediate",
  },
  {
    name: "Cheerio",
    language: "JavaScript",
    description: "jQuery-like syntax for Node.js",
    best: "Fast HTML parsing, Node.js",
    difficulty: "Beginner",
  },
  {
    name: "Jsoup",
    language: "Java",
    description: "Java HTML parser and scraper",
    best: "Java-based projects, parsing",
    difficulty: "Beginner",
  },
  {
    name: "Colly",
    language: "Go",
    description: "Fast and elegant scraping library",
    best: "High-performance scraping",
    difficulty: "Intermediate",
  },
];

const dataExtraction = [
  {
    name: "PDF Text Extraction",
    tools: ["PyPDF2", "pdfplumber", "pdf2image"],
    use: "Extract text, tables, images from PDFs",
  },
  {
    name: "Image OCR",
    tools: ["Tesseract", "EasyOCR", "Paddle OCR"],
    use: "Convert images to text",
  },
  {
    name: "Table Extraction",
    tools: ["Tabula", "pdfrw", "camelot"],
    use: "Extract tables from documents",
  },
  {
    name: "JSON/XML Parsing",
    tools: ["jq", "xmltodict", "lxml"],
    use: "Parse structured data formats",
  },
  {
    name: "Data Cleaning",
    tools: ["Pandas", "Data-Forge", "OpenRefine"],
    use: "Clean and transform scraped data",
  },
  {
    name: "Entity Recognition",
    tools: ["spaCy", "NLTK", "Flair"],
    use: "Extract names, dates, locations",
  },
];

const bestPractices = [
  {
    title: "Respect robots.txt",
    description: "Check and follow robots.txt rules for each domain",
  },
  {
    title: "Rate Limiting",
    description: "Add delays between requests to avoid overwhelming servers",
  },
  {
    title: "Use User-Agent",
    description: "Set proper User-Agent headers to identify your scraper",
  },
  {
    title: "Handle Errors",
    description: "Implement proper error handling and retries",
  },
  {
    title: "Respect Terms of Service",
    description: "Only scrape sites that allow it in their ToS",
  },
  {
    title: "Cache Results",
    description: "Store scraped data locally to avoid repeated requests",
  },
  {
    title: "Rotate IP Addresses",
    description: "Use proxies to avoid IP bans for large scraping jobs",
  },
  {
    title: "Monitor for Changes",
    description: "Update selectors when site structure changes",
  },
];

export default function ScrapingPage() {
  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <Link
          href="/"
          className="rounded-lg border border-gray-800 bg-gray-900 p-2 transition-all hover:border-gray-700"
        >
          <ArrowLeft size={20} className="text-gray-400" />
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-white">Data Scraping Hub</h1>
          <p className="text-gray-400">APIs, web scraping, data extraction tools</p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* API Directory */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Globe size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              API Directory (100+ APIs)
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {apiCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <h3 className="mb-4 font-bold text-cyan-400">{cat.category}</h3>
                <div className="space-y-2">
                  {cat.apis.map((api) => (
                    <div
                      key={api}
                      className="flex items-center gap-2 rounded-lg bg-gray-800/30 p-2"
                    >
                      <Zap size={14} className="text-yellow-400" />
                      <span className="text-sm text-gray-300">{api}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Scraping Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Code size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Web Scraping Tools</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {scrapingTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card"
              >
                <div className="mb-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-white">{tool.name}</h3>
                    <span className="text-xs rounded-full bg-gray-800 px-2 py-1 text-blue-400">
                      {tool.language}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty:</span>
                    <span
                      className={
                        tool.difficulty === "Beginner"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {tool.difficulty}
                    </span>
                  </div>
                  <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                    <p className="text-xs text-gray-400">
                      <span className="text-cyan-400 font-semibold">Best For:</span> {tool.best}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Data Extraction Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 size={24} className="text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Data Extraction Tools</h2>
          </div>

          <div className="space-y-4">
            {dataExtraction.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.08 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{tool.name}</h3>
                <p className="mb-3 text-sm text-gray-400">{tool.use}</p>

                <div className="flex flex-wrap gap-2">
                  {tool.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gray-800/50 px-3 py-1 text-xs text-blue-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Search size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              Web Scraping Best Practices
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {bestPractices.map((practice, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-white">{practice.title}</h3>
                <p className="text-sm text-gray-400">{practice.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Scraping Workflow */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Typical Scraping Workflow
          </h2>

          <div className="space-y-3">
            {[
              {
                step: "1. Analyze Target",
                desc: "Inspect HTML structure, identify selectors, check robots.txt",
              },
              {
                step: "2. Choose Tool",
                desc: "Static pages → BeautifulSoup/Cheerio, Dynamic → Selenium/Puppeteer",
              },
              {
                step: "3. Set Up Request Handling",
                desc: "Headers, user-agent, error handling, retries",
              },
              {
                step: "4. Build Parser",
                desc: "Write selectors and extraction logic",
              },
              {
                step: "5. Implement Storage",
                desc: "Save to database, CSV, JSON, or API",
              },
              {
                step: "6. Deploy & Monitor",
                desc: "Schedule runs, monitor for errors, handle site changes",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.05 }}
                className="flex gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                  <span className="text-sm font-bold text-white">{idx + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{item.step}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* API vs Scraping */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            API vs Web Scraping
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-bold text-cyan-400">Use APIs When:</h3>
              <ul className="space-y-2">
                {[
                  "✓ Official API is available",
                  "✓ Data is structured and reliable",
                  "✓ Large volume of data needed",
                  "✓ Real-time data required",
                  "✓ Terms of service allow it",
                  "✓ Long-term reliability needed",
                ].map((item) => (
                  <li key={item} className="text-sm text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-orange-400">Use Scraping When:</h3>
              <ul className="space-y-2">
                {[
                  "→ No official API available",
                  "→ Need to extract specific HTML elements",
                  "→ Data is behind JavaScript rendering",
                  "→ One-time data extraction",
                  "→ ToS allows scraping",
                  "→ Can handle site structure changes",
                ].map((item) => (
                  <li key={item} className="text-sm text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
