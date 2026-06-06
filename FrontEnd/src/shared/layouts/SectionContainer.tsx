import type { PropsWithChildren } from "react";

export default function SectionContainer({ children }: PropsWithChildren) {
  return <section className="py-8">{children}</section>;
}
