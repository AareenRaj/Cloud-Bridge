import { connection } from "next/server";
import ExpertsBrowser from "@/components/ExpertsBrowser";
import { getAllExperts } from "@/lib/experts";

export default async function ExpertsPage() {
  await connection(); // read fresh data on every visit, not once at build time
  const experts = await getAllExperts();
  return <ExpertsBrowser experts={experts} />;
}