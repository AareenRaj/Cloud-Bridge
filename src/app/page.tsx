import SavingsEstimator from "@/components/SavingsEstimator";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-14 text-center sm:py-24">
        <p className="mb-5 font-semibold text-teal-400">
          CLOUD FINOPS FOR SCALEUPS
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Cut your AWS and Google Cloud bill with specialists who only do that.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          CloudBridge connects venture-backed scaleups with FinOps and
          cloud-architecture engineers focused on one outcome: a smaller cloud
          bill.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/experts">Browse experts</Button>
          <Button href="/projects/new" variant="outline">
            Post a project
          </Button>
        </div>

        <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold">For scaleups</h2>
            <p className="mt-3 text-slate-300">
              Post a cost-reduction project and get matched with engineers who
              have done it before.
            </p>
            <div className="mt-5">
              <Button href="/projects/new" variant="outline">
                Post a project
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold">For cloud experts</h2>
            <p className="mt-3 text-slate-300">
              Show your savings track record and find scaleups that need your
              skills.
            </p>
            <div className="mt-5">
              <Button href="/experts/join" variant="outline">
                Join as an expert
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-24">
        <SavingsEstimator />
        <HowItWorks />
        <Faq />
      </div>
    </main>
  );
}