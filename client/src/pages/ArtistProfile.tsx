import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import type { User, ArtworkWithArtist } from "@shared/schema";

interface ArtistWithArtworks extends User {
  artworks: ArtworkWithArtist[];
}

export default function ArtistProfile() {
  const { id } = useParams();

  const { data: artist, isLoading } = useQuery<ArtistWithArtworks>({
    queryKey: [`/api/artists/${id}`],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="bg-gray-300 h-64 rounded-xl mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-300 h-64 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Artist Not Found</h1>
            <p className="text-gray-600 mb-8">The artist you're looking for doesn't exist.</p>
            <Link href="/artists">
              <Button>Back to Artists</Button>
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
            <Link href="/artists">
              <Button variant="ghost" className="text-warm-brown hover:text-golden-brown">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Artists
              </Button>
            </Link>
          </div>

          {/* Artist Header */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                <img
                  src={artist.profileImageUrl || `https://ui-avatars.com/api/?name=${artist.firstName}+${artist.lastName}&size=200`}
                  alt={`${artist.firstName} ${artist.lastName}`}
                  className="w-48 h-48 rounded-full object-cover shadow-lg"
                />
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl font-bold text-charcoal mb-2">
                    {artist.firstName} {artist.lastName}
                  </h1>
                  {artist.isArtist && (
                    <Badge className="mb-4 bg-warm-brown/10 text-warm-brown">Artist</Badge>
                  )}
                  {artist.bio && (
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">{artist.bio}</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                    {artist.createdAt && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          Joined {new Date(artist.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-sm font-medium">
                        {artist.artworks?.length || 0} Artworks
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Artworks Section */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-charcoal">Artworks</h2>
              <p className="text-gray-600">
                {artist.artworks?.length || 0} pieces available
              </p>
            </div>

            {artist.artworks && artist.artworks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {artist.artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-soft-gray rounded-xl">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No artworks available
                </h3>
                <p className="text-gray-500">
                  This artist hasn't uploaded any artworks yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
