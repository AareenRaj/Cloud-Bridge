import Card from "@/components/Card";

const forCompanies = [
  ["Post your project", "Describe the bill you want to cut and your budget."],
  ["Meet matched experts", "See specialists for your cloud platform, with their track record."],
  ["Start saving", "Pick an expert and agree on the scope together."],
];

const forExperts = [
  ["Create your profile", "List your skills, certifications and savings delivered."],
  ["Find projects", "Browse scaleups that need your cloud skills."],
  ["Deliver results", "Take the project and show your impact."],
];

function Steps({ title, steps }: { title: string; steps: string[][] }) {
  return (
    <Card>
      <h3 className="text-xl font-bold">{title}</h3>
      <ol className="mt-4 space-y-4">
        {steps.map(([name, text], index) => (
          <li key={name} className="flex gap-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand/10 font-bold text-brand">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-slate-300">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export default function HowItWorks() {
  return (
    <section>
      <h2 className="text-2xl font-bold">How it works</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Steps title="For scaleups" steps={forCompanies} />
        <Steps title="For cloud experts" steps={forExperts} />
      </div>
    </section>
  );
}