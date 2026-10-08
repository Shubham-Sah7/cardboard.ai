"use client"

import React, { useState } from "react"
import {
  Bot,
  MessageSquare,
  LayoutTemplate,
  Clapperboard,
  BarChart3,
  Cpu,
  RefreshCw,
  Scissors,
  Languages,
  Palette,
  Settings,
  ArrowRight,
  Search,
  Check,
  Plus,
  Play,
  TrendingUp,
  Clock,
  Sparkles,
  Globe,
  Sliders,
  Shield,
  Layers,
  Film,
} from "lucide-react"
import type { ActiveNavTab } from "./sidebar-nav"

interface CapabilitiesWorkspaceProps {
  tab: ActiveNavTab
  onOpenStudio: (projectTitle: string) => void
}

export function CapabilitiesWorkspace({
  tab,
  onOpenStudio,
}: CapabilitiesWorkspaceProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // TEMPLATES TAB
  if (tab === "templates") {
    const templates = [
      {
        id: "t1",
        title: "Product Onboarding Walkthrough",
        category: "Product",
        duration: "1:30",
        description: "Step-by-step onboarding sequence with cursor zoom and kinetic title cards.",
      },
      {
        id: "t2",
        title: "Social Viral Reel (9:16)",
        category: "Social",
        duration: "0:45",
        description: "Vertical hook format with high-energy animated captions and sound effects.",
      },
      {
        id: "t3",
        title: "Developer API & SDK Demo",
        category: "Technical",
        duration: "2:15",
        description: "Code walkthrough with syntax highlighting overlay and split-screen documentation.",
      },
      {
        id: "t4",
        title: "Feature Release Teaser",
        category: "Marketing",
        duration: "0:60",
        description: "Cinematic product spotlight with smooth 3D tilt effects and dark studio background.",
      },
      {
        id: "t5",
        title: "Customer Bug Reproduction",
        category: "Support",
        duration: "1:10",
        description: "Clean screen recording with click ripple indicators and markdown export.",
      },
      {
        id: "t6",
        title: "Investor Pitch Summary",
        category: "Business",
        duration: "2:00",
        description: "Slide deck commentary with webcam bubble and key metrics lower-thirds.",
      },
    ]

    return (
      <div className="w-full h-full flex flex-col p-8 overflow-y-auto bg-[#070709] text-white select-none">
        <div className="max-w-[960px] w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#7E7E84] uppercase mb-1">
                CREATE
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Templates</h2>
              <p className="text-sm text-[#8E8E93] mt-1">
                Pre-configured video structures with automated pacing, typography, and layout rules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenStudio("Custom Template Project")}
              className="px-3.5 py-1.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Blank Template</span>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => onOpenStudio(tpl.title)}
                className="group p-4 rounded-2xl bg-[#121215]/90 hover:bg-[#18181D] border border-white/[0.07] hover:border-white/[0.16] transition-all flex flex-col justify-between h-[180px] cursor-pointer shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-[#8E8E93]">
                      {tpl.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#8E8E93]">
                      {tpl.duration}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-semibold text-white group-hover:text-white transition-colors">
                    {tpl.title}
                  </h4>
                  <p className="text-xs text-[#7E7E84] mt-1.5 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                  <span className="text-[11px] text-[#7E7E84] group-hover:text-white transition-colors">
                    Use template
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#585860] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // MCP TAB
  if (tab === "mcp") {
    const servers = [
      {
        id: "mcp-figma",
        name: "Figma to Cardboard MCP",
        source: "@cardboard/mcp-figma",
        status: "Connected",
        tools: ["sync_frames", "extract_vectors", "export_tokens"],
        desc: "Pulls design frames and auto-animates interactive UI clickthroughs.",
      },
      {
        id: "mcp-elevenlabs",
        name: "ElevenLabs Voice Synth MCP",
        source: "@cardboard/mcp-elevenlabs",
        status: "Active",
        tools: ["clone_voice", "generate_dialogue", "auto_subtitles"],
        desc: "Studio-grade neural speech generation and voice track mastering.",
      },
      {
        id: "mcp-github",
        name: "GitHub Release Watcher MCP",
        source: "@cardboard/mcp-github",
        status: "Connected",
        tools: ["watch_repo", "parse_commits", "trigger_walkthrough_update"],
        desc: "Auto-regenerates product changelog videos on every merged pull request.",
      },
      {
        id: "mcp-runway",
        name: "Runway Gen-3 Motion MCP",
        source: "@cardboard/mcp-runway",
        status: "Ready",
        tools: ["extend_broll", "interpolate_frames", "inpainting"],
        desc: "Generative AI video in-fill and generative camera motion passes.",
      },
    ]

    return (
      <div className="w-full h-full flex flex-col p-8 overflow-y-auto bg-[#070709] text-white select-none">
        <div className="max-w-[960px] w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#7E7E84] uppercase">
                  AI & AUTOMATION
                </span>
                <span className="text-[9px] font-mono font-semibold uppercase px-1.5 py-0.2 rounded bg-white text-black leading-none">
                  New
                </span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Model Context Protocol (MCP)</h2>
              <p className="text-sm text-[#8E8E93] mt-1">
                Connect external developer tools, data stores, and AI agents directly to the Cardboard timeline.
              </p>
            </div>
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect MCP Server</span>
            </button>
          </div>

          {/* Servers list */}
          <div className="space-y-3">
            {servers.map((srv) => (
              <div
                key={srv.id}
                className="p-4 rounded-2xl bg-[#121215]/90 border border-white/[0.07] hover:border-white/[0.14] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-semibold text-white">{srv.name}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {srv.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#7E7E84] mt-1">{srv.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {srv.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#8E8E93] border border-white/[0.04]"
                        >
                          {t}()
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenStudio(`MCP Workflow: ${srv.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    Test in Studio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // AGENT TAB
  if (tab === "agent") {
    return (
      <div className="w-full h-full flex flex-col p-8 overflow-y-auto bg-[#070709] text-white select-none">
        <div className="max-w-[850px] w-full mx-auto">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#7E7E84] uppercase mb-1">
            MAIN
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">AI Video Agent</h2>
          <p className="text-sm text-[#8E8E93] mt-1 mb-6">
            Autonomous video editing agent with multi-modal reasoning across video frames, transcripts, and timeline cues.
          </p>

          <div className="p-5 rounded-2xl bg-[#121215]/90 border border-white/[0.08] mb-6">
            <div className="text-xs font-medium text-white mb-2">Prompt your editing agent</div>
            <textarea
              rows={3}
              placeholder="e.g. Turn my 25-minute screen recording into a punchy 90-second product demo with kinetic captions, sound effects on clicks, and smooth camera zooms..."
              className="w-full bg-[#1A1A1F] text-sm text-white placeholder:text-[#65656D] p-3 rounded-xl border border-white/[0.06] focus:outline-none focus:border-white/20 resize-none"
            />
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
              <span className="text-xs text-[#7E7E84]">Autonomous execution mode: Precision</span>
              <button
                type="button"
                onClick={() => onOpenStudio("Autonomous Agent Pipeline")}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Launch Agent Run
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {[
              { title: "Smart Silence Stripper", desc: "Remove umms, ahs, and pauses longer than 0.4s" },
              { title: "Cursor Track & Auto-Zoom", desc: "Dynamically zoom into active clicks and form inputs" },
              { title: "Kinetic Caption Engine", desc: "Generate word-by-word synced subtitle animations" },
              { title: "B-Roll Matching", desc: "Auto-insert relevant UI visuals over audio explanations" },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenStudio(item.title)}
                className="p-4 rounded-xl bg-[#121215]/80 hover:bg-[#18181D] border border-white/[0.06] hover:border-white/[0.14] transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <h5 className="text-xs font-medium text-white">{item.title}</h5>
                  <p className="text-[11px] text-[#7E7E84] mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#585860] group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // GENERIC CAPABILITY FALLBACK FOR ALL OTHER TABS
  const tabMetadata: Record<
    string,
    { title: string; section: string; desc: string; icon: React.ReactNode }
  > = {
    chats: {
      title: "Project Chats & Review",
      section: "MAIN",
      desc: "Context-aware threads, timeline marker comments, and prompt history.",
      icon: <MessageSquare className="w-5 h-5 text-white" />,
    },
    animations: {
      title: "Motion & Animations",
      section: "CREATE",
      desc: "Kinetic typography, animated lower-thirds, smooth transitions, and 3D tilts.",
      icon: <Clapperboard className="w-5 h-5 text-white" />,
    },
    insights: {
      title: "Video Insights & Performance",
      section: "CREATE",
      desc: "Viewer retention graphs, engagement heatmaps, and drop-off analysis.",
      icon: <BarChart3 className="w-5 h-5 text-white" />,
    },
    "auto-updates": {
      title: "Auto Updates Engine",
      section: "AI & AUTOMATION",
      desc: "Automatically refresh video tutorials whenever your product UI or code changes.",
      icon: <RefreshCw className="w-5 h-5 text-white" />,
    },
    clips: {
      title: "Clips & Cuts Library",
      section: "AI & AUTOMATION",
      desc: "Isolated highlights, recorded takes, speech cuts, and B-roll fragments.",
      icon: <Scissors className="w-5 h-5 text-white" />,
    },
    translation: {
      title: "AI Dubbing & Translation",
      section: "AI & AUTOMATION",
      desc: "Voice cloning and subtitle generation in 32+ languages with lip-sync matching.",
      icon: <Languages className="w-5 h-5 text-white" />,
    },
    brand: {
      title: "Brand Kit",
      section: "BRAND",
      desc: "Color palettes, custom typography, watermarks, and video bumpers.",
      icon: <Palette className="w-5 h-5 text-white" />,
    },
    settings: {
      title: "Studio Settings",
      section: "BRAND",
      desc: "Hardware acceleration, default export resolution, cloud sync, and API keys.",
      icon: <Settings className="w-5 h-5 text-white" />,
    },
  }

  const meta = tabMetadata[tab] || {
    title: "Workspace",
    section: "CARDBOARD",
    desc: "Cardboard Creative Studio toolset.",
    icon: <Sparkles className="w-5 h-5 text-white" />,
  }

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-y-auto bg-[#070709] text-white select-none">
      <div className="max-w-[850px] w-full mx-auto my-auto">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">
          {meta.icon}
        </div>
        <div className="text-[10px] font-mono tracking-[0.2em] text-[#7E7E84] uppercase mb-1">
          {meta.section}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{meta.title}</h2>
        <p className="text-sm text-[#8E8E93] mt-1.5 mb-6 max-w-lg leading-relaxed">
          {meta.desc}
        </p>

        <div className="p-6 rounded-2xl bg-[#121215]/90 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-medium text-white">Ready to work with {meta.title}?</h4>
            <p className="text-xs text-[#7E7E84] mt-1">
              Launch directly into the Cardboard Studio multi-track timeline to configure this capability.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenStudio(`${meta.title} Session`)}
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Open in Studio
          </button>
        </div>
      </div>
    </div>
  )
}
