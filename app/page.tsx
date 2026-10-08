"use client"

import React, { useState } from "react"
import { SidebarNav, type ActiveNavTab } from "@/components/sidebar-nav"
import { HomeWorkspace } from "@/components/home-workspace"
import { ProjectsWorkspace } from "@/components/projects-workspace"
import { StudioEditor } from "@/components/studio-editor"
import { CapabilitiesWorkspace } from "@/components/capabilities-workspace"
import { BrandWorkspace } from "@/components/brand-workspace"

type ActiveScreen = "hub" | "studio"

export default function CardboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>("brand")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("hub")
  const [activeProjectTitle, setActiveProjectTitle] = useState("Product Onboarding Walkthrough")

  const handleOpenStudio = (title: string = "Product Onboarding Walkthrough") => {
    setActiveProjectTitle(title)
    setActiveScreen("studio")
  }

  const handleBackToHub = () => {
    setActiveScreen("hub")
  }

  // Full-screen Studio Editor (100% viewport width and height)
  if (activeScreen === "studio") {
    return (
      <StudioEditor
        projectTitle={activeProjectTitle}
        onBack={handleBackToHub}
      />
    )
  }

  // Hub / Dashboard Workspace with persistent Sidebar
  return (
    <main className="h-screen w-screen overflow-hidden flex bg-[#060608] text-[#EDEDED] select-none font-sans">
      <SidebarNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab)
          setActiveScreen("hub")
        }}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        onOpenEditor={() => handleOpenStudio(activeProjectTitle)}
        isEditorActive={false}
      />

      <section className="flex-1 h-full flex flex-col min-w-0 overflow-hidden relative bg-[#070709]">
        {activeTab === "home" && (
          <HomeWorkspace onOpenStudio={handleOpenStudio} />
        )}
        {activeTab === "projects" && (
          <ProjectsWorkspace onNewProject={() => setActiveTab("home")} />
        )}
        {activeTab === "brand" && (
          <BrandWorkspace onOpenStudio={handleOpenStudio} />
        )}
        {activeTab !== "home" && activeTab !== "projects" && activeTab !== "brand" && (
          <CapabilitiesWorkspace
            tab={activeTab}
            onOpenStudio={handleOpenStudio}
          />
        )}
      </section>
    </main>
  )
}
