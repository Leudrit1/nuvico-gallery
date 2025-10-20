import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { insertArtworkSchema } from "@shared/schema";
import { Upload, X } from "lucide-react";
import { z } from "zod";

interface AddArtworkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddArtworkDialog({ open, onOpenChange }: AddArtworkDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: undefined as File[] | undefined,
    style: "",
    medium: "",
    width: "",
    height: "",
    year: "",
    isAvailable: true,
    isFeatured: false
  });

  const createArtworkMutation = useMutation({
    mutationFn: async (data: any) => {
      // Handle multi-image upload: compress up to 5 images and store as JSON array of data URLs
      let imageUrl = data.imageUrl;
      if (Array.isArray(data.imageUrl)) {
        const files: File[] = data.imageUrl.slice(0, 5);
        const compressedList: string[] = [];
        for (const f of files) {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            const compressed = await new Promise<string>((resolve, reject) => {
              img.onload = () => {
                const maxSize = 800;
                let { width, height } = img as HTMLImageElement;
                if (width > height) {
                  if (width > maxSize) { height = (height * maxSize) / width; width = maxSize; }
                } else {
                  if (height > maxSize) { width = (width * maxSize) / height; height = maxSize; }
                }
                canvas.width = width;
                canvas.height = height;
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
              };
              img.onerror = () => reject(new Error('Failed to load image'));
              img.src = URL.createObjectURL(f);
            });
            compressedList.push(compressed);
          } catch (e) {
            console.error('Image processing error:', e);
          }
        }
        imageUrl = JSON.stringify(compressedList);
      }
 
      try {
        const res = await apiRequest("/api/artworks", "POST", {
          title: data.title,
          description: data.description || null,
          price: data.price,
          imageUrl,
          style: data.style || null,
          medium: data.medium || null,
          width: data.width ? Number(data.width) : null,
          height: data.height ? Number(data.height) : null,
          year: data.year ? Number(data.year) : null,
          isAvailable: data.isAvailable,
          isFeatured: data.isFeatured,
        });
        const created = await res.json();
        return created;
      } catch (error: any) {
        if (isUnauthorizedError(error)) {
          window.location.href = "/login";
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Artwork added successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/my-artworks"] });
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add artwork", variant: "destructive" });
    }
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createArtworkMutation.mutate(formData);
  };

  const styles = [
    "Abstract",
    "Contemporary",
    "Impressionist",
    "Surrealism",
    "Realism",
    "Pop Art",
  ];

  const mediums = [
    "Oil",
    "Acrylic",
    "Watercolor",
    "Digital",
    "Mixed Media",
    "Ink",
    "Collage"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-warm-brown" />
            Add New Artwork
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new artwork to your gallery.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">Basic Information</h3>
            
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter artwork title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your artwork..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="price">Price (CHF) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">Images (up to 5)</Label>
              <Input
                id="imageUrl"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleChange("imageUrl", e.target.files ? Array.from(e.target.files).slice(0,5) : undefined)}
              />
            </div>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="style">Style</Label>
              <Select onValueChange={(v) => handleChange("style", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="medium">Medium</Label>
              <Select onValueChange={(v) => handleChange("medium", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select medium" />
                </SelectTrigger>
                <SelectContent>
                  {mediums.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="width">Width (cm)</Label>
              <Input id="width" type="number" value={formData.width} onChange={(e) => handleChange("width", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" value={formData.height} onChange={(e) => handleChange("height", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" value={formData.year} onChange={(e) => handleChange("year", e.target.value)} />
            </div>
          </div>

          {/* Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input id="available" type="checkbox" checked={formData.isAvailable} onChange={(e) => handleChange("isAvailable", e.target.checked)} />
              <Label htmlFor="available">Available</Label>
            </div>
            <div className="flex items-center gap-2">
              <input id="featured" type="checkbox" checked={formData.isFeatured} onChange={(e) => handleChange("isFeatured", e.target.checked)} />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={createArtworkMutation.isPending}>
              {createArtworkMutation.isPending ? "Saving..." : "Add Artwork"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
