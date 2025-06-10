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
              <Button
                size="icon"
                variant="outline"
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Artwork Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-charcoal mb-2">{artwork.title}</h1>
                <Link href={`/artists/${artwork.artistId}`}>
                  <p className="text-xl text-warm-brown hover:text-golden-brown cursor-pointer">
                    by {artwork.artist.firstName} {artwork.artist.lastName}
                  </p>
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-warm-brown">
                  ${parseFloat(artwork.price).toLocaleString()}
                </div>
                {artwork.isAvailable ? (
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                ) : (
                  <Badge variant="secondary">Sold</Badge>
                )}
              </div>

              <Separator />

              {/* Artwork Info */}
              <div className="grid grid-cols-2 gap-4">
                {artwork.style && (
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Style: {artwork.style}</span>
                  </div>
                )}
                {artwork.medium && (
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Medium: {artwork.medium}</span>
                  </div>
                )}
                {artwork.width && artwork.height && (
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {artwork.width} × {artwork.height} cm
                    </span>
                  </div>
                )}
                {artwork.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Year: {artwork.year}</span>
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
                  <Button className="flex-1 warm-brown text-white hover:golden-brown">
                    Contact Artist
                  </Button>
                )}
                <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Artist Info Card */}
          <Card className="mt-16">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <img
                  src={artwork.artist.profileImageUrl || `https://ui-avatars.com/api/?name=${artwork.artist.firstName}+${artwork.artist.lastName}&size=80`}
                  alt={`${artwork.artist.firstName} ${artwork.artist.lastName}`}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {artwork.artist.firstName} {artwork.artist.lastName}
                  </h3>
                  {artwork.artist.bio && (
                    <p className="text-gray-600 mb-4">{artwork.artist.bio}</p>
                  )}
                  <Link href={`/artists/${artwork.artistId}`}>
                    <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white">
                      View Artist Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
