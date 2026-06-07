import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { useReducedMotion } from "@core/hooks/useReducedMotion";

type EnterItemProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  style?: CSSProperties;
};

export default function EnterItem({
  children,
  className,
  index = 0,
  style,
}: EnterItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={clsx(!reducedMotion && "site-hero-enter", className)}
      style={
        reducedMotion
          ? style
          : { ...style, animationDelay: `${80 + index * 110}ms` }
      }
    >
      {children}
    </div>
  );
}
