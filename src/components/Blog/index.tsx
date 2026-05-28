"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <div className="mx-auto mb-[100px] max-w-[570px] text-center">
          <h2 className="mb-4 text-3xl font-bold leading-tight! text-black dark:text-white sm:text-4xl md:text-[45px]">
            <AuroraText
              colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
              speed={1.2}
            >
              流量增长工具
            </AuroraText>
          </h2>
          <p className="text-base leading-relaxed! text-body-color md:text-lg">
            查看我们的精选项目，了解同城GEO优化与生成式引擎优化的真实效果。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
