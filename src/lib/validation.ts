export const PLATFORMS = ["AWS", "Google Cloud", "AWS & Google Cloud"] as const;

const emailPattern = /^\S+@\S+\.\S+$/;
const MAX_MONEY = 1_000_000_000;

export type ActionResult<E> =
  | { ok: true }
  | { ok: false; errors?: E; message?: string };

/* ---------- Project ---------- */

export type ProjectValues = {
  company: string;
  email: string;
  title: string;
  platform: string;
  budgetMin: string;
  budgetMax: string;
  description: string;
};
export type ProjectErrors = Partial<Record<keyof ProjectValues, string>>;

export function validateProject(v: ProjectValues): ProjectErrors {
  const errors: ProjectErrors = {};
  const min = Number(v.budgetMin);
  const max = Number(v.budgetMax);

  if (!v.company.trim()) errors.company = "Enter your company name.";
  else if (v.company.trim().length > 120) errors.company = "Keep the name under 120 characters.";

  if (!emailPattern.test(v.email.trim()) || v.email.trim().length > 200)
    errors.email = "Enter a valid work email.";

  if (v.title.trim().length < 8 || v.title.trim().length > 200)
    errors.title = "Give the project a title of 8 to 200 characters.";

  if (!PLATFORMS.includes(v.platform as (typeof PLATFORMS)[number]))
    errors.platform = "Choose a cloud platform.";

  if (!Number.isInteger(min) || min <= 0 || min > MAX_MONEY)
    errors.budgetMin = "Enter a minimum budget in whole rupees.";

  if (!Number.isInteger(max) || max <= 0 || max > MAX_MONEY)
    errors.budgetMax = "Enter a maximum budget in whole rupees.";
  else if (min > max) errors.budgetMax = "Maximum must be at least the minimum.";

  if (v.description.trim().length < 30 || v.description.trim().length > 3000)
    errors.description = "Describe the work in 30 to 3000 characters.";

  return errors;
}

/* ---------- Expert ---------- */

export type ExpertValues = {
  name: string;
  email: string;
  title: string;
  platform: string;
  skills: string;
  rate: string;
  bio: string;
};
export type ExpertErrors = Partial<Record<keyof ExpertValues, string>>;

export function parseSkills(text: string): string[] {
  return text.split(",").map((s) => s.trim()).filter(Boolean);
}

export function validateExpert(v: ExpertValues): ExpertErrors {
  const errors: ExpertErrors = {};
  const rate = Number(v.rate);
  const skills = parseSkills(v.skills);

  if (!v.name.trim()) errors.name = "Enter your full name.";
  else if (v.name.trim().length > 120) errors.name = "Keep the name under 120 characters.";

  if (!emailPattern.test(v.email.trim()) || v.email.trim().length > 200)
    errors.email = "Enter a valid email.";

  if (!v.title.trim() || v.title.trim().length > 200)
    errors.title = "Enter your professional title.";

  if (!PLATFORMS.includes(v.platform as (typeof PLATFORMS)[number]))
    errors.platform = "Choose a cloud platform.";

  if (skills.length === 0 || skills.length > 20)
    errors.skills = "List 1 to 20 skills, separated by commas.";

  if (!Number.isInteger(rate) || rate <= 0 || rate > MAX_MONEY)
    errors.rate = "Enter your hourly rate in whole rupees.";

  if (v.bio.trim().length < 30 || v.bio.trim().length > 3000)
    errors.bio = "Write 30 to 3000 characters about your experience.";

  return errors;
}