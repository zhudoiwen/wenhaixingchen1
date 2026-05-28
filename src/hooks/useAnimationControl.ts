"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useAnimationControl<T extends HTMLElement = HTMLElement>(
  options: {
    rootMargin?: string;
    threshold?: number | number[];
    pauseOnBackground?: boolean;
  } = {}
) {
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const ref = useRef<T>(null) as RefObject<T>;

  const {
    rootMargin = "0px",
    threshold = 0.1,
    pauseOnBackground = true,
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (!pauseOnBackground) return;

    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pauseOnBackground]);

  const shouldAnimate = isInView && isPageVisible;

  return { ref, isInView, isPageVisible, shouldAnimate };
}