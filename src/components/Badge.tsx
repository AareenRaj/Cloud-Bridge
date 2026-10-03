import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
      {children}
    </span>
  );
}