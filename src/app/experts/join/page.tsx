"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import Card from "@/components/Card";
import FormField, { inputStyle } from "@/components/FormField";
import { submitExpert } from "@/app/actions";
import {
  validateExpert,
  type ExpertErrors,
  type ExpertValues,
} from "@/lib/validation";

const empty: ExpertValues = {
  name: "",
  email: "",
  title: "",
  platform: "AWS",
  skills: "",
  rate: "",
  bio: "",
};

export default function JoinExpertPage() {
  const [values, setValues] = useState<ExpertValues>(empty);
  const [errors, setErrors] = useState<ExpertErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  function update(field: keyof ExpertValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const found = validateExpert(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const result = await submitExpert(values);
      if (result.ok) {
        setSubmitted(true);
      } else {
        setErrors(result.errors ?? {});
        setServerMessage(result.message ?? "");
      }
    } catch {
      setServerMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function props(field: keyof ExpertValues) {
    return {
      id: field,
      value: values[field],
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
      className: inputStyle,
    };
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-2xl">
          <Card className="p-8">
            <h1 className="text-3xl font-bold">Application received</h1>
            <p className="mt-4 text-slate-300">
              Thanks, {values.name}. Your application was saved.
            </p>
            <p className="mt-3 text-sm text-amber-300">
              Demo site: no one will review it yet.
            </p>
            <Link href="/projects" className="mt-6 inline-block text-teal-400 hover:underline">
              Browse projects →
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <Link href="/experts" className="text-teal-400 hover:underline">
          ← Back to experts
        </Link>
        <h1 className="mt-8 text-4xl font-bold">Join as a cloud expert</h1>
        <p className="mt-4 text-slate-300">
          Show your cost-cutting track record to scaleups that need it.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
          <FormField id="name" label="Full name" error={errors.name}>
            <input {...props("name")} onChange={(e) => update("name", e.target.value)} />
          </FormField>

          <FormField id="email" label="Email" error={errors.email}>
            <input type="email" {...props("email")} onChange={(e) => update("email", e.target.value)} />
          </FormField>

          <FormField id="title" label="Professional title" error={errors.title}>
            <input {...props("title")} onChange={(e) => update("title", e.target.value)} />
          </FormField>

          <FormField id="platform" label="Main cloud platform" error={errors.platform}>
            <select {...props("platform")} onChange={(e) => update("platform", e.target.value)}>
              <option>AWS</option>
              <option>Google Cloud</option>
              <option>AWS &amp; Google Cloud</option>
            </select>
          </FormField>

          <FormField id="skills" label="Skills (comma separated)" error={errors.skills}>
            <input placeholder="EC2, S3, Savings Plans" {...props("skills")} onChange={(e) => update("skills", e.target.value)} />
          </FormField>

          <FormField id="rate" label="Hourly rate (₹)" error={errors.rate}>
            <input type="number" min="0" {...props("rate")} onChange={(e) => update("rate", e.target.value)} />
          </FormField>

          <FormField id="bio" label="About your experience" error={errors.bio}>
            <textarea rows={5} {...props("bio")} onChange={(e) => update("bio", e.target.value)} />
          </FormField>

          {serverMessage && (
            <p role="alert" className="text-sm text-red-400">
              {serverMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-brand px-6 py-3 font-semibold text-canvas hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit application"}
          </button>
        </form>
      </div>
    </main>
  );
}