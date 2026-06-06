import { useState } from "react";

type VerifiedNewsImageProps = {
  alt: string;
  src: string;
  className?: string;
};

export default function VerifiedNewsImage({
  alt,
  src,
  className,
}: VerifiedNewsImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`bg-surface-container-high flex items-center justify-center ${className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        <span className="material-symbols-outlined text-4xl text-outline">image</span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      src={src}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
