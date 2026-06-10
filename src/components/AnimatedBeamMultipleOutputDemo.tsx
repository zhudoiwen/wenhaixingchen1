"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "./ui/animated-beam"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

const LocalIcon = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="size-full object-contain" />
)

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)
  const div8Ref = useRef<HTMLDivElement>(null)
  const div9Ref = useRef<HTMLDivElement>(null)
  const div10Ref = useRef<HTMLDivElement>(null)
  const div11Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10 content-visibility-auto",
        className
      )}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <LocalIcon src="/images/beam-1.svg" alt="用户" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <LocalIcon src="/images/beam-2.svg" alt="中心" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <LocalIcon src="/images/beam-3.svg" alt="图标1" />
          </Circle>
          <Circle ref={div2Ref}>
            <LocalIcon src="/images/beam-4.svg" alt="图标2" />
          </Circle>
          <Circle ref={div3Ref}>
            <LocalIcon src="/images/beam-5.svg" alt="图标3" />
          </Circle>
          <Circle ref={div4Ref}>
            <LocalIcon src="/images/beam-6.svg" alt="图标4" />
          </Circle>
          <Circle ref={div5Ref}>
            <LocalIcon src="/images/beam-7.svg" alt="图标5" />
          </Circle>
          <Circle ref={div8Ref}>
            <LocalIcon src="/images/beam-8.svg" alt="图标6" />
          </Circle>
          <Circle ref={div9Ref}>
            <LocalIcon src="/images/beam-9.svg" alt="图标7" />
          </Circle>
          <Circle ref={div10Ref}>
            <LocalIcon src="/images/beam-10.svg" alt="图标8" />
          </Circle>
          <Circle ref={div11Ref}>
            <LocalIcon src="/images/beam-11.svg" alt="图标9" />
          </Circle>
        </div>
      </div>

      <div ref={containerRef} className="absolute inset-0">
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div8Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div9Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div10Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div11Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
          duration={3}
        />
      </div>
    </div>
  )
}