"use client";

import { AuroraText } from "@/components/ui/aurora-text";

export default function Video() {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-[80px] max-w-[570px] text-center">
          <h2 className="mb-4 text-3xl font-bold leading-tight! text-black dark:text-white sm:text-4xl md:text-[45px]">
            <AuroraText
              colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
              speed={1.2}
            >
              我们随时准备为您提供帮助
            </AuroraText>
          </h2>
          <p className="text-base leading-relaxed! text-body-color md:text-lg">
            我们提供多种解决方案，帮助您解决各种问题。无论您遇到什么挑战，我们都能为您提供支持。
          </p>
        </div>
      </div>
    </section>
  );
}
