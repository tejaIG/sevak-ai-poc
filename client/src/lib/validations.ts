import { z } from "zod";

export const phoneRegex = /^[6-9]\d{9}$/;

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name is too long"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().regex(phoneRegex, "Please enter a valid 10-digit mobile number"),
  location: z.string().min(5, "Please enter a valid address or pincode"),
  helperTypes: z.array(z.string()).min(1, "Please select at least one helper type"),
  timing: z.string().min(1, "Please select service timing"),
  budget: z.string().min(1, "Please select your budget range"),
  acceptedTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

export const requirementsSchema = z.object({
  workingDays: z.array(z.string()).min(1, "Please select at least one working day"),
  workingHours: z.string().min(1, "Please select preferred working hours"),
  specificSkills: z.array(z.string()).optional(),
  experienceRequired: z.string().min(1, "Please select experience requirement"),
  languagePreferences: z.array(z.string()).min(1, "Please select at least one language"),
  accommodationRequired: z.boolean(),
  foodPreferences: z.string().min(1, "Please select food preferences"),
  backgroundCheckRequired: z.boolean(),
});

export const preferencesSchema = z.object({
  proximityPreference: z.string().min(1, "Please select proximity preference"),
  urgency: z.string().min(1, "Please select urgency"),
  additionalRequirements: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type RequirementsFormData = z.infer<typeof requirementsSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
