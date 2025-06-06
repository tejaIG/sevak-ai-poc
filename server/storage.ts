import { users, requirements, type User, type InsertUser, type Requirements, type InsertRequirements } from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByMobile(mobile: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Requirements operations
  getRequirements(userId: number): Promise<Requirements | undefined>;
  createRequirements(requirements: InsertRequirements): Promise<Requirements>;
  updateRequirements(userId: number, updates: Partial<InsertRequirements>): Promise<Requirements | undefined>;
  
  // Combined operations
  getUserWithRequirements(userId: number): Promise<{ user: User; requirements?: Requirements } | undefined>;
}

// Initialize Supabase PostgreSQL connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.mobile, mobile)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  async getRequirements(userId: number): Promise<Requirements | undefined> {
    const result = await db.select().from(requirements).where(eq(requirements.userId, userId)).limit(1);
    return result[0];
  }

  async createRequirements(insertRequirements: InsertRequirements): Promise<Requirements> {
    const result = await db.insert(requirements).values(insertRequirements).returning();
    return result[0];
  }

  async updateRequirements(userId: number, updates: Partial<InsertRequirements>): Promise<Requirements | undefined> {
    const result = await db.update(requirements).set(updates).where(eq(requirements.userId, userId)).returning();
    return result[0];
  }

  async getUserWithRequirements(userId: number): Promise<{ user: User; requirements?: Requirements } | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;

    const userRequirements = await this.getRequirements(userId);
    return { user, requirements: userRequirements };
  }
}

export const storage = new DatabaseStorage();
