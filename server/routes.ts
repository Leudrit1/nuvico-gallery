import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertArtworkSchema, updateArtworkSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add session middleware for temporary auth
  app.use(session({
    secret: process.env.SESSION_SECRET || 'temp-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  // Simple auth check middleware
  const requireAuth = (req: any, res: any, next: any) => {
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
        const adminUser = await storage.getUser('nuvico-gallery-admin');
        if (adminUser) {
          // Set session
          (req as any).session = (req as any).session || {};
          (req as any).session.userId = 'nuvico-gallery-admin';
          res.json(adminUser);
        } else {
          res.status(404).json({ message: "User not found" });
        }
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
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      const userId = req.session?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user profile
  app.patch('/api/auth/user', requireAuth, async (req: any, res) => {
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
      };
      
      const artworks = await storage.getArtworks(filters);
      res.json(artworks);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      res.status(500).json({ message: "Failed to fetch artworks" });
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

  app.post('/api/artworks', requireAuth, async (req: any, res) => {
    try {
      const userId = req.userId;
      const artworkData = insertArtworkSchema.parse({
        ...req.body,
        artistId: userId,
      });
      
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

  app.patch('/api/artworks/:id', requireAuth, async (req: any, res) => {
    try {
      const userId = req.userId;
      const id = parseInt(req.params.id);
      const updateData = updateArtworkSchema.parse(req.body);
      
      // Check if user owns the artwork
      const existingArtwork = await storage.getArtworkById(id);
      if (!existingArtwork || existingArtwork.artistId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this artwork" });
      }
      
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

  app.delete('/api/artworks/:id', requireAuth, async (req: any, res) => {
    try {
      const userId = req.userId;
      const id = parseInt(req.params.id);
      
      // Check if user owns the artwork
      const existingArtwork = await storage.getArtworkById(id);
      if (!existingArtwork || existingArtwork.artistId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this artwork" });
      }
      
      await storage.deleteArtwork(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting artwork:", error);
      res.status(500).json({ message: "Failed to delete artwork" });
    }
  });

  // Artists routes
  app.get('/api/artists', async (req, res) => {
    try {
      const artists = await storage.getArtists();
      res.json(artists);
    } catch (error) {
      console.error("Error fetching artists:", error);
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });

  app.get('/api/artists/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const artist = await storage.getArtistWithArtworks(id);
      
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      
      res.json(artist);
    } catch (error) {
      console.error("Error fetching artist:", error);
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });

  // Get user's artworks
  app.get('/api/my-artworks', requireAuth, async (req: any, res) => {
    try {
      const userId = req.userId;
      const artworks = await storage.getArtworksByArtist(userId);
      res.json(artworks);
    } catch (error) {
      console.error("Error fetching user artworks:", error);
      res.status(500).json({ message: "Failed to fetch artworks" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
