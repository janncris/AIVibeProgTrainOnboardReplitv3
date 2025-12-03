import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getChatResponse } from "./openai";
import { createSessionSchema, sendMessageSchema, updateProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Create a new onboarding session
  app.post("/api/sessions", async (req, res) => {
    try {
      const data = createSessionSchema.parse(req.body);
      const session = await storage.createSession(data);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create session" });
      }
    }
  });

  // Get session by ID
  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to get session" });
    }
  });

  // Delete session
  app.delete("/api/sessions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSession(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete session" });
    }
  });

  // Update progress
  app.post("/api/progress", async (req, res) => {
    try {
      const data = updateProgressSchema.parse(req.body);
      const progress = await storage.updateProgress(
        data.odId,
        data.moduleId,
        data.sectionId,
        data.status === "completed"
      );
      
      if (!progress) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update progress" });
      }
    }
  });

  // Get progress for a session
  app.get("/api/progress/:sessionId", async (req, res) => {
    try {
      const progress = await storage.getProgress(req.params.sessionId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get progress" });
    }
  });

  // Chat with AI assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const data = sendMessageSchema.parse(req.body);
      
      const response = await getChatResponse(data.message, data.context);
      
      res.json({ message: response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Chat error:", error);
        res.status(500).json({ error: "Failed to process chat message" });
      }
    }
  });

  // Get chat history for a session
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const history = await storage.getChatHistory(req.params.sessionId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to get chat history" });
    }
  });

  return httpServer;
}
