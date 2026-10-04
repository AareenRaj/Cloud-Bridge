import { supabase } from "@/lib/supabase";
import { experts as sampleExperts } from "@/data/experts";
import type { Expert, Platform } from "@/types";

type ApprovedRow = {
  id: string;
  name: string;
  title: string;
  platform: Platform;
  skills: string[];
  hourly_rate: number;
  bio: string;
};

async function getApprovedExperts(): Promise<Expert[]> {
  const { data, error } = await supabase
    .from("approved_experts")
    .select("id, name, title, platform, skills, hourly_rate, bio");

  if (error || !data) {
    console.error("Could not load approved experts:", error?.message);
    return [];
  }

  return (data as ApprovedRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    title: row.title,
    platform: row.platform,
    skills: row.skills,
    bio: row.bio,
    hourlyRate: row.hourly_rate,
  }));
}

export async function getAllExperts(): Promise<Expert[]> {
  const members = await getApprovedExperts();
  const samples = sampleExperts.map((expert) => ({ ...expert, isSample: true }));
  return [...members, ...samples];
}