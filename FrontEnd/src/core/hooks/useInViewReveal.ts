import { useEffect, useRef, useState } from "react";

export type UseInViewRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  enabled?: boolean;
};

export function useInViewReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
  enabled = true,
}: UseInViewRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, once, rootMargin, threshold]);

  return { ref, isVisible };
}
