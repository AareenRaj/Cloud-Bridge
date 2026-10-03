"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import Card from "@/components/Card";
import FormField, { inputStyle } from "@/components/FormField";

type Values = {
  name: string;
  email: string;
  title: string;
  platform: string;
  skills: string;
  rate: string;
  bio: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  email: "",
  title: "",
  platform: "AWS",
  skills: "",
  rate: "",
  bio: "",
};

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Enter a valid email.";
  if (!v.title.trim()) errors.title = "Enter your professional title.";
  const skills = v.skills.split(",").map((s) => s.trim()).filter(Boolean);
  if (skills.length === 0) errors.skills = "List at least one skill, separated by commas.";
  if (!v.rate || Number(v.rate) <= 0) errors.rate = "Enter your hourly rate in rupees.";
  if (v.bio.trim().length < 30) errors.bio = "Write at least 30 characters about your experience.";
  return errors;
}

export default function JoinExpertPage() {
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
            <h1 className="text-3xl font-bold">Application received</h1>
            <p className="mt-4 text-slate-300">
              Thanks, {values.name}. We would review your profile and write to {values.email}.
            </p>
            <p className="mt-3 text-sm text-amber-300">
              Demo only: nothing was saved yet.
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

          <FormField id="platform" label="Main cloud platform">
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

          <button
            type="submit"
            className="rounded-xl bg-brand px-6 py-3 font-semibold text-canvas hover:bg-brand-hover"
          >
            Submit application
          </button>
        </form>
      </div>
    </main>
  );
}