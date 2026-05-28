"use client";

import { AuroraText } from "@/components/ui/aurora-text";

export function ContactDemo() {
  return (
    <div 
      className="max-w-sm items-center justify-center text-center transition-all duration-300 ease-out hover:-translate-y-2"
      style={{ transitionProperty: 'transform, box-shadow' }}
    >
      <span className="text-center text-3xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap md:text-5xl xl:text-6xl">
        <AuroraText
          colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
          speed={1.2}
        >
          联系我们
        </AuroraText>
      </span>
    </div>
  )
}