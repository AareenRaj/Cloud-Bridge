export type Platform = "AWS" | "Google Cloud" | "AWS & Google Cloud";

export type Availability = "Available now" | "Available from next month" | "Fully booked";

export type Expert = {
  id: number;
  name: string;
  title: string;
  platform: Platform;
  skills: string[];
  bio: string;
  hourlyRate: number;
  savingsDelivered: string;
  certifications: string[];
  availability: Availability;
};

export type Project = {
  id: number;
  title: string;
  company: string;
  platform: Platform;
  budget: string;
  description: string;
};