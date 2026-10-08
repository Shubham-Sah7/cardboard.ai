"use client"

import React from "react"

export function CardboardIcon({
  className = "w-4.5 h-4.5 text-white",
  withBackground = false,
}: {
  className?: string
  withBackground?: boolean
}) {
  if (withBackground) {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <rect width="200" height="200" rx="44" fill="black" />
        {/* Exact Cardboard 18-slat cylindrical mark */}
        <rect x="47.62" y="87.50" width="5.75" height="25.00" rx="1.50" fill="white" />
        <rect x="146.62" y="87.50" width="5.75" height="25.00" rx="1.50" fill="white" />
        <rect x="59.00" y="76.75" width="5.00" height="16.50" rx="1.50" fill="white" />
        <rect x="58.50" y="103.75" width="6.00" height="24.50" rx="1.75" fill="white" />
        <rect x="69.86" y="68.86" width="5.29" height="17.99" rx="1.50" fill="white" />
        <rect x="69.25" y="105.43" width="6.50" height="27.13" rx="1.75" fill="white" />
        <rect x="80.71" y="62.12" width="5.57" height="19.37" rx="1.50" fill="white" />
        <rect x="80.00" y="106.92" width="7.00" height="29.65" rx="1.75" fill="white" />
        <rect x="91.57" y="56.96" width="5.86" height="20.56" rx="1.50" fill="white" />
        <rect x="90.75" y="108.13" width="7.50" height="32.00" rx="1.75" fill="white" />
        <rect x="102.57" y="56.96" width="5.86" height="20.56" rx="1.50" fill="white" />
        <rect x="101.75" y="108.13" width="7.50" height="32.00" rx="1.75" fill="white" />
        <rect x="113.71" y="62.12" width="5.57" height="19.37" rx="1.50" fill="white" />
        <rect x="113.00" y="106.92" width="7.00" height="29.65" rx="1.75" fill="white" />
        <rect x="124.86" y="68.86" width="5.29" height="17.99" rx="1.50" fill="white" />
        <rect x="124.25" y="105.43" width="6.50" height="27.13" rx="1.75" fill="white" />
        <rect x="136.00" y="76.75" width="5.00" height="16.50" rx="1.50" fill="white" />
        <rect x="135.50" y="103.75" width="6.00" height="24.50" rx="1.75" fill="white" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="42 52 116 94"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Exact Cardboard 18-slat cylindrical mark */}
      <rect x="47.62" y="87.50" width="5.75" height="25.00" rx="1.50" />
      <rect x="146.62" y="87.50" width="5.75" height="25.00" rx="1.50" />
      <rect x="59.00" y="76.75" width="5.00" height="16.50" rx="1.50" />
      <rect x="58.50" y="103.75" width="6.00" height="24.50" rx="1.75" />
      <rect x="69.86" y="68.86" width="5.29" height="17.99" rx="1.50" />
      <rect x="69.25" y="105.43" width="6.50" height="27.13" rx="1.75" />
      <rect x="80.71" y="62.12" width="5.57" height="19.37" rx="1.50" />
      <rect x="80.00" y="106.92" width="7.00" height="29.65" rx="1.75" />
      <rect x="91.57" y="56.96" width="5.86" height="20.56" rx="1.50" />
      <rect x="90.75" y="108.13" width="7.50" height="32.00" rx="1.75" />
      <rect x="102.57" y="56.96" width="5.86" height="20.56" rx="1.50" />
      <rect x="101.75" y="108.13" width="7.50" height="32.00" rx="1.75" />
      <rect x="113.71" y="62.12" width="5.57" height="19.37" rx="1.50" />
      <rect x="113.00" y="106.92" width="7.00" height="29.65" rx="1.75" />
      <rect x="124.86" y="68.86" width="5.29" height="17.99" rx="1.50" />
      <rect x="124.25" y="105.43" width="6.50" height="27.13" rx="1.75" />
      <rect x="136.00" y="76.75" width="5.00" height="16.50" rx="1.50" />
      <rect x="135.50" y="103.75" width="6.00" height="24.50" rx="1.75" />
    </svg>
  )
}

export function CardboardLogo({
  className = "",
  size = "md",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-[14.5px]"

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <CardboardIcon className={`${iconSize} text-white shrink-0`} />
      <span className={`font-sans font-semibold tracking-tight text-white ${textSize}`}>
        Cardboard
      </span>
    </div>
  )
}
