import { z } from "zod";

// Tabela `artworks`
export const artworks = {
  id: "id",
  title: "title",
  description: "description",
  price: "price",
  imageUrl: "image_url",
  artistId: "artist_id",
  style: "style",
  medium: "medium",
  width: "width",
  height: "height",
  year: "year",
  isAvailable: "is_available",
  isFeatured: "is_featured",
  createdAt: "created_at",
  updatedAt: "updated_at",
};

// Insert schemas
export const insertArtworkSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  price: z.string(),
  imageUrl: z.string(),
  style: z.string().nullable(),
  medium: z.string().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  year: z.number().nullable(),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const updateArtworkSchema = insertArtworkSchema.partial();

// Types
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
export type UpdateArtwork = z.infer<typeof updateArtworkSchema>;
export type Artwork = {
  id: number;
  title: string;
  description: string | null;
  price: string;
  imageUrl: string;
  artistId: string;
  style: string | null;
  medium: string | null;
  width: number | null;
  height: number | null;
  year: number | null;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};
