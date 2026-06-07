import type { ReactNode } from "react";
import clsx from "clsx";
import { useInViewReveal } from "@core/hooks/useInViewReveal";
import { useReducedMotion } from "@core/hooks/useReducedMotion";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  once?: boolean;
  as?: "div" | "section" | "article" | "aside" | "li";
};

const directionClass: Record<RevealDirection, string> = {
  up: "site-reveal-up",
  down: "site-reveal-down",
  left: "site-reveal-left",
  right: "site-reveal-right",
  scale: "site-reveal-scale",
  fade: "site-reveal-fade",
};

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as: Tag = "div",
}: RevealOnScrollProps) {
  const reducedMotion = useReducedMotion();
  const { ref, isVisible } = useInViewReveal({ once, enabled: !reducedMotion });

  return (
    <Tag
      ref={ref as never}
      className={clsx(
        reducedMotion ? undefined : directionClass[direction],
        !reducedMotion && isVisible && "site-reveal-visible",
        className,
      )}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
