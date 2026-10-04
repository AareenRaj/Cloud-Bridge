"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import type { Expert } from "@/types";

const fieldStyle =
  "mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-teal-400";

export default function ExpertsBrowser({ experts }: { experts: Expert[] }) {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [maxRate, setMaxRate] = useState(0); // 0 means no limit

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch = `${expert.name} ${expert.title} ${expert.platform} ${expert.skills.join(" ")}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesPlatform =
      platform === "All" || expert.platform.includes(platform);

    const matchesRate = maxRate === 0 || expert.hourlyRate <= maxRate;

    return matchesSearch && matchesPlatform && matchesRate;
  });

  const hasFilters = search !== "" || platform !== "All" || maxRate !== 0;

  function clearFilters() {
    setSearch("");
    setPlatform("All");
    setMaxRate(0);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="px-2 py-2 text-sm text-teal-400 hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl font-bold">Find a cloud expert</h1>

        <p className="mt-4 text-slate-300">
          Discover specialists who can help reduce your cloud costs.
        </p>

        <p className="mt-2 text-sm text-amber-300">
          Profiles marked &quot;Sample profile&quot; are made up. Member profiles
          are not independently verified yet.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="expert-search" className="block font-medium">
              Search experts
            </label>
            <input
              id="expert-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try BigQuery or Kubernetes"
              className={fieldStyle}
            />
          </div>

          <div>
            <label htmlFor="platform-filter" className="block font-medium">
              Platform
            </label>
            <select
              id="platform-filter"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              className={fieldStyle}
            >
              <option value="All">All platforms</option>
              <option value="AWS">AWS</option>
              <option value="Google Cloud">Google Cloud</option>
            </select>
          </div>

          <div>
            <label htmlFor="rate-filter" className="block font-medium">
              Maximum hourly rate
            </label>
            <select
              id="rate-filter"
              value={maxRate}
              onChange={(event) => setMaxRate(Number(event.target.value))}
              className={fieldStyle}
            >
              <option value={0}>Any rate</option>
              <option value={2500}>Up to ₹2,500</option>
              <option value={3000}>Up to ₹3,000</option>
              <option value={3500}>Up to ₹3,500</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <p className="text-sm text-slate-400" aria-live="polite">
            {filteredExperts.length === 0
              ? "No experts found. Try changing your filters."
              : `${filteredExperts.length} experts found`}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-2 py-2 text-sm text-teal-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExperts.map((expert) => (
            <Card key={expert.id}>
              <Badge>{expert.platform}</Badge>
              <h2 className="mt-4 text-xl font-bold">{expert.name}</h2>
              <p className="ext-sm text-slate-400t">{expert.title}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {expert.isSample ? "Sample profile" : "Member"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {expert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-edge px-2 py-1 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="mt-4 font-semibold">
                ₹{expert.hourlyRate.toLocaleString("en-IN")}/hour
              </p>
              {expert.availability && (
                <p className="text-sm text-slate-400">{expert.availability}</p>
              )}

              <div className="mt-5">
                <Button href={`/experts/${expert.id}`}>View profile</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}