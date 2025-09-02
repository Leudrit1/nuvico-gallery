import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Heart, ArrowLeft, Calendar, Ruler, Palette } from "lucide-react";
import type { ArtworkWithArtist } from "@shared/schema";

export default function ArtworkDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: artwork, isLoading } = useQuery<ArtworkWithArtist>({
    queryKey: [`/api/artworks/${id}`],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
              <div className="bg-gray-300 h-96 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Artwork Not Found</h1>
            <p className="text-gray-600 mb-8">The artwork you're looking for doesn't exist.</p>
            <Link href="/gallery">
              <Button>Back to Gallery</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/gallery">
              <Button variant="ghost" className="text-warm-brown hover:text-golden-brown">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Gallery
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Artwork Image */}
            <div className="relative">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Artwork Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-charcoal mb-2">{artwork.title}</h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-warm-brown">
                  CHF {parseFloat(artwork.price).toLocaleString('de-CH')}
                </div>
                {artwork.isAvailable ? (
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                ) : (
                  <Badge variant="secondary">Sold</Badge>
                )}
              </div>

              <Separator />

              {/* Artwork Info - organized */}
              <div className="grid grid-cols-2 gap-4">
                {artwork.style && (
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Style:</span> {artwork.style}</span>
                  </div>
                )}
                {artwork.medium && (
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Medium:</span> {artwork.medium}</span>
                  </div>
                )}
                {artwork.width && artwork.height && (
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Dimensions:</span> {artwork.width} × {artwork.height} cm</span>
                  </div>
                )}
                {artwork.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Year:</span> {artwork.year}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Description */}
              {artwork.description && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{artwork.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {artwork.isAvailable && (
                  <Link href="/contact">
                    <Button className="flex-1 warm-brown text-white hover:golden-brown">
                      Contact
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Removed artist info card */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

