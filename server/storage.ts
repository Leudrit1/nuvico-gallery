// storage.ts

import { pool } from "./db"; // db.ts përmban mysql2/promise lidhjen
import type { Artwork, InsertArtwork, UpdateArtwork } from "../shared/schema";

// In-memory fallback store for development / DB outages
const memoryArtworks: Artwork[] = [];
let memoryNextId = 1000;

// Interfejsi për artikujt
export interface IStorage {
  getArtworks(): Promise<Artwork[]>;
  getArtworkById(id: number): Promise<Artwork | undefined>;
  createArtwork(data: InsertArtwork): Promise<Artwork>;
  updateArtwork(id: number, data: UpdateArtwork): Promise<Artwork>;
  deleteArtwork(id: number): Promise<void>;
}

// Implementimi që përdor databazën MySQL
export class DatabaseStorage implements IStorage {
  async getArtworks(): Promise<Artwork[]> {
    try {
      const [rows] = await pool.query(
        `SELECT 
          id,
          title,
          description,
          price,
          image_url AS imageUrl,
          style,
          medium,
          width,
          height,
          year,
          is_available AS isAvailable,
          is_featured AS isFeatured,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM artworks
        ORDER BY created_at DESC`
      );
      return rows as Artwork[];
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("DB unavailable, returning fallback artworks");
        const now = new Date();
        const fallback: Artwork[] = [
          {
            id: 1,
            title: "Starry Night",
            description: "Vincent van Gogh reproduction",
            price: "299.00",
            imageUrl: "/Starry-Night-canvas-Vincent-van-Gogh-New-1889.webp",
            style: "Post-Impressionism",
            medium: "Oil on canvas",
            width: 92,
            height: 73,
            year: 1889,
            isAvailable: true,
            isFeatured: true,
            createdAt: now,
            updatedAt: now,
          },
        ];
        // also include any in-memory items created during this run
        return [...memoryArtworks, ...fallback];
      }
      throw error;
    }
  }

  async getArtworkById(id: number): Promise<Artwork | undefined> {
    try {
      const [rows] = await pool.query(
        `SELECT 
          id,
          title,
          description,
          price,
          image_url AS imageUrl,
          style,
          medium,
          width,
          height,
          year,
          is_available AS isAvailable,
          is_featured AS isFeatured,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM artworks
        WHERE id = ?`,
        [id]
      );
      return (rows as Artwork[])[0];
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        const mem = memoryArtworks.find(a => a.id === id);
        if (mem) return mem;
        const all = await this.getArtworks();
        return all.find(a => a.id === id);
      }
      throw error;
    }
  }

  async createArtwork(data: InsertArtwork): Promise<Artwork> {
    const { title, description, price, imageUrl } = data;

    if (!title || !price || !imageUrl) {
      throw new Error("Title, price, and imageUrl are required");
    }

    try {
      console.log('Creating artwork with data:', { title, description, price, imageUrl: (imageUrl || '').substring(0, 100) + '...' });
      
      const [result] = await pool.query(
        `INSERT INTO artworks (title, description, price, image_url)
         VALUES (?, ?, ?, ?)`,
        [title, description || null, price, imageUrl]
      );

      const insertId = (result as any).insertId;
      console.log('Artwork created with ID:', insertId);

      const [rows] = await pool.query(
        `SELECT 
          id,
          title,
          description,
          price,
          image_url AS imageUrl,
          style,
          medium,
          width,
          height,
          year,
          is_available AS isAvailable,
          is_featured AS isFeatured,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM artworks
        WHERE id = ?`,
        [insertId]
      );
      
      const artwork = (rows as Artwork[])[0];
      console.log('Retrieved artwork:', artwork);
      return artwork;
    } catch (error) {
      console.error('Error in createArtwork:', error);
      // Development fallback: store in memory when DB is unreachable
      if (process.env.NODE_ENV !== 'production') {
        const now = new Date();
        const artwork: Artwork = {
          id: memoryNextId++,
          title: data.title,
          description: data.description ?? null,
          price: data.price,
          imageUrl: data.imageUrl,
          style: data.style ?? null,
          medium: data.medium ?? null,
          width: data.width ?? null,
          height: data.height ?? null,
          year: data.year ?? null,
          isAvailable: data.isAvailable ?? true,
          isFeatured: data.isFeatured ?? false,
          createdAt: now,
          updatedAt: now,
        };
        memoryArtworks.unshift(artwork);
        console.warn('DB unavailable, saved artwork in memory:', artwork.id);
        return artwork;
      }
      throw error;
    }
  }

  async updateArtwork(id: number, data: UpdateArtwork): Promise<Artwork> {
    const columnMap: Record<string, string> = {
      title: "title",
      description: "description",
      price: "price",
      imageUrl: "image_url",
      style: "style",
      medium: "medium",
      width: "width",
      height: "height",
      year: "year",
      isAvailable: "is_available",
      isFeatured: "is_featured",
    };

    const fields: string[] = [];
    const values: any[] = [];

    for (const key in data) {
      const column = columnMap[key as keyof typeof columnMap];
      if (!column) continue;
      fields.push(`${column} = ?`);
      values.push((data as any)[key]);
    }

    values.push(id); // për WHERE

    if (fields.length === 0) {
      // Dev fallback update in memory
      if (process.env.NODE_ENV !== 'production') {
        const idx = memoryArtworks.findIndex(a => a.id === id);
        if (idx !== -1) {
          const updated = { ...memoryArtworks[idx], ...data, updatedAt: new Date() } as Artwork;
          memoryArtworks[idx] = updated;
          return updated;
        }
      }
      throw new Error("No data to update");
    }

    try {
      await pool.query(
        `UPDATE artworks SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        values
      );
      return this.getArtworkById(id) as Promise<Artwork>;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        const idx = memoryArtworks.findIndex(a => a.id === id);
        if (idx !== -1) {
          const updated = { ...memoryArtworks[idx], ...data, updatedAt: new Date() } as Artwork;
          memoryArtworks[idx] = updated;
          return updated;
        }
      }
      throw error;
    }
  }

  async deleteArtwork(id: number): Promise<void> {
    try {
      await pool.query("DELETE FROM artworks WHERE id = ?", [id]);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        const idx = memoryArtworks.findIndex(a => a.id === id);
        if (idx !== -1) memoryArtworks.splice(idx, 1);
        return;
      }
      throw error;
    }
  }

  // ================= USER METHODS =================
  async getUser(id: string): Promise<any> {
    // TODO: Zëvendëso me query të saktë sipas strukturës së tabelës users
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return (rows as any[])[0];
  }

  async updateUser(id: string, data: any): Promise<any> {
    // TODO: Zëvendëso me query të saktë sipas strukturës së tabelës users
    const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = Object.values(data);
    values.push(id);
    await pool.query(`UPDATE users SET ${fields} WHERE id = ?`, values);
    return this.getUser(id);
  }

  async upsertUser(user: any): Promise<any> {
    // TODO: Zëvendëso me query të saktë për upsert sipas strukturës së tabelës users
    // Ky është një shembull i thjeshtë për MySQL 5.7+
    const { id, email, firstName, lastName, profileImageUrl } = user;
    await pool.query(
      `INSERT INTO users (id, email, firstName, lastName, profileImageUrl)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE email=VALUES(email), firstName=VALUES(firstName), lastName=VALUES(lastName), profileImageUrl=VALUES(profileImageUrl)`,
      [id, email, firstName, lastName, profileImageUrl]
    );
    return this.getUser(id);
  }

  // ================= ARTIST METHODS =================
  // Fshi:
  // - async getArtists()
  // - async getArtistWithArtworks()
  // - async getArtworksByArtist()
  // - çdo koment ose query për artistët
}

// Eksporto instancën që do përdoret nëpër routes
export const storage = new DatabaseStorage();
