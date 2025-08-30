import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertArtworkSchema, updateArtworkSchema } from "@shared/schema";
import { z } from "zod";
import { pool } from "./db"; // Added import for pool

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
  
  // Debug endpoint to check database users
  app.get('/api/debug/users', async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
      console.log('All users in database:', rows);
      res.json({ users: rows, count: (rows as any[]).length });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Database error", error: String(error) });
    }
  });

  // Login endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Login attempt for username:', username);
      
      // Get user from database by username
      let user: any;
      try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username]);
        user = (rows as any[])[0];
        console.log('User found in database:', user ? { id: user.id, username: user.username } : 'No user found');
      } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Database error" });
      }

      if (!user) {
        console.log('No user found for username:', username);
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Check password (assuming it's stored as plain text for now)
      // TODO: Implement proper password hashing
      if (user.password !== password) {
        console.log('Password mismatch for user:', username);
        return res.status(401).json({ message: "Invalid username or password" });
      }

      console.log('Password verified for user:', username);

      // Save user to storage for future retrieval
      try {
        await storage.upsertUser({
          id: user.id,
          email: user.email || user.username,
          firstName: user.firstName || user.username,
          lastName: user.lastName || '',
          profileImageUrl: user.profileImageUrl || null
        });
        console.log('User saved to storage successfully');
      } catch (storageError) {
        console.error('Error saving user to storage:', storageError);
        // Continue with login even if storage fails
      }

      req.session.userId = user.id;
      console.log('Setting session userId:', req.session.userId);
      console.log('Session before save:', req.session);
      console.log('Session ID before save:', req.sessionID);
      
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res.status(500).json({ message: "Login failed" });
        }
        console.log('Session saved successfully!');
        console.log('Session after save:', req.session);
        console.log('Session ID after save:', req.sessionID);
        
        // Set cookie manually for debugging
        res.setHeader('Set-Cookie', `sessionId=${req.sessionID}; Path=/; HttpOnly=false; SameSite=Lax; Max-Age=86400`);
        console.log('Set-Cookie header set:', res.getHeader('Set-Cookie'));
        
        // Return user data without password
        const { password: _, ...userData } = user;
        res.json(userData);
      });
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
      console.log('=== /api/auth/user endpoint called ===');
      console.log('Full session object:', req.session);
      console.log('Session ID:', req.sessionID);
      console.log('Cookies received:', req.headers.cookie);
      console.log('Session store type:', req.session?.constructor?.name);
      
      const userId = req.session?.userId;
      console.log('User ID from session:', userId);
      
      if (!userId) {
        console.log('No userId in session - returning 401');
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      let user: any | undefined;
      try {
        // Query database directly instead of storage
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
        user = (rows as any[])[0];
        console.log('User fetched from database:', user ? { id: user.id, username: user.username } : 'No user found');
      } catch (error) {
        console.error('Error fetching user from database:', error);
        // Fallback to storage
        try {
          user = await storage.getUser(userId);
          console.log('User fetched from storage fallback:', user ? { id: user.id, username: user.username } : 'No user found');
        } catch (storageError) {
          console.error('Error fetching user from storage:', storageError);
          user = undefined;
        }
      }
      
      if (!user && process.env.NODE_ENV !== 'production') {
        console.log('Creating mock user for development');
        user = {
          id: 'nuvico-gallery-admin',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          profileImageUrl: null,
        };
      }
      
      if (!user) {
        console.log('No user found - returning 401');
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      console.log('Returning user data:', { id: user.id, username: user.username });
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
