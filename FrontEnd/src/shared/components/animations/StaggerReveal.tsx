import type { ReactNode } from "react";
import RevealOnScroll from "@shared/components/RevealOnScroll";

type StaggerRevealProps = {
  children: ReactNode;
  index: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  step?: number;
  as?: "div" | "section" | "article" | "aside" | "li";
};

export default function StaggerReveal({
  children,
  index,
  className,
  direction = "up",
  step = 90,
  as,
}: StaggerRevealProps) {
  return (
    <RevealOnScroll
      as={as}
      delay={index * step}
      direction={direction}
      className={className}
    >
      {children}
    </RevealOnScroll>
  );
}
