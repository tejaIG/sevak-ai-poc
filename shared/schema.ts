import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// PostgreSQL schema (original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  mobile: text("mobile").notNull(),
  location: text("location").notNull(),
  acceptedTerms: boolean("accepted_terms").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const requirements = pgTable("requirements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  helperTypes: json("helper_types").$type<string[]>().notNull(),
  timing: text("timing").notNull(), // 'fulltime', 'parttime', 'hourly'
  budget: text("budget").notNull(), // '5000-10000', '10000-15000', etc.
  workingDays: json("working_days").$type<string[]>(), // ['monday', 'tuesday', etc.]
  workingHours: text("working_hours"), // 'morning', 'afternoon', 'evening', 'night'
  specificSkills: json("specific_skills").$type<string[]>(), // cooking styles, cleaning preferences, etc.
  experienceRequired: text("experience_required"), // 'fresher', '1-2years', '3-5years', '5plus'
  languagePreferences: json("language_preferences").$type<string[]>(),
  accommodationRequired: boolean("accommodation_required").default(false),
  foodPreferences: text("food_preferences"), // 'veg', 'nonveg', 'both'
  backgroundCheckRequired: boolean("background_check_required").default(true),
  proximityPreference: text("proximity_preference"), // 'same_locality', 'within_5km', 'within_10km', 'any'
  additionalRequirements: text("additional_requirements"),
  urgency: text("urgency"), // 'immediate', 'within_week', 'within_month', 'flexible'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertRequirementsSchema = createInsertSchema(requirements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRequirements = z.infer<typeof insertRequirementsSchema>;
export type Requirements = typeof requirements.$inferSelect;
