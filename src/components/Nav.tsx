"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/experts", label: "Experts" },
  { href: "/projects", label: "Projects" },
  { href: "/projects/new", label: "Post a project" },
  { href: "/experts/join", label: "Join as expert" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold" onClick={() => setOpen(false)}>
          Cloud<span className="text-teal-400">Bridge</span>
        </Link>

        <nav aria-label="Main" className="hidden gap-6 text-slate-300 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="py-2 hover:text-teal-400">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 md:hidden"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="flex flex-col pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-t border-slate-800 py-3 text-slate-200 hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}