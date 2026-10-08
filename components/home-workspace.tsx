"use client"

import React, { useState, useRef } from "react"
import {
  Paperclip,
  ChevronDown,
  ArrowUp,
  X,
  FileVideo,
  FileImage,
  FileAudio,
  Film,
  Check,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RecordFlowModal, LiveRecordingController } from "./record-flow-modal"
import { TemplateGalleryModal, type StudioTemplate } from "./template-gallery-modal"
import { AIProcessingModal, type OutputIntent } from "./ai-processing-modal"

interface UploadedFile {
  id: string
  name: string
  size: string
  type: "video" | "audio" | "image" | "file"
}

/* Custom Icons matching the exact Cardboard Reference */
function WindowLayoutIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  )
}

function VideoCamIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="12" x="2" y="6" rx="3" />
      <path d="m16 10 5-3v10l-5-3v-4Z" />
    </svg>
  )
}

function UploadTrayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <polyline points="7 9 12 4 17 9" />
      <line x1="12" x2="12" y1="4" y2="16" />
    </svg>
  )
}

function StackLayersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 2 10 5-10 5-10-5Z" />
      <path d="m2 12 10 5 10-5" />
      <path d="m2 17 10 5 10-5" />
    </svg>
  )
}

function MediaImageIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2.5" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}

const MODES = [
  { id: "auto", label: "Auto", desc: "Intelligent auto-detection" },
  { id: "video", label: "Video Cut", desc: "Pacing & highlight extraction" },
  { id: "scene", label: "Scene Gen", desc: "Generative shots & transitions" },
  { id: "audio", label: "Audio & VO", desc: "Voice isolation & sound design" },
  { id: "social", label: "Shorts & Reels", desc: "Vertical reformatter 9:16" },
]

export interface DitherModeConfig {
  id: "blueprint" | "mono" | "halftone" | "1bit"
  label: string
  code: string
  image: string
  accent: string
  desc: string
  opacity: number
  blendMode: "screen" | "lighten"
}

export const DITHER_MODES: DitherModeConfig[] = [
  {
    id: "blueprint",
    label: "Blueprint Grid",
    code: "SYS.01 // BLUEPRINT",
    image: "/dither-blueprint.jpg",
    accent: "#00E5FF",
    desc: "Cyan cartographic grid + telemetry tiles",
    opacity: 0.55,
    blendMode: "screen",
  },
  {
    id: "mono",
    label: "Mono Stipple",
    code: "SYS.02 // MONO",
    image: "/dither-mono.png",
    accent: "#F8FAFC",
    desc: "High-contrast risograph dot matrix",
    opacity: 0.28,
    blendMode: "screen",
  },
  {
    id: "halftone",
    label: "Halftone Sky",
    code: "SYS.03 // HALFTONE",
    image: "/dither-halftone.png",
    accent: "#3B82F6",
    desc: "Stippled radial cloud density screen",
    opacity: 0.38,
    blendMode: "screen",
  },
  {
    id: "1bit",
    label: "1-Bit Cobalt",
    code: "SYS.04 // 1-BIT",
    image: "/dither-1bit.jpg",
    accent: "#60A5FA",
    desc: "Ordered 2-color dither matrix",
    opacity: 0.38,
    blendMode: "screen",
  },
]

interface RecentProject {
  id: string
  title: string
  duration: string
  typeBadge: string
  updatedAt: string
  thumbnailImage: string
  aspectRatio: string
  accentColor: string
}

const RECENT_PROJECTS: RecentProject[] = [
  {
    id: "1",
    title: "Product Onboarding Walkthrough",
    duration: "2:10",
    typeBadge: "16:9 · 4K Master",
    updatedAt: "10 mins ago",
    thumbnailImage: "/dither-blueprint.jpg",
    aspectRatio: "16:9",
    accentColor: "#00E5FF",
  },
  {
    id: "2",
    title: "API Secret Keys & Developer Doc",
    duration: "1:45",
    typeBadge: "Docs · Markdown",
    updatedAt: "Yesterday",
    thumbnailImage: "/dither-mono.png",
    aspectRatio: "16:9",
    accentColor: "#F97316",
  },
  {
    id: "3",
    title: "Social Viral Shorts Teaser",
    duration: "0:30",
    typeBadge: "9:16 · Kinetic Reel",
    updatedAt: "3 days ago",
    thumbnailImage: "/dither-1bit.jpg",
    aspectRatio: "9:16",
    accentColor: "#E6007A",
  },
]

interface HomeWorkspaceProps {
  onOpenStudio: (projectTitle: string) => void
}

export function HomeWorkspace({ onOpenStudio }: HomeWorkspaceProps) {
  const [prompt, setPrompt] = useState("")
  const [selectedMode, setSelectedMode] = useState("auto")

  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Modals & workflows state
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false)
  const [isRecordingLive, setIsRecordingLive] = useState(false)
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false)
  const [isProcessingOpen, setIsProcessingOpen] = useState(false)
  const [activeProjectName, setActiveProjectName] = useState("New Studio Project")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return
    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file, idx) => {
      let type: UploadedFile["type"] = "file"
      if (file.type.startsWith("video/")) type = "video"
      else if (file.type.startsWith("audio/")) type = "audio"
      else if (file.type.startsWith("image/")) type = "image"

      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1)
      return {
        id: `${Date.now()}-${idx}`,
        name: file.name,
        size: `${sizeInMb} MB`,
        type,
      }
    })
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handlePromptSubmit = () => {
    if (!prompt.trim() && files.length === 0) return
    const title = prompt.trim()
      ? prompt.slice(0, 38).trim()
      : files[0]?.name || "Custom Video Project"
    setActiveProjectName(title)
    setIsProcessingOpen(true)
  }

  const handleStartRecording = () => {
    setIsRecordingLive(true)
  }

  const handleStopRecording = () => {
    setIsRecordingLive(false)
    setActiveProjectName("Screen Recording Session")
    setIsProcessingOpen(true)
  }

  const handleCancelRecording = () => {
    setIsRecordingLive(false)
  }

  const handleSelectTemplate = (template: StudioTemplate) => {
    onOpenStudio(template.title)
  }

  const handleAIProcessingComplete = (_intent: OutputIntent) => {
    setIsProcessingOpen(false)
    onOpenStudio(activeProjectName)
  }

  const currentMode = MODES.find((m) => m.id === selectedMode) || MODES[0]
  const activeDither = DITHER_MODES.find((m) => m.id === "1bit") || DITHER_MODES[DITHER_MODES.length - 1]

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full h-full flex flex-col justify-between px-8 md:px-14 py-6 md:py-8 overflow-y-auto select-none bg-[#060608]"
    >
      {/* Ethereal Atmospheric Dither & Halftone Cloud Backdrop (Seamlessly Blended) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1: High-res Dither / Halftone raster artwork feathered into deep void */}
        <div
          style={{
            backgroundImage: `url('${activeDither.image}')`,
            opacity: activeDither.opacity,
            mixBlendMode: activeDither.blendMode,
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 85% 15%, black 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 68%, transparent 82%)",
            maskImage: "radial-gradient(ellipse 70% 70% at 85% 15%, black 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 68%, transparent 82%)",
          }}
          className="absolute -top-6 right-0 w-[85%] h-[88%] bg-right-top bg-no-repeat bg-contain transition-all duration-500 pointer-events-none"
        />

        {/* Layer 2: Technical Blueprint Grid overlay (Feathered seamlessly) */}
        <div
          style={{
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 85% 15%, black 15%, rgba(0,0,0,0.35) 45%, transparent 75%)",
            maskImage: "radial-gradient(ellipse 70% 70% at 85% 15%, black 15%, rgba(0,0,0,0.35) 45%, transparent 75%)",
          }}
          className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none"
        />
        <div
          style={{
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 85% 15%, black 10%, transparent 70%)",
            maskImage: "radial-gradient(ellipse 60% 60% at 85% 15%, black 10%, transparent 70%)",
          }}
          className="absolute top-0 right-0 w-[70%] h-[70%] bg-blueprint-cyan opacity-25 pointer-events-none"
        />

        {/* Layer 3: Omnidirectional Smooth Vignette Gradients for 100% Seamless Blend */}
        {/* Left vignette protecting headline, composer and controls */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#060608] via-[#060608]/95 via-[#060608]/60 to-transparent pointer-events-none" />
        {/* Bottom vignette protecting action cards and recents */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#060608] via-[#060608]/90 via-[#060608]/50 to-transparent pointer-events-none" />
        {/* Top edge vignette */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#060608]/85 via-[#060608]/30 to-transparent pointer-events-none" />
        {/* Right edge feathering */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060608]/60 to-transparent pointer-events-none" />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileSelect(e.target.files)}
        multiple
        accept="video/*,image/*,audio/*"
        className="hidden"
      />

      {/* Floating Recording Controller */}
      {isRecordingLive && (
        <LiveRecordingController
          onStop={handleStopRecording}
          onCancel={handleCancelRecording}
        />
      )}

      {/* Modals */}
      <RecordFlowModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onStartRecording={handleStartRecording}
      />

      <TemplateGalleryModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {isProcessingOpen && (
        <AIProcessingModal
          sourceTitle={activeProjectName}
          onComplete={handleAIProcessingComplete}
          onCancel={() => setIsProcessingOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[850px] flex flex-col items-start mx-auto my-auto">

        {/* Confident 2-Line Modern Headline */}
        <h1 className="font-heading text-[34px] sm:text-[38px] md:text-[42px] font-semibold tracking-[-0.035em] text-white leading-[1.14] mb-2.5 text-left">
          <span className="block whitespace-nowrap">What are we editing today,</span>
          <span className="block whitespace-nowrap">Shubham Sah?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#8E8E93] text-[14px] font-normal mb-5.5 text-left">
          Bring in your media, describe your idea, or start from a template.
        </p>

        {/* Composer Card with Technical Crosshairs */}
        <div
          onClick={() => textareaRef.current?.focus()}
          className={`w-full bg-[#121215]/90 backdrop-blur-md border rounded-xl p-4 transition-all duration-200 relative flex flex-col justify-between shadow-[0_16px_48px_rgba(0,0,0,0.5)] ${
            isDragging
              ? "border-cyan-400/60 bg-[#161622]/90 ring-1 ring-cyan-400/30"
              : isFocused || prompt.trim().length > 0
              ? "border-white/[0.18] ring-1 ring-white/[0.08]"
              : "border-white/[0.08] hover:border-white/[0.12]"
          }`}
        >
          {/* Subtle Technical Corner Crosshairs (+) */}
          <span className="absolute top-1.5 left-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">+</span>
          <span className="absolute top-1.5 right-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">+</span>
          <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">+</span>
          <span className="absolute bottom-1.5 right-2 text-[9px] font-mono text-white/20 select-none pointer-events-none">+</span>
          {/* Drag Overlay Feedback */}
          {isDragging && (
            <div className="absolute inset-2 rounded-lg border border-dashed border-cyan-400/40 bg-cyan-950/20 backdrop-blur-xs flex items-center justify-center gap-2 z-10 pointer-events-none">
              <Film className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span className="text-xs font-medium text-cyan-200">
                Drop media to attach
              </span>
            </div>
          )}

          {/* Attached Files Chips */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 px-1 pb-3 mb-2 border-b border-white/[0.05]">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#202025] border border-white/[0.06] text-xs text-neutral-300"
                >
                  {file.type === "video" && <FileVideo className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                  {file.type === "audio" && <FileAudio className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  {file.type === "image" && <FileImage className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  {file.type === "file" && <Paperclip className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
                  <span className="max-w-[130px] truncate text-[11.5px]">{file.name}</span>
                  <span className="text-[10px] text-neutral-500">{file.size}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(file.id)
                    }}
                    className="p-0.5 hover:text-white text-neutral-500 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={prompt}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handlePromptSubmit()
              }
            }}
            placeholder="Ask Cardboard to create a video..."
            rows={2}
            className="w-full bg-transparent text-[#EDEDED] placeholder:text-[#5E5E66] text-[14.5px] leading-relaxed resize-none focus:outline-none p-1 font-normal tracking-[-0.01em]"
          />

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between pt-1 px-1 mt-1">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                title="Attach media files"
                className="p-1.5 rounded-md text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <Paperclip className="w-4 h-4" strokeWidth={1.8} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#202024] hover:bg-[#28282D] border border-white/[0.06] text-[#D1D1D6] text-xs font-medium transition-colors cursor-pointer focus:outline-none"
                  >
                    <WindowLayoutIcon className="w-3.5 h-3.5 text-[#8E8E93]" />
                    <span>{currentMode.label}</span>
                    <ChevronDown className="w-3 h-3 text-[#8E8E93]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-52 bg-[#1B1B1E] border-white/10 text-white p-1 shadow-2xl"
                >
                  {MODES.map((mode) => (
                    <DropdownMenuItem
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className="flex items-center justify-between text-xs py-2 px-2.5 rounded-md hover:bg-white/[0.08] cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-white">{mode.label}</div>
                        <div className="text-[11px] text-[#8E8E93]">{mode.desc}</div>
                      </div>
                      {selectedMode === mode.id && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right: Send Button (Clean Up Arrow, No Sparkles) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handlePromptSubmit()
              }}
              disabled={!prompt.trim() && files.length === 0}
              title="Generate timeline"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
                prompt.trim() || files.length > 0
                  ? "bg-white text-black hover:bg-neutral-200 shadow-xs"
                  : "bg-[#25252A] text-[#7E7E84] hover:bg-[#2F2F35] hover:text-neutral-300"
              }`}
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Drag and Drop Pill Button directly below composer */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-3.5 flex items-center justify-center gap-2 py-2 px-5 rounded-lg border border-dashed border-white/[0.14] bg-[#121215]/50 hover:border-white/[0.24] hover:bg-[#18181D] text-[#85858C] hover:text-[#C5C5CB] text-[12px] font-normal transition-all cursor-pointer mx-auto"
        >
          <MediaImageIcon className="w-3.5 h-3.5 text-[#85858C]" />
          <span>Drag and drop or click here to add your media files</span>
        </button>

        {/* 3 Quick Action Cards (Record Screen, Upload Media, Use Template) with Dither & Blueprint Accents */}
        <div className="w-full grid grid-cols-3 gap-3.5 mt-6 mb-7">
          {/* Card 1: Record Screen */}
          <div
            onClick={() => setIsRecordModalOpen(true)}
            className="p-4 rounded-xl bg-[#131316]/85 hover:bg-[#18181E] border border-white/[0.07] hover:border-cyan-400/35 backdrop-blur-md transition-all duration-200 cursor-pointer group flex flex-col justify-between h-[126px] shadow-2xs relative overflow-hidden"
          >
            {/* Subtle Blueprint grid texture on hover */}
            <div className="absolute inset-0 bg-blueprint-cyan opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />

            <div className="flex items-center justify-between w-full relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[#1C1C20] group-hover:bg-cyan-500/15 border border-white/[0.04] group-hover:border-cyan-400/30 flex items-center justify-center text-[#B5B5BA] group-hover:text-cyan-300 transition-all">
                <VideoCamIcon className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#585860] group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="relative z-10">
              <h4 className="text-[14px] font-medium text-white group-hover:text-white flex items-center gap-1.5">
                <span>Record Screen</span>
              </h4>
              <p className="text-[11.5px] text-[#7E7E84] mt-0.5 leading-snug">
                Capture screen, camera & audio
              </p>
            </div>
          </div>

          {/* Card 2: Upload Media */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-xl bg-[#131316]/85 hover:bg-[#18181E] border border-white/[0.07] hover:border-amber-400/35 backdrop-blur-md transition-all duration-200 cursor-pointer group flex flex-col justify-between h-[126px] shadow-2xs relative overflow-hidden"
          >
            {/* Subtle Halftone dots texture on hover */}
            <div className="absolute inset-0 bg-halftone-dots opacity-0 group-hover:opacity-15 transition-opacity pointer-events-none" />

            <div className="flex items-center justify-between w-full relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[#1C1C20] group-hover:bg-amber-500/15 border border-white/[0.04] group-hover:border-amber-400/30 flex items-center justify-center text-[#B5B5BA] group-hover:text-amber-300 transition-all">
                <UploadTrayIcon className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#585860] group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="relative z-10">
              <h4 className="text-[14px] font-medium text-white group-hover:text-white">
                Upload Media
              </h4>
              <p className="text-[11.5px] text-[#7E7E84] mt-0.5 leading-snug">
                Raw recordings, audio & proxy assets
              </p>
            </div>
          </div>

          {/* Card 3: Use Template */}
          <div
            onClick={() => setIsTemplatesModalOpen(true)}
            className="p-4 rounded-xl bg-[#131316]/85 hover:bg-[#18181E] border border-white/[0.07] hover:border-purple-400/35 backdrop-blur-md transition-all duration-200 cursor-pointer group flex flex-col justify-between h-[126px] shadow-2xs relative overflow-hidden"
          >
            {/* Subtle Blueprint grid texture on hover */}
            <div className="absolute inset-0 bg-blueprint-grid opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />

            <div className="flex items-center justify-between w-full relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[#1C1C20] group-hover:bg-purple-500/15 border border-white/[0.04] group-hover:border-purple-400/30 flex items-center justify-center text-[#B5B5BA] group-hover:text-purple-300 transition-all">
                <StackLayersIcon className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#585860] group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="relative z-10">
              <h4 className="text-[14px] font-medium text-white group-hover:text-white">
                Use Template
              </h4>
              <p className="text-[11.5px] text-[#7E7E84] mt-0.5 leading-snug">
                Start from a proven video structure
              </p>
            </div>
          </div>
        </div>

        {/* Continue Working Section */}
        <div className="w-full pt-0.5">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <span className="text-[13.5px] font-medium text-white">
              Continue working
            </span>
            <button
              type="button"
              onClick={() => onOpenStudio("Recent Project")}
              className="text-[11.5px] text-[#7E7E84] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View all projects</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* 3 Horizontal Project Cards with Dither Artwork Previews */}
          <div className="grid grid-cols-3 gap-3.5">
            {RECENT_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onOpenStudio(proj.title)}
                className="group p-2.5 rounded-lg bg-[#131316]/85 hover:bg-[#18181D] border border-white/[0.06] hover:border-cyan-400/30 transition-all flex items-center gap-3 cursor-pointer shadow-2xs relative overflow-hidden"
              >
                {/* Visual Dither Thumbnail Preview with Duration & Aspect Badges */}
                <div className="w-[74px] h-[50px] rounded-md overflow-hidden relative shrink-0 border border-white/[0.08] bg-[#0E0E11] flex items-center justify-center">
                  <img
                    src={proj.thumbnailImage}
                    alt={proj.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  {/* Aspect Ratio Badge */}
                  <span className="absolute top-1 left-1 font-mono text-[7.5px] px-1.5 py-0.5 rounded bg-black/75 text-neutral-300 font-medium border border-white/10">
                    {proj.aspectRatio}
                  </span>

                  {/* Duration Badge */}
                  <span className="absolute bottom-1 right-1 font-mono text-[8.5px] px-1 py-0.2 rounded bg-black/85 text-white/95 font-medium border border-white/10">
                    {proj.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h5 className="text-[12px] font-medium text-white truncate group-hover:text-cyan-200 transition-colors">
                    {proj.title}
                  </h5>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-[#7E7E84] mt-0.5 truncate font-mono">
                    <span className="text-[#9E9EA6]">{proj.typeBadge}</span>
                    <span>·</span>
                    <span className="text-[#6E6E76]">{proj.updatedAt}</span>
                  </div>
                </div>

                {/* More options button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-1 rounded text-[#585860] hover:text-white transition-colors cursor-pointer"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
