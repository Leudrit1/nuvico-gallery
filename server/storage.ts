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

export const storage = new DatabaseStorage();
