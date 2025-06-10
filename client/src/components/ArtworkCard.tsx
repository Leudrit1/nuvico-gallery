import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import type { ArtworkWithArtist } from "@shared/schema";

interface ArtworkCardProps {
  artwork: ArtworkWithArtist;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Card className="group cursor-pointer hover-lift overflow-hidden">
      <div className="relative">
        <Link href={`/artworks/${artwork.id}`}>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <Button
          size="icon"
          variant="outline"
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {!artwork.isAvailable && (
          <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
            Sold
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <Link href={`/artworks/${artwork.id}`}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-warm-brown transition-colors">
            {artwork.title}
          </h3>
        </Link>
        <Link href={`/artists/${artwork.artistId}`}>
          <p className="text-gray-600 text-sm mb-2 hover:text-warm-brown transition-colors">
            by {artwork.artist.firstName} {artwork.artist.lastName}
          </p>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-warm-brown">
            ${parseFloat(artwork.price).toLocaleString()}
          </span>
          {artwork.style && (
            <Badge variant="secondary" className="text-xs">
              {artwork.style}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
