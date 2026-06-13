"use client";

import AboutSectionOne from "@/components/About/AboutSectionOne";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import CaseStudies from "@/components/CaseStudies";
import { ContactDemo } from "@/components/ContactDemo";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import WeChatModal from "@/components/WechatModal";
import { useEffect, useState } from "react";

export default function Home() {
  const [isWeChatOpen, setWeChatOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        const targetElement = document.getElementById('contact');
        if (targetElement) {
          requestAnimationFrame(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <Testimonials />
      <CaseStudies />
      <Pricing onButtonClick={() => setWeChatOpen(true)} />
      <Blog />
      <div id="contact" className="flex justify-center py-16">
        <div onClick={() => setWeChatOpen(true)} className="cursor-pointer">
          <ContactDemo />
        </div>
      </div>
      <WeChatModal 
        isOpen={isWeChatOpen} 
        onClose={() => setWeChatOpen(false)} 
        src="/images/wechat-qr.png" 
      />
    </>
  );
}
