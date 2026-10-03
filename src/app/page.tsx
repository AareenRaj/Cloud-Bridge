import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">


      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="mb-5 font-semibold text-teal-400">
          CLOUD EXPERTS. SMARTER SPENDING.
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Reduce your cloud costs with the right experts.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Connect with AWS and Google Cloud specialists to review
          your infrastructure and find opportunities to save.
        </p>

        <Link 
        href="/experts"
        className="mt-8 inline-block rounded-xl bg-teal-400 px-6 py-3 font-semibold text-slate-950 hover:bg-teal-300"
        >
          Browse experts
          </Link>

        <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">For companies</h2>
            <p className="mt-3 text-slate-300">
              Post your cloud challenges and find experts with
              the skills you need.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">For cloud experts</h2>
            <p className="mt-3 text-slate-300">
              Showcase your expertise and discover cloud
              optimization projects.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}