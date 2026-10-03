import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Review our AWS cloud costs",
    company: "Demo Company One",
    platform: "AWS",
    budget: "₹10,000–₹20,000",
    description: "Review EC2 and S3 spending and recommend ways to reduce waste.",
  },
  {
    id: 2,
    title: "Optimize BigQuery spending",
    company: "Demo Company Two",
    platform: "Google Cloud",
    budget: "₹15,000–₹25,000",
    description: "Review query usage and suggest changes to control BigQuery costs.",
  },
  {
    id: 3,
    title: "Review Kubernetes resource usage",
    company: "Demo Company Three",
    platform: "AWS & Google Cloud",
    budget: "₹20,000–₹35,000",
    description:
      "Assess resource allocation and identify opportunities to improve efficiency.",
  },
];