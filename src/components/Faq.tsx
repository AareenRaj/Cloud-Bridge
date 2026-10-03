const questions = [
  ["Who is CloudBridge for?", "Venture-backed scaleups with growing AWS or Google Cloud bills, and the engineers who specialize in reducing them."],
  ["How do I know an expert is good?", "Profiles show certifications and past savings. Verification is planned for the real launch."],
  ["Does an expert need access to my cloud account?", "Often read-only billing access is enough to start. You decide what to share."],
  ["What does it cost?", "Pricing is not set yet. This demo has no payments."],
];

export default function Faq() {
  return (
    <section>
      <h2 className="text-2xl font-bold">Frequently asked questions</h2>
      <p className="mt-2 text-sm text-amber-300">
        Sample answers. Replace them with your real policies before launch.
      </p>
      <div className="mt-6 space-y-3">
        {questions.map(([question, answer]) => (
          <details key={question} className="rounded-xl border border-edge bg-panel p-4">
            <summary className="cursor-pointer font-semibold">{question}</summary>
            <p className="mt-3 text-slate-300">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}