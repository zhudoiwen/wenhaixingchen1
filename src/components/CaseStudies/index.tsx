"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import { BarChart3, CheckCircle2, Clock3, MapPin } from "lucide-react";

const cases = [
  {
    industry: "本地生活服务",
    title: "从只有朋友圈获客，到可被同城关键词找到",
    result: "完善服务页、FAQ 与本地化关键词布局后，咨询入口更清晰，客户能直接了解服务范围和联系方式。",
  },
  {
    industry: "专业服务机构",
    title: "把口碑介绍沉淀成可检索的品牌官网",
    result: "补齐案例、服务流程、常见问题与结构化数据，让搜索引擎和 AI 摘要更容易理解业务能力。",
  },
  {
    industry: "初创品牌官网",
    title: "7-15 天完成品牌展示、移动端适配和基础 SEO",
    result: "用 Next.js 构建高性能官网，交付可持续维护的页面结构，避免后续内容扩展推倒重来。",
  },
];

const guarantees = [
  {
    icon: Clock3,
    title: "上线周期明确",
    text: "常规企业官网按需求确认、视觉搭建、内容填充、上线检查四步推进。",
  },
  {
    icon: MapPin,
    title: "武汉本地服务",
    text: "面向武汉中小企业、本地商家和初创品牌，关键词和内容围绕真实经营区域设计。",
  },
  {
    icon: BarChart3,
    title: "搜索获客导向",
    text: "不只做展示页，同步考虑 SEO、GEO、AI 搜索摘要和咨询转化路径。",
  },
  {
    icon: CheckCircle2,
    title: "交付内容可验收",
    text: "明确页面、功能、基础 SEO 配置、部署上线、维护支持和后续优化建议。",
  },
];

const CaseStudies = () => {
  return (
    <section id="cases" className="bg-white py-16 dark:bg-gray-dark md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <h2 className="mb-4 text-3xl font-bold leading-tight! text-black dark:text-white sm:text-4xl md:text-[45px]">
            <AuroraText
              colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
              speed={1.2}
            >
              更像获客系统，而不只是介绍页面
            </AuroraText>
          </h2>
          <p className="text-base leading-relaxed! text-body-color md:text-lg">
            每个官网交付都会围绕“能被看见、能被理解、能被咨询”来设计，让访问者更快判断你是否值得联系。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="rounded-xs border border-body-color/10 bg-[#FCFCFC] p-7 dark:border-white/10 dark:bg-white/5"
            >
              <p className="mb-4 text-sm font-semibold text-[#4A6CF7]">{item.industry}</p>
              <h3 className="mb-4 text-xl font-bold leading-snug text-black dark:text-white">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                {item.result}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {guarantees.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xs border border-body-color/10 p-6 dark:border-white/10"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xs bg-[#4A6CF7]/10 text-[#4A6CF7]">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-black dark:text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
