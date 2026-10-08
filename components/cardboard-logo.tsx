"use client"

import React from "react"

export function CardboardIcon({
  className = "",
}: {
  className?: string
  withBackground?: boolean
} = {}) {
  // Logo mark removed per request - only the Cardboard name is kept
  return null
}

export function CardboardLogo({
  className = "",
  size = "md",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const textSize =
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-[15px]"

  return (
    <div className={`flex items-center select-none ${className}`}>
      <span className={`font-sans font-semibold tracking-tight text-white ${textSize}`}>
        Cardboard
      </span>
    </div>
  )
}
