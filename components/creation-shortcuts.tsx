"use client"

import React from "react"
import { Video, Upload, Layers } from "lucide-react"

interface CreationShortcutsProps {
  onRecord: () => void
  onUpload: () => void
  onTemplates: () => void
}

export function CreationShortcuts({
  onRecord,
  onUpload,
  onTemplates,
}: CreationShortcutsProps) {
  return (
    <div className="w-full max-w-[640px] grid grid-cols-3 gap-3 mt-4">
      {/* 1. Record Screen */}
      <button
        type="button"
        onClick={onRecord}
        className="group flex flex-col items-start p-3.5 rounded-xl bg-[#151518] hover:bg-[#1A1A1E] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 text-left cursor-pointer hover:-translate-y-0.5 shadow-2xs"
      >
        <div className="w-7 h-7 rounded-lg bg-[#1E1E22] group-hover:bg-white/[0.08] border border-white/[0.04] flex items-center justify-center mb-2.5 transition-all duration-200 group-hover:scale-105">
          <Video className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white transition-colors" strokeWidth={1.8} />
        </div>
        <span className="text-[13px] font-medium text-[#EDEDED] group-hover:text-white transition-colors">
          Record Screen
        </span>
        <span className="text-[11px] text-[#71717A] mt-0.5 leading-snug">
          Capture your screen, camera & audio
        </span>
      </button>

      {/* 2. Upload Media */}
      <button
        type="button"
        onClick={onUpload}
        className="group flex flex-col items-start p-3.5 rounded-xl bg-[#151518] hover:bg-[#1A1A1E] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 text-left cursor-pointer hover:-translate-y-0.5 shadow-2xs"
      >
        <div className="w-7 h-7 rounded-lg bg-[#1E1E22] group-hover:bg-white/[0.08] border border-white/[0.04] flex items-center justify-center mb-2.5 transition-all duration-200 group-hover:scale-105">
          <Upload className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white transition-colors" strokeWidth={1.8} />
        </div>
        <span className="text-[13px] font-medium text-[#EDEDED] group-hover:text-white transition-colors">
          Upload Media
        </span>
        <span className="text-[11px] text-[#71717A] mt-0.5 leading-snug">
          Start with an existing recording
        </span>
      </button>

      {/* 3. Use Template */}
      <button
        type="button"
        onClick={onTemplates}
        className="group flex flex-col items-start p-3.5 rounded-xl bg-[#151518] hover:bg-[#1A1A1E] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 text-left cursor-pointer hover:-translate-y-0.5 shadow-2xs"
      >
        <div className="w-7 h-7 rounded-lg bg-[#1E1E22] group-hover:bg-white/[0.08] border border-white/[0.04] flex items-center justify-center mb-2.5 transition-all duration-200 group-hover:scale-105">
          <Layers className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white transition-colors" strokeWidth={1.8} />
        </div>
        <span className="text-[13px] font-medium text-[#EDEDED] group-hover:text-white transition-colors">
          Use Template
        </span>
        <span className="text-[11px] text-[#71717A] mt-0.5 leading-snug">
          Start from a proven structure
        </span>
      </button>
    </div>
  )
}
