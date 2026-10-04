"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import Card from "@/components/Card";
import FormField, { inputStyle } from "@/components/FormField";
import { submitProject } from "@/app/actions";
import {
  validateProject,
  type ProjectErrors,
  type ProjectValues,
} from "@/lib/validation";

const empty: ProjectValues = {
  company: "",
  email: "",
  title: "",
  platform: "AWS",
  budgetMin: "",
  budgetMax: "",
  description: "",
};

export default function NewProjectPage() {
  const [values, setValues] = useState<ProjectValues>(empty);
  const [errors, setErrors] = useState<ProjectErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  function update(field: keyof ProjectValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const found = validateProject(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const result = await submitProject(values);
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

  function props(field: keyof ProjectValues) {
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
            <h1 className="text-3xl font-bold">Project received</h1>
            <p className="mt-4 text-slate-300">
              Thanks, {values.company}. Your project was saved.
            </p>
            <p className="mt-3 text-sm text-amber-300">
              Demo site: no experts will contact you yet.
            </p>
            <Link href="/experts" className="mt-6 inline-block text-teal-400 hover:underline">
              Browse experts →
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <Link href="/projects" className="text-teal-400 hover:underline">
          ← Back to projects
        </Link>
        <h1 className="mt-8 text-4xl font-bold">Post a cost-reduction project</h1>
        <p className="mt-4 text-slate-300">
          Tell us what you want to cut. We will match you with experts.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
          <FormField id="company" label="Company name" error={errors.company}>
            <input {...props("company")} onChange={(e) => update("company", e.target.value)} />
          </FormField>

          <FormField id="email" label="Work email" error={errors.email}>
            <input type="email" {...props("email")} onChange={(e) => update("email", e.target.value)} />
          </FormField>

          <FormField id="title" label="Project title" error={errors.title}>
            <input {...props("title")} onChange={(e) => update("title", e.target.value)} />
          </FormField>

          <FormField id="platform" label="Cloud platform" error={errors.platform}>
            <select {...props("platform")} onChange={(e) => update("platform", e.target.value)}>
              <option>AWS</option>
              <option>Google Cloud</option>
              <option>AWS &amp; Google Cloud</option>
            </select>
          </FormField>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField id="budgetMin" label="Minimum budget (₹)" error={errors.budgetMin}>
              <input type="number" min="0" {...props("budgetMin")} onChange={(e) => update("budgetMin", e.target.value)} />
            </FormField>
            <FormField id="budgetMax" label="Maximum budget (₹)" error={errors.budgetMax}>
              <input type="number" min="0" {...props("budgetMax")} onChange={(e) => update("budgetMax", e.target.value)} />
            </FormField>
          </div>

          <FormField id="description" label="What needs to be done?" error={errors.description}>
            <textarea rows={5} {...props("description")} onChange={(e) => update("description", e.target.value)} />
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
            {submitting ? "Posting..." : "Post project"}
          </button>
        </form>
      </div>
    </main>
  );
}