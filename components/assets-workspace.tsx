"use client"

import React, { useState } from "react"
import { Search, Upload, FileVideo, FileAudio, FileImage, Trash2 } from "lucide-react"

interface AssetItem {
  id: string
  name: string
  type: "video" | "audio" | "image"
  size: string
  addedAt: string
}

const SAMPLE_ASSETS: AssetItem[] = [
  { id: "1", name: "b-roll_neon_streets.mp4", type: "video", size: "48.2 MB", addedAt: "Oct 6" },
  { id: "2", name: "synthwave_intro_track.wav", type: "audio", size: "14.5 MB", addedAt: "Oct 5" },
  { id: "3", name: "cardboard_3d_render.png", type: "image", size: "4.1 MB", addedAt: "Oct 4" },
  { id: "4", name: "interview_a_roll_cam1.mp4", type: "video", size: "128.0 MB", addedAt: "Oct 3" },
  { id: "5", name: "ambient_wind_stereo.wav", type: "audio", size: "8.3 MB", addedAt: "Oct 1" },
]

export function AssetsWorkspace() {
  const [filter, setFilter] = useState<"all" | "video" | "audio" | "image">("all")
  const [search, setSearch] = useState("")

  const filtered = SAMPLE_ASSETS.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-medium text-white tracking-tight">Asset library</h2>
          <p className="text-xs text-[#8E8E93] mt-1">Uploaded footage, sound effects, and graphics</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#232327] hover:bg-[#2A2A30] border border-white/[0.08] text-white text-xs font-medium transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1 bg-[#18181B] p-1 rounded-lg border border-white/[0.06]">
          {(["all", "video", "audio", "image"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#25252A] text-white shadow-2xs"
                  : "text-[#8E8E93] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-[#7E7E84] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets..."
            className="w-full bg-[#18181B] border border-white/[0.06] rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder:text-[#52525B] focus:outline-none focus:border-white/20 transition-all"
          />
        </div>
      </div>

      {/* Asset Table/Grid */}
      <div className="border border-white/[0.06] rounded-xl bg-[#18181A] overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] font-medium text-[#7E7E84] border-b border-white/[0.04]">
          <span className="col-span-6">NAME</span>
          <span className="col-span-2">TYPE</span>
          <span className="col-span-2">SIZE</span>
          <span className="col-span-2 text-right">DATE ADDED</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              className="grid grid-cols-12 items-center px-4 py-3 text-xs hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <div className="col-span-6 flex items-center gap-2.5 min-w-0">
                {asset.type === "video" && <FileVideo className="w-4 h-4 text-cyan-400 shrink-0" />}
                {asset.type === "audio" && <FileAudio className="w-4 h-4 text-amber-400 shrink-0" />}
                {asset.type === "image" && <FileImage className="w-4 h-4 text-emerald-400 shrink-0" />}
                <span className="text-[#EDEDED] font-medium truncate">{asset.name}</span>
              </div>
              <div className="col-span-2 text-[#8E8E93] capitalize">{asset.type}</div>
              <div className="col-span-2 text-[#8E8E93]">{asset.size}</div>
              <div className="col-span-2 text-right text-[#8E8E93] flex items-center justify-end gap-2">
                <span>{asset.addedAt}</span>
                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
