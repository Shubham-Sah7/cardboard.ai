"use client"

import React, { useState } from "react"
import { Search, Plus, Clock, MoreVertical, Film } from "lucide-react"

interface ProjectItem {
  id: string
  title: string
  updatedAt: string
  duration: string
  resolution: string
  ditherImage: string
  codeBadge: string
}

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: "1",
    title: "Brand Reveal Reel 2026",
    updatedAt: "2 hours ago",
    duration: "0:45",
    resolution: "4K 60fps",
    ditherImage: "/dither-blueprint.jpg",
    codeBadge: "SYS.01 // BLUEPRINT",
  },
  {
    id: "2",
    title: "Product Launch Walkthrough",
    updatedAt: "Yesterday",
    duration: "1:32",
    resolution: "1080p ProRes",
    ditherImage: "/dither-mono.png",
    codeBadge: "SYS.02 // MONO",
  },
  {
    id: "3",
    title: "Shorts - Audio Visualizer Teaser",
    updatedAt: "3 days ago",
    duration: "0:15",
    resolution: "9:16 Reel",
    ditherImage: "/dither-1bit.jpg",
    codeBadge: "SYS.04 // 1-BIT",
  },
  {
    id: "4",
    title: "Technical API Documentation Demo",
    updatedAt: "5 days ago",
    duration: "2:40",
    resolution: "1440p Master",
    ditherImage: "/dither-halftone.png",
    codeBadge: "SYS.03 // HALFTONE",
  },
]

export function ProjectsWorkspace({ onNewProject }: { onNewProject: () => void }) {
  const [search, setSearch] = useState("")

  const filtered = SAMPLE_PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-y-auto bg-[#060608]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-medium text-white tracking-tight">Projects</h2>
          </div>
          <p className="text-xs text-[#8E8E93]">Manage, inspect and render your video timelines</p>
        </div>
        <button
          type="button"
          onClick={onNewProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="relative max-w-sm mb-6">
        <Search className="w-3.5 h-3.5 text-[#7E7E84] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter timelines..."
          className="w-full bg-[#18181B] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-[#52525B] focus:outline-none focus:border-white/25 transition-all font-mono"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-xl border border-white/[0.06] bg-[#141417] hover:border-white/20 overflow-hidden transition-all duration-200 cursor-pointer shadow-lg"
          >
            {/* Thumbnail Canvas */}
            <div className="h-36 w-full relative overflow-hidden bg-black flex items-center justify-center border-b border-white/[0.06]">
              <img
                src={project.ditherImage}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />

              {/* Duration badge */}
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[9.5px] text-white font-mono border border-white/10">
                {project.duration}
              </span>
            </div>

            {/* Info Row */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-medium text-white group-hover:text-cyan-200 transition-colors truncate max-w-[200px]">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7E7E84] font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#9E9EA6]" />
                    {project.updatedAt}
                  </span>
                  <span>•</span>
                  <span className="text-[#9E9EA6]">{project.resolution}</span>
                </div>
              </div>
              <button
                type="button"
                className="p-1 rounded text-[#7E7E84] hover:text-white hover:bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
