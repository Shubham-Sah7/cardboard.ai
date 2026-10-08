"use client"

import React, { useState } from "react"
import {
  FileText,
  Copy,
  Download,
  ExternalLink,
  Check,
  MousePointer,
  Sparkles,
  Edit3,
  Share2,
} from "lucide-react"

interface DocStep {
  id: number
  title: string
  instruction: string
  timestamp: string
  targetElement: string
  codeSnippet?: string
}

const SAMPLE_STEPS: DocStep[] = [
  {
    id: 1,
    title: "Navigate to Organization Settings",
    instruction: "From the top-right navigation bar, click on your profile icon and select 'Settings' from the dropdown menu.",
    timestamp: "00:08",
    targetElement: "Top navigation > Profile Menu > Settings",
  },
  {
    id: 2,
    title: "Open the Developer & API Keys Tab",
    instruction: "In the left sidebar under Workspace Configuration, locate and click the 'API Keys' section to view active tokens.",
    timestamp: "00:26",
    targetElement: "Sidebar > API Keys",
  },
  {
    id: 3,
    title: "Generate a New Production Secret Key",
    instruction: "Click the '+ Create New Key' button in the upper right. Provide a descriptive label such as 'Production Server' and set expiration to 90 days.",
    timestamp: "00:54",
    targetElement: "Primary Action Button: '+ Create New Key'",
    codeSnippet: `curl -X POST https://api.cardboard.ai/v1/auth/tokens \\
  -H "Authorization: Bearer cb_live_94827103810" \\
  -d '{"scope": "read_write", "environment": "production"}'`,
  },
  {
    id: 4,
    title: "Save Key in Environment Secrets",
    instruction: "Copy the newly generated secret key immediately. It will not be shown again. Store it securely in your deployment environment variables.",
    timestamp: "01:22",
    targetElement: "Modal > Secret Key Input Box > Copy Button",
  },
]

export function DocumentationView({ projectTitle }: { projectTitle: string }) {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeIdx(idx)
    setTimeout(() => setCopiedCodeIdx(null), 2000)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#141416] text-[#EDEDED] overflow-y-auto p-8 select-none">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header section */}
        <div className="border-b border-white/[0.08] pb-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7E7E84]">
              Auto-Generated Step Guide
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-[#1F1F24] hover:bg-[#26262C] border border-white/[0.06] text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied" : "Share Guide"}</span>
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#1F1F24] hover:bg-[#26262C] border border-white/[0.06] text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Markdown (.md)</span>
              </button>
            </div>
          </div>

          <h1 className="font-serif text-3xl font-normal text-white tracking-tight mb-2">
            {projectTitle}
          </h1>
          <p className="text-sm text-[#8E8E93] leading-relaxed">
            This step-by-step walkthrough was synthesized automatically by Cardboard AI from your raw screen recording. Every click event has been cataloged into clear procedures.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-8">
          {SAMPLE_STEPS.map((step) => (
            <div
              key={step.id}
              className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/10 text-white font-mono text-xs font-semibold flex items-center justify-center">
                    {step.id}
                  </span>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-[#7E7E84]">
                  at {step.timestamp}
                </span>
              </div>

              <p className="text-xs text-[#A1A1A8] leading-relaxed ml-8 mb-4">
                {step.instruction}
              </p>

              {/* Target Element Tag */}
              <div className="ml-8 mb-4 flex items-center gap-1.5 text-[11px] text-[#7E7E84] bg-white/[0.03] border border-white/[0.04] px-2.5 py-1 rounded-md w-fit">
                <MousePointer className="w-3 h-3 text-cyan-400" />
                <span>Target Click: <strong className="text-neutral-300">{step.targetElement}</strong></span>
              </div>

              {/* Code Snippet if applicable */}
              {step.codeSnippet && (
                <div className="ml-8 relative rounded-xl bg-[#0F0F11] border border-white/[0.06] p-3 text-xs font-mono text-neutral-300">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/[0.04] text-[11px] text-[#7E7E84]">
                    <span>Terminal Request</span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(step.codeSnippet!, step.id)}
                      className="p-1 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedCodeIdx === step.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-cyan-300">
                    {step.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
