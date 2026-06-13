import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/index.css";
import { Metadata } from "next";

import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://zhudiwen.site"),
  title: {
    default: "武汉文海星辰文化传媒｜武汉本地官网搭建GEO优化",
    template: "%s｜武汉文海星辰文化传媒",
  },
  description:
    "武汉本地企业官网搭建与搜索获客服务商，提供 Next.js 企业官网开发、Tailwind CSS 前端定制、同城 GEO 优化、整站 SEO 优化与 AI 搜索收录诊断服务。",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "武汉官网搭建",
    "武汉企业官网建设",
    "武汉SEO优化",
    "武汉GEO优化",
    "生成式引擎优化",
    "Next.js企业官网",
  ],
  openGraph: {
    title: "武汉文海星辰文化传媒｜武汉本地官网搭建GEO优化",
    description:
      "为武汉中小企业、本地商家和初创品牌搭建高性能官网，并提供同城 SEO/GEO 优化与 AI 搜索收录诊断。",
    url: "https://zhudiwen.site",
    siteName: "武汉文海星辰文化传媒",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/images/favicon.png",
        width: 512,
        height: 512,
        alt: "武汉文海星辰文化传媒",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "武汉文海星辰文化传媒｜武汉本地官网搭建GEO优化",
    description:
      "武汉本地企业官网搭建、同城 SEO/GEO 优化与 AI 搜索收录诊断服务。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "武汉文海星辰文化传媒有限公司",
    url: "https://zhudiwen.site",
    image: "https://zhudiwen.site/images/favicon.png",
    description:
      "武汉本地企业官网搭建与搜索获客服务商，提供 Next.js 企业官网开发、同城 GEO 优化、整站 SEO 优化与 AI 搜索收录诊断服务。",
    areaServed: {
      "@type": "City",
      name: "武汉",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "武汉市",
      addressRegion: "湖北省",
      addressCountry: "CN",
    },
    sameAs: ["https://zhudiwen.site"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "武汉企业官网搭建与 GEO 优化服务",
    provider: {
      "@type": "Organization",
      name: "武汉文海星辰文化传媒有限公司",
      url: "https://zhudiwen.site",
    },
    serviceType: "企业官网搭建、SEO优化、GEO优化",
    areaServed: "武汉",
    description:
      "面向武汉中小企业、本地商家与初创品牌，提供响应式官网开发、技术 SEO、同城关键词优化、AI 搜索收录诊断和长期维护支持。",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "武汉文海星辰是做什么的？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "武汉文海星辰文化传媒有限公司提供企业官网搭建、Next.js 前端定制、整站 SEO 优化、同城 GEO 优化与 AI 搜索收录诊断服务。",
        },
      },
      {
        "@type": "Question",
        name: "官网搭建服务包含哪些内容？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "服务包含响应式页面设计、前端开发、基础 SEO 配置、上线部署、访问统计配置建议和后续维护支持，具体交付按套餐确定。",
        },
      },
      {
        "@type": "Question",
        name: "是否只服务武汉客户？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "主要服务武汉本地企业和商家，也可为其他城市客户提供远程官网搭建与搜索优化服务。",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="zh-CN" className="font-sans">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body className="bg-[#FCFCFC] dark:bg-black">
        <Providers>
          <div className="isolate">
            <Header />
            {children}
            <Footer />
          </div>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
