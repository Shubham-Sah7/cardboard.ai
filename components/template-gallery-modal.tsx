"use client"

import React, { useState } from "react"
import {
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  Video,
  FileText,
  Smartphone,
  Code,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export interface StudioTemplate {
  id: string
  title: string
  category: string
  duration: string
  aspectRatio: string
  stepsCount: number
  description: string
  tags: string[]
  gradient: string
  ditherImage: string
  codeBadge: string
}

const TEMPLATES: StudioTemplate[] = [
  {
    id: "product-walkthrough",
    title: "Product Feature Walkthrough",
    category: "Product & Marketing",
    duration: "1:45",
    aspectRatio: "16:9 Landscape",
    stepsCount: 6,
    description: "Structured pacing with smooth zoom transitions, callout highlights, and auto-generated docs.",
    tags: ["Video", "Docs", "Auto-Zoom"],
    gradient: "from-blue-900/30 via-indigo-950/20 to-black",
    ditherImage: "/dither-blueprint.jpg",
    codeBadge: "SYS.01 // BLUEPRINT",
  },
  {
    id: "social-teaser",
    title: "Viral Feature Teaser",
    category: "Social & Shorts",
    duration: "0:30",
    aspectRatio: "9:16 Vertical",
    stepsCount: 4,
    description: "High-retention vertical reel with kinetic word-by-word subtitles and dynamic sound effects.",
    tags: ["Shorts", "Subtitles", "Fast Pacing"],
    gradient: "from-purple-900/30 via-pink-950/20 to-black",
    ditherImage: "/dither-1bit.jpg",
    codeBadge: "SYS.04 // 1-BIT",
  },
  {
    id: "developer-setup",
    title: "Developer API & CLI Guide",
    category: "Technical Docs",
    duration: "2:15",
    aspectRatio: "16:9 Landscape",
    stepsCount: 8,
    description: "Terminal recording with syntax highlighted code blocks and markdown documentation export.",
    tags: ["Code Blocks", "Docs", "Markdown"],
    gradient: "from-emerald-900/30 via-teal-950/20 to-black",
    ditherImage: "/dither-mono.png",
    codeBadge: "SYS.02 // MONO",
  },
  {
    id: "interactive-demo",
    title: "Interactive Onboarding Tour",
    category: "Customer Success",
    duration: "1:15",
    aspectRatio: "16:9 Landscape",
    stepsCount: 5,
    description: "Clickable walkthrough with hot-spots, tooltips, and interactive guided next-steps.",
    tags: ["Hotspots", "Self-Serve", "Tour"],
    gradient: "from-amber-900/30 via-orange-950/20 to-black",
    ditherImage: "/dither-halftone.png",
    codeBadge: "SYS.03 // HALFTONE",
  },
]

interface TemplateGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: StudioTemplate) => void
}

export function TemplateGalleryModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplateGalleryModalProps) {
  const [selectedId, setSelectedId] = useState<string>("product-walkthrough")

  const handleUse = () => {
    const t = TEMPLATES.find((item) => item.id === selectedId) || TEMPLATES[0]
    onSelectTemplate(t)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-[#161619] border border-white/[0.08] text-white p-6 shadow-2xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <DialogTitle className="text-base font-semibold text-white tracking-tight">
              Start from Proven Template
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#8E8E93]">
            Select a battle-tested structure designed for high engagement and automatic documentation.
          </DialogDescription>
        </DialogHeader>

        {/* Templates Grid with Dither & Blueprint Accents */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => setSelectedId(tmpl.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                selectedId === tmpl.id
                  ? "bg-[#202025] border-cyan-400/40 ring-1 ring-cyan-400/20 shadow-md"
                  : "bg-[#18181B] border-white/[0.06] hover:bg-[#1E1E22] hover:border-white/15"
              }`}
            >
              {/* Top Dither Texture Strip */}
              <div className="absolute top-0 right-0 w-32 h-20 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity">
                <img
                  src={tmpl.ditherImage}
                  alt=""
                  className="w-full h-full object-cover mix-blend-screen"
                />
                <div className="absolute inset-0 bg-blueprint-grid opacity-50" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10.5px] text-[#8E8E93] font-medium tracking-wide">
                    {tmpl.category}
                  </span>
                  {selectedId === tmpl.id && (
                    <div className="w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-white mb-1.5">{tmpl.title}</h4>
                <p className="text-[11.5px] text-[#8E8E93] leading-relaxed line-clamp-2">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[10.5px] text-[#7E7E84] font-mono relative z-10">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#9E9EA6]" />
                  {tmpl.duration}
                </span>
                <span className="text-[#9E9EA6]">{tmpl.aspectRatio.split(" ")[0]}</span>
                <span>{tmpl.stepsCount} steps</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <span className="text-[11px] text-[#7E7E84]">
            Templates can be freely customized once loaded into the editor.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8E8E93] hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUse}
              className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Use Selected Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
