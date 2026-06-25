import { z } from "zod";

export const projectTypes = [
  "Website",
  "Landing page",
  "Custom web platform",
  "Redesign",
  "Ongoing care",
  "Other",
] as const;

export const budgetRanges = [
  "Under €2k",
  "€2k–€5k",
  "€5k–€10k",
  "€10k+",
  "Not sure yet",
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  projectType: z.enum(projectTypes),
  budget: z.enum(budgetRanges),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about your project (10+ characters).")
    .max(4000),
  // Honeypot — must stay empty. Bots tend to fill every field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
