"use client"

import React, { useState, useRef, useMemo } from "react"
import {
  Upload,
  Copy,
  Plus,
  Trash2,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Play,
  Pause,
  RotateCcw,
  Image as ImageIcon,
  Music,
  Video,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Grid3x3,
  List,
  Search,
  Sliders,
  Sparkles,
  ExternalLink,
  Film,
  Download,
  X,
  Volume2,
  Folder,
} from "lucide-react"
import { CardboardIcon } from "./cardboard-logo"

// ─── Interfaces ──────────────────────────────────────────────────────────────
export interface BrandColor {
  id: string
  label: string
  hex: string
}

export interface BrandFont {
  family: string
  size: number
  weight: string
}

export interface CaptionStyle {
  font: string
  size: number
  weight: string
  color: string
  highlight: string
  background: string
  position: "top" | "middle" | "bottom"
  wordsPerLine: number
  animation: string
}

export interface WatermarkConfig {
  enabled: boolean
  logoKey: "primary" | "light" | "dark" | "mark"
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  size: number // percentage 8-40%
  opacity: number // 10-100%
}

export interface VideoBumper {
  name: string
  duration: string
  thumbnail: string
  isSet: boolean
}

export interface BrandAssetItem {
  id: string
  category: string
  name: string
  type: string
  size: string
  previewUrl?: string
}

export interface BrandWorkspaceProps {
  onOpenStudio?: (title?: string) => void
}

// ─── Color Swatch Component ──────────────────────────────────────────────────
function ColorSwatchItem({
  color,
  onColorChange,
  onRemove,
  canRemove,
}: {
  color: BrandColor
  onColorChange: (newHex: string) => void
  onRemove?: () => void
  canRemove?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(color.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E12] border border-white/[0.08] hover:border-white/[0.16] transition-colors group">
      {/* Clickable Swatch Tile */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-8 h-8 rounded-md shrink-0 border border-white/15 cursor-pointer relative shadow-xs transition-transform active:scale-95"
        style={{ backgroundColor: color.hex }}
        title="Click to open color picker"
      />
      <input
        ref={inputRef}
        type="color"
        value={color.hex}
        onChange={(e) => onColorChange(e.target.value)}
        className="sr-only"
      />

      {/* Label & Hex */}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-[#7E7E84] font-mono uppercase tracking-wider leading-none">
          {color.label}
        </div>
        <div className="text-[12px] font-mono text-white font-medium mt-1 uppercase">
          {color.hex}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={handleCopy}
          title="Copy HEX code"
          className="p-1 rounded text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        {canRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            title="Remove color"
            className="p-1 rounded text-[#8E8E93] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Section Card Wrapper ────────────────────────────────────────────────────
function SectionCard({
  title,
  subtitle,
  children,
  badge,
  action,
}: {
  title: string
  subtitle?: string
  badge?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="border border-white/[0.08] rounded-xl p-4 bg-[#0A0A0E] relative">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-white tracking-tight uppercase tracking-wider font-mono">
              {title}
            </h3>
            {badge && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-300 border border-white/[0.08]">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[11px] text-[#7E7E84] mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

// ─── Main Brand Workspace Component ──────────────────────────────────────────
export function BrandWorkspace({ onOpenStudio }: BrandWorkspaceProps) {
  // ── 1. Brand Identity State ──
  const [brandName, setBrandName] = useState("Cardboard")
  const [tagline, setTagline] = useState("AI Video Creation Workspace")

  const [logos, setLogos] = useState({
    primary: { name: "Cardboard_Logo.svg", preview: "/cardboard-logo.svg", isSet: true },
    light: { name: "Cardboard_Mark.svg", preview: "/cardboard-mark.svg", isSet: true },
    dark: { name: "Cardboard_Logo_Square.png", preview: "/cardboard-logo.png", isSet: true },
    mark: { name: "Favicon_Mark.png", preview: "/favicon.png", isSet: true },
  })

  // ── 2. Colors State ──
  const [colors, setColors] = useState<BrandColor[]>([
    { id: "primary", label: "Primary", hex: "#3B82F6" },
    { id: "secondary", label: "Secondary", hex: "#8B5CF6" },
    { id: "accent", label: "Accent", hex: "#06B6D4" },
    { id: "background", label: "Background", hex: "#060608" },
    { id: "text", label: "Text", hex: "#EDEDED" },
  ])

  // ── 3. Typography State ──
  const [headingFont, setHeadingFont] = useState<BrandFont>({ family: "Inter", size: 48, weight: "700" })
  const [bodyFont, setBodyFont] = useState<BrandFont>({ family: "Inter", size: 16, weight: "400" })
  const [captionFont, setCaptionFont] = useState<BrandFont>({ family: "Inter Tight", size: 14, weight: "600" })

  const availableFonts = [
    "Inter",
    "Inter Tight",
    "Geist",
    "Space Grotesk",
    "Satoshi",
    "JetBrains Mono",
    "Playfair Display",
    "Syne",
  ]
  const availableWeights = ["400", "500", "600", "700", "800", "900"]

  // ── 4. Captions State ──
  const [caption, setCaption] = useState<CaptionStyle>({
    font: "Inter Tight",
    size: 28,
    weight: "800",
    color: "#FFFFFF",
    highlight: "#3B82F6",
    background: "rgba(0,0,0,0.75)",
    position: "bottom",
    wordsPerLine: 3,
    animation: "Kinetic Word Pop",
  })

  // ── 5. Watermark State ──
  const [watermark, setWatermark] = useState<WatermarkConfig>({
    enabled: true,
    logoKey: "primary",
    position: "bottom-right",
    size: 16,
    opacity: 75,
  })

  // ── 6. Intro & Outro Bumpers ──
  const [introBumper, setIntroBumper] = useState<VideoBumper>({
    name: "Branded_Intro_03s.mp4",
    duration: "0:03",
    thumbnail: "/thumb_ribbon.jpg",
    isSet: true,
  })
  const [outroBumper, setOutroBumper] = useState<VideoBumper>({
    name: "End_CTA_Outro_04s.mp4",
    duration: "0:04",
    thumbnail: "/thumb_architecture.jpg",
    isSet: true,
  })

  // ── 7. Reusable Asset Library State ──
  const [assetTab, setAssetTab] = useState("Logos")
  const [assetView, setAssetView] = useState<"grid" | "list">("grid")
  const [assetSearchQuery, setAssetSearchQuery] = useState("")

  const [assets, setAssets] = useState<BrandAssetItem[]>([
    { id: "a1", category: "Logos", name: "Cardboard_Lockup_Horizontal.svg", type: "SVG", size: "14 KB" },
    { id: "a2", category: "Logos", name: "Cardboard_AppIcon_1024.png", type: "PNG", size: "340 KB" },
    { id: "a3", category: "Logos", name: "Cardboard_Monochrome_Dark.svg", type: "SVG", size: "8 KB" },
    { id: "a4", category: "Fonts", name: "InterTight-VariableFont.ttf", type: "TTF", size: "1.2 MB" },
    { id: "a5", category: "Fonts", name: "JetBrainsMono-Bold.woff2", type: "WOFF2", size: "480 KB" },
    { id: "a6", category: "Music", name: "Brand_Anthem_Horizon_Uplift.mp3", type: "MP3", size: "4.8 MB" },
    { id: "a7", category: "Music", name: "Deep_Focus_Ambient_Stem.wav", type: "WAV", size: "18.2 MB" },
    { id: "a8", category: "Sound effects", name: "Swoosh_Cinematic_Whoosh.wav", type: "WAV", size: "420 KB" },
    { id: "a9", category: "Sound effects", name: "Subtle_Camera_Shutter.wav", type: "WAV", size: "180 KB" },
    { id: "a10", category: "Backgrounds", name: "Blueprint_Grid_Overlay_4K.jpg", type: "JPG", size: "2.1 MB" },
    { id: "a11", category: "Backgrounds", name: "Orbit_Sunrise_Atmosphere.jpg", type: "JPG", size: "3.4 MB" },
    { id: "a12", category: "Lower thirds", name: "Minimalist_Speaker_Name_Pill.json", type: "LOTTIE", size: "84 KB" },
    { id: "a13", category: "Motion graphics", name: "Kinetic_Particle_Burst.mp4", type: "MP4", size: "8.9 MB" },
  ])

  // ── 8. Brand Presets State ──
  const [activePresetId, setActivePresetId] = useState<string>("product")

  const presets = [
    {
      id: "social",
      label: "Social Video",
      desc: "9:16 Vertical • Kinetic captions • Bold yellow punch",
      colors: { primary: "#EAB308", secondary: "#A855F7", accent: "#EC4899" },
      caption: { font: "Inter Tight", size: 34, highlight: "#EAB308", position: "middle" as const },
    },
    {
      id: "product",
      label: "Product Launch",
      desc: "16:9 Cinematic • Clean tech blue • Bottom subtitles",
      colors: { primary: "#3B82F6", secondary: "#8B5CF6", accent: "#06B6D4" },
      caption: { font: "Inter", size: 28, highlight: "#3B82F6", position: "bottom" as const },
    },
    {
      id: "youtube",
      label: "YouTube",
      desc: "16:9 Long-form • Intro & outro bumpers • Speaker badge",
      colors: { primary: "#EF4444", secondary: "#F97316", accent: "#3B82F6" },
      caption: { font: "Space Grotesk", size: 26, highlight: "#EF4444", position: "bottom" as const },
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      desc: "1:1 Square • High contrast • Professional lower-thirds",
      colors: { primary: "#0EA5E9", secondary: "#6366F1", accent: "#10B981" },
      caption: { font: "Inter", size: 24, highlight: "#0EA5E9", position: "bottom" as const },
    },
    {
      id: "podcast",
      label: "Podcast",
      desc: "16:9 Audiogram • Waveform accent • Word-by-word reveal",
      colors: { primary: "#8B5CF6", secondary: "#EC4899", accent: "#F43F5E" },
      caption: { font: "JetBrains Mono", size: 28, highlight: "#8B5CF6", position: "bottom" as const },
    },
  ]

  // Apply a brand preset
  const handleApplyPreset = (preset: typeof presets[0]) => {
    setActivePresetId(preset.id)
    setColors((prev) =>
      prev.map((c) => {
        if (c.id === "primary") return { ...c, hex: preset.colors.primary }
        if (c.id === "secondary") return { ...c, hex: preset.colors.secondary }
        if (c.id === "accent") return { ...c, hex: preset.colors.accent }
        return c
      })
    )
    setCaption((prev) => ({
      ...prev,
      font: preset.caption.font,
      size: preset.caption.size,
      highlight: preset.caption.highlight,
      position: preset.caption.position,
    }))
    showToast(`Loaded preset "${preset.label}"`)
  }

  // ── Feedback & Save Notification ──
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(true)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isPlayingPreview, setIsPlayingPreview] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2800)
  }

  const handleSaveChanges = () => {
    setIsSaved(true)
    showToast("Brand Kit saved & synchronized across all video projects")
  }

  // Helper colors
  const primaryHex = colors.find((c) => c.id === "primary")?.hex || "#3B82F6"
  const backgroundHex = colors.find((c) => c.id === "background")?.hex || "#060608"

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchCat = a.category.toLowerCase() === assetTab.toLowerCase()
      const matchSearch =
        !assetSearchQuery || a.name.toLowerCase().includes(assetSearchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [assets, assetTab, assetSearchQuery])

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#070709] text-[#EDEDED] select-none font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-[#181820]/95 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────────────────────────────────── */}
      <header className="h-12 border-b border-white/[0.08] bg-[#0A0A0D] flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-white tracking-tight">Brand</span>
          </div>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="text-[11.5px] text-[#7E7E84] hidden md:inline">
            Set up your brand once and use it across every video.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Open in Studio Quick Action */}
          {onOpenStudio && (
            <button
              type="button"
              onClick={() => onOpenStudio(`Branded Promo - ${brandName}`)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#8E8E93] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Open in Studio</span>
            </button>
          )}

          {/* Optional Preview Modal Toggle */}
          <button
            type="button"
            onClick={() => setIsPreviewModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#8E8E93] border border-white/[0.08] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          {/* Save Changes Button */}
          <button
            type="button"
            onClick={handleSaveChanges}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Save changes</span>
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────────
          BODY: TWO-COLUMN WORKSPACE
          Left: Controls & Settings | Right: Sticky Live Preview
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── LEFT COLUMN: Brand Controls & Settings (Scrollable) ─────────── */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 space-y-6 min-w-0">
          {/* 1. BRAND IDENTITY */}
          <SectionCard
            title="1. Brand Identity"
            subtitle="Centralize naming, company credentials, and core logo variants"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => {
                    setBrandName(e.target.value)
                    setIsSaved(false)
                  }}
                  placeholder="Company / Brand Name"
                  className="w-full bg-[#0E0E12] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/25 transition-colors font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                  Brand Tagline / Descriptor
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => {
                    setTagline(e.target.value)
                    setIsSaved(false)
                  }}
                  placeholder="One sentence brand descriptor"
                  className="w-full bg-[#0E0E12] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/25 transition-colors"
                />
              </div>
            </div>

            {/* Logo Variants */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-2">
                Brand Logos (Drag-and-drop or select)
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { key: "primary", label: "Primary Logo", sub: "Standard full lockup" },
                  { key: "light", label: "Light Logo", sub: "For dark backgrounds" },
                  { key: "dark", label: "Dark Logo", sub: "For light backgrounds" },
                  { key: "mark", label: "Favicon / Mark", sub: "Square icon badge" },
                ].map((item) => {
                  const logoObj = logos[item.key as keyof typeof logos]
                  return (
                    <div
                      key={item.key}
                      className="border border-white/[0.08] rounded-lg p-3 bg-[#0E0E12] flex flex-col justify-between group hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-white">{item.label}</span>
                        <span className="text-[9px] text-[#7E7E84] font-mono">{logoObj.name.split(".").pop()?.toUpperCase()}</span>
                      </div>

                      <div className="aspect-[16/10] rounded bg-black/60 border border-white/[0.06] flex items-center justify-center p-2 relative overflow-hidden mb-2">
                        <img
                          src={logoObj.preview}
                          alt={item.label}
                          className="max-h-full max-w-full object-contain rounded"
                        />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button
                            type="button"
                            onClick={() => showToast(`Updated ${item.label}`)}
                            className="text-[10px] text-white bg-white/20 px-2 py-1 rounded hover:bg-white/30 cursor-pointer"
                          >
                            Replace
                          </button>
                        </div>
                      </div>

                      <div className="text-[10px] text-[#7E7E84] truncate">{logoObj.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </SectionCard>

          {/* 2. COLORS */}
          <SectionCard
            title="2. Brand Colors"
            subtitle="Curated palette automatically injected into templates, titles, and motion graphics"
            action={
              <button
                type="button"
                onClick={() => {
                  const newId = `custom-${Date.now()}`
                  setColors((prev) => [
                    ...prev,
                    { id: newId, label: `Custom ${prev.length + 1}`, hex: "#8B5CF6" },
                  ])
                  showToast("Added new brand color")
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Color</span>
              </button>
            }
          >
            {/* Visual Palette Spectrum Bar */}
            <div className="mb-3.5">
              <div className="h-4 rounded-lg overflow-hidden flex border border-white/10 shadow-xs">
                {colors.map((c) => (
                  <div
                    key={c.id}
                    className="flex-1 h-full cursor-pointer transition-transform hover:brightness-110"
                    style={{ backgroundColor: c.hex }}
                    title={`${c.label}: ${c.hex}`}
                  />
                ))}
              </div>
            </div>

            {/* Editable Color Pickers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {colors.map((c) => (
                <ColorSwatchItem
                  key={c.id}
                  color={c}
                  onColorChange={(newHex) => {
                    setColors((prev) => prev.map((item) => (item.id === c.id ? { ...item, hex: newHex } : item)))
                    setIsSaved(false)
                  }}
                  canRemove={!["primary", "background", "text"].includes(c.id)}
                  onRemove={() => setColors((prev) => prev.filter((item) => item.id !== c.id))}
                />
              ))}
            </div>
          </SectionCard>

          {/* 3. TYPOGRAPHY */}
          <SectionCard
            title="3. Brand Typography"
            subtitle="Headline hierarchy and text styles applied to video titles and lower-thirds"
            action={
              <button
                type="button"
                onClick={() => showToast("Custom font uploader triggered (.otf, .ttf, .woff2)")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Upload Font</span>
              </button>
            }
          >
            {/* Live Specimen Banner */}
            <div
              className="p-4 rounded-xl border border-white/[0.08] bg-[#0E0E12] mb-4 relative overflow-hidden"
              style={{ fontFamily: headingFont.family }}
            >
              <div
                className="text-4xl font-extrabold leading-none mb-1.5"
                style={{ color: primaryHex, fontWeight: headingFont.weight }}
              >
                Aa
              </div>
              <div
                className="text-base font-bold text-white mb-0.5 tracking-tight"
                style={{ fontWeight: headingFont.weight }}
              >
                {brandName} — {tagline}
              </div>
              <div className="text-xs text-[#8E8E93]" style={{ fontFamily: bodyFont.family }}>
                This is how your video captions, titles, and on-screen lower-thirds will render.
              </div>
            </div>

            {/* Typography Steppers */}
            <div className="space-y-3">
              {[
                { label: "Heading Font", font: headingFont, set: setHeadingFont, min: 24, max: 96 },
                { label: "Body Font", font: bodyFont, set: setBodyFont, min: 12, max: 48 },
                { label: "Caption Font", font: captionFont, set: setCaptionFont, min: 10, max: 36 },
              ].map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 sm:grid-cols-[110px_1fr_90px_100px] gap-2 items-center p-2 rounded-lg bg-[#0E0E12] border border-white/[0.05]"
                >
                  <span className="text-xs font-medium text-white">{row.label}</span>

                  {/* Family dropdown */}
                  <div className="relative">
                    <select
                      value={row.font.family}
                      onChange={(e) => row.set((f) => ({ ...f, family: e.target.value }))}
                      className="w-full appearance-none bg-[#141418] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-xs text-white pr-7 focus:outline-none focus:border-white/20 cursor-pointer"
                    >
                      {availableFonts.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
                  </div>

                  {/* Size input */}
                  <div className="flex items-center gap-1 bg-[#141418] border border-white/[0.08] rounded-md px-2 py-1.5">
                    <input
                      type="number"
                      min={row.min}
                      max={row.max}
                      value={row.font.size}
                      onChange={(e) => row.set((f) => ({ ...f, size: Number(e.target.value) }))}
                      className="w-10 bg-transparent text-xs text-white focus:outline-none font-mono"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono">px</span>
                  </div>

                  {/* Weight dropdown */}
                  <div className="relative">
                    <select
                      value={row.font.weight}
                      onChange={(e) => row.set((f) => ({ ...f, weight: e.target.value }))}
                      className="w-full appearance-none bg-[#141418] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-xs text-white pr-7 focus:outline-none focus:border-white/20 cursor-pointer font-mono"
                    >
                      {availableWeights.map((w) => (
                        <option key={w} value={w}>
                          w-{w}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 4. VIDEO CAPTIONS */}
          <SectionCard
            title="4. Video Captions (Subtitles)"
            subtitle="High-impact subtitle styling with kinetic word highlights and positioning"
            badge="KEY FEATURE"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {/* Font Family */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                  Caption Font
                </label>
                <div className="relative">
                  <select
                    value={caption.font}
                    onChange={(e) => setCaption((c) => ({ ...c, font: e.target.value }))}
                    className="w-full appearance-none bg-[#0E0E12] border border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-white pr-7 focus:outline-none cursor-pointer"
                  >
                    {availableFonts.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
                </div>
              </div>

              {/* Font Size & Weight */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                    Size
                  </label>
                  <div className="flex items-center gap-1 bg-[#0E0E12] border border-white/[0.08] rounded-lg px-2.5 py-2">
                    <input
                      type="number"
                      min="14"
                      max="72"
                      value={caption.size}
                      onChange={(e) => setCaption((c) => ({ ...c, size: Number(e.target.value) }))}
                      className="w-full bg-transparent text-xs text-white focus:outline-none font-mono"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono">px</span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                    Weight
                  </label>
                  <select
                    value={caption.weight}
                    onChange={(e) => setCaption((c) => ({ ...c, weight: e.target.value }))}
                    className="w-full bg-[#0E0E12] border border-white/[0.08] rounded-lg px-2 py-2 text-xs text-white focus:outline-none cursor-pointer font-mono"
                  >
                    {availableWeights.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                  On-Screen Position
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#0E0E12] p-1 rounded-lg border border-white/[0.08]">
                  {(["top", "middle", "bottom"] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setCaption((c) => ({ ...c, position: pos }))}
                      className={`py-1 rounded text-xs capitalize font-medium transition-colors cursor-pointer ${
                        caption.position === pos
                          ? "bg-white text-black font-semibold shadow-xs"
                          : "text-[#8E8E93] hover:text-white"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                  Text Color
                </label>
                <div className="flex items-center gap-2 bg-[#0E0E12] border border-white/[0.08] rounded-lg px-2.5 py-1.5">
                  <input
                    type="color"
                    value={caption.color}
                    onChange={(e) => setCaption((c) => ({ ...c, color: e.target.value }))}
                    className="w-5 h-5 rounded border-none cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-xs text-white uppercase">{caption.color}</span>
                </div>
              </div>

              {/* Highlight Accent */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                  Highlight Word Color
                </label>
                <div className="flex items-center gap-2 bg-[#0E0E12] border border-white/[0.08] rounded-lg px-2.5 py-1.5">
                  <input
                    type="color"
                    value={caption.highlight}
                    onChange={(e) => setCaption((c) => ({ ...c, highlight: e.target.value }))}
                    className="w-5 h-5 rounded border-none cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-xs text-white uppercase">{caption.highlight}</span>
                </div>
              </div>

              {/* Animation Style */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                  Animation Style
                </label>
                <select
                  value={caption.animation}
                  onChange={(e) => setCaption((c) => ({ ...c, animation: e.target.value }))}
                  className="w-full bg-[#0E0E12] border border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  {["Kinetic Word Pop", "Smooth Typewriter", "Bounce Spring", "Subtle Fade", "Slide Up"].map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* In-Section Live Caption Visual Sample */}
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center p-4">
              <img
                src="/earth_video_canvas.jpg"
                alt="Video Backdrop"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div
                style={{
                  fontFamily: caption.font,
                  fontSize: `${caption.size * 0.9}px`,
                  fontWeight: caption.weight,
                  color: caption.color,
                }}
                className="relative z-10 px-4 py-1.5 rounded-lg text-center tracking-tight shadow-2xl"
              >
                THIS IS YOUR <span style={{ color: caption.highlight }}>BRAND</span>
              </div>
            </div>
          </SectionCard>

          {/* 5. WATERMARK / LOGO PLACEMENT */}
          <SectionCard
            title="5. Watermark / Logo Placement"
            subtitle="Automated corner stamp overlay rendered into final exports"
          >
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0E0E12] border border-white/[0.08] mb-3.5">
              <div>
                <div className="text-xs font-semibold text-white">Enable Watermark</div>
                <div className="text-[11px] text-[#7E7E84]">Stamp brand mark in all rendered videos</div>
              </div>
              <button
                type="button"
                onClick={() => setWatermark((w) => ({ ...w, enabled: !w.enabled }))}
                className="cursor-pointer"
              >
                {watermark.enabled ? (
                  <ToggleRight className="w-8 h-8 text-blue-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-neutral-600" />
                )}
              </button>
            </div>

            {watermark.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Position selection */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] block mb-1">
                    Position
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 bg-[#0E0E12] p-1.5 rounded-lg border border-white/[0.08]">
                    {[
                      { id: "top-left", label: "Top Left" },
                      { id: "top-right", label: "Top Right" },
                      { id: "bottom-left", label: "Bottom Left" },
                      { id: "bottom-right", label: "Bottom Right" },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() =>
                          setWatermark((w) => ({ ...w, position: pos.id as WatermarkConfig["position"] }))
                        }
                        className={`py-1 text-[11px] rounded font-medium transition-colors cursor-pointer ${
                          watermark.position === pos.id
                            ? "bg-white text-black font-semibold shadow-xs"
                            : "text-[#8E8E93] hover:text-white"
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size slider */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] mb-1">
                    <span>Size</span>
                    <span className="text-white">{watermark.size}%</span>
                  </div>
                  <div className="h-10 flex items-center px-3 rounded-lg bg-[#0E0E12] border border-white/[0.08]">
                    <input
                      type="range"
                      min="8"
                      max="40"
                      value={watermark.size}
                      onChange={(e) => setWatermark((w) => ({ ...w, size: Number(e.target.value) }))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>
                </div>

                {/* Opacity slider */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#7E7E84] mb-1">
                    <span>Opacity</span>
                    <span className="text-white">{watermark.opacity}%</span>
                  </div>
                  <div className="h-10 flex items-center px-3 rounded-lg bg-[#0E0E12] border border-white/[0.08]">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={watermark.opacity}
                      onChange={(e) => setWatermark((w) => ({ ...w, opacity: Number(e.target.value) }))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </SectionCard>

          {/* 6. INTRO & OUTRO BUMPERS */}
          <SectionCard
            title="6. Reusable Branded Video Assets (Intro & Outro)"
            subtitle="Pre-rendered bumper sequences automatically stitched onto timeline heads and tails"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Intro */}
              <div className="p-3 rounded-xl bg-[#0E0E12] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Branded Intro
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                    {introBumper.duration}
                  </span>
                </div>

                <div className="aspect-video rounded-lg overflow-hidden border border-white/10 relative group mb-3">
                  <img src={introBumper.thumbnail} alt="Intro" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => showToast("Playing Intro preview...")}
                      className="p-2 rounded-full bg-white text-black cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Play className="w-4 h-4 fill-black" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast("Upload new Intro bumper video")}
                    className="flex-1 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-xs font-medium text-white transition-colors cursor-pointer text-center"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Removed Intro bumper")}
                    className="p-1.5 rounded-lg border border-white/10 hover:border-rose-500/30 text-[#8E8E93] hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Outro */}
              <div className="p-3 rounded-xl bg-[#0E0E12] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Branded Outro (End Screen)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                    {outroBumper.duration}
                  </span>
                </div>

                <div className="aspect-video rounded-lg overflow-hidden border border-white/10 relative group mb-3">
                  <img src={outroBumper.thumbnail} alt="Outro" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => showToast("Playing Outro preview...")}
                      className="p-2 rounded-full bg-white text-black cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Play className="w-4 h-4 fill-black" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast("Upload new Outro bumper video")}
                    className="flex-1 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-xs font-medium text-white transition-colors cursor-pointer text-center"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Removed Outro bumper")}
                    className="p-1.5 rounded-lg border border-white/10 hover:border-rose-500/30 text-[#8E8E93] hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 7. BRAND ASSETS LIBRARY */}
          <SectionCard
            title="7. Reusable Brand Asset Library"
            subtitle="Central repository of approved company logos, audio themes, and lower-thirds"
            action={
              <button
                type="button"
                onClick={() => showToast("Opening asset file upload...")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Upload</span>
              </button>
            }
          >
            {/* Search, Filter & View Toggle */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 flex items-center gap-2 bg-[#0E0E12] border border-white/[0.08] rounded-lg px-2.5 py-1.5 focus-within:border-white/20">
                <Search className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <input
                  type="text"
                  value={assetSearchQuery}
                  onChange={(e) => setAssetSearchQuery(e.target.value)}
                  placeholder={`Search ${assetTab}...`}
                  className="bg-transparent text-xs text-white placeholder:text-neutral-600 focus:outline-none flex-1"
                />
                {assetSearchQuery && (
                  <button onClick={() => setAssetSearchQuery("")} className="text-neutral-500 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Grid / List Toggle */}
              <div className="flex items-center bg-[#0E0E12] border border-white/[0.08] rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setAssetView("grid")}
                  className={`p-1.5 rounded ${assetView === "grid" ? "bg-white/10 text-white" : "text-[#7E7E84]"}`}
                >
                  <Grid3x3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setAssetView("list")}
                  className={`p-1.5 rounded ${assetView === "list" ? "bg-white/10 text-white" : "text-[#7E7E84]"}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Asset Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2 mb-3 border-b border-white/[0.06]">
              {[
                "Logos",
                "Fonts",
                "Music",
                "Sound effects",
                "Backgrounds",
                "Lower thirds",
                "Motion graphics",
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setAssetTab(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer shrink-0 ${
                    assetTab === cat
                      ? "bg-white text-black font-semibold"
                      : "bg-[#0E0E12] text-[#8E8E93] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Asset Items Display */}
            {filteredAssets.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#7E7E84]">
                No assets found in &ldquo;{assetTab}&rdquo;. Click Upload to add files.
              </div>
            ) : assetView === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-2.5 rounded-lg bg-[#0E0E12] border border-white/[0.06] hover:border-white/20 transition-all group flex flex-col justify-between"
                  >
                    <div className="w-full aspect-[4/3] rounded bg-black/40 border border-white/[0.04] flex items-center justify-center mb-2">
                      {asset.category === "Music" || asset.category === "Sound effects" ? (
                        <Music className="w-6 h-6 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                      ) : asset.category === "Fonts" ? (
                        <Type className="w-6 h-6 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-white truncate">{asset.name}</div>
                      <div className="text-[9.5px] text-[#7E7E84] font-mono mt-0.5">
                        {asset.type} • {asset.size}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#0E0E12] border border-white/[0.06] hover:border-white/20 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Folder className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="font-medium text-white truncate">{asset.name}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-[#7E7E84] shrink-0">
                      <span>{asset.type}</span>
                      <span>{asset.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* 8. BRAND PRESETS */}
          <SectionCard
            title="8. Brand Presets (Saved Styles)"
            subtitle="Switch complete branding treatments across formats (Social, Product Launch, YouTube, Podcast)"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    activePresetId === preset.id
                      ? "border-cyan-400/80 bg-cyan-950/20 ring-1 ring-cyan-400/30"
                      : "border-white/[0.08] bg-[#0E0E12] hover:border-white/20"
                  }`}
                >
                  {activePresetId === preset.id && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                  {/* Miniature palette stripes */}
                  <div className="flex h-1.5 rounded overflow-hidden mb-2">
                    <div className="flex-1" style={{ backgroundColor: preset.colors.primary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.colors.secondary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.colors.accent }} />
                  </div>
                  <div className="text-xs font-semibold text-white">{preset.label}</div>
                  <div className="text-[10px] text-[#7E7E84] mt-1 leading-snug">{preset.desc}</div>
                </button>
              ))}
            </div>
          </SectionCard>

          <div className="h-6" />
        </div>

        {/* ── RIGHT COLUMN: STICKY LIVE BRAND PREVIEW ──────────────────────── */}
        <aside className="w-[380px] lg:w-[420px] shrink-0 border-l border-white/[0.08] bg-[#0A0A0E] flex flex-col overflow-hidden z-20">
          <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white tracking-wider uppercase font-mono">
                9. Live Brand Preview
              </div>
              <div className="text-[10px] text-[#7E7E84]">Real-time video simulation with branding</div>
            </div>

            <button
              type="button"
              onClick={() => setIsPlayingPreview((p) => !p)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white transition-colors cursor-pointer"
            >
              {isPlayingPreview ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white" />}
              <span className="text-[10.5px] font-medium">{isPlayingPreview ? "Pause" : "Play"}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {/* 16:9 Realistic Video Preview Frame */}
            <div
              className="w-full aspect-video rounded-xl border border-white/10 relative overflow-hidden shadow-2xl bg-black"
              style={{ backgroundColor: backgroundHex }}
            >
              {/* Dynamic Cinematic Backdrop with Motion Simulation */}
              <img
                src="/earth_video_canvas.jpg"
                alt="Brand Preview Video"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlayingPreview ? "scale-105" : "scale-100"
                }`}
              />

              {/* Blueprint Grid Overlay */}
              <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

              {/* Watermark Logo Stamp */}
              {watermark.enabled && (
                <div
                  className={`absolute z-20 flex items-center gap-1 font-bold font-mono tracking-tight ${
                    watermark.position === "top-left"
                      ? "top-3 left-3"
                      : watermark.position === "top-right"
                      ? "top-3 right-3"
                      : watermark.position === "bottom-left"
                      ? "bottom-3 left-3"
                      : "bottom-3 right-3"
                  }`}
                  style={{
                    opacity: watermark.opacity / 100,
                  }}
                >
                  <div
                    className="rounded bg-black/70 p-1.5 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-lg"
                    style={{ fontSize: `${watermark.size * 0.75}px` }}
                  >
                    <CardboardIcon className="w-3.5 h-3.5 text-white shrink-0" />
                    <span className="text-white uppercase tracking-wider font-semibold">{brandName}</span>
                  </div>
                </div>
              )}

              {/* Live Caption Subtitle Overlay */}
              <div
                className={`absolute left-0 right-0 flex justify-center px-4 z-20 ${
                  caption.position === "top"
                    ? "top-4"
                    : caption.position === "middle"
                    ? "top-1/2 -translate-y-1/2"
                    : "bottom-4"
                }`}
              >
                <div
                  style={{
                    fontFamily: caption.font,
                    fontSize: `${Math.max(10, caption.size * 0.42)}px`,
                    fontWeight: caption.weight,
                    color: caption.color,
                    backgroundColor: caption.background,
                  }}
                  className="px-3 py-1 rounded-md text-center tracking-tight shadow-xl border border-white/10 backdrop-blur-xs"
                >
                  THIS IS YOUR <span style={{ color: caption.highlight }}>BRAND</span>
                </div>
              </div>
            </div>

            {/* Typography Specimen Card */}
            <div className="p-3.5 rounded-xl bg-[#0E0E12] border border-white/[0.08]">
              <div className="text-[10px] font-mono text-[#7E7E84] uppercase tracking-wider mb-2">
                Brand Typography Specimen
              </div>
              <div
                style={{
                  fontFamily: headingFont.family,
                  fontWeight: headingFont.weight,
                  color: primaryHex,
                }}
                className="text-xl leading-tight mb-0.5 tracking-tight"
              >
                {brandName}
              </div>
              <div
                style={{ fontFamily: bodyFont.family, fontWeight: bodyFont.weight }}
                className="text-xs text-neutral-300 mt-1 leading-relaxed"
              >
                {tagline}. Define styles once, generate infinite branded videos.
              </div>
              <div
                style={{
                  fontFamily: captionFont.family,
                  fontWeight: captionFont.weight,
                  color: caption.highlight,
                }}
                className="text-[10px] font-mono mt-2 uppercase tracking-wider"
              >
                Caption: {caption.animation}
              </div>
            </div>

            {/* Color Palette Specimen Card */}
            <div className="p-3.5 rounded-xl bg-[#0E0E12] border border-white/[0.08]">
              <div className="text-[10px] font-mono text-[#7E7E84] uppercase tracking-wider mb-2">
                Active Color Palette
              </div>
              <div className="grid grid-cols-5 gap-1.5 mb-2">
                {colors.map((c) => (
                  <div key={c.id} className="space-y-1 text-center">
                    <div
                      className="w-full aspect-square rounded-md border border-white/15"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="text-[9px] font-mono text-neutral-400 truncate">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reusable Asset Stems */}
            <div className="p-3.5 rounded-xl bg-[#0E0E12] border border-white/[0.08] space-y-2">
              <div className="text-[10px] font-mono text-[#7E7E84] uppercase tracking-wider">
                Video Bumper Stems
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white">Intro Bumper:</span>
                <span className="text-neutral-300 font-mono text-[11px]">{introBumper.duration} • Enabled</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white">Outro Bumper:</span>
                <span className="text-neutral-300 font-mono text-[11px]">{outroBumper.duration} • Enabled</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white">Watermark Stamp:</span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  {watermark.position} • {watermark.opacity}%
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          PREVIEW MODAL (Full Cinema View)
      ───────────────────────────────────────────────────────────────────────── */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="max-w-4xl w-full bg-[#0D0D12] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">{brandName} — Brand Kit Preview</h3>
                <p className="text-xs text-neutral-400">Cinematic demonstration of your brand kit applied to video</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/15 relative bg-black">
              <img src="/earth_video_canvas.jpg" alt="Preview Video" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-blueprint-grid opacity-25" />

              {/* Watermark */}
              {watermark.enabled && (
                <div
                  className={`absolute z-20 px-2 py-1 rounded bg-black/70 border border-white/20 text-white font-mono text-xs font-bold uppercase ${
                    watermark.position === "top-left"
                      ? "top-4 left-4"
                      : watermark.position === "top-right"
                      ? "top-4 right-4"
                      : watermark.position === "bottom-left"
                      ? "bottom-4 left-4"
                      : "bottom-4 right-4"
                  }`}
                  style={{ opacity: watermark.opacity / 100 }}
                >
                  {brandName}
                </div>
              )}

              {/* Captions */}
              <div
                className={`absolute left-0 right-0 flex justify-center px-6 z-20 ${
                  caption.position === "top"
                    ? "top-6"
                    : caption.position === "middle"
                    ? "top-1/2 -translate-y-1/2"
                    : "bottom-6"
                }`}
              >
                <div
                  style={{
                    fontFamily: caption.font,
                    fontSize: `${caption.size * 0.8}px`,
                    fontWeight: caption.weight,
                    color: caption.color,
                    backgroundColor: caption.background,
                  }}
                  className="px-4 py-2 rounded-lg text-center tracking-tight shadow-2xl border border-white/15"
                >
                  THIS IS YOUR <span style={{ color: caption.highlight }}>BRAND</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-neutral-500 font-mono">1920 × 1080 • {activePresetId.toUpperCase()}</span>
              <button
                type="button"
                onClick={() => {
                  setIsPreviewModalOpen(false)
                  if (onOpenStudio) onOpenStudio(`Branded Project - ${brandName}`)
                }}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Apply & Open in Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
