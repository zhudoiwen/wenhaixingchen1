"use client"

import React, { memo, useEffect, useState } from "react"
import { useAnimationControl } from "@/hooks/useAnimationControl"

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1,
  }: AuroraTextProps) => {
    const [isAnimating, setIsAnimating] = useState(false)
    const { ref, shouldAnimate } = useAnimationControl<HTMLSpanElement>({
      rootMargin: "100px",
      threshold: 0.1,
    })

    useEffect(() => {
      setIsAnimating(shouldAnimate)
    }, [shouldAnimate])

    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    }

    return (
      <span
        ref={ref}
        className={`relative inline-block content-visibility-auto ${className}`}
        aria-label={typeof children === 'string' ? children : undefined}
      >
        <span
          className={`relative bg-size-[200%_auto] bg-clip-text text-transparent ${
            isAnimating ? "animate-aurora" : ""
          }`}
          style={gradientStyle}
        >
          {children}
        </span>
      </span>
    )
  }
)

AuroraText.displayName = "AuroraText"