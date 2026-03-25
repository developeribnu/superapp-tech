"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Video, Zap, BarChart3 } from "lucide-react";

const pdfTools = [
  {
    name: "PyPDF2",
    type: "Python Library",
    description: "PDF reading, writing, and manipulation",
    features: ["Extract text", "Merge/split", "Encryption", "Compression"],
  },
  {
    name: "pdfplumber",
    type: "Python Library",
    description: "Precise PDF data extraction with table handling",
    features: ["Table extraction", "Text parsing", "Layout analysis", "Image extraction"],
  },
  {
    name: "PDF.js",
    type: "JavaScript Library",
    description: "Render and manipulate PDFs in the browser",
    features: ["Rendering", "Text extraction", "Annotations", "Forms"],
  },
  {
    name: "iText",
    type: "Java/C# Library",
    description: "Comprehensive PDF creation and manipulation",
    features: ["PDF generation", "Forms", "Signatures", "Encryption"],
  },
  {
    name: "Ghostscript",
    type: "Command-line Tool",
    description: "PostScript and PDF interpreter and converter",
    features: ["Format conversion", "Compression", "Rendering", "Merging"],
  },
  {
    name: "Tesseract",
    type: "OCR Engine",
    description: "Extract text from images in PDFs",
    features: ["OCR", "Multiple languages", "Accuracy", "Performance"],
  },
];

const powerPointTools = [
  {
    name: "python-pptx",
    description: "Create and modify PowerPoint presentations",
    features: [
      "Create slides",
      "Add text/shapes",
      "Images/charts",
      "Formatting",
    ],
    use: "Automated presentation generation",
  },
  {
    name: "Aspose.Slides",
    description: "Comprehensive PowerPoint manipulation API",
    features: [
      "Full control",
      "High fidelity",
      "Multi-format",
      "Batch processing",
    ],
    use: "Enterprise automation",
  },
  {
    name: "LibreOffice Impress API",
    description: "Open-source presentation software API",
    features: ["Open format", "Free", "Cross-platform", "Community"],
    use: "Open-source alternative",
  },
  {
    name: "Office Open XML",
    description: "Direct manipulation of .pptx file format",
    features: ["Low-level control", "Small file size", "Compatibility", "Flexibility"],
    use: "Advanced automation",
  },
];

const videoTools = [
  {
    name: "YouTube Transcript API",
    description: "Extract transcripts from YouTube videos",
    use: "Video analysis, summarization, translation",
    output: "Subtitles, JSON, CSV",
  },
  {
    name: "OpenAI Whisper",
    description: "Advanced speech-to-text AI model",
    use: "Accurate transcription from audio/video",
    output: "Text, timestamps, language detection",
  },
  {
    name: "FFmpeg",
    description: "Multimedia framework for video/audio processing",
    use: "Converting, cutting, extracting audio, effects",
    output: "MP4, WebM, MKV, audio formats",
  },
  {
    name: "MoviePy",
    description: "Python library for video editing",
    use: "Programmatic video creation and editing",
    output: "Video files, compilations, effects",
  },
  {
    name: "youtube-dl",
    description: "Download videos from YouTube and others",
    use: "Save videos for offline processing",
    output: "MP4, WebM, MKV, audio",
  },
];

const summarizationTools = [
  {
    name: "Extractive Summarization",
    description: "Select important sentences from original text",
    pros: "Fast, preserves original wording, no hallucination",
    cons: "Limited quality, may be disjointed",
  },
  {
    name: "Abstractive Summarization",
    description: "Generate new summary using AI models",
    pros: "High quality, contextual, natural language",
    cons: "Risk of hallucination, slower",
  },
  {
    name: "Hybrid Approach",
    description: "Combine extractive and abstractive methods",
    pros: "Better quality, balanced approach",
    cons: "More complex implementation",
  },
];

const contentWorkflow = [
  {
    step: "1. Input",
    description: "PDF upload, video link, or PowerPoint file",
    tools: ["Web interface", "API", "File system"],
  },
  {
    step: "2. Processing",
    description: "Extract text, transcribe, or parse structure",
    tools: ["PyPDF2", "Whisper", "python-pptx"],
  },
  {
    step: "3. Analysis",
    description: "Clean data, segment content, extract metadata",
    tools: ["Pandas", "spaCy", "NLTK"],
  },
  {
    step: "4. Summarization",
    description: "Generate summaries or key points",
    tools: ["Claude", "GPT-4", "Transformers"],
  },
  {
    step: "5. Output",
    description: "Format and deliver results",
    tools: ["JSON", "Markdown", "PDF", "HTML"],
  },
];

const examples = [
  {
    title: "PDF to Markdown",
    description: "Convert PDF documents to clean Markdown format",
    tools: ["pdfplumber", "Claude", "Pandoc"],
    difficulty: "Medium",
  },
  {
    title: "YouTube Summary",
    description: "Transcribe YouTube videos and generate summaries",
    tools: ["YouTube API", "Whisper", "Claude"],
    difficulty: "Medium",
  },
  {
    title: "Presentation Generator",
    description: "Auto-generate PowerPoint from topic or outline",
    tools: ["python-pptx", "Claude", "Unsplash API"],
    difficulty: "Hard",
  },
  {
    title: "Document Batch Processing",
    description: "Extract data from hundreds of PDFs",
    tools: ["pdfplumber", "Pandas", "n8n"],
    difficulty: "Medium",
  },
  {
    title: "Video to Blog Post",
    description: "Convert video content into a blog article",
    tools: ["Whisper", "Claude", "Markdown"],
    difficulty: "Hard",
  },
  {
    title: "Meeting Minutes Generator",
    description: "Create meeting summaries from transcripts",
    tools: ["Whisper", "Claude", "Email API"],
    difficulty: "Medium",
  },
];

export default function ContentToolsPage() {
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
          <h1 className="text-4xl font-bold text-white">Content Tools Hub</h1>
          <p className="text-gray-400">
            PDF, PowerPoint, video processing, and summarization tools
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* PDF Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <FileText size={24} className="text-red-400" />
            <h2 className="text-2xl font-bold text-white">PDF Tools</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pdfTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <h3 className="mb-1 font-bold text-cyan-400">{tool.name}</h3>
                <p className="mb-3 text-xs text-gray-500">{tool.type}</p>
                <p className="mb-3 text-sm text-gray-400">{tool.description}</p>

                <div className="space-y-1">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs">
                      <Zap size={12} className="text-yellow-400" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PowerPoint Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 size={24} className="text-orange-400" />
            <h2 className="text-2xl font-bold text-white">
              PowerPoint Tools
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {powerPointTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{tool.name}</h3>
                <p className="mb-3 text-sm text-gray-400">{tool.description}</p>

                <div className="mb-3 space-y-1">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs">
                      <Zap size={12} className="text-blue-400" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Use:</span> {tool.use}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Video & Audio Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Video size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Video & Audio Tools
            </h2>
          </div>

          <div className="space-y-4">
            {videoTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.08 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{tool.name}</h3>
                <p className="mb-3 text-sm text-gray-400">{tool.description}</p>

                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Use Case:</p>
                    <p className="text-xs text-gray-400">{tool.use}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Output:</p>
                    <p className="text-xs text-gray-400">{tool.output}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Summarization Techniques */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Summarization Approaches
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {summarizationTools.map((approach, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-white">{approach.name}</h3>
                <p className="mb-4 text-xs text-gray-400">{approach.description}</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-green-400 font-semibold">Pros:</p>
                    <p className="text-gray-400">{approach.pros}</p>
                  </div>
                  <div>
                    <p className="text-orange-400 font-semibold">Cons:</p>
                    <p className="text-gray-400">{approach.cons}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Content Processing Workflow */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Content Processing Workflow
          </h2>

          <div className="space-y-3">
            {contentWorkflow.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + idx * 0.08 }}
                className="tool-card"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
                    <span className="text-xs font-bold text-white">{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-white">{step.step}</h3>
                </div>
                <p className="mb-3 text-sm text-gray-400">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-gray-800/50 px-2 py-1 text-xs text-cyan-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Project Ideas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Project Ideas & Examples
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{example.title}</h3>
                <p className="mb-3 text-sm text-gray-400">
                  {example.description}
                </p>

                <div className="mb-3 flex flex-wrap gap-1">
                  {example.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-gray-800/50 px-2 py-1 text-xs text-blue-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    example.difficulty === "Medium"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {example.difficulty}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Content Processing Tips
          </h2>

          <ul className="space-y-2 text-gray-400">
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>Always validate extracted data - OCR and parsing can introduce errors</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>Use Tesseract for scanned PDFs, not just text-based extraction</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>For videos, extract transcripts first before summarization</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>Combine extractive and abstractive summarization for best results</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>Cache transcripts to avoid re-processing the same videos</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>Use batch processing for large document libraries</span>
            </li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
