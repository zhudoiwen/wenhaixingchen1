import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { AuroraText } from "@/components/ui/aurora-text";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <>
      <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300">
        <div className="relative block aspect-37/22 w-full">
          <Image src={image} alt="image" fill />
        </div>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href="/blog-details"
              className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white"
            >
              <AuroraText
                colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
                speed={1.2}
              >
                {title}
              </AuroraText>
            </Link>
          </h3>
          <p className="border-body-color/10 text-body-color text-base font-medium dark:border-white/10">
            {paragraph}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;