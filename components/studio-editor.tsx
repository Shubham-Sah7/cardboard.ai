"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Scissors,
  Copy,
  Trash2,
  Undo2,
  Redo2,
  Mic,
  Sliders,
  Type,
  Music,
  Shapes,
  Wand2,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Folder,
  Search,
  Filter,
  Upload,
  Radio,
  Monitor,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Languages,
  Download,
  Check,
  ZoomIn,
  ZoomOut,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  Bold,
  Italic,
  Bot,
  FileText,
  Clock,
  Film,
  Layers,
  Cloud,
  Send,
  Plus,
  Square,
  Circle,
  HelpCircle,
  Video,
  Image as ImageIcon,
  Flame,
  Zap,
  Target,
  Rocket,
  Lightbulb,
  ArrowRight as ArrowRightIcon,
  Smile,
  Move,
  CornerDownRight,
  X,
} from "lucide-react"
import { CardboardLogo, CardboardIcon } from "./cardboard-logo"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface StudioEditorProps {
  projectTitle?: string
  onBack: () => void
}

type LeftToolTab = "media" | "text" | "audio" | "elements" | "effects" | "more"
type InspectorTab = "edit" | "animation" | "ai"
type MediaFilter = "all" | "videos" | "images" | "audio" | "uploads"
type AspectRatioMode = "16:9" | "9:16" | "1:1" | "4:5"

export interface TimelineClip {
  id: string
  trackId: "text" | "video" | "audio" | "music"
  title: string
  start: number // in seconds
  duration: number // in seconds
  colorClass: string
  type: "text" | "video" | "audio" | "music"
  waveformSeed?: number
}

export function StudioEditor({
  projectTitle = "Product Onboarding Walkthrough",
  onBack,
}: StudioEditorProps) {
  // ─── 1. Core State ──────────────────────────────────────────────────────────
  const [currentProjectTitle, setCurrentProjectTitle] = useState(projectTitle)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved")

  // Navigation & Panels
  const [activeLeftTab, setActiveLeftTab] = useState<LeftToolTab>("media")
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeInspectorTab, setActiveInspectorTab] = useState<InspectorTab>("edit")
  const [selectedLayer, setSelectedLayer] = useState<"text" | "video" | "audio" | "music" | "canvas">("text")

  // Canvas Framing & Background
  const [aspectRatio, setAspectRatio] = useState<AspectRatioMode>("16:9")
  const [zoomLevel, setZoomLevel] = useState("100%")
  const [canvasBackground, setCanvasBackground] = useState<string>("/earth_video_canvas.jpg")
  const [isBlueprintGridActive, setIsBlueprintGridActive] = useState<boolean>(true)
  const [activeFilterEffect, setActiveFilterEffect] = useState<string>("none")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Playback & Scrubber
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(8.12)
  const totalDuration = 130 // 2:10:00
  const [playbackSpeed, setPlaybackSpeed] = useState("1x")
  const [timelineZoom, setTimelineZoom] = useState(1.1)
  const [volume, setVolume] = useState(85)
  const [isMuted, setIsMuted] = useState(false)

  // Interactive Canvas Text Object
  const [canvasText, setCanvasText] = useState("Build\nwithout\nlimits")
  const [fontFamily, setFontFamily] = useState("Inter")
  const [fontSize, setFontSize] = useState(72)
  const [isBold, setIsBold] = useState(true)
  const [isItalic, setIsItalic] = useState(false)
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [textOpacity, setTextOpacity] = useState(100)
  const [textStylePreset, setTextStylePreset] = useState<"default" | "title" | "subtitle">("default")
  const [posX, setPosX] = useState(120)
  const [posY, setPosY] = useState(80)
  const [rotation, setRotation] = useState(0)
  const [blendMode, setBlendMode] = useState("Normal")
  const [isTextSelected, setIsTextSelected] = useState(true)
  const [isEditingInline, setIsEditingInline] = useState(false)
  const [textAnimation, setTextAnimation] = useState("Kinetic Word Pop")

  // Dragging & Resizing Canvas Text State
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; initialX: number; initialY: number } | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const resizeStartRef = useRef<{ mouseX: number; initialSize: number } | null>(null)

  // Timeline Clips
  const [selectedClipId, setSelectedClipId] = useState<string>("clip-text-1")
  const [clips, setClips] = useState<TimelineClip[]>([
    {
      id: "clip-text-1",
      trackId: "text",
      title: "Build without limits",
      start: 0,
      duration: 16,
      colorClass: "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-indigo-400/40",
      type: "text",
    },
    {
      id: "clip-text-2",
      trackId: "text",
      title: "AI powered video creation",
      start: 38,
      duration: 12,
      colorClass: "bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white border-purple-400/40",
      type: "text",
    },
    {
      id: "clip-video-1",
      trackId: "video",
      title: "Earth Orbit Sunrise 4K",
      start: 0,
      duration: 65,
      colorClass: "bg-neutral-800 text-neutral-100 border-white/20",
      type: "video",
    },
    {
      id: "clip-audio-1",
      trackId: "audio",
      title: "Voiceover.mp3",
      start: 0,
      duration: 52,
      colorClass: "bg-[#2563EB]/90 border-blue-400/40 text-white",
      type: "audio",
      waveformSeed: 12,
    },
    {
      id: "clip-music-1",
      trackId: "music",
      title: "Ambient Music.mp3",
      start: 0,
      duration: 56,
      colorClass: "bg-[#059669]/90 border-emerald-400/40 text-white",
      type: "music",
      waveformSeed: 44,
    },
  ])

  // Track visibility & locks
  const [trackStates, setTrackStates] = useState({
    text: { visible: true, locked: false },
    video: { visible: true, locked: false },
    audio: { visible: true, locked: false, muted: false },
    music: { visible: true, locked: false, muted: false },
  })

  // Natural Language AI Editing Prompt
  const [aiPromptInput, setAiPromptInput] = useState("")
  const [isAiProcessing, setIsAiProcessing] = useState(false)

  // Undo / Redo Stack
  const [history, setHistory] = useState<Array<{ text: string; posX: number; posY: number; clips: TimelineClip[] }>>([])
  const [future, setFuture] = useState<Array<{ text: string; posX: number; posY: number; clips: TimelineClip[] }>>([])

  // Modals & Feedback Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showTranslateModal, setShowTranslateModal] = useState(false)
  const [showRecordModal, setShowRecordModal] = useState(false)

  // Export State
  const [exportQuality, setExportQuality] = useState("1080p")
  const [exportFormat, setExportFormat] = useState("mp4")
  const [exportFps, setExportFps] = useState("30")
  const [exportBurnCaptions, setExportBurnCaptions] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStage, setExportStage] = useState("")
  const [exportCompleted, setExportCompleted] = useState(false)

  // Canvas Video Player Ref
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  // ─── 2. Helpers & Feedback ─────────────────────────────────────────────────
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg)
    const t = setTimeout(() => setToastMessage(null), 3000)
    return () => clearTimeout(t)
  }, [])

  const triggerSave = useCallback(() => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
    }, 700)
  }, [])

  const pushSnapshot = useCallback(() => {
    setHistory((prev) => [
      ...prev.slice(-15),
      { text: canvasText, posX, posY, clips },
    ])
    setFuture([])
    triggerSave()
  }, [canvasText, posX, posY, clips, triggerSave])

  const handleUndo = useCallback(() => {
    if (history.length === 0) return
    const prevSnapshot = history[history.length - 1]
    setHistory((prev) => prev.slice(0, -1))
    setFuture((f) => [{ text: canvasText, posX, posY, clips }, ...f])
    setCanvasText(prevSnapshot.text)
    setPosX(prevSnapshot.posX)
    setPosY(prevSnapshot.posY)
    setClips(prevSnapshot.clips)
    showToast("Undo applied")
  }, [history, canvasText, posX, posY, clips, showToast])

  const handleRedo = useCallback(() => {
    if (future.length === 0) return
    const nextSnapshot = future[0]
    setFuture((f) => f.slice(1))
    setHistory((prev) => [...prev, { text: canvasText, posX, posY, clips }])
    setCanvasText(nextSnapshot.text)
    setPosX(nextSnapshot.posX)
    setPosY(nextSnapshot.posY)
    setClips(nextSnapshot.clips)
    showToast("Redo applied")
  }, [future, canvasText, posX, posY, clips, showToast])

  // Keyboard Shortcuts: Space (Play/Pause), Cmd+Z (Undo), S (Split), Backspace (Delete)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || "").toLowerCase()
      if (activeTag === "input" || activeTag === "textarea") return

      if (e.code === "Space") {
        e.preventDefault()
        setIsPlaying((p) => !p)
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) handleRedo()
        else handleUndo()
      } else if (e.key.toLowerCase() === "s") {
        e.preventDefault()
        handleSplitClip()
      } else if (e.key === "Backspace" || e.key === "Delete") {
        if (selectedClipId) {
          e.preventDefault()
          handleDeleteClip()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedClipId, handleUndo, handleRedo])

  // Playback Loop Ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    const speedMultiplier = playbackSpeed === "2x" ? 2 : playbackSpeed === "1.5x" ? 1.5 : playbackSpeed === "0.5x" ? 0.5 : 1

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false)
            return 0
          }
          return Number((prev + 0.1 * speedMultiplier).toFixed(2))
        })
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, playbackSpeed, totalDuration])

  // Time formatters
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const formatPreciseTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const frames = Math.floor((seconds % 1) * 30)
    return `00:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`
  }

  // ─── 3. Canvas Mouse Interaction (Drag & Resize Text) ─────────────────────
  const handleMouseDownText = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsTextSelected(true)
    setSelectedLayer("text")
    const clip = clips.find((c) => c.type === "text")
    if (clip) setSelectedClipId(clip.id)

    setIsDragging(true)
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initialX: posX,
      initialY: posY,
    }
  }

  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    resizeStartRef.current = {
      mouseX: e.clientX,
      initialSize: fontSize,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragStartRef.current) {
        const deltaX = e.clientX - dragStartRef.current.mouseX
        const deltaY = e.clientY - dragStartRef.current.mouseY
        setPosX(Math.max(10, Math.min(650, dragStartRef.current.initialX + deltaX)))
        setPosY(Math.max(10, Math.min(380, dragStartRef.current.initialY + deltaY)))
      } else if (isResizing && resizeStartRef.current) {
        const delta = (e.clientX - resizeStartRef.current.mouseX) * 0.5
        setFontSize(Math.max(24, Math.min(130, Math.round(resizeStartRef.current.initialSize + delta))))
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        dragStartRef.current = null
        pushSnapshot()
      }
      if (isResizing) {
        setIsResizing(false)
        resizeStartRef.current = null
        pushSnapshot()
      }
    }

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, pushSnapshot])

  // ─── 4. Timeline Clip Manipulations ───────────────────────────────────────
  const handleSplitClip = () => {
    const clip = clips.find((c) => c.id === selectedClipId)
    if (!clip) {
      showToast("Select a clip to split")
      return
    }
    if (currentTime > clip.start && currentTime < clip.start + clip.duration) {
      pushSnapshot()
      const firstDuration = Number((currentTime - clip.start).toFixed(1))
      const secondDuration = Number((clip.duration - firstDuration).toFixed(1))
      const newClip: TimelineClip = {
        ...clip,
        id: `clip-${clip.type}-${Date.now()}`,
        start: Number(currentTime.toFixed(1)),
        duration: secondDuration,
        title: `${clip.title} (Part 2)`,
      }
      setClips((prev) =>
        prev
          .map((c) => (c.id === clip.id ? { ...c, duration: firstDuration } : c))
          .concat(newClip)
      )
      setSelectedClipId(newClip.id)
      showToast(`Split "${clip.title}" at ${formatTime(currentTime)}`)
    } else {
      showToast("Playhead must be inside selected clip")
    }
  }

  const handleDeleteClip = () => {
    if (!selectedClipId) return
    const clip = clips.find((c) => c.id === selectedClipId)
    pushSnapshot()
    setClips((prev) => prev.filter((c) => c.id !== selectedClipId))
    setSelectedClipId("")
    showToast(`Deleted ${clip?.title || "clip"}`)
  }

  const handleDuplicateClip = () => {
    const clip = clips.find((c) => c.id === selectedClipId)
    if (!clip) return
    pushSnapshot()
    const duplicated: TimelineClip = {
      ...clip,
      id: `clip-${clip.type}-${Date.now()}`,
      start: Number((clip.start + clip.duration + 1).toFixed(1)),
      title: `${clip.title} (Copy)`,
    }
    setClips((prev) => [...prev, duplicated])
    setSelectedClipId(duplicated.id)
    showToast(`Duplicated "${clip.title}"`)
  }

  const handleAddMediaToTimeline = (name: string, durationSec: number, type: "video" | "audio") => {
    pushSnapshot()
    const newClip: TimelineClip = {
      id: `clip-${type}-${Date.now()}`,
      trackId: type === "video" ? "video" : "audio",
      title: name,
      start: Number(currentTime.toFixed(1)),
      duration: durationSec,
      colorClass: type === "video" ? "bg-neutral-800 text-neutral-100 border-white/20" : "bg-blue-600/80 text-blue-100 border-blue-400/40",
      type: type,
    }
    setClips((prev) => [...prev, newClip])
    setSelectedClipId(newClip.id)
    setSelectedLayer(type)
    showToast(`Added "${name}" to timeline at ${formatTime(currentTime)}`)
  }

  const handleAddTextPresetToTimeline = (label: string, presetText: string, size: number) => {
    pushSnapshot()
    setCanvasText(presetText)
    setFontSize(size)
    setIsTextSelected(true)
    setSelectedLayer("text")
    const newClip: TimelineClip = {
      id: `clip-text-${Date.now()}`,
      trackId: "text",
      title: label,
      start: Number(currentTime.toFixed(1)),
      duration: 10,
      colorClass: "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-indigo-400/40",
      type: "text",
    }
    setClips((prev) => [...prev, newClip])
    setSelectedClipId(newClip.id)
    showToast(`Added "${label}" text layer to timeline`)
  }

  const handleAddAudioPresetToTimeline = (name: string, track: "audio" | "music", durationSec: number) => {
    pushSnapshot()
    const newClip: TimelineClip = {
      id: `clip-${track}-${Date.now()}`,
      trackId: track,
      title: name,
      start: Number(currentTime.toFixed(1)),
      duration: durationSec,
      colorClass: track === "music" ? "bg-[#059669]/90 border-emerald-400/40 text-white" : "bg-[#2563EB]/90 border-blue-400/40 text-white",
      type: track,
      waveformSeed: Math.floor(Math.random() * 100),
    }
    setClips((prev) => [...prev, newClip])
    setSelectedClipId(newClip.id)
    setSelectedLayer(track)
    showToast(`Added "${name}" to ${track} track`)
  }

  // ─── 5. AI / Natural Language Director Engine ─────────────────────────────
  const handleExecuteAiCommand = (command: string) => {
    if (!command.trim()) return
    setIsAiProcessing(true)
    pushSnapshot()

    const lower = command.toLowerCase()

    setTimeout(() => {
      setIsAiProcessing(false)
      setAiPromptInput("")

      if (lower.includes("shorter") || lower.includes("trim intro") || lower.includes("2 second")) {
        // Trim video intro by 2 seconds
        setClips((prev) =>
          prev.map((c) => {
            if (c.trackId === "video" && c.start === 0) {
              return { ...c, duration: Math.max(5, c.duration - 2) }
            }
            if (c.trackId === "text" && c.start === 0) {
              return { ...c, duration: Math.max(4, c.duration - 2) }
            }
            return c
          })
        )
        showToast("⚡ AI Director: Trimmed 2.0s from intro scene")
      } else if (lower.includes("caption") || lower.includes("subtitle")) {
        // Generate kinetic captions across tracks
        const captionClips: TimelineClip[] = [
          {
            id: `clip-caption-1-${Date.now()}`,
            trackId: "text",
            title: "Caption: Welcome to the future",
            start: 18,
            duration: 8,
            colorClass: "bg-amber-600/80 border-amber-400/40 text-white",
            type: "text",
          },
          {
            id: `clip-caption-2-${Date.now()}`,
            trackId: "text",
            title: "Caption: Everything in one canvas",
            start: 28,
            duration: 8,
            colorClass: "bg-amber-600/80 border-amber-400/40 text-white",
            type: "text",
          },
        ]
        setClips((prev) => [...prev, ...captionClips])
        showToast("✨ AI Director: Synced word-by-word captions generated")
      } else if (lower.includes("silence") || lower.includes("pause") || lower.includes("dead air")) {
        // Strip silence
        setClips((prev) =>
          prev.map((c) => (c.trackId === "audio" ? { ...c, duration: Math.max(10, c.duration - 4) } : c))
        )
        showToast("✂️ AI Director: Stripped 4.2s of silent pauses across audio")
      } else if (lower.includes("vertical") || lower.includes("9:16") || lower.includes("portrait") || lower.includes("reel") || lower.includes("tiktok")) {
        // Convert to vertical 9:16
        setAspectRatio("9:16")
        setPosX(60)
        setPosY(140)
        setFontSize(54)
        showToast("📱 AI Director: Converted timeline to 9:16 Vertical Reel")
      } else if (lower.includes("music") || lower.includes("song") || lower.includes("soundtrack")) {
        // Add background music
        handleAddAudioPresetToTimeline("Cinematic Lo-Fi Beat.mp3", "music", 60)
      } else {
        // Generic polish
        showToast(`✨ AI Director applied: "${command}"`)
      }
    }, 900)
  }

  // ─── 6. Export Flow ────────────────────────────────────────────────────────
  const handleStartExport = () => {
    setIsExporting(true)
    setExportProgress(10)
    setExportStage("Preparing composition...")

    setTimeout(() => {
      setExportProgress(38)
      setExportStage("Rendering 4K composite canvas & kinetic typography...")
    }, 700)

    setTimeout(() => {
      setExportProgress(72)
      setExportStage("Normalizing audio stems & dubbing tracks...")
    }, 1500)

    setTimeout(() => {
      setExportProgress(100)
      setExportStage("Encoding hardware-accelerated MP4 container...")
      setTimeout(() => {
        setIsExporting(false)
        setExportCompleted(true)
      }, 500)
    }, 2300)
  }

  const handleDownloadFile = () => {
    // Generate clean synthetic download
    const blob = new Blob([`Cardboard Studio Render: ${currentProjectTitle}`], { type: "video/mp4" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentProjectTitle.replace(/\s+/g, "_")}_${exportQuality}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast("Downloaded video to your system!")
    setShowExportModal(false)
    setExportCompleted(false)
    setExportProgress(0)
  }

  // Selected clip object helper
  const selectedClip = clips.find((c) => c.id === selectedClipId)

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#070709] text-[#EDEDED] select-none font-sans fixed inset-0 z-50">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-[#181820]/95 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────
          1. TOP NAVIGATION BAR (Full Width)
      ───────────────────────────────────────────────────────────────────────── */}
      <header className="h-12 border-b border-white/[0.08] bg-[#0A0A0D] flex items-center justify-between px-3 shrink-0 z-30">
        {/* Left: Back button + Cloud Sync Status + Project Name */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            title="Return to Hub / Dashboard"
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">Back</span>
          </button>

          <div className="h-4 w-[1px] bg-white/[0.1] hidden sm:block" />

          <CardboardIcon className="w-4 h-4 text-white shrink-0 hidden sm:block" />

          {/* Project Name & Cloud Sync */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-[#8E8E93]">
              <Cloud className={`w-3.5 h-3.5 ${saveStatus === "saving" ? "text-amber-400 animate-pulse" : "text-emerald-400"}`} />
              <span className="text-[10.5px] hidden md:inline font-mono">
                {saveStatus === "saving" ? "Saving..." : "Saved"}
              </span>
            </div>

            {isEditingTitle ? (
              <input
                type="text"
                value={currentProjectTitle}
                autoFocus
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                onChange={(e) => setCurrentProjectTitle(e.target.value)}
                className="bg-[#15151A] text-xs font-medium text-white px-2 py-0.5 rounded border border-white/20 focus:outline-none"
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename project"
                className="flex items-center gap-1.5 text-xs font-medium text-white hover:bg-white/[0.04] px-2 py-1 rounded-md transition-colors cursor-pointer group"
              >
                <span className="max-w-[280px] truncate">{currentProjectTitle}</span>
                <ChevronDown className="w-3 h-3 text-[#7E7E84] group-hover:text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Center / Right Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Play/Pause Button in Topbar */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            title={isPlaying ? "Pause (Space)" : "Preview Play (Space)"}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span className="text-[11px] font-medium hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
          </button>

          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 border-l border-r border-white/[0.08] px-1.5">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              title="Undo (Cmd+Z)"
              className="p-1.5 rounded-md text-[#8E8E93] hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={future.length === 0}
              title="Redo (Cmd+Shift+Z)"
              className="p-1.5 rounded-md text-[#8E8E93] hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-[#8E8E93] hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer focus:outline-none"
              >
                <span>{zoomLevel}</span>
                <ChevronDown className="w-3 h-3 text-[#7E7E84]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-28 bg-[#161619] border-white/10 text-white text-xs z-50">
              {["50%", "75%", "100%", "150%", "Fit"].map((z) => (
                <DropdownMenuItem
                  key={z}
                  onClick={() => setZoomLevel(z)}
                  className="cursor-pointer hover:bg-white/[0.08]"
                >
                  {z}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/20 overflow-hidden flex items-center justify-center text-[10px] font-semibold text-white shadow-xs">
            SS
          </div>

          {/* Translate Button */}
          <button
            type="button"
            onClick={() => setShowTranslateModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Translate</span>
          </button>

          {/* Export Primary Button */}
          <button
            type="button"
            onClick={() => {
              setExportCompleted(false)
              setShowExportModal(true)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={2.2} />
            <span>Export</span>
          </button>

          {/* More Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1.5 rounded-lg text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-[#161619] border-white/10 text-white text-xs z-50">
              <DropdownMenuItem
                onClick={() => {
                  setCanvasBackground("/earth_video_canvas.jpg")
                  showToast("Reset canvas background")
                }}
                className="cursor-pointer hover:bg-white/[0.08]"
              >
                Reset Background
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedLayer("canvas")
                  setActiveInspectorTab("edit")
                }}
                className="cursor-pointer hover:bg-white/[0.08]"
              >
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => showToast("Shortcuts: Space=Play, S=Split, Delete=Remove")}
                className="cursor-pointer hover:bg-white/[0.08]"
              >
                Keyboard Shortcuts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────────
          2. MIDDLE WORKSPACE (Left Panel + Center Canvas + Right Inspector)
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {/* ── LEFT MEDIA / TOOLS PANEL (w-72, 280px) ────────────────────────── */}
        <aside className="w-[280px] shrink-0 border-r border-white/[0.08] bg-[#0E0E12] flex flex-col justify-between overflow-hidden z-20">
          {/* Top Segmented Tool Tabs: Media | Text | Audio | Elements | Effects | More */}
          <div className="p-2 border-b border-white/[0.06] shrink-0">
            <div className="grid grid-cols-6 gap-0.5 bg-[#141418] p-1 rounded-xl border border-white/[0.04]">
              {[
                { id: "media", label: "Media", icon: Film },
                { id: "text", label: "Text", icon: Type },
                { id: "audio", label: "Audio", icon: Music },
                { id: "elements", label: "Elements", icon: Shapes },
                { id: "effects", label: "Effects", icon: Wand2 },
                { id: "more", label: "More", icon: MoreHorizontal },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeLeftTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveLeftTab(tab.id as LeftToolTab)}
                    className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-black shadow-xs font-semibold"
                        : "text-[#8E8E93] hover:text-white hover:bg-white/[0.05]"
                    }`}
                    title={tab.label}
                  >
                    <Icon className="w-3.5 h-3.5 mb-0.5" />
                    <span className="leading-none text-[9.5px]">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab 1: MEDIA PANEL */}
          {activeLeftTab === "media" && (
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3.5">
              {/* Search Bar */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#16161B] border border-white/[0.08] focus-within:border-white/20 transition-colors">
                <Search className="w-3.5 h-3.5 text-[#7E7E84]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search media, clips, or assets..."
                  className="w-full bg-transparent text-xs text-white placeholder:text-[#5E5E66] focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-neutral-500 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
                <button type="button" className="p-1 rounded text-[#7E7E84] hover:text-white transition-colors cursor-pointer">
                  <Filter className="w-3 h-3" />
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {[
                  { id: "all", label: "All" },
                  { id: "videos", label: "Videos" },
                  { id: "images", label: "Images" },
                  { id: "audio", label: "Audio" },
                  { id: "uploads", label: "Uploads" },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setMediaFilter(pill.id as MediaFilter)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer shrink-0 ${
                      mediaFilter === pill.id
                        ? "bg-white text-black font-semibold"
                        : "bg-[#18181D] text-[#8E8E93] hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Import Media Actions */}
              <div>
                <div className="text-[11px] font-medium text-white mb-2">Import media</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddMediaToTimeline("User_Upload_01.mp4", 15, "video")
                      showToast("Uploaded and added to timeline")
                    }}
                    className="p-2 rounded-xl bg-[#15151A] hover:bg-[#1B1B22] border border-white/[0.06] hover:border-white/[0.14] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group shadow-2xs"
                  >
                    <Upload className="w-4 h-4 text-[#8E8E93] group-hover:text-white transition-colors" />
                    <span className="text-[11px] font-medium text-white">Upload</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowRecordModal(true)}
                    className="p-2 rounded-xl bg-[#15151A] hover:bg-[#1B1B22] border border-white/[0.06] hover:border-white/[0.14] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group shadow-2xs"
                  >
                    <Radio className="w-4 h-4 text-[#8E8E93] group-hover:text-rose-400 transition-colors" />
                    <span className="text-[11px] font-medium text-white">Record</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleAddMediaToTimeline("Screen_Recording_Walkthrough.mp4", 24, "video")
                      showToast("Captured screen clip added to timeline")
                    }}
                    className="p-2 rounded-xl bg-[#15151A] hover:bg-[#1B1B22] border border-white/[0.06] hover:border-white/[0.14] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group shadow-2xs"
                  >
                    <Monitor className="w-4 h-4 text-[#8E8E93] group-hover:text-cyan-400 transition-colors" />
                    <span className="text-[11px] font-medium text-white">Screen</span>
                  </button>
                </div>
              </div>

              {/* Atmospheric Dither Textures */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-white">Dither Textures</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { name: "Blueprint Grid", file: "/dither-blueprint.jpg" },
                    { name: "Mono Risograph", file: "/dither-mono.png" },
                    { name: "Halftone Sky", file: "/dither-halftone.png" },
                    { name: "1-Bit Cobalt", file: "/dither-1bit.jpg" },
                  ].map((texture, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setCanvasBackground(texture.file)
                        showToast(`Applied ${texture.name} to canvas`)
                      }}
                      title={`Click to set as Canvas background`}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all cursor-pointer group bg-black ${
                        canvasBackground === texture.file
                          ? "border-cyan-400 ring-1 ring-cyan-400/30"
                          : "border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      <img
                        src={texture.file}
                        alt={texture.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Media (3-Column Grid) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-white">Recent Assets</span>
                  <span className="text-[10px] text-[#7E7E84]">Click to add</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Mountain Landscape", duration: "0:12", file: "/thumb_mountain.jpg" },
                    { name: "Modern Architecture", duration: "0:28", file: "/thumb_architecture.jpg" },
                    { name: "3D Kinetic Ribbon", duration: "1:24", file: "/thumb_ribbon.jpg" },
                    { name: "Speaker Presentation", duration: "0:08", file: "/thumb_person.jpg" },
                    { name: "Food & Beverage", duration: "0:16", file: "/thumb_food.jpg" },
                    { name: "Studio Botanical", duration: "0:10", file: "/thumb_plant.jpg" },
                  ]
                    .filter((item) => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleAddMediaToTimeline(item.name, 12, "video")}
                        title={`Click to add ${item.name} to timeline`}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/[0.08] hover:border-white/[0.25] transition-all cursor-pointer group bg-[#16161B]"
                      >
                        <img
                          src={item.file}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <span className="absolute bottom-1 right-1 font-mono text-[9px] px-1 py-0.2 rounded bg-black/85 text-white font-medium">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Folders */}
              <div className="pt-0.5 space-y-1">
                {[
                  { name: "Brand Assets", count: "12 items" },
                  { name: "Product Screens", count: "43 items" },
                  { name: "Stock Library", count: "2.1K items" },
                ].map((folder, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      handleAddMediaToTimeline(`${folder.name}_clip.mp4`, 14, "video")
                      showToast(`Added asset from ${folder.name} to timeline`)
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-[#141418] hover:bg-[#1A1A20] border border-white/[0.04] hover:border-white/[0.1] text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#8E8E93] group-hover:text-white">
                        <Folder className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{folder.name}</div>
                        <div className="text-[10px] text-[#7E7E84]">{folder.count}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#585860] group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: TEXT PANEL */}
          {activeLeftTab === "text" && (
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3.5">
              <div className="text-[11px] font-medium text-white">Add text layer</div>
              <div className="space-y-1.5">
                {[
                  { label: "Heading", text: "New Headline", size: 84, style: "font-bold text-base" },
                  { label: "Body Text", text: "Explain features clearly in two sentences.", size: 36, style: "font-normal text-xs text-neutral-300" },
                  { label: "Caption", text: "SYNCED KINETIC CAPTION", size: 48, style: "font-mono text-xs uppercase text-amber-300" },
                  { label: "Lower Third", text: "Sarah Chen // Lead Product Designer", size: 38, style: "font-medium text-xs text-cyan-300" },
                ].map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddTextPresetToTimeline(t.label, t.text, t.size)}
                    className="w-full p-2.5 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.06] hover:border-white/[0.15] text-left transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] text-[#8E8E93]">{t.label}</div>
                      <div className={`${t.style} truncate max-w-[190px]`}>{t.text}</div>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-[#7E7E84] group-hover:text-white" />
                  </button>
                ))}
              </div>

              {/* Text Presets */}
              <div className="pt-2">
                <div className="text-[11px] font-medium text-white mb-2">Text Presets</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { title: "Minimal Sans", text: "BUILD\nFAST", size: 76, font: "Inter" },
                    { title: "Cyber Glitch", text: "SYSTEM\nONLINE", size: 68, font: "JetBrains Mono" },
                    { title: "Gradient Punch", text: "NEXT\nGEN", size: 80, font: "Inter" },
                    { title: "Editorial Serif", text: "Pure\nCraft", size: 72, font: "Playfair Display" },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFontFamily(preset.font)
                        handleAddTextPresetToTimeline(preset.title, preset.text, preset.size)
                      }}
                      className="p-2.5 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.06] hover:border-white/20 text-left transition-all cursor-pointer"
                    >
                      <div className="text-[10px] text-[#7E7E84] mb-1">{preset.title}</div>
                      <div className="font-bold text-sm tracking-tight text-white whitespace-pre-line leading-none">
                        {preset.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: AUDIO PANEL */}
          {activeLeftTab === "audio" && (
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3.5">
              <div className="text-[11px] font-medium text-white">Audio Stems</div>

              {/* Upload & Voiceover generator */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddAudioPresetToTimeline("Recorded_Voiceover.mp3", "audio", 45)}
                  className="p-2.5 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.06] text-center transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4 mx-auto mb-1 text-rose-400" />
                  <div className="text-xs font-medium text-white">Voiceover</div>
                  <div className="text-[9.5px] text-[#7E7E84]">Neural voice</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddAudioPresetToTimeline("Custom_Stem.mp3", "audio", 30)}
                  className="p-2.5 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.06] text-center transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                  <div className="text-xs font-medium text-white">Upload Audio</div>
                  <div className="text-[9.5px] text-[#7E7E84]">WAV / MP3</div>
                </button>
              </div>

              {/* Music Library */}
              <div>
                <div className="text-[11px] font-medium text-white mb-2">Background Music</div>
                <div className="space-y-1.5">
                  {[
                    { name: "Ambient Horizon Drive", duration: "2:14", genre: "Synthwave / Chill" },
                    { name: "Lo-Fi Deep Focus", duration: "1:48", genre: "Warm Electronic" },
                    { name: "Corporate Tech Uplift", duration: "2:30", genre: "Modern Acoustic" },
                    { name: "Cinematic Atmosphere", duration: "1:15", genre: "Piano & Strings" },
                  ].map((track, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-[#15151A] border border-white/[0.05] hover:border-white/[0.12] flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => showToast(`Previewing "${track.name}"`)}
                          className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/20 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-emerald-400" />
                        </button>
                        <div>
                          <div className="text-xs font-medium text-white">{track.name}</div>
                          <div className="text-[10px] text-[#7E7E84]">{track.genre} • {track.duration}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddAudioPresetToTimeline(track.name, "music", 55)}
                        className="px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white text-[10.5px] text-white hover:text-black font-medium transition-colors cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sound Effects */}
              <div>
                <div className="text-[11px] font-medium text-white mb-2">Sound Effects</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {["Cinematic Whoosh", "Subtle Click", "Camera Shutter", "Pop Ding", "Glitch Hit", "Sub Drop"].map((sfx, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddAudioPresetToTimeline(`${sfx}.wav`, "audio", 4)}
                      className="p-2 rounded-lg bg-[#141418] hover:bg-[#1A1A22] border border-white/[0.04] text-left text-xs text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span className="truncate">{sfx}</span>
                      <Plus className="w-3 h-3 text-neutral-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: ELEMENTS PANEL */}
          {activeLeftTab === "elements" && (
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3.5">
              <div className="text-[11px] font-medium text-white">Shapes & Graphics</div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Rectangle", icon: Square },
                  { name: "Circle", icon: Circle },
                  { name: "Star/Spark", icon: Sparkles },
                  { name: "Target", icon: Target },
                  { name: "Lightning", icon: Zap },
                  { name: "Arrow", icon: ArrowRightIcon },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        showToast(`Added ${item.name} shape to canvas`)
                      }}
                      className="p-3 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.06] flex flex-col items-center justify-center gap-1.5 cursor-pointer group transition-all"
                    >
                      <Icon className="w-4 h-4 text-[#8E8E93] group-hover:text-white" />
                      <span className="text-[10px] text-neutral-300">{item.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Badges & Lower Thirds */}
              <div className="pt-2">
                <div className="text-[11px] font-medium text-white mb-2">Branded Overlays</div>
                <div className="space-y-1.5">
                  {[
                    { label: "Speaker Intro Badge", desc: "Rounded glass pill with avatar and role" },
                    { label: "Chapter Progress Bar", desc: "Minimal timeline marker along bottom" },
                    { label: "Call to Action Card", desc: "Subscribe & website link popover" },
                  ].map((ov, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => showToast(`Added "${ov.label}" overlay to canvas`)}
                      className="w-full p-2.5 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.05] text-left transition-all cursor-pointer"
                    >
                      <div className="text-xs font-medium text-white">{ov.label}</div>
                      <div className="text-[10.5px] text-[#7E7E84]">{ov.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: EFFECTS PANEL */}
          {activeLeftTab === "effects" && (
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3.5">
              <div className="text-[11px] font-medium text-white">Visual Color & Filters</div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Original", id: "none" },
                  { name: "Teal & Orange", id: "teal-orange" },
                  { name: "1-Bit Dither", id: "dither" },
                  { name: "Warm Gold", id: "warm" },
                  { name: "Noir Mono", id: "mono" },
                  { name: "Cyberpunk", id: "cyber" },
                ].map((eff, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveFilterEffect(eff.id)
                      showToast(`Applied ${eff.name} grade`)
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      activeFilterEffect === eff.id
                        ? "bg-white text-black font-semibold border-white"
                        : "bg-[#15151A] text-neutral-300 border-white/[0.06] hover:text-white hover:bg-[#1C1C24]"
                    }`}
                  >
                    {eff.name}
                  </button>
                ))}
              </div>

              {/* Video Transitions */}
              <div className="pt-2">
                <div className="text-[11px] font-medium text-white mb-2">Transitions</div>
                <div className="space-y-1.5">
                  {["Cross Dissolve", "Whip Pan Cut", "Cinematic Zoom In", "Glitch Slice", "Dip to Black"].map((tr, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => showToast(`Applied ${tr} between scenes`)}
                      className="w-full p-2 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.05] text-left text-xs text-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>{tr}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: MORE PANEL */}
          {activeLeftTab === "more" && (
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3">
              <div className="text-[11px] font-medium text-white">More Utilities</div>
              {[
                { title: "Auto-Generate Subtitles", desc: "Transcribe audio into word-timed captions", action: () => handleExecuteAiCommand("Add captions") },
                { title: "AI Voice Dubbing", desc: "Translate & dub into 32+ global languages", action: () => setShowTranslateModal(true) },
                { title: "Aspect Framing", desc: "Switch between 16:9, 9:16 Vertical, 1:1 Square", action: () => setAspectRatio((a) => (a === "16:9" ? "9:16" : a === "9:16" ? "1:1" : "16:9")) },
                { title: "Brand Kit Sync", desc: "Load approved fonts, colors, and logos", action: () => showToast("Brand Kit synced with workspace") },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={item.action}
                  className="w-full p-2.5 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.06] text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-400">{item.title}</div>
                  <div className="text-[10.5px] text-[#7E7E84] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* ── CENTER VIDEO CANVAS (Primary Focus) ───────────────────────────── */}
        <main
          ref={canvasContainerRef}
          onClick={() => {
            // Click outside text deselects text bounding box
            setIsTextSelected(false)
            setSelectedLayer("canvas")
          }}
          className="flex-1 bg-[#060608] flex flex-col justify-center items-center p-3 relative overflow-hidden"
        >
          {/* Canvas Wrapper */}
          <div className="w-full h-full flex flex-col justify-center items-center relative">
            {/* Aspect Ratio Framing Container */}
            <div
              className={`relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/[0.08] bg-black transition-all duration-300 ${
                aspectRatio === "9:16"
                  ? "w-full max-w-[320px] aspect-[9/16] rounded-2xl"
                  : aspectRatio === "1:1"
                  ? "w-full max-w-[500px] aspect-square rounded-2xl"
                  : "w-full max-w-[840px] aspect-video rounded-xl"
              }`}
            >
              {/* Dynamic Video / Canvas Background */}
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={canvasBackground}
                  alt="Video Canvas Background"
                  className={`w-full h-full object-cover pointer-events-none transition-all duration-500 ${
                    isPlaying ? "scale-105" : "scale-100"
                  } ${
                    activeFilterEffect === "teal-orange"
                      ? "contrast-125 saturate-150 hue-rotate-15"
                      : activeFilterEffect === "warm"
                      ? "sepia-30 contrast-110"
                      : activeFilterEffect === "mono"
                      ? "grayscale contrast-125"
                      : activeFilterEffect === "cyber"
                      ? "hue-rotate-90 saturate-200"
                      : ""
                  }`}
                />
              </div>

              {/* Blueprint Grid Overlay (Toggleable) */}
              {isBlueprintGridActive && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className="absolute inset-0 bg-blueprint-grid opacity-25" />
                </div>
              )}

              {/* ── Overlaid Interactive Text Element with Selection Bounding Box ── */}
              {trackStates.text.visible && (
                <div
                  style={{
                    top: `${posY}px`,
                    left: `${posX}px`,
                    transform: `rotate(${rotation}deg)`,
                  }}
                  onMouseDown={handleMouseDownText}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    setIsEditingInline(true)
                  }}
                  className={`absolute cursor-move select-none z-20 ${
                    isTextSelected ? "z-30" : ""
                  }`}
                >
                  {/* Floating Formatting Toolbar Docked Above Bounding Box */}
                  {isTextSelected && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute -top-11 left-0 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#141418]/95 backdrop-blur-md border border-white/[0.14] text-white text-xs shadow-2xl z-40 whitespace-nowrap"
                    >
                      {/* Font Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer">
                            <span className="font-medium text-xs">{fontFamily}</span>
                            <ChevronDown className="w-3 h-3 text-[#7E7E84]" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36 bg-[#161619] border-white/10 text-white text-xs z-50">
                          {["Inter", "Space Grotesk", "JetBrains Mono", "Playfair Display", "Geist"].map((f) => (
                            <DropdownMenuItem
                              key={f}
                              onClick={() => {
                                setFontFamily(f)
                                pushSnapshot()
                              }}
                              className="cursor-pointer hover:bg-white/10"
                            >
                              {f}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <div className="h-3 w-[1px] bg-white/[0.15] mx-0.5" />

                      {/* Font Size Stepper */}
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer">
                        <span className="font-medium text-xs">{fontSize}</span>
                        <ChevronDown className="w-3 h-3 text-[#7E7E84]" />
                      </div>

                      <div className="h-3 w-[1px] bg-white/[0.15] mx-0.5" />

                      {/* Bold Toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsBold((b) => !b)
                          pushSnapshot()
                        }}
                        className={`p-1 rounded font-bold transition-colors cursor-pointer ${
                          isBold ? "bg-white/20 text-white" : "text-[#8E8E93] hover:text-white"
                        }`}
                      >
                        <Bold className="w-3 h-3" />
                      </button>

                      {/* Italic Toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsItalic((i) => !i)
                          pushSnapshot()
                        }}
                        className={`p-1 rounded italic transition-colors cursor-pointer ${
                          isItalic ? "bg-white/20 text-white" : "text-[#8E8E93] hover:text-white"
                        }`}
                      >
                        <Italic className="w-3 h-3" />
                      </button>

                      <div className="h-3 w-[1px] bg-white/[0.15] mx-0.5" />

                      {/* Alignment */}
                      <button
                        type="button"
                        onClick={() => {
                          setTextAlign((prev) => (prev === "left" ? "center" : prev === "center" ? "right" : "left"))
                          pushSnapshot()
                        }}
                        className="p-1 rounded text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
                      >
                        {textAlign === "left" ? <AlignLeft className="w-3 h-3" /> : textAlign === "center" ? <AlignCenter className="w-3 h-3" /> : <AlignRight className="w-3 h-3" />}
                      </button>

                      <div className="h-3 w-[1px] bg-white/[0.15] mx-0.5" />

                      {/* Animation indicator */}
                      <span className="text-[10px] text-neutral-300 font-mono px-1.5 py-0.5 rounded bg-white/[0.06]">
                        {textAnimation}
                      </span>
                    </div>
                  )}

                  {/* Bounding Box Frame & Resize Handles */}
                  <div
                    className={`relative p-2 border transition-all ${
                      isTextSelected
                        ? "border-blue-400/90 ring-1 ring-blue-400/30"
                        : "border-transparent"
                    }`}
                  >
                    {/* Subtle 4x2 Dot Matrix Grid on Left (matching reference screenshot) */}
                    <div className="absolute -left-7 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-1.5 opacity-60 pointer-events-none">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-white/50" />
                      ))}
                    </div>

                    {/* Corner Resize Handles */}
                    {isTextSelected && (
                      <>
                        <div
                          onMouseDown={handleMouseDownResize}
                          className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-blue-500 shadow-xs cursor-nwse-resize"
                        />
                        <div
                          onMouseDown={handleMouseDownResize}
                          className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-white border-2 border-blue-500 shadow-xs cursor-nesw-resize"
                        />
                        <div
                          onMouseDown={handleMouseDownResize}
                          className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-blue-500 shadow-xs cursor-nesw-resize"
                        />
                        <div
                          onMouseDown={handleMouseDownResize}
                          className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full bg-white border-2 border-blue-500 shadow-xs cursor-nwse-resize"
                        />
                      </>
                    )}

                    {/* Inline Text Input or Rendered Display */}
                    {isEditingInline ? (
                      <textarea
                        value={canvasText}
                        autoFocus
                        onBlur={() => setIsEditingInline(false)}
                        onChange={(e) => setCanvasText(e.target.value)}
                        style={{
                          fontFamily,
                          fontSize: `${fontSize * 0.72}px`,
                          fontWeight: isBold ? 700 : 400,
                          fontStyle: isItalic ? "italic" : "normal",
                          textAlign,
                          color: textColor,
                          lineHeight: 1.05,
                        }}
                        className="bg-transparent border-none text-white focus:outline-none resize-none overflow-hidden"
                        rows={canvasText.split("\n").length}
                      />
                    ) : (
                      <div
                        style={{
                          fontFamily,
                          fontSize: `${fontSize * 0.72}px`,
                          fontWeight: isBold ? 700 : 400,
                          fontStyle: isItalic ? "italic" : "normal",
                          textAlign,
                          color: textColor,
                          opacity: textOpacity / 100,
                          lineHeight: 1.05,
                          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                        }}
                        className="whitespace-pre-line font-bold tracking-tight"
                      >
                        {canvasText}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Floating Video Player Control Bar Overlaid Inside Canvas at Bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#0E0E12]/90 backdrop-blur-md border border-white/[0.08] text-xs z-30">
                {/* Left: Play / Pause + Timecode */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsPlaying((p) => !p)
                    }}
                    className="p-1 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  </button>
                  <span className="font-mono text-[11px] text-[#A1A1A8]">
                    {formatTime(currentTime)} / 02:10
                  </span>
                </div>

                {/* Center: Scrubber Bar */}
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    const rect = e.currentTarget.getBoundingClientRect()
                    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                    setCurrentTime(Number((percent * totalDuration).toFixed(2)))
                  }}
                  className="flex-1 max-w-[420px] mx-4 h-1.5 rounded-full bg-white/15 hover:bg-white/20 transition-all cursor-pointer relative"
                >
                  <div
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                    className="h-full rounded-full bg-white relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                  </div>
                </div>

                {/* Right: Speed + Grid + Aspect + Fullscreen */}
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-[10.5px] text-[#A1A1A8] hover:text-white font-mono cursor-pointer"
                      >
                        {playbackSpeed}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20 bg-[#161619] border-white/10 text-white text-xs z-50">
                      {["0.5x", "1x", "1.5x", "2x"].map((s) => (
                        <DropdownMenuItem
                          key={s}
                          onClick={() => setPlaybackSpeed(s)}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          {s}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Blueprint Grid Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsBlueprintGridActive((p) => !p)
                    }}
                    title="Toggle Technical Blueprint Grid"
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                      isBlueprintGridActive
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                        : "bg-white/[0.06] text-[#A1A1A8] hover:text-white"
                    }`}
                  >
                    <span>GRID</span>
                    <span className="text-[8px]">{isBlueprintGridActive ? "ON" : "OFF"}</span>
                  </button>

                  {/* Aspect Ratio Mode */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        title="Aspect framing"
                        className="p-1 rounded text-[#7E7E84] hover:text-white transition-colors cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32 bg-[#161619] border-white/10 text-white text-xs z-50">
                      {[
                        { label: "16:9 Landscape", val: "16:9" },
                        { label: "9:16 Vertical", val: "9:16" },
                        { label: "1:1 Square", val: "1:1" },
                        { label: "4:5 Social", val: "4:5" },
                      ].map((item) => (
                        <DropdownMenuItem
                          key={item.val}
                          onClick={() => {
                            setAspectRatio(item.val as AspectRatioMode)
                            showToast(`Aspect ratio set to ${item.label}`)
                          }}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          {item.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen()
                        setIsFullscreen(true)
                      } else {
                        document.exitFullscreen()
                        setIsFullscreen(false)
                      }
                    }}
                    title="Toggle Fullscreen"
                    className="p-1 rounded text-[#7E7E84] hover:text-white transition-colors cursor-pointer"
                  >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ── RIGHT INSPECTOR PANEL (w-64, 260px) ───────────────────────────── */}
        <aside className="w-[260px] shrink-0 border-l border-white/[0.08] bg-[#0E0E12] flex flex-col justify-between overflow-y-auto no-scrollbar z-20">
          {/* Top Segmented Tabs: Edit | Animation | AI Tools */}
          <div className="p-2 border-b border-white/[0.06] shrink-0">
            <div className="grid grid-cols-3 gap-1 bg-[#141418] p-1 rounded-xl border border-white/[0.04]">
              {[
                { id: "edit", label: "Edit" },
                { id: "animation", label: "Animation" },
                { id: "ai", label: "AI Tools" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveInspectorTab(tab.id as InspectorTab)}
                  className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeInspectorTab === tab.id
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "text-[#8E8E93] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inspector Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-4">
            {activeInspectorTab === "edit" && (
              <>
                {/* Mode 1: Contextual Text Selected */}
                {selectedLayer === "text" || isTextSelected ? (
                  <>
                    {/* Text Input Section */}
                    <div>
                      <label className="text-[11px] font-medium text-[#8E8E93] block mb-1.5">Text</label>
                      <textarea
                        rows={3}
                        value={canvasText}
                        onChange={(e) => {
                          setCanvasText(e.target.value)
                          // Update corresponding timeline clip label
                          setClips((prev) =>
                            prev.map((c) =>
                              c.id === selectedClipId ? { ...c, title: e.target.value.split("\n")[0] || "Text" } : c
                            )
                          )
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white placeholder:text-[#5E5E66] focus:outline-none focus:border-white/20 resize-none font-normal leading-relaxed"
                      />
                    </div>

                    {/* Style Section */}
                    <div>
                      <label className="text-[11px] font-medium text-[#8E8E93] block mb-1.5">Style</label>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {/* Font Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex items-center justify-between p-2 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white hover:border-white/20 cursor-pointer"
                            >
                              <span className="truncate">{fontFamily}</span>
                              <ChevronDown className="w-3 h-3 text-[#7E7E84]" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-36 bg-[#161619] border-white/10 text-white text-xs z-50">
                            {["Inter", "Space Grotesk", "JetBrains Mono", "Playfair Display", "Geist"].map((f) => (
                              <DropdownMenuItem
                                key={f}
                                onClick={() => setFontFamily(f)}
                                className="cursor-pointer hover:bg-white/10"
                              >
                                {f}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Font Size */}
                        <div className="flex items-center justify-between p-2 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white">
                          <input
                            type="number"
                            min="12"
                            max="160"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-12 bg-transparent text-white focus:outline-none font-mono"
                          />
                          <span className="text-[10px] text-[#7E7E84]">px</span>
                        </div>
                      </div>

                      {/* Format Buttons */}
                      <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#15151A] border border-white/[0.06]">
                        <button
                          type="button"
                          onClick={() => setIsBold((b) => !b)}
                          className={`py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                            isBold ? "bg-white/20 text-white" : "text-[#8E8E93] hover:text-white"
                          }`}
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsItalic((i) => !i)}
                          className={`py-1 rounded text-xs italic transition-colors cursor-pointer ${
                            isItalic ? "bg-white/20 text-white" : "text-[#8E8E93] hover:text-white"
                          }`}
                        >
                          I
                        </button>
                        <button
                          type="button"
                          onClick={() => setTextAlign("left")}
                          className={`py-1 rounded text-xs transition-colors cursor-pointer ${
                            textAlign === "left" ? "bg-white/20 text-white" : "text-[#8E8E93] hover:text-white"
                          }`}
                        >
                          <AlignLeft className="w-3 h-3 mx-auto" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setTextAlign("center")}
                          className={`py-1 rounded text-xs transition-colors cursor-pointer ${
                            textAlign === "center" ? "bg-white/20 text-white" : "text-[#8E8E93] hover:text-white"
                          }`}
                        >
                          <AlignCenter className="w-3 h-3 mx-auto" />
                        </button>
                      </div>
                    </div>

                    {/* Color & Opacity */}
                    <div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-[#15151A] border border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-4 h-4 rounded border-none cursor-pointer bg-transparent"
                          />
                          <span className="font-mono text-xs text-white uppercase">{textColor}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#8E8E93]">
                          <span>{textOpacity}%</span>
                          <ChevronDown className="w-3 h-3 text-[#7E7E84]" />
                        </div>
                      </div>
                    </div>

                    {/* Text Style Presets */}
                    <div>
                      <label className="text-[11px] font-medium text-[#8E8E93] block mb-1.5">Text style</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "default", label: "Default", size: 72 },
                          { id: "title", label: "Title", size: 84 },
                          { id: "subtitle", label: "Subtitle", size: 48 },
                        ].map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              setTextStylePreset(preset.id as any)
                              setFontSize(preset.size)
                              pushSnapshot()
                            }}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                              textStylePreset === preset.id
                                ? "bg-[#181820] border-blue-400 text-white"
                                : "bg-[#15151A] border-white/[0.06] text-[#8E8E93] hover:text-white"
                            }`}
                          >
                            {textStylePreset === preset.id && (
                              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
                            )}
                            <div className="text-sm font-semibold mb-0.5">Aa</div>
                            <div className="text-[10px] text-[#7E7E84]">{preset.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Position */}
                    <div>
                      <label className="text-[11px] font-medium text-[#8E8E93] block mb-1.5">Position</label>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs">
                          <span className="text-[#7E7E84]">X</span>
                          <input
                            type="number"
                            value={posX}
                            onChange={(e) => setPosX(Number(e.target.value))}
                            className="w-12 bg-transparent text-right text-white font-mono focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs">
                          <span className="text-[#7E7E84]">Y</span>
                          <input
                            type="number"
                            value={posY}
                            onChange={(e) => setPosY(Number(e.target.value))}
                            className="w-12 bg-transparent text-right text-white font-mono focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs">
                        <span className="text-[#7E7E84]">R (Rotation)</span>
                        <input
                          type="number"
                          value={rotation}
                          onChange={(e) => setRotation(Number(e.target.value))}
                          className="w-12 bg-transparent text-right text-white font-mono focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Blend */}
                    <div>
                      <label className="text-[11px] font-medium text-[#8E8E93] block mb-1.5">Blend Mode</label>
                      <div className="grid grid-cols-2 gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white"
                            >
                              <span>{blendMode}</span>
                              <ChevronDown className="w-3 h-3 text-[#7E7E84]" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-28 bg-[#161619] border-white/10 text-white text-xs z-50">
                            {["Normal", "Multiply", "Screen", "Overlay"].map((m) => (
                              <DropdownMenuItem key={m} onClick={() => setBlendMode(m)}>
                                {m}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white">
                          <span>100%</span>
                          <ChevronDown className="w-3 h-3 text-[#7E7E84]" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : selectedLayer === "video" || selectedClip?.trackId === "video" ? (
                  /* Mode 2: Video Clip Selected */
                  <div className="space-y-3.5">
                    <div className="text-xs font-semibold text-white">Video Track Properties</div>
                    <div>
                      <label className="text-[11px] text-[#8E8E93] block mb-1">Clip Title</label>
                      <input
                        type="text"
                        value={selectedClip?.title || "Video Track"}
                        onChange={(e) => {
                          const val = e.target.value
                          setClips((prev) => prev.map((c) => (c.id === selectedClipId ? { ...c, title: val } : c)))
                        }}
                        className="w-full p-2 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#8E8E93] block mb-1">Scale / Framing</label>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                        {["Fit", "Fill", "Original"].map((m) => (
                          <button key={m} type="button" className="p-1.5 rounded-lg bg-[#15151A] border border-white/[0.08] text-neutral-300 hover:text-white">
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#8E8E93] block mb-1">Duration</label>
                      <div className="p-2 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs font-mono text-white">
                        {selectedClip?.duration || 65}s (~{formatTime(selectedClip?.duration || 65)})
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mode 3: Nothing Selected / Project Settings */
                  <div className="space-y-3.5">
                    <div className="text-xs font-semibold text-white">Project Settings</div>
                    <div>
                      <label className="text-[11px] text-[#8E8E93] block mb-1">Resolution</label>
                      <div className="p-2 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white flex justify-between">
                        <span>4K UHD (3840 × 2160)</span>
                        <span className="text-neutral-400 font-mono">16:9</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#8E8E93] block mb-1">Frame Rate</label>
                      <div className="grid grid-cols-3 gap-1.5 text-xs text-center">
                        {["24 FPS", "30 FPS", "60 FPS"].map((fps) => (
                          <button
                            key={fps}
                            type="button"
                            onClick={() => {
                              setExportFps(fps.replace(/\D/g, ""))
                              showToast(`Set project timeline to ${fps}`)
                            }}
                            className={`p-1.5 rounded-lg border ${
                              exportFps === fps.replace(/\D/g, "")
                                ? "bg-white text-black font-semibold border-white"
                                : "bg-[#15151A] text-neutral-300 border-white/[0.08]"
                            }`}
                          >
                            {fps}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#8E8E93] block mb-1">Audio Master</label>
                      <div className="p-2 rounded-xl bg-[#15151A] border border-white/[0.08] text-xs text-white">
                        48.0 kHz • 24-bit Stereo
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Animation Tab */}
            {activeInspectorTab === "animation" && (
              <div className="space-y-3">
                <div className="text-xs text-[#8E8E93]">In-Animation Presets</div>
                {[
                  { name: "Kinetic Word Pop", desc: "Words pop onto screen with soft spring" },
                  { name: "Smooth Typewriter", desc: "Character reveal synced to voiceover pace" },
                  { name: "3D Perspective Tilt", desc: "Slight camera tilt into screen horizon" },
                  { name: "Cinematic Blur Fade", desc: "Subtle optical blur dissolving into sharp focus" },
                ].map((anim, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTextAnimation(anim.name)
                      showToast(`Applied ${anim.name}`)
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer group ${
                      textAnimation === anim.name
                        ? "bg-[#181824] border-cyan-400 text-white"
                        : "bg-[#15151A] hover:bg-[#1B1B22] border-white/[0.06] hover:border-white/[0.14]"
                    }`}
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {anim.name}
                    </div>
                    <div className="text-[10.5px] text-[#7E7E84] mt-0.5">{anim.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {/* AI Tools Tab */}
            {activeInspectorTab === "ai" && (
              <div className="space-y-2.5">
                <div className="text-xs text-[#8E8E93]">Cardboard AI Utilities</div>
                {[
                  { title: "Rewrite Text", desc: "Improve selected text & punch up tone", fn: () => {
                    setCanvasText("Create\nwithout\nlimits")
                    showToast("AI polished headline text")
                  }},
                  { title: "Generate Neural Voice", desc: "Synthesize voiceover matched to scene", fn: () => handleAddAudioPresetToTimeline("Neural_AI_Voice.mp3", "audio", 38) },
                  { title: "Translate Project", desc: "Translate video & voice into 32+ languages", fn: () => setShowTranslateModal(true) },
                  { title: "Remove Silence", desc: "Trim dead air pauses > 0.4s across all tracks", fn: () => handleExecuteAiCommand("Remove silence") },
                  { title: "Auto-Captions", desc: "Generate kinetic word-by-word subtitles", fn: () => handleExecuteAiCommand("Add captions") },
                ].map((tool, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={tool.fn}
                    className="w-full p-2.5 rounded-xl bg-[#15151A] hover:bg-[#1C1C24] border border-white/[0.06] hover:border-white/[0.14] text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        {tool.title}
                      </span>
                      <Sparkles className="w-3 h-3 text-[#7E7E84] group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <p className="text-[10.5px] text-[#7E7E84] mt-0.5 leading-snug">{tool.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          3. AI DIRECTOR COMMAND BAR (Docked Between Canvas & Timeline)
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="px-3 py-1.5 bg-[#09090D] border-t border-white/[0.06] flex items-center justify-between gap-3 shrink-0 z-20">
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#14141A] border border-white/[0.08] focus-within:border-white/20 flex-1">
            <Sparkles className={`w-3.5 h-3.5 text-cyan-400 shrink-0 ${isAiProcessing ? "animate-spin" : ""}`} />
            <input
              type="text"
              value={aiPromptInput}
              onChange={(e) => setAiPromptInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleExecuteAiCommand(aiPromptInput)}
              placeholder="Tell Cardboard what to change... (e.g. Make intro 2s shorter, Add captions)"
              className="w-full bg-transparent text-xs text-white placeholder:text-[#6E6E78] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleExecuteAiCommand(aiPromptInput)}
              disabled={!aiPromptInput.trim() || isAiProcessing}
              className="p-1 rounded text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Suggested AI Quick Commands */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            "Make intro 2s shorter",
            "Add captions",
            "Remove silence",
            "Make this vertical",
            "Add background music",
          ].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleExecuteAiCommand(prompt)}
              className="px-2 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.06] text-[10.5px] text-[#A1A1A8] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          4. BOTTOM MULTI-TRACK TIMELINE (Full Width Desktop NLE)
      ───────────────────────────────────────────────────────────────────────── */}
      <footer className="h-[225px] border-t border-white/[0.08] bg-[#0A0A0E] flex flex-col shrink-0 z-20">
        {/* Timeline Toolbar Across Top */}
        <div className="h-9 border-b border-white/[0.06] bg-[#0D0D12] flex items-center justify-between px-3">
          {/* Left Edit Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              title="Track options"
              className="p-1 rounded text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleUndo}
              title="Undo (Cmd+Z)"
              className="p-1 rounded text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              title="Redo (Cmd+Shift+Z)"
              className="p-1 rounded text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
            <div className="h-3 w-[1px] bg-white/[0.1] mx-1" />
            <button
              type="button"
              onClick={handleSplitClip}
              title="Split clip at playhead (S)"
              className="p-1 rounded text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <Scissors className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleDuplicateClip}
              title="Duplicate clip"
              className="p-1 rounded text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleDeleteClip}
              title="Delete clip (Backspace)"
              className="p-1 rounded text-[#8E8E93] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Timecode */}
          <div className="font-mono text-xs font-semibold text-white tracking-wider">
            {formatPreciseTimecode(currentTime)} / 02:10:00
          </div>

          {/* Right Controls: Mic, Volume, Zoom */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowRecordModal(true)}
              title="Record voiceover"
              className="p-1 rounded text-[#8E8E93] hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            {/* Volume slider */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="text-[#8E8E93] hover:text-white"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => setTimelineZoom((z) => Math.max(0.6, z - 0.2))}
                className="p-1 text-[#8E8E93] hover:text-white cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTimelineZoom((z) => Math.min(2.5, z + 0.2))}
                className="p-1 text-[#8E8E93] hover:text-white cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Tracks Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Track Headers Column on Left */}
          <div className="w-[120px] shrink-0 border-r border-white/[0.06] bg-[#0C0C10] flex flex-col justify-around py-1 px-2 text-xs">
            {/* Track 1: Text */}
            <div className="flex items-center justify-between text-[#8E8E93] h-9">
              <div className="flex items-center gap-1.5 font-medium">
                <Type className="w-3.5 h-3.5" />
                <span>Text</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      text: { ...prev.text, visible: !prev.text.visible },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.text.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      text: { ...prev.text, locked: !prev.text.locked },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.text.locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Track 2: Video */}
            <div className="flex items-center justify-between text-[#8E8E93] h-11">
              <div className="flex items-center gap-1.5 font-medium">
                <Film className="w-3.5 h-3.5" />
                <span>Video</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      video: { ...prev.video, visible: !prev.video.visible },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.video.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      video: { ...prev.video, locked: !prev.video.locked },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.video.locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Track 3: Audio */}
            <div className="flex items-center justify-between text-[#8E8E93] h-9">
              <div className="flex items-center gap-1.5 font-medium">
                <Mic className="w-3.5 h-3.5" />
                <span>Audio</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      audio: { ...prev.audio, visible: !prev.audio.visible },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.audio.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      audio: { ...prev.audio, locked: !prev.audio.locked },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.audio.locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Track 4: Music */}
            <div className="flex items-center justify-between text-[#8E8E93] h-9">
              <div className="flex items-center gap-1.5 font-medium">
                <Music className="w-3.5 h-3.5" />
                <span>Music</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      music: { ...prev.music, visible: !prev.music.visible },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.music.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTrackStates((prev) => ({
                      ...prev,
                      music: { ...prev.music, locked: !prev.music.locked },
                    }))
                  }
                  className="hover:text-white cursor-pointer"
                >
                  {trackStates.music.locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Track Lanes + Timeline Ruler */}
          <div className="flex-1 overflow-x-auto no-scrollbar relative flex flex-col justify-between py-1 bg-[#09090D]">
            {/* Timeline Ruler */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const clickX = e.clientX - rect.left
                const newSec = Math.max(0, clickX / (12 * timelineZoom))
                setCurrentTime(Math.min(totalDuration, Number(newSec.toFixed(2))))
              }}
              className="h-5 border-b border-white/[0.06] flex items-center text-[10px] font-mono text-[#6E6E74] select-none cursor-pointer relative"
            >
              {Array.from({ length: 14 }).map((_, idx) => {
                const sec = idx * 10
                const mins = Math.floor(sec / 60)
                const remainSec = sec % 60
                const label = `${mins}:${String(remainSec).padStart(2, "0")}`
                return (
                  <div
                    key={idx}
                    style={{ left: `${sec * 12 * timelineZoom}px` }}
                    className="absolute top-0 bottom-0 flex items-center border-l border-white/[0.08] pl-1"
                  >
                    {label}
                  </div>
                )
              })}
            </div>

            {/* Draggable Vertical Playhead Line with Circle Head */}
            <div
              style={{ left: `${currentTime * 12 * timelineZoom}px` }}
              className="absolute top-0 bottom-0 w-[1.5px] bg-white z-30 pointer-events-none transition-none"
            >
              <div className="absolute -top-1 -left-[5px] w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>

            {/* Track 1: Text Clips */}
            <div className="h-9 relative flex items-center">
              {clips
                .filter((c) => c.trackId === "text")
                .map((clip) => (
                  <div
                    key={clip.id}
                    onClick={() => {
                      setSelectedClipId(clip.id)
                      setSelectedLayer("text")
                      setIsTextSelected(true)
                    }}
                    style={{
                      left: `${clip.start * 12 * timelineZoom}px`,
                      width: `${clip.duration * 12 * timelineZoom}px`,
                    }}
                    className={`absolute h-7 rounded-lg border px-2.5 flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-all shadow-xs ${
                      clip.colorClass
                    } ${
                      selectedClipId === clip.id
                        ? "ring-2 ring-white/70 brightness-110"
                        : "hover:brightness-105"
                    }`}
                  >
                    <Type className="w-3 h-3 shrink-0" />
                    <span className="truncate">{clip.title}</span>
                  </div>
                ))}
            </div>

            {/* Track 2: Video Filmstrip */}
            <div className="h-11 relative flex items-center">
              <div
                style={{
                  left: "0px",
                  width: `${65 * 12 * timelineZoom}px`,
                }}
                onClick={() => {
                  setSelectedLayer("video")
                  setSelectedClipId("clip-video-1")
                }}
                className={`absolute h-9 rounded-lg border border-white/10 overflow-hidden flex cursor-pointer bg-neutral-900 shadow-sm ${
                  selectedClipId === "clip-video-1" ? "ring-2 ring-white/70" : ""
                }`}
              >
                <img
                  src="/timeline_filmstrip_exact.jpg"
                  alt="Video Filmstrip"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Track 3: Voiceover Audio Track */}
            <div className="h-9 relative flex items-center">
              {clips
                .filter((c) => c.trackId === "audio")
                .map((clip) => (
                  <div
                    key={clip.id}
                    onClick={() => {
                      setSelectedClipId(clip.id)
                      setSelectedLayer("audio")
                    }}
                    style={{
                      left: `${clip.start * 12 * timelineZoom}px`,
                      width: `${clip.duration * 12 * timelineZoom}px`,
                    }}
                    className={`absolute h-7 rounded-lg border px-2.5 flex items-center gap-2 text-xs font-medium cursor-pointer transition-all ${
                      clip.colorClass
                    } ${
                      selectedClipId === clip.id ? "ring-2 ring-white/70" : "hover:brightness-105"
                    }`}
                  >
                    <Mic className="w-3 h-3 shrink-0" />
                    <span className="truncate">{clip.title}</span>
                    {/* Simulated Waveform Peaks */}
                    <div className="flex-1 h-3 flex items-center gap-0.5 opacity-70 overflow-hidden">
                      {Array.from({ length: 42 }).map((_, i) => (
                        <div
                          key={i}
                          style={{ height: `${Math.sin(i * 0.4 + (clip.waveformSeed || 0)) * 8 + 4}px` }}
                          className="w-[1.5px] rounded-full bg-blue-200"
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Track 4: Ambient Music Track */}
            <div className="h-9 relative flex items-center">
              {clips
                .filter((c) => c.trackId === "music")
                .map((clip) => (
                  <div
                    key={clip.id}
                    onClick={() => {
                      setSelectedClipId(clip.id)
                      setSelectedLayer("music")
                    }}
                    style={{
                      left: `${clip.start * 12 * timelineZoom}px`,
                      width: `${clip.duration * 12 * timelineZoom}px`,
                    }}
                    className={`absolute h-7 rounded-lg border px-2.5 flex items-center gap-2 text-xs font-medium cursor-pointer transition-all ${
                      clip.colorClass
                    } ${
                      selectedClipId === clip.id ? "ring-2 ring-white/70" : "hover:brightness-105"
                    }`}
                  >
                    <Music className="w-3 h-3 shrink-0" />
                    <span className="truncate">{clip.title}</span>
                    {/* Smooth Waveform */}
                    <div className="flex-1 h-3 flex items-center gap-0.5 opacity-70 overflow-hidden">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div
                          key={i}
                          style={{ height: `${Math.cos(i * 0.3 + (clip.waveformSeed || 0)) * 6 + 3}px` }}
                          className="w-[1.5px] rounded-full bg-emerald-200"
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────────────────
          5. MODALS & DIALOGS
      ───────────────────────────────────────────────────────────────────────── */}
      {/* EXPORT MODAL */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="sm:max-w-[480px] bg-[#121216] border border-white/10 text-white p-6 shadow-2xl z-50">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              {exportCompleted ? "Export Complete 🎉" : "Export Production Video"}
            </DialogTitle>
            <DialogDescription className="text-[#8E8E93] text-xs">
              {exportCompleted
                ? "Your video has been rendered and encoded successfully."
                : "Render final timeline in studio-grade ProRes or hardware-accelerated MP4."}
            </DialogDescription>
          </DialogHeader>

          {!exportCompleted && !isExporting && (
            <div className="space-y-3.5 mt-4">
              <div>
                <label className="text-xs font-medium text-[#8E8E93] block mb-1.5">Resolution</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "4k", label: "4K UHD", res: "3840 x 2160" },
                    { id: "1080p", label: "1080p HD", res: "1920 x 1080" },
                    { id: "720p", label: "720p", res: "1280 x 720" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setExportQuality(r.id)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        exportQuality === r.id
                          ? "bg-white text-black font-semibold border-white"
                          : "bg-[#18181F] text-[#8E8E93] border-white/[0.06] hover:text-white"
                      }`}
                    >
                      <div className="text-xs">{r.label}</div>
                      <div className="text-[10px] opacity-70">{r.res}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#8E8E93] block mb-1.5">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {["mp4", "prores", "webm"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setExportFormat(f)}
                      className={`p-2 rounded-xl border text-center text-xs uppercase font-medium transition-all cursor-pointer ${
                        exportFormat === f
                          ? "bg-white text-black font-semibold border-white"
                          : "bg-[#18181F] text-[#8E8E93] border-white/[0.06] hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#8E8E93] block mb-1.5">Frame Rate</label>
                <div className="grid grid-cols-3 gap-2">
                  {["24", "30", "60"].map((fps) => (
                    <button
                      key={fps}
                      type="button"
                      onClick={() => setExportFps(fps)}
                      className={`p-2 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                        exportFps === fps
                          ? "bg-white text-black font-semibold border-white"
                          : "bg-[#18181F] text-[#8E8E93] border-white/[0.06] hover:text-white"
                      }`}
                    >
                      {fps} FPS
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">Burn-in Kinetic Subtitles</div>
                  <div className="text-[10.5px] text-[#8E8E93]">Embed animated captions into video stream</div>
                </div>
                <input
                  type="checkbox"
                  checked={exportBurnCaptions}
                  onChange={(e) => setExportBurnCaptions(e.target.checked)}
                  className="rounded accent-white w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/[0.08]">
                <span className="text-xs text-[#8E8E93]">Estimated duration: ~2m 10s • Size: ~48 MB</span>
                <button
                  type="button"
                  onClick={handleStartExport}
                  className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer shadow-sm"
                >
                  Start Export
                </button>
              </div>
            </div>
          )}

          {/* Export Progress State */}
          {isExporting && (
            <div className="py-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto" />
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">{exportStage}</div>
                <div className="text-xs text-neutral-400 font-mono">{exportProgress}% rendered</div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  style={{ width: `${exportProgress}%` }}
                  className="bg-white h-full transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Export Completed State */}
          {exportCompleted && (
            <div className="py-4 space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden border border-white/20 relative group">
                <img src={canvasBackground} alt="Exported Video" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white font-mono">
                    {currentProjectTitle}_{exportQuality}.{exportFormat}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://cardboard.ai/share/${Date.now()}`)
                    showToast("Share link copied to clipboard")
                  }}
                  className="px-3 py-2.5 rounded-xl bg-[#18181F] hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Copy Link
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* TRANSLATE MODAL */}
      <Dialog open={showTranslateModal} onOpenChange={setShowTranslateModal}>
        <DialogContent className="sm:max-w-[440px] bg-[#121216] border border-white/10 text-white p-6 shadow-2xl z-50">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              AI Dubbing & Translation
            </DialogTitle>
            <DialogDescription className="text-[#8E8E93] text-xs">
              Translate voiceover and synchronize captions across 32+ global languages.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto no-scrollbar">
            {[
              "Spanish (Latin America)",
              "German (Standard)",
              "Japanese (Tokyo)",
              "French (Paris)",
              "Hindi (Standard)",
              "Portuguese (Brazil)",
              "Italian",
              "Korean",
            ].map((lang, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setShowTranslateModal(false)
                  showToast(`Dubbing video to ${lang}... Dubbed!`)
                }}
                className="w-full p-2.5 rounded-xl bg-[#18181F] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-between text-xs font-medium text-white transition-colors cursor-pointer"
              >
                <span>{lang}</span>
                <Languages className="w-3.5 h-3.5 text-[#7E7E84]" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* RECORD WEBCAM / AUDIO MODAL */}
      <Dialog open={showRecordModal} onOpenChange={setShowRecordModal}>
        <DialogContent className="sm:max-w-[460px] bg-[#121216] border border-white/10 text-white p-6 shadow-2xl z-50">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Studio Camera & Mic Recording
            </DialogTitle>
            <DialogDescription className="text-[#8E8E93] text-xs">
              Record presenter webcam feed or studio microphone track.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="aspect-video bg-neutral-900 rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
              <img src="/thumb_person.jpg" alt="Webcam Simulation" className="w-full h-full object-cover opacity-80" />
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-600/90 text-[10px] font-mono font-semibold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE PREVIEW
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-neutral-400">Audio input: MacBook Pro Mic (High Quality)</span>
              <button
                type="button"
                onClick={() => {
                  setShowRecordModal(false)
                  handleAddMediaToTimeline("Presenter_Live_Capture.mp4", 18, "video")
                  showToast("Recording captured and added to timeline!")
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm"
              >
                Insert Recording
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
