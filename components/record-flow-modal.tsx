"use client"

import React, { useState, useEffect } from "react"
import {
  Monitor,
  Camera,
  Mic,
  MicOff,
  Video,
  Check,
  X,
  Play,
  Square,
  Pause,
  Sliders,
  Sparkles,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export type RecordingMode = "screen" | "screen-cam" | "screen-cam-mic"
export type RecordingSource = "screen" | "window" | "tab"

interface RecordFlowModalProps {
  isOpen: boolean
  onClose: () => void
  onStartRecording: (config: {
    mode: RecordingMode
    source: RecordingSource
    micEnabled: boolean
    camEnabled: boolean
  }) => void
}

export function RecordFlowModal({
  isOpen,
  onClose,
  onStartRecording,
}: RecordFlowModalProps) {
  const [mode, setMode] = useState<RecordingMode>("screen-cam-mic")
  const [source, setSource] = useState<RecordingSource>("screen")
  const [micEnabled, setMicEnabled] = useState(true)
  const [camEnabled, setCamEnabled] = useState(true)

  const handleStart = () => {
    onStartRecording({
      mode,
      source,
      micEnabled,
      camEnabled,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] bg-[#161619] border border-white/[0.08] text-white p-6 shadow-2xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
              <Video className="w-3.5 h-3.5 text-white" />
            </div>
            <DialogTitle className="text-base font-semibold text-white tracking-tight">
              Record Studio Footage
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#8E8E93]">
            Capture high-framerate screen footage with AI auto-zoom and voice cleanup.
          </DialogDescription>
        </DialogHeader>

        {/* Recording Mode */}
        <div className="space-y-3 mb-5">
          <label className="text-xs font-medium text-[#7E7E84] uppercase tracking-wider">
            Capture Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: "screen" as RecordingMode,
                icon: Monitor,
                label: "Screen Only",
              },
              {
                id: "screen-cam" as RecordingMode,
                icon: Camera,
                label: "Screen + Cam",
              },
              {
                id: "screen-cam-mic" as RecordingMode,
                icon: Mic,
                label: "Full Studio",
              },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  mode === id
                    ? "bg-[#222227] border-white/20 text-white"
                    : "bg-[#18181B] border-white/[0.05] text-[#8E8E93] hover:text-white hover:bg-[#1E1E22]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className="w-4 h-4" />
                  {mode === id && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Source Selection */}
        <div className="space-y-2 mb-5">
          <label className="text-xs font-medium text-[#7E7E84] uppercase tracking-wider">
            Screen Source
          </label>
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#18181B] border border-white/[0.05]">
            {[
              { id: "screen" as RecordingSource, label: "Entire Display" },
              { id: "window" as RecordingSource, label: "Application Window" },
              { id: "tab" as RecordingSource, label: "Browser Tab" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSource(id)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  source === id
                    ? "bg-[#25252A] text-white shadow-2xs"
                    : "text-[#8E8E93] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Audio / Camera Toggles */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] border border-white/[0.05] mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                micEnabled
                  ? "bg-white/[0.08] border-white/10 text-white"
                  : "bg-transparent border-transparent text-[#7E7E84]"
              }`}
              title={micEnabled ? "Microphone active" : "Microphone muted"}
            >
              {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <div className="text-xs">
              <span className="font-medium text-white block">Studio Mic Input</span>
              <span className="text-[#7E7E84] text-[11px]">
                {micEnabled ? "AI Noise Suppression active" : "Muted"}
              </span>
            </div>
          </div>

          {/* Simulated Audio Visualizer Bar */}
          {micEnabled && (
            <div className="flex items-center gap-0.5 h-3">
              {[40, 70, 90, 60, 80, 50, 65].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1 bg-emerald-400/80 rounded-full animate-pulse"
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#8E8E93] hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStart}
            className="px-4 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>Start Recording</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Floating Live Recording Controller Bar
 */
export function LiveRecordingController({
  onStop,
  onCancel,
}: {
  onStop: () => void
  onCancel: () => void
}) {
  const [seconds, setSeconds] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [isPaused])

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#161619]/95 backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.8)] text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Pulsing Recording Indicator */}
      <div className="flex items-center gap-2 pr-2 border-r border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
        <span className="font-mono text-xs font-medium tracking-wider text-white">
          {formatTime(seconds)}
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="p-1.5 rounded-md hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          title={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={onStop}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
        >
          <Square className="w-3 h-3 fill-current" />
          <span>Finish & Process</span>
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          title="Cancel Recording"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
