import { users, requirements, type User, type InsertUser, type Requirements, type InsertRequirements } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private requirements: Map<number, Requirements>;
  private currentUserId: number;
  private currentRequirementsId: number;

  constructor() {
    this.users = new Map();
    this.requirements = new Map();
    this.currentUserId = 1;
    this.currentRequirementsId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.mobile === mobile);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getRequirements(userId: number): Promise<Requirements | undefined> {
    return Array.from(this.requirements.values()).find(req => req.userId === userId);
  }

  async createRequirements(insertRequirements: InsertRequirements): Promise<Requirements> {
    const id = this.currentRequirementsId++;
    const requirements: Requirements = {
      ...insertRequirements,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.requirements.set(id, requirements);
    return requirements;
  }

  async updateRequirements(userId: number, updates: Partial<InsertRequirements>): Promise<Requirements | undefined> {
    const existing = Array.from(this.requirements.values()).find(req => req.userId === userId);
    if (!existing) return undefined;

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };
    this.requirements.set(existing.id, updated);
    return updated;
  }

  async getUserWithRequirements(userId: number): Promise<{ user: User; requirements?: Requirements } | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;

    const userRequirements = await this.getRequirements(userId);
    return { user, requirements: userRequirements };
  }
}

export const storage = new MemStorage();
