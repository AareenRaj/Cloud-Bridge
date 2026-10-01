import Link from "next/link";

const experts = [
  {
    id: 1,
    name: "Demo Expert One",
    platform: "AWS",
    skills: "EC2, S3 and cloud billing reviews",
  },
  {
    id: 2,
    name: "Demo Expert Two",
    platform: "Google Cloud",
    skills: "Compute Engine, BigQuery and cost monitoring",
  },
  {
    id: 3,
    name: "Demo Expert Three",
    platform: "AWS & Google Cloud",
    skills: "Kubernetes and cloud architecture reviews",
  },
];

export default function ExpertsPage() {
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

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {experts.map((expert) => (
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}