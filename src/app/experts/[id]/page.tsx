import Link from "next/link";
import { notFound } from "next/navigation";
import { experts } from "@/data/experts";

export default async function ExpertProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const expert = experts.find((item) => String(item.id) === id);

  if (!expert) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/experts" className="text-teal-400 hover:underline">
          ← Back to experts
        </Link>

        <article className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="font-semibold text-teal-400">
            {expert.platform}
          </p>

          <h1 className="mt-4 text-3xl font-bold">
            {expert.name}
          </h1>

          <p className="mt-3 text-sm text-amber-300">
            Demo profile — not a real expert listing.
          </p>

          <h2 className="mt-8 text-xl font-semibold">About</h2>
          <p className="mt-3 text-slate-300">{expert.bio}</p>

          <h2 className="mt-8 text-xl font-semibold">Skills</h2>
          <p className="mt-3 text-slate-300">{expert.skills}</p>
        </article>
      </div>
    </main>
  );
}