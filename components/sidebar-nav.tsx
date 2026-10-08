"use client"

import React, { useState } from "react"
import {
  Home,
  Folder,
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
  Sparkles,
  CircleHelp,
  Zap,
  Check,
  ExternalLink,
  MessageCircle,
  Film,
} from "lucide-react"
import { CardboardLogo } from "./cardboard-logo"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ActiveNavTab =
  | "home"
  | "projects"
  | "agent"
  | "chats"
  | "templates"
  | "animations"
  | "insights"
  | "mcp"
  | "auto-updates"
  | "clips"
  | "translation"
  | "brand"
  | "settings"

interface SidebarNavProps {
  activeTab: ActiveNavTab
  onSelectTab: (tab: ActiveNavTab) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  onOpenEditor: () => void
  isEditorActive: boolean
}

function AppleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.04-.49 2.66-1.24" />
    </svg>
  )
}

function SidebarCollapseIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2.5" />
      <path d="M15 3v18" />
    </svg>
  )
}

export function SidebarNav({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  onOpenEditor,
  isEditorActive,
}: SidebarNavProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showMacAppModal, setShowMacAppModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showWhatsNewModal, setShowWhatsNewModal] = useState(false)

  const renderNavItem = (
    id: ActiveNavTab,
    label: string,
    IconComponent: React.ComponentType<{ className?: string; strokeWidth?: number }>,
    badge?: string,
    disabled?: boolean
  ) => {
    const isActive = activeTab === id
    if (disabled) {
      return (
        <div
          key={id}
          className={`w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium opacity-30 cursor-not-allowed pointer-events-none ${
            isCollapsed ? "justify-center p-1.5" : "px-2.5 py-1"
          }`}
          title={`${label} — coming soon`}
        >
          <IconComponent
            className="w-4 h-4 shrink-0 text-[#636368]"
            strokeWidth={1.75}
          />
          {!isCollapsed && (
            <>
              <span className="truncate text-[#636368]">{label}</span>
              <span className="ml-auto text-[8px] font-mono tracking-wider uppercase px-1 py-px rounded border border-white/10 text-[#525258] leading-none">
                soon
              </span>
            </>
          )}
        </div>
      )
    }
    return (
      <button
        key={id}
        type="button"
        onClick={() => onSelectTab(id)}
        className={`w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
          isActive
            ? "bg-white/[0.08] text-white shadow-2xs"
            : "text-[#8E8E93] hover:text-white hover:bg-white/[0.04]"
        } ${isCollapsed ? "justify-center p-1.5" : "px-2.5 py-1"}`}
        title={label}
      >
        <IconComponent
          className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#8E8E93]"}`}
          strokeWidth={1.75}
        />
        {!isCollapsed && (
          <>
            <span className="truncate">{label}</span>
            {badge && (
              <span className="ml-auto text-[9px] font-mono font-semibold tracking-wider uppercase px-1.5 py-0.2 rounded bg-white text-black leading-none">
                {badge}
              </span>
            )}
          </>
        )}
      </button>
    )
  }

  return (
    <>
      <aside
        className={`h-full flex flex-col justify-between shrink-0 bg-[#060608] border-r border-white/[0.08] transition-all duration-200 select-none ${
          isCollapsed ? "w-[60px] px-2 py-3" : "w-[240px] px-3 py-3"
        }`}
      >
        {/* Top Header: Logo & Collapse Button */}
        <div className="flex items-center justify-between px-1 h-8 shrink-0 mb-2">
          {!isCollapsed ? (
            <>
              <button
                type="button"
                onClick={() => onSelectTab("home")}
                className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
              >
                <CardboardLogo />
              </button>
              <button
                type="button"
                onClick={onToggleCollapse}
                title="Toggle sidebar"
                className="p-1 rounded-md text-[#7E7E84] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <SidebarCollapseIcon className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="w-full flex items-center justify-center p-1 rounded-md text-[#7E7E84] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <SidebarCollapseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Middle Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-0.5 flex flex-col gap-0.5 pr-0.5">
          {/* Main Section */}
          <div className="flex flex-col gap-0.5">
            {!isCollapsed && (
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#636368] uppercase px-2.5 pt-0.5 pb-0.5 select-none font-medium">
                Main
              </div>
            )}
            {renderNavItem("home", "Home", Home)}
            {renderNavItem("projects", "Projects", Folder)}
            {renderNavItem("agent", "Agent", Bot, undefined, true)}
            {renderNavItem("chats", "Chats", MessageSquare, undefined, true)}
          </div>

          {/* Subtle Dashed Divider */}
          <div className="border-t border-dashed border-white/[0.08] my-1 mx-1" />

          {/* Create Section */}
          <div className="flex flex-col gap-0.5">
            {!isCollapsed && (
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#636368] uppercase px-2.5 pt-0.5 pb-0.5 select-none font-medium">
                Create
              </div>
            )}
            {/* Editor — opens studio directly */}
            <button
              type="button"
              onClick={onOpenEditor}
              className={`w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                isEditorActive
                  ? "bg-white/[0.08] text-white shadow-2xs"
                  : "text-[#8E8E93] hover:text-white hover:bg-white/[0.04]"
              } ${isCollapsed ? "justify-center p-1.5" : "px-2.5 py-1"}`}
              title="Editor"
            >
              <Film
                className={`w-4 h-4 shrink-0 ${isEditorActive ? "text-white" : "text-[#8E8E93]"}`}
                strokeWidth={1.75}
              />
              {!isCollapsed && <span className="truncate">Editor</span>}
            </button>
            {renderNavItem("templates", "Templates", LayoutTemplate, undefined, true)}
            {renderNavItem("animations", "Animations", Clapperboard, undefined, true)}
            {renderNavItem("insights", "Insights", BarChart3, undefined, true)}
          </div>

          {/* Subtle Dashed Divider */}
          <div className="border-t border-dashed border-white/[0.08] my-1 mx-1" />

          {/* AI & Automation Section */}
          <div className="flex flex-col gap-0.5">
            {!isCollapsed && (
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#636368] uppercase px-2.5 pt-0.5 pb-0.5 select-none font-medium">
                AI & Automation
              </div>
            )}
            {renderNavItem("mcp", "MCP", Cpu, "New", true)}
            {renderNavItem("auto-updates", "Auto updates", RefreshCw, undefined, true)}
            {renderNavItem("clips", "Clips", Scissors, undefined, true)}
            {renderNavItem("translation", "Translation", Languages, undefined, true)}
          </div>

          {/* Subtle Dashed Divider */}
          <div className="border-t border-dashed border-white/[0.08] my-1 mx-1" />

          {/* Brand Section */}
          <div className="flex flex-col gap-0.5">
            {!isCollapsed && (
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#636368] uppercase px-2.5 pt-0.5 pb-0.5 select-none font-medium">
                Brand
              </div>
            )}
            {renderNavItem("brand", "Brand", Palette)}
            {renderNavItem("settings", "Settings", Settings, undefined, true)}
          </div>
        </div>

        {/* Bottom User Profile */}
        <div className="shrink-0 flex flex-col gap-0.5 pt-1 border-t border-dashed border-white/[0.08]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={`w-full flex items-center gap-2.5 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer mt-0.5 focus:outline-none ${
                  isCollapsed ? "justify-center p-1" : "px-2 py-1"
                }`}
                title="Shubham Sah"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/20">
                  <img
                    src="/avatar.jpg"
                    alt="Shubham Sah"
                    className="w-full h-full object-cover"
                  />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="text-[13px] font-medium text-[#EDEDED] truncate">
                      Shubham Sah
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-[#7E7E84] ml-auto shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={isCollapsed ? "right" : "top"}
              align="start"
              className="w-56 bg-[#161619] border-white/10 text-[#EDEDED]"
            >
              <DropdownMenuLabel className="font-normal text-xs text-[#8E8E93]">
                shubham@cardboard.ai
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/[0.06]" />
              <DropdownMenuItem
                onClick={() => setShowUpgradeModal(true)}
                className="text-xs hover:bg-white/[0.08] cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 mr-2 text-white" />
                Upgrade to Pro
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onSelectTab("settings")}
                className="text-xs hover:bg-white/[0.08] cursor-pointer"
              >
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs hover:bg-white/[0.08] cursor-pointer">
                Keyboard Shortcuts
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/[0.06]" />
              <DropdownMenuItem className="text-xs text-rose-400 hover:bg-rose-500/10 cursor-pointer">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* What's New Modal */}
      <Dialog open={showWhatsNewModal} onOpenChange={setShowWhatsNewModal}>
        <DialogContent className="sm:max-w-[500px] bg-[#121215] border border-white/10 text-white p-6 shadow-2xl">
          <DialogHeader>
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-lg font-semibold text-white">
              What&apos;s new in Cardboard
            </DialogTitle>
            <DialogDescription className="text-[#8E8E93] text-sm">
              Latest releases, AI automation tools, and performance enhancements.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-white text-black font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                MCP
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">Model Context Protocol Integration</span>
                <p className="text-[#8E8E93] mt-0.5 leading-relaxed">
                  Connect external tools (Figma, GitHub, ElevenLabs) directly to Cardboard timeline generators.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-white mt-1 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white">Auto Updates Engine</span>
                <p className="text-[#8E8E93] mt-0.5 leading-relaxed">
                  Automatically refresh video walkthroughs when product UI or documentation changes.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
              <Languages className="w-4 h-4 text-white mt-1 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white">AI Voice Dubbing in 32 Languages</span>
                <p className="text-[#8E8E93] mt-0.5 leading-relaxed">
                  Clone voice tone, lip-sync recordings, and generate localized kinetic captions in seconds.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end pt-2 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setShowWhatsNewModal(false)}
              className="px-4 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="sm:max-w-[480px] bg-[#121215] border border-white/10 text-white p-6 shadow-2xl">
          <DialogHeader>
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-lg font-semibold text-white">
              Upgrade to Cardboard Pro
            </DialogTitle>
            <DialogDescription className="text-[#8E8E93] text-sm">
              Unlock unlimited AI timeline generations, 4K rendering exports, and advanced team workflows.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
              <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white">Unlimited Multi-track AI edits</span>
                <p className="text-[#8E8E93] mt-0.5">Edit long-form raw footage into polished highlights in minutes.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
              <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white">4K 60fps & ProRes Native Export</span>
                <p className="text-[#8E8E93] mt-0.5">Lossless studio grade rendering without watermarks.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-2 border-t border-white/[0.08]">
            <div>
              <span className="text-xl font-bold text-white">$24</span>
              <span className="text-xs text-[#8E8E93]"> / month</span>
            </div>
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="px-4 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Start 14-day Free Trial
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mac App Modal */}
      <Dialog open={showMacAppModal} onOpenChange={setShowMacAppModal}>
        <DialogContent className="sm:max-w-[440px] bg-[#121215] border border-white/10 text-white p-6 shadow-2xl">
          <DialogHeader>
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-2">
              <AppleIcon className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-lg font-semibold text-white">
              Cardboard for macOS
            </DialogTitle>
            <DialogDescription className="text-[#8E8E93] text-sm">
              Hardware accelerated video rendering with native Apple Silicon (M1/M2/M3/M4) performance.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => setShowMacAppModal(false)}
              className="flex-1 py-2 px-3 rounded-lg bg-white text-black font-medium text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <AppleIcon className="w-3.5 h-3.5" />
              Download for Mac (.dmg)
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help / Chat with us Modal */}
      <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
        <DialogContent className="sm:max-w-[420px] bg-[#121215] border border-white/10 text-white p-6 shadow-2xl">
          <DialogHeader>
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-2">
              <CircleHelp className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-base font-semibold text-white">
              Help & Live Support
            </DialogTitle>
            <DialogDescription className="text-[#8E8E93] text-xs">
              We&apos;re here to help you get the best out of Cardboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-3">
            <a
              href="https://docs.cardboard.ai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs text-white transition-colors"
            >
              <span>Documentation & Guides</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93]" />
            </a>
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs text-white transition-colors text-left cursor-pointer"
            >
              <span>Chat with Cardboard team</span>
              <MessageCircle className="w-3.5 h-3.5 text-[#8E8E93]" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
