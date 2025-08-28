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
    imageUrl: undefined as File | undefined,
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
      // Handle image upload - compress and resize if needed
      let imageUrl = data.imageUrl;
      if (data.imageUrl instanceof File) {
        try {
          // Create a compressed version of the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          imageUrl = await new Promise((resolve, reject) => {
            img.onload = () => {
              // Calculate new dimensions (max 800x800)
              const maxSize = 800;
              let { width, height } = img;
              
              if (width > height) {
                if (width > maxSize) {
                  height = (height * maxSize) / width;
                  width = maxSize;
                }
              } else {
                if (height > maxSize) {
                  width = (width * maxSize) / height;
                  height = maxSize;
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              
              // Draw and compress
              ctx?.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
              resolve(compressedDataUrl);
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(data.imageUrl);
          });
        } catch (error) {
          console.error('Image processing error:', error);
          toast({
            title: "Image Processing Error",
            description: "Failed to process the image. Please try again.",
            variant: "destructive",
          });
          throw error;
        }
      }
      
      const validatedData = insertArtworkSchema.parse({
        ...data,
        imageUrl: imageUrl,
        price: data.price.toString(), // Ensure price is string as per schema
        width: data.width ? parseInt(data.width) : null,
        height: data.height ? parseInt(data.height) : null,
        year: data.year ? parseInt(data.year) : null
      });
      
      await apiRequest("/api/artworks", "POST", validatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-artworks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/artworks"] });
      toast({
        title: "Success",
        description: "Artwork added successfully!",
      });
      onOpenChange(false);
      resetForm();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add artwork. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      imageUrl: undefined as File | undefined,
      style: "",
      medium: "",
      width: "",
      height: "",
      year: "",
      isAvailable: true,
      isFeatured: false
    });
  };

  const handleChange = (field: string, value: string | boolean | File | undefined) => {
    if (field === "imageUrl" && value instanceof File) {
      // Check file size (limit to 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (value.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Image size must be less than 5MB. Please choose a smaller image.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!value.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPEG, PNG, etc.).",
          variant: "destructive",
        });
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.imageUrl) {
      toast({
        title: "Validation Error",
        description: "Title, price, and image URL are required fields.",
        variant: "destructive",
      });
      return;
    }

    createArtworkMutation.mutate(formData);
  };

  const styles = [
    "Abstract",
    "Landscape", 
    "Portrait",
    "Contemporary",
    "Still Life",
    "Geometric",
    "Expressionist",
    "Impressionist",
    "Realist",
    "Surreal"
  ];

  const mediums = [
    "Oil on Canvas",
    "Acrylic on Canvas",
    "Watercolor",
    "Digital Art",
    "Mixed Media",
    "Charcoal",
    "Pencil",
    "Pastel",
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
              <Label htmlFor="price">Price (USD) *</Label>
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
              <Label htmlFor="imageUrl">Image *</Label>
              <Input
                id="imageUrl"
                type="file"
                accept="image/*"
                onChange={(e) => handleChange("imageUrl", e.target.files?.[0])}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload an image file (JPEG, PNG, etc.) under 5MB. Images will be automatically compressed and resized.
              </p>
            </div>
          </div>

          {/* Artwork Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">Artwork Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="style">Style</Label>
                <Select value={formData.style} onValueChange={(value) => handleChange("style", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="medium">Medium</Label>
                <Select value={formData.medium} onValueChange={(value) => handleChange("medium", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select medium" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediums.map((medium) => (
                      <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="width">Width (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  min="1"
                  value={formData.width}
                  onChange={(e) => handleChange("width", e.target.value)}
                  placeholder="50"
                />
              </div>

              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="1"
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  placeholder="70"
                />
              </div>

              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          {formData.imageUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.imageUrl ? URL.createObjectURL(formData.imageUrl) : ""}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => {
                    toast({
                      title: "Invalid Image URL",
                      description: "The image URL you provided cannot be loaded.",
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createArtworkMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="warm-brown text-white hover:golden-brown"
              disabled={createArtworkMutation.isPending}
            >
              {createArtworkMutation.isPending ? "Adding..." : "Add Artwork"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
