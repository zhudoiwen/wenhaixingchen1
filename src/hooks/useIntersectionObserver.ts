"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const [isInView, setIsInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<T>(null) as RefObject<T>;

  const {
    rootMargin = "0px",
    threshold = 0.1,
    triggerOnce = false,
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (!hasEntered) {
              setHasEntered(true);
            }
            if (triggerOnce) {
              observer.disconnect();
            }
          } else {
            if (!triggerOnce) {
              setIsInView(false);
            }
          }
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
  }, [rootMargin, threshold, triggerOnce, hasEntered]);

  return { ref, isInView, hasEntered };
}