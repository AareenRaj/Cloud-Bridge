import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 py-5 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Cloud<span className="text-teal-400">Bridge</span>
        </Link>
        <nav className="flex gap-6 text-slate-300">
          <Link href="/experts" className="hover:text-teal-400">Experts</Link>
          <Link href="/projects" className="hover:text-teal-400">Projects</Link>
          <Link href="/projects/new" className="hover:text-teal-400">Post a project</Link>
          <Link href="/experts/join" className="hover:text-teal-400">Join as expert</Link>
        </nav>
      </div>
    </header>
  );
}