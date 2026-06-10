import { Link } from "react-router-dom";
import { getVerificationMenuItems } from "@website/helpers/verificationMenuItems";

type VerificationNavMenuItemsProps = {
  isLoggedIn: boolean;
  linkClassName: string;
  onNavigate?: () => void;
};

export default function VerificationNavMenuItems({
  isLoggedIn,
  linkClassName,
  onNavigate,
}: VerificationNavMenuItemsProps) {
  const items = getVerificationMenuItems(isLoggedIn);

  return (
    <>
      {items.map((item, index) => (
        <Link
          key={item.id}
          className={`${linkClassName} ${
            index < items.length - 1 ? "border-b border-outline-variant/10" : ""
          }`}
          to={item.to}
          onClick={onNavigate}
        >
          <span className="flex items-center justify-between gap-2">
            <span>{item.label}</span>
            {item.comingSoon && (
              <span className="rounded-full bg-secondary-container/40 px-2 py-0.5 text-[10px] font-label-bold text-primary">
                قريباً
              </span>
            )}
          </span>
        </Link>
      ))}
    </>
  );
}
