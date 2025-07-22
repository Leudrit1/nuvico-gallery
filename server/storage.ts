// storage.ts

import { pool } from "./db"; // db.ts përmban mysql2/promise lidhjen
import type { Artwork, InsertArtwork, UpdateArtwork } from "../shared/schema";

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
    const [rows] = await pool.query("SELECT * FROM artworks ORDER BY createdAt DESC");
    return rows as Artwork[];
  }

  async getArtworkById(id: number): Promise<Artwork | undefined> {
    const [rows] = await pool.query("SELECT * FROM artworks WHERE id = ?", [id]);
    return (rows as Artwork[])[0];
  }

  async createArtwork(data: InsertArtwork): Promise<Artwork> {
    const { title, description, price, imageUrl } = data;

    if (!title || !price || !imageUrl) {
      throw new Error("Title, price, and imageUrl are required");
    }

    const [result] = await pool.query(
      `INSERT INTO artworks (title, description, price, imageUrl)
       VALUES (?, ?, ?, ?)`,
      [title, description || null, price, imageUrl]
    );

    const insertId = (result as any).insertId;

    const [rows] = await pool.query("SELECT * FROM artworks WHERE id = ?", [insertId]);
    return (rows as Artwork[])[0];
  }

  async updateArtwork(id: number, data: UpdateArtwork): Promise<Artwork> {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push((data as any)[key]);
    }

    values.push(id); // për WHERE

    if (fields.length === 0) {
      throw new Error("No data to update");
    }

    await pool.query(
      `UPDATE artworks SET ${fields.join(", ")}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    return this.getArtworkById(id) as Promise<Artwork>;
  }

  async deleteArtwork(id: number): Promise<void> {
    await pool.query("DELETE FROM artworks WHERE id = ?", [id]);
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
  async getArtists(): Promise<any[]> {
    // TODO: Zëvendëso me query të saktë sipas strukturës së tabelës artists
    const [rows] = await pool.query("SELECT * FROM artists");
    return rows as any[];
  }

  async getArtistWithArtworks(id: string): Promise<any> {
    // TODO: Zëvendëso me query të saktë sipas strukturës së tabelës artists dhe artworks
    const [artists] = await pool.query("SELECT * FROM artists WHERE id = ?", [id]);
    if ((artists as any[]).length === 0) return undefined;
    const artist = (artists as any[])[0];
    const [artworks] = await pool.query("SELECT * FROM artworks WHERE artist_id = ?", [id]);
    artist.artworks = artworks;
    return artist;
  }

  async getArtworksByArtist(artistId: string): Promise<any[]> {
    // TODO: Zëvendëso me query të saktë sipas strukturës së tabelës artworks
    const [rows] = await pool.query("SELECT * FROM artworks WHERE artist_id = ?", [artistId]);
    return rows as any[];
  }
}

// Eksporto instancën që do përdoret nëpër routes
export const storage = new DatabaseStorage();
