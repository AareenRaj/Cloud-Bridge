import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { experts } from "@/data/experts";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((item) => String(item.id) === id);

  if (!project) {
    notFound();
  }

  const suggestedExperts = experts.filter((expert) =>
    expert.platform.includes(project.platform) ||
    project.platform.includes(expert.platform)
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/projects" className="text-teal-400 hover:underline">
          ← Back to projects
        </Link>

        <Card className="mt-8 p-8">
          <Badge>{project.platform}</Badge>
          <h1 className="mt-4 text-3xl font-bold">{project.title}</h1>
          <p className="text-slate-400">{project.company}</p>

          <p className="mt-3 text-sm text-amber-300">
            Demo project — not a real listing.
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-400">Budget</dt>
              <dd className="font-semibold">{project.budget}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-400">Cloud platform</dt>
              <dd className="font-semibold">{project.platform}</dd>
            </div>
          </dl>

          <h2 className="mt-8 text-xl font-semibold">Scope</h2>
          <p className="mt-3 text-slate-300">{project.description}</p>

          <div className="mt-8">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-xl bg-slate-700 px-5 py-2.5 font-semibold text-slate-400"
            >
              Applications open soon
            </button>
            <p className="mt-2 text-sm text-slate-400">
              The apply form arrives in the next step.
            </p>
          </div>
        </Card>

        {suggestedExperts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">Experts who could help</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {suggestedExperts.map((expert) => (
                <Card key={expert.id}>
                  <h3 className="font-bold">{expert.name}</h3>
                  <p className="text-sm text-slate-400">{expert.title}</p>
                  <div className="mt-4">
                    <Button href={`/experts/${expert.id}`} variant="outline">
                      View profile
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}