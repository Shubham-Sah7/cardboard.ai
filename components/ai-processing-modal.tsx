"use client"

import React, { useState, useEffect } from "react"
import {
  Sparkles,
  Check,
  CheckCircle2,
  Loader2,
  Video,
  FileText,
  MousePointer,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react"

export type OutputIntent = "video" | "documentation" | "interactive-demo" | "all"

interface AIProcessingModalProps {
  sourceTitle: string
  onComplete: (intent: OutputIntent) => void
  onCancel: () => void
}

const PROCESSING_STEPS = [
  "Extracting audio track & voice isolation",
  "Detecting scene transitions & UI click events",
  "Trimming awkward pauses & filler words",
  "Synthesizing step-by-step documentation",
  "Generating smooth dynamic zoom coordinates",
]

export function AIProcessingModal({
  sourceTitle,
  onComplete,
  onCancel,
}: AIProcessingModalProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isDoneProcessing, setIsDoneProcessing] = useState(false)
  const [selectedIntent, setSelectedIntent] = useState<OutputIntent>("all")

  // Simulate AI pipeline progression
  useEffect(() => {
    if (stepIndex < PROCESSING_STEPS.length) {
      const timer = setTimeout(() => {
        setStepIndex((idx) => idx + 1)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setIsDoneProcessing(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [stepIndex])

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-[620px] bg-[#161619] border border-white/[0.08] rounded-2xl shadow-2xl p-7 text-white animate-in zoom-in-95 duration-200 select-none">
        {!isDoneProcessing ? (
          /* Processing State */
          <div className="flex flex-col items-center py-6 text-center">
            {/* Spinning Radar Icon */}
            <div className="relative w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <div className="absolute inset-0 rounded-2xl border border-white/20 animate-ping opacity-20" />
            </div>

            <h3 className="font-serif text-2xl font-normal text-white tracking-tight mb-1">
              Analyzing recording
            </h3>
            <p className="text-xs text-[#8E8E93] max-w-sm mb-7">
              Cardboard AI is parsing scene actions, isolating speech, and calculating automatic zoom keyframes for <span className="text-white font-medium">&ldquo;{sourceTitle}&rdquo;</span>.
            </p>

            {/* Processing Checklist */}
            <div className="w-full max-w-md space-y-2.5 text-left border-t border-b border-white/[0.06] py-5">
              {PROCESSING_STEPS.map((step, idx) => {
                const isComplete = idx < stepIndex
                const isCurrent = idx === stepIndex
                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 text-xs transition-colors ${
                      isComplete
                        ? "text-white"
                        : isCurrent
                        ? "text-white font-medium"
                        : "text-[#585860]"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/15 shrink-0" />
                    )}
                    <span>{step}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Intent Selection State */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium mb-3">
                <Sparkles className="w-3 h-3" />
                <span>AI Understanding Complete</span>
              </div>
              <h2 className="font-serif text-[28px] font-normal text-white tracking-tight leading-tight">
                What would you like to create?
              </h2>
              <p className="text-xs text-[#8E8E93] mt-1.5">
                We detected <strong className="text-white">6 distinct UI steps</strong> and clean narration. Choose your target output format:
              </p>
            </div>

            {/* 4 Intent Cards Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* 1. Polished Video */}
              <div
                onClick={() => setSelectedIntent("video")}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedIntent === "video"
                    ? "bg-[#212126] border-white/30 ring-1 ring-white/15"
                    : "bg-[#18181B] border-white/[0.05] hover:bg-[#1E1E22] hover:border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Video className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    {selectedIntent === "video" && (
                      <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-white mb-1">Polished Video</h4>
                  <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                    Auto-zooms on clicks, kinetic subtitles, silence removal, and pacing.
                  </p>
                </div>
              </div>

              {/* 2. Step-by-Step Documentation */}
              <div
                onClick={() => setSelectedIntent("documentation")}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedIntent === "documentation"
                    ? "bg-[#212126] border-white/30 ring-1 ring-white/15"
                    : "bg-[#18181B] border-white/[0.05] hover:bg-[#1E1E22] hover:border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    {selectedIntent === "documentation" && (
                      <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-white mb-1">Written Documentation</h4>
                  <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                    Step-by-step screenshots with highlighted clicks and markdown notes.
                  </p>
                </div>
              </div>

              {/* 3. Interactive Demo */}
              <div
                onClick={() => setSelectedIntent("interactive-demo")}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedIntent === "interactive-demo"
                    ? "bg-[#212126] border-white/30 ring-1 ring-white/15"
                    : "bg-[#18181B] border-white/[0.05] hover:bg-[#1E1E22] hover:border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <MousePointer className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    {selectedIntent === "interactive-demo" && (
                      <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-white mb-1">Interactive Demo</h4>
                  <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                    Clickable guided product tour with hotspots and interactive tooltips.
                  </p>
                </div>
              </div>

              {/* 4. Complete Package (Featured) */}
              <div
                onClick={() => setSelectedIntent("all")}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                  selectedIntent === "all"
                    ? "bg-[#212126] border-white/30 ring-1 ring-white/15"
                    : "bg-[#18181B] border-white/[0.05] hover:bg-[#1E1E22] hover:border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-white/10 text-white">
                      Recommended
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white mb-1">All-in-One Studio</h4>
                  <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                    Two Tools, One Workflow. Video Studio + Step-by-Step Documentation combined.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onCancel}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => onComplete(selectedIntent)}
                className="px-5 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Open in Studio Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
