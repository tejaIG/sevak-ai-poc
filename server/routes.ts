import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertRequirementsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      const existingMobile = await storage.getUserByMobile(userData.mobile);
      if (existingMobile) {
        return res.status(400).json({ message: "User with this mobile number already exists" });
      }

      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update user
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updates = insertUserSchema.partial().parse(req.body);
      
      const user = await storage.updateUser(userId, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create requirements
  app.post("/api/requirements", async (req, res) => {
    try {
      const requirementsData = insertRequirementsSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUser(requirementsData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if requirements already exist for this user
      const existingRequirements = await storage.getRequirements(requirementsData.userId);
      if (existingRequirements) {
        return res.status(400).json({ message: "Requirements already exist for this user. Use PATCH to update." });
      }

      const requirements = await storage.createRequirements(requirementsData);
      res.status(201).json(requirements);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get requirements by user ID
  app.get("/api/requirements/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const requirements = await storage.getRequirements(userId);
      
      if (!requirements) {
        return res.status(404).json({ message: "Requirements not found" });
      }
      
      res.json(requirements);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update requirements
  app.patch("/api/requirements/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const updates = insertRequirementsSchema.partial().parse(req.body);
      
      const requirements = await storage.updateRequirements(userId, updates);
      if (!requirements) {
        return res.status(404).json({ message: "Requirements not found" });
      }
      
      res.json(requirements);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user with their requirements
  app.get("/api/users/:id/complete", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const data = await storage.getUserWithRequirements(userId);
      
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
