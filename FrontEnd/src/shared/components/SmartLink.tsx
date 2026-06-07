import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  isImplementedRoute,
  PLACEHOLDER_ROUTE,
} from "@core/constants/routes";

type SmartLinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function SmartLink({
  to,
  className,
  children,
  onClick,
}: SmartLinkProps) {
  if (!isImplementedRoute(to)) {
    return (
      <a href={PLACEHOLDER_ROUTE} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
