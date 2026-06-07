import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useReducedMotion } from "@core/hooks/useReducedMotion";

type PageEnterProps = {
  children: ReactNode;
  className?: string;
};

export default function PageEnter({ children, className }: PageEnterProps) {
  const reducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, reducedMotion]);

  return (
    <div
      className={clsx(
        !reducedMotion && "site-page-enter",
        visible && "site-page-enter-visible",
        className,
      )}
    >
      {children}
    </div>
  );
}
