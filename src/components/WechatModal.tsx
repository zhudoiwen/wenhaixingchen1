"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
};

export default function WeChatModal({ isOpen, onClose, src }: PropsType) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = "zhudiwen9999";
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
    
    document.body.removeChild(textarea);
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg p-4 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full text-xl leading-none cursor-pointer hover:bg-gray-700"
        >
          <span className="sr-only">关闭</span>
          &times;
        </button>
        <div className="relative w-full aspect-square">
          <Image
            src={src}
            alt="微信二维码"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center gap-3 mt-4">
          <p className="text-gray-700 font-medium text-lg">
            <AuroraText
              colors={["#ff2975", "#7928CA", "#0070F3", "#38bdf8"]}
              speed={1.2}
            >
              zhudiwen9999
            </AuroraText>
          </p>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
          >
            {copied ? "已复制" : "复制"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}