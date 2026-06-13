"use client";

import { AuroraText } from "@/components/ui/aurora-text";

export function ContactDemo() {
  return (
    <div 
      className="max-w-3xl items-center justify-center rounded-xs border border-body-color/10 bg-white px-8 py-10 text-center shadow-three transition-all duration-300 ease-out hover:-translate-y-2 dark:border-white/10 dark:bg-gray-dark"
      style={{ transitionProperty: 'transform, box-shadow' }}
    >
      <span className="text-center text-3xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap md:text-5xl">
        <AuroraText
          colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
          speed={1.2}
        >
          免费诊断你的网站获客问题
        </AuroraText>
      </span>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
        添加微信后，可先沟通行业、服务范围、现有网站和目标关键词，我们会给出官网结构、SEO/GEO 和转化入口的优化建议。
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm font-medium text-body-color dark:text-body-color-dark">
        <span className="rounded-xs bg-[#4A6CF7]/10 px-4 py-2 text-[#4A6CF7]">适合武汉本地商家</span>
        <span className="rounded-xs bg-[#4A6CF7]/10 px-4 py-2 text-[#4A6CF7]">可评估现有官网</span>
        <span className="rounded-xs bg-[#4A6CF7]/10 px-4 py-2 text-[#4A6CF7]">明确下一步交付</span>
      </div>
    </div>
  )
}
