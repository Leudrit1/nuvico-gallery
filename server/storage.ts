import {
  users,
  artworks,
  type User,
  type UpsertUser,
  type Artwork,
  type InsertArtwork,
  type UpdateArtwork,
  type ArtworkWithArtist,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, like, desc } from "drizzle-orm";

// In-memory storage for fallback when database is unavailable
class MemoryStorage implements IStorage {
  private users: User[] = [
    {
      id: 'nuvico-gallery-admin',
      email: 'admin@nuvico.art',
      firstName: 'NUVICO',
      lastName: 'Gallery',
      profileImageUrl: null,
      bio: 'NUVICO Gallery - Curating exceptional contemporary art and connecting collectors with outstanding artistic works.',
      isArtist: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private artworks: Artwork[] = [
    {
      id: 1,
      title: 'Urban Reflections',
      description: 'A captivating contemporary piece exploring the interplay between urban architecture and natural light. The artist masterfully captures the essence of modern city life through bold geometric forms and vibrant color contrasts.',
      price: '2500.00',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      artistId: 'nuvico-gallery-admin',
      style: 'Contemporary',
      medium: 'Acrylic on Canvas',
      width: 80,
      height: 100,
      year: 2023,
      isAvailable: true,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: 'Ethereal Landscapes',
      description: 'An abstract interpretation of natural landscapes, where reality dissolves into dreamlike visions. This piece invites viewers to experience nature through a new lens of artistic expression.',
      price: '3200.00',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      artistId: 'nuvico-gallery-admin',
      style: 'Abstract',
      medium: 'Oil on Canvas',
      width: 90,
      height: 120,
      year: 2024,
      isAvailable: true,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      title: 'Chromatic Symphony',
      description: 'A vibrant explosion of color and movement that captures the energy and dynamism of contemporary artistic expression. Each brushstroke contributes to a harmonious composition that speaks to the soul.',
      price: '1800.00',
      imageUrl: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      artistId: 'nuvico-gallery-admin',
      style: 'Abstract',
      medium: 'Mixed Media',
      width: 70,
      height: 90,
      year: 2023,
      isAvailable: true,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      title: 'Silent Contemplation',
      description: 'A minimalist masterpiece that explores the power of simplicity and negative space. This work invites quiet reflection and demonstrates the profound impact of restraint in artistic composition.',
      price: '2200.00',
      imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      artistId: 'nuvico-gallery-admin',
      style: 'Minimalist',
      medium: 'Acrylic on Canvas',
      width: 60,
      height: 80,
      year: 2024,
      isAvailable: true,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      title: 'Golden Hour Reverie',
      description: 'Capturing the magical quality of light during the golden hour, this piece transforms an ordinary moment into something extraordinary through masterful use of color and atmosphere.',
      price: '2800.00',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      artistId: 'nuvico-gallery-admin',
      style: 'Contemporary',
      medium: 'Oil on Canvas',
      width: 100,
      height: 80,
      year: 2023,
      isAvailable: true,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      title: 'Textural Dialogue',
      description: 'An exploration of texture and form that challenges traditional perspectives on surface and depth. The interplay of materials creates a tactile experience that engages multiple senses.',
      price: '1950.00',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      artistId: 'nuvico-gallery-admin',
      style: 'Contemporary',
      medium: 'Mixed Media',
      width: 85,
      height: 100,
      year: 2024,
      isAvailable: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingIndex = this.users.findIndex(u => u.id === userData.id);
    const user: User = {
      id: userData.id,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      bio: userData.bio || null,
      isArtist: userData.isArtist || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    if (existingIndex >= 0) {
      this.users[existingIndex] = { ...this.users[existingIndex], ...user };
      return this.users[existingIndex];
    } else {
      this.users.push(user);
      return user;
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...data, updatedAt: new Date() };
    return this.users[index];
  }

  async getArtists(): Promise<User[]> {
    return this.users.filter(u => u.isArtist);
  }

  async getArtistWithArtworks(id: string): Promise<(User & { artworks: ArtworkWithArtist[] }) | undefined> {
    const artist = this.users.find(u => u.id === id);
    if (!artist) return undefined;
    
    const artworks = this.artworks
      .filter(a => a.artistId === id)
      .map(artwork => ({ ...artwork, artist }));
    
    return { ...artist, artworks };
  }

  async getArtworks(filters?: {
    style?: string;
    artistId?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<ArtworkWithArtist[]> {
    let filtered = this.artworks;
    
    if (filters) {
      if (filters.style) {
        filtered = filtered.filter(a => a.style === filters.style);
      }
      if (filters.artistId) {
        filtered = filtered.filter(a => a.artistId === filters.artistId);
      }
      if (filters.minPrice) {
        filtered = filtered.filter(a => parseFloat(a.price) >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        filtered = filtered.filter(a => parseFloat(a.price) <= filters.maxPrice!);
      }
      if (filters.featured !== undefined) {
        filtered = filtered.filter(a => a.isFeatured === filters.featured);
      }
    }
    
    return filtered.map(artwork => {
      const artist = this.users.find(u => u.id === artwork.artistId)!;
      return { ...artwork, artist };
    });
  }

  async getArtworkById(id: number): Promise<ArtworkWithArtist | undefined> {
    const artwork = this.artworks.find(a => a.id === id);
    if (!artwork) return undefined;
    
    const artist = this.users.find(u => u.id === artwork.artistId)!;
    return { ...artwork, artist };
  }

  async getArtworksByArtist(artistId: string): Promise<Artwork[]> {
    return this.artworks.filter(a => a.artistId === artistId);
  }

  async createArtwork(artworkData: InsertArtwork): Promise<Artwork> {
    const id = Math.max(...this.artworks.map(a => a.id), 0) + 1;
    const artwork: Artwork = {
      id,
      title: artworkData.title,
      description: artworkData.description || null,
      price: artworkData.price,
      imageUrl: artworkData.imageUrl,
      artistId: artworkData.artistId,
      style: artworkData.style || null,
      medium: artworkData.medium || null,
      width: artworkData.width || null,
      height: artworkData.height || null,
      year: artworkData.year || null,
      isAvailable: artworkData.isAvailable ?? true,
      isFeatured: artworkData.isFeatured ?? false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.artworks.push(artwork);
    return artwork;
  }

  async updateArtwork(id: number, data: UpdateArtwork): Promise<Artwork> {
    const index = this.artworks.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Artwork not found');
    
    this.artworks[index] = { ...this.artworks[index], ...data, updatedAt: new Date() };
    return this.artworks[index];
  }

  async deleteArtwork(id: number): Promise<void> {
    const index = this.artworks.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Artwork not found');
    
    this.artworks.splice(index, 1);
  }
}

// Interface for storage operations
export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  getArtists(): Promise<User[]>;
  getArtistWithArtworks(id: string): Promise<(User & { artworks: ArtworkWithArtist[] }) | undefined>;

  // Artwork operations
  getArtworks(filters?: {
    style?: string;
    artistId?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<ArtworkWithArtist[]>;
  getArtworkById(id: number): Promise<ArtworkWithArtist | undefined>;
  getArtworksByArtist(artistId: string): Promise<Artwork[]>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  updateArtwork(id: number, data: UpdateArtwork): Promise<Artwork>;
  deleteArtwork(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getArtists(): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(eq(users.isArtist, true))
      .orderBy(desc(users.createdAt));
  }

  async getArtistWithArtworks(id: string): Promise<(User & { artworks: ArtworkWithArtist[] }) | undefined> {
    const artist = await this.getUser(id);
    if (!artist) return undefined;

    const artistArtworks = await db
      .select({
        id: artworks.id,
        title: artworks.title,
        description: artworks.description,
        price: artworks.price,
        imageUrl: artworks.imageUrl,
        artistId: artworks.artistId,
        style: artworks.style,
        medium: artworks.medium,
        width: artworks.width,
        height: artworks.height,
        year: artworks.year,
        isAvailable: artworks.isAvailable,
        isFeatured: artworks.isFeatured,
        createdAt: artworks.createdAt,
        updatedAt: artworks.updatedAt,
        artist: users,
      })
      .from(artworks)
      .innerJoin(users, eq(artworks.artistId, users.id))
      .where(eq(artworks.artistId, id))
      .orderBy(desc(artworks.createdAt));

    return {
      ...artist,
      artworks: artistArtworks,
    };
  }

  // Artwork operations

  async getArtworks(filters?: {
    style?: string;
    artistId?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<ArtworkWithArtist[]> {
    let query = db
      .select({
        id: artworks.id,
        title: artworks.title,
        description: artworks.description,
        price: artworks.price,
        imageUrl: artworks.imageUrl,
        artistId: artworks.artistId,
        style: artworks.style,
        medium: artworks.medium,
        width: artworks.width,
        height: artworks.height,
        year: artworks.year,
        isAvailable: artworks.isAvailable,
        isFeatured: artworks.isFeatured,
        createdAt: artworks.createdAt,
        updatedAt: artworks.updatedAt,
        artist: users,
      })
      .from(artworks)
      .innerJoin(users, eq(artworks.artistId, users.id));

    const conditions = [];

    if (filters?.style) {
      conditions.push(eq(artworks.style, filters.style));
    }

    if (filters?.artistId) {
      conditions.push(eq(artworks.artistId, filters.artistId));
    }

    if (filters?.minPrice !== undefined) {
      conditions.push(gte(artworks.price, filters.minPrice.toString()));
    }

    if (filters?.maxPrice !== undefined) {
      conditions.push(lte(artworks.price, filters.maxPrice.toString()));
    }

    if (filters?.featured !== undefined) {
      conditions.push(eq(artworks.isFeatured, filters.featured));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    return await query.orderBy(desc(artworks.createdAt));
  }

  async getArtworkById(id: number): Promise<ArtworkWithArtist | undefined> {
    const [artwork] = await db
      .select({
        id: artworks.id,
        title: artworks.title,
        description: artworks.description,
        price: artworks.price,
        imageUrl: artworks.imageUrl,
        artistId: artworks.artistId,
        style: artworks.style,
        medium: artworks.medium,
        width: artworks.width,
        height: artworks.height,
        year: artworks.year,
        isAvailable: artworks.isAvailable,
        isFeatured: artworks.isFeatured,
        createdAt: artworks.createdAt,
        updatedAt: artworks.updatedAt,
        artist: users,
      })
      .from(artworks)
      .innerJoin(users, eq(artworks.artistId, users.id))
      .where(eq(artworks.id, id));

    return artwork;
  }

  async getArtworksByArtist(artistId: string): Promise<Artwork[]> {
    return await db
      .select()
      .from(artworks)
      .where(eq(artworks.artistId, artistId))
      .orderBy(desc(artworks.createdAt));
  }

  async createArtwork(artworkData: InsertArtwork): Promise<Artwork> {
    const [artwork] = await db
      .insert(artworks)
      .values(artworkData)
      .returning();
    return artwork;
  }

  async updateArtwork(id: number, data: UpdateArtwork): Promise<Artwork> {
    const [artwork] = await db
      .update(artworks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(artworks.id, id))
      .returning();
    return artwork;
  }

  async deleteArtwork(id: number): Promise<void> {
    await db.delete(artworks).where(eq(artworks.id, id));
  }
}

// Use MemoryStorage as fallback when database is unavailable
export const storage = new MemoryStorage();
