"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import Card from "@/components/Card";
import FormField, { inputStyle } from "@/components/FormField";

type Values = {
  company: string;
  email: string;
  title: string;
  platform: string;
  budgetMin: string;
  budgetMax: string;
  description: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  company: "",
  email: "",
  title: "",
  platform: "AWS",
  budgetMin: "",
  budgetMax: "",
  description: "",
};

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.company.trim()) errors.company = "Enter your company name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Enter a valid work email.";
  if (v.title.trim().length < 8) errors.title = "Give the project a title of at least 8 characters.";
  const min = Number(v.budgetMin);
  const max = Number(v.budgetMax);
  if (!v.budgetMin || min <= 0) errors.budgetMin = "Enter a minimum budget in rupees.";
  if (!v.budgetMax || max <= 0) errors.budgetMax = "Enter a maximum budget in rupees.";
  else if (min > max) errors.budgetMax = "Maximum must be at least the minimum.";
  if (v.description.trim().length < 30)
    errors.description = "Describe the work in at least 30 characters.";
  return errors;
}

export default function NewProjectPage() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) setSubmitted(true);
  }

  function props(field: keyof Values) {
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
              Thanks, {values.company}. Matching experts would contact {values.email}.
            </p>
            <p className="mt-3 text-sm text-amber-300">
              Demo only: nothing was saved yet.
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

          <FormField id="platform" label="Cloud platform">
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

          <button
            type="submit"
            className="rounded-xl bg-brand px-6 py-3 font-semibold text-canvas hover:bg-brand-hover"
          >
            Post project
          </button>
        </form>
      </div>
    </main>
  );
}