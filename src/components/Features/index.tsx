"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-[100px] max-w-[570px] text-center">
            <h2 className="mb-4 text-3xl font-bold leading-tight! text-black dark:text-white sm:text-4xl md:text-[45px]">
              <AuroraText
                colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
                speed={1.2}
              >
                您的网站，值得更专业的服务
              </AuroraText>
            </h2>
            <p className="text-base leading-relaxed! text-body-color md:text-lg">
              专注武汉本地网站搭建与同城GEO优化，为您的企业打造高效获客、丝滑体验的定制化官网解决方案。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
