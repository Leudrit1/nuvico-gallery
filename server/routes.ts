import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { setupAuth, isAuthenticated } from "./replitAuth.ts";
import { insertArtworkSchema, updateArtworkSchema } from "@shared/schema";
import { z } from "zod";

// Extend session interface to include userId
declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware is now configured in main server file
  
  // Simple auth check middleware
  const requireAuth = (req: any, res: any, next: any) => {
    console.log('Session data:', req.session);
    const userId = req.session?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = userId;
    next();
  };

  // Authentication endpoints
  
  // Login endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple credential validation
      if (username === 'admin' && password === 'password') {
        let adminUser: any | undefined;
        try {
          adminUser = await storage.getUser('nuvico-gallery-admin');
        } catch {
          adminUser = undefined;
        }

        // In development, allow a mock admin user if DB is unavailable
        if (!adminUser && process.env.NODE_ENV !== 'production') {
          adminUser = {
            id: 'nuvico-gallery-admin',
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'User',
            profileImageUrl: null,
          };
        }

        if (!adminUser) {
          return res.status(404).json({ message: "User not found" });
        }

        // Set session properly
        req.session.userId = 'nuvico-gallery-admin';
        console.log('Setting session userId:', req.session.userId);
        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            return res.status(500).json({ message: "Login failed" });
          }
          console.log('Session saved successfully:', req.session);
          res.json(adminUser);
        });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout endpoint
  app.post('/api/auth/logout', (req, res) => {
    try {
      if ((req as any).session) {
        (req as any).session.destroy((err: any) => {
          if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ message: "Logout failed" });
          }
          res.json({ message: "Logged out successfully" });
        });
      } else {
        res.json({ message: "Already logged out" });
      }
    } catch (error) {
      console.error("Error in logout:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Auth user endpoint with simple session check
  app.get('/api/auth/user', async (req, res) => {
    try {
      console.log('Full session object:', req.session);
      console.log('Session ID:', req.sessionID);
      const userId = req.session?.userId;
      console.log('User ID from session:', userId);
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      let user: any | undefined;
      try {
        user = await storage.getUser(userId);
      } catch {
        user = undefined;
      }
      if (!user && process.env.NODE_ENV !== 'production') {
        user = {
          id: 'nuvico-gallery-admin',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          profileImageUrl: null,
        };
      }
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user profile
  app.patch('/api/auth/user', requireAuth, async (req: any, res: any) => {
    try {
      const userId = req.userId;
      const updateData = req.body;
      
      const user = await storage.updateUser(userId, updateData);
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Artworks routes
  app.get('/api/artworks', async (req, res) => {
    try {
      const { style, artist, minPrice, maxPrice, featured } = req.query;
      const filters = {
        style: style as string,
        artistId: artist as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        featured: featured === 'true' ? true : undefined,
        available: featured === 'true' ? true : undefined, // Only show available artworks when featured=true
      };
      
      const artworks = await storage.getArtworks();
      res.json(artworks);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      res.status(500).json({ message: "Failed to fetch artworks" });
    }
  });

  // Get user's own artworks
  app.get('/api/my-artworks', requireAuth, async (req: any, res: any) => {
    try {
      const userId = req.userId;
      // For now, return all artworks since we don't have user ownership implemented
      // In the future, you can filter by userId when you add ownership to artworks
      const artworks = await storage.getArtworks();
      res.json(artworks);
    } catch (error) {
      console.error("Error fetching user artworks:", error);
      res.status(500).json({ message: "Failed to fetch user artworks" });
    }
  });

  app.get('/api/artworks/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const artwork = await storage.getArtworkById(id);
      
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      
      res.json(artwork);
    } catch (error) {
      console.error("Error fetching artwork:", error);
      res.status(500).json({ message: "Failed to fetch artwork" });
    }
  });

  app.post('/api/artworks', requireAuth, async (req: any, res: any) => {
    try {
      const userId = req.userId;
      const artworkData = insertArtworkSchema.parse(req.body);
      
      const artwork = await storage.createArtwork(artworkData);
      res.status(201).json(artwork);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid artwork data", errors: error.errors });
      }
      console.error("Error creating artwork:", error);
      res.status(500).json({ message: "Failed to create artwork" });
    }
  });

  app.patch('/api/artworks/:id', requireAuth, async (req: any, res: any) => {
    try {
      const userId = req.userId;
      const id = parseInt(req.params.id);
      const updateData = updateArtworkSchema.parse(req.body);
      
      // In this simplified model, ownership is not enforced
      
      const artwork = await storage.updateArtwork(id, updateData);
      res.json(artwork);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid artwork data", errors: error.errors });
      }
      console.error("Error updating artwork:", error);
      res.status(500).json({ message: "Failed to update artwork" });
    }
  });

  app.delete('/api/artworks/:id', requireAuth, async (req: any, res: any) => {
    try {
      const userId = req.userId;
      const id = parseInt(req.params.id);
      
      // In this simplified model, ownership is not enforced
      
      await storage.deleteArtwork(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting artwork:", error);
      res.status(500).json({ message: "Failed to delete artwork" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
