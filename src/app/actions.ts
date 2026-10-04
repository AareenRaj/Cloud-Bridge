"use server";

import { supabase } from "@/lib/supabase";
import {
  parseSkills,
  validateExpert,
  validateProject,
  type ActionResult,
  type ExpertErrors,
  type ExpertValues,
  type ProjectErrors,
  type ProjectValues,
} from "@/lib/validation";

const saveError = "We could not save that right now. Please try again.";

export async function submitProject(
  values: ProjectValues
): Promise<ActionResult<ProjectErrors>> {
  const errors = validateProject(values);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const { error } = await supabase.from("project_submissions").insert({
    company: values.company.trim(),
    email: values.email.trim(),
    title: values.title.trim(),
    platform: values.platform,
    budget_min: Number(values.budgetMin),
    budget_max: Number(values.budgetMax),
    description: values.description.trim(),
  });

  if (error) {
    console.error("submitProject failed:", error.message);
    return { ok: false, message: saveError };
  }
  return { ok: true };
}

export async function submitExpert(
  values: ExpertValues
): Promise<ActionResult<ExpertErrors>> {
  const errors = validateExpert(values);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const { error } = await supabase.from("expert_applications").insert({
    name: values.name.trim(),
    email: values.email.trim(),
    title: values.title.trim(),
    platform: values.platform,
    skills: parseSkills(values.skills),
    hourly_rate: Number(values.rate),
    bio: values.bio.trim(),
  });

  if (error) {
    console.error("submitExpert failed:", error.message);
    return { ok: false, message: saveError };
  }
  return { ok: true };
}