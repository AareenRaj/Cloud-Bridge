import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`rounded-2xl border border-edge bg-panel p-6 ${className}`}>
      {children}
    </article>
  );
}