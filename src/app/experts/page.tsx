"use client";

import Link from "next/link";
import { useState } from "react";
import { experts } from "@/data/experts";

export default function ExpertsPage() {
    const [search, setSearch] = useState("");
    const filteredExperts = experts.filter((expert) =>`${expert.name} ${expert.platform} ${expert.skills}`.toLowerCase().includes(search.trim().toLowerCase()));
    return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-teal-400 hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl font-bold">
          Find a cloud expert
        </h1>

        <p className="mt-4 text-slate-300">
          Discover specialists who can help reduce your cloud costs.
        </p>

        <p className="mt-2 text-sm text-amber-300">
          Sample profiles for demonstration only.
        </p>
        
<label htmlFor="expert-search" className="mt-8 block font-medium">
  Search experts
</label>

<input
  id="expert-search"
  type="search"
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  placeholder="Try AWS, BigQuery or Kubernetes"
  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-teal-400"
/>

<p className="mt-3 text-sm text-slate-400" aria-live="polite">
  {filteredExperts.length === 0
    ? "No experts found. Try another search."
    : `${filteredExperts.length} experts found`}
</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredExperts.map((expert) => (
            <article
              key={expert.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-sm font-semibold text-teal-400">
                {expert.platform}
              </p>

              <h2 className="mt-4 text-xl font-bold">
                {expert.name}
              </h2>

              <p className="mt-3 text-slate-300">
                {expert.skills}
              </p>
              <Link href={`/experts/${expert.id}`}
              className="mt-5 inline-block rounded-lg bg-teal-400 px-4 py-2 font-semibold text-slate-950 hover:bg-teal-300">
              View profile
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}