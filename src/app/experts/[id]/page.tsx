import Link from "next/link";
import { notFound } from "next/navigation";
import { experts } from "@/data/experts";
import Badge from "@/components/Badge";
import Card from "@/components/Card";

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

        <Card className="mt-8 p-8">
          <Badge>{expert.platform}</Badge>
          <h1 className="mt-4 text-3xl font-bold">{expert.name}</h1>
          <p className="text-slate-400">{expert.title}</p>

          <p className="mt-3 text-sm text-amber-300">
            Demo profile — not a real expert listing.
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-slate-400">Rate</dt>
              <dd className="font-semibold">
                ₹{expert.hourlyRate.toLocaleString("en-IN")}/hour
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-400">Availability</dt>
              <dd className="font-semibold">{expert.availability}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-400">Savings delivered</dt>
              <dd className="font-semibold">{expert.savingsDelivered}</dd>
            </div>
          </dl>

          <h2 className="mt-8 text-xl font-semibold">About</h2>
          <p className="mt-3 text-slate-300">{expert.bio}</p>

          <h2 className="mt-8 text-xl font-semibold">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {expert.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-edge px-2 py-1 text-sm text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-semibold">Certifications</h2>
          <ul className="mt-3 list-disc pl-5 text-slate-300">
            {expert.certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </Card>
      </div>
    </main>
  );
}