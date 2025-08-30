import { z } from "zod";
// Tabela `artworks`
export var artworks = {
    id: "id",
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
    createdAt: "created_at",
    updatedAt: "updated_at",
};
// Insert schemas
export var insertArtworkSchema = z.object({
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
export var updateArtworkSchema = insertArtworkSchema.partial();
