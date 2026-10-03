import Link from "next/link";
import { projects } from "@/data/projects";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-teal-400 hover:underline">
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl font-bold">Cloud cost projects</h1>

        <p className="mt-4 text-slate-300">
          Scaleups looking for help reducing their cloud bills.
        </p>

        <p className="mt-2 text-sm text-amber-300">
          Sample projects for demonstration only.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <Badge>{project.platform}</Badge>
              <h2 className="mt-4 text-xl font-bold">{project.title}</h2>
              <p className="text-sm text-slate-400">{project.company}</p>
              <p className="mt-3 text-slate-300">{project.description}</p>
              <p className="mt-4 font-semibold">{project.budget}</p>
              <div className="mt-5">
                <Button href={`/projects/${project.id}`}>View details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}