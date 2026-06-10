"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { cn } from "@/lib/utils";
import articleData from "./articleData";

const ArticleLibrary = () => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-[60px] max-w-[570px] text-center md:mb-[80px]">
          <h2 className="mb-4 text-3xl font-bold leading-tight! text-black dark:text-white sm:text-4xl md:text-[45px]">
            <AuroraText
              colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
              speed={1.2}
            >
              SEO+GEO优化文章库
            </AuroraText>
          </h2>
          <p className="text-base leading-relaxed! text-body-color md:text-lg">
            深度解读搜索引擎优化与生成式引擎优化策略，助力武汉本地企业提升线上获客能力。
          </p>
        </div>

        <div className="mx-auto max-w-[800px]">
          {articleData.map((article) => {
            const isOpen = openIds.has(article.id);

            return (
              <div
                key={article.id}
                className="border-b border-stroke dark:border-stroke-dark"
              >
                <button
                  type="button"
                  onClick={() => toggle(article.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary dark:hover:text-primary"
                >
                  <span className="text-base font-semibold text-black dark:text-white sm:text-lg">
                    {article.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-body-color transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                      {article.content.split("\n\n").map((paragraph, index) => (
                        <p key={index} className={index > 0 ? "mt-4" : ""}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArticleLibrary;
