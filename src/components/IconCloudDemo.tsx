"use client";

import { IconCloud } from "@/components/ui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "tailwindcss",
  "vercel",
  "postgresql",
  "firebase",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "figma",
  "nodejs",
  "html5",
  "css3",
  "express",
  "prisma",
  "amazonaws",
  "nginx",
  "testinglibrary",
  "jest",
  "cypress",
  "jira",
  "gitlab",
  "androidstudio",
  "sonarqube",
  "flutter",
  "android",
  "dart",
];

export function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="relative flex h-[300px] w-full items-center justify-center">
      <IconCloud images={images} />
    </div>
  );
}