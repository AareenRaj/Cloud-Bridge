import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant?: "primary" | "outline";
  children: ReactNode;
};

export default function Button({ href, variant = "primary", children }: ButtonProps) {
  const base = "inline-block rounded-xl px-5 py-2.5 font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-brand text-canvas hover:bg-brand-hover"
      : "border border-brand text-brand hover:bg-brand/10";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}