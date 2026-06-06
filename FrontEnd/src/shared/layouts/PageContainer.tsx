import type { PropsWithChildren } from "react";

export default function PageContainer({ children }: PropsWithChildren) {
  return <main className="max-w-screen-xl mx-auto px-4">{children}</main>;
}
