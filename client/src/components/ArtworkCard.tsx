import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ArtworkWithArtist } from "@shared/schema";

interface ArtworkCardProps {
  artwork: ArtworkWithArtist;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link href={`/artworks/${artwork.id}`}>
      <Card className="cursor-pointer overflow-hidden bg-white border border-gray-200 hover:border-warm-brown transition-colors duration-300 rounded-xl">
        <div className="relative">
          <img
            src={artwork.imageUrl || "/placeholder-artwork.jpg"}
            alt={artwork.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              ${parseFloat(artwork.price).toLocaleString()}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
            {artwork.title}
          </h3>
          
          {artwork.artist ? (
            <p className="text-gray-600 text-sm mb-2">
              by {artwork.artist.firstName} {artwork.artist.lastName}
            </p>
          ) : (
            <p className="text-gray-600 text-sm mb-2">
              Artist unknown
            </p>
          )}
          
          {artwork.description && (
            <p className="text-gray-500 text-sm line-clamp-2">
              {artwork.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {artwork.medium && (
              <Badge variant="outline" className="text-xs">
                {artwork.medium}
              </Badge>
            )}
            {artwork.style && (
              <Badge variant="outline" className="text-xs">
                {artwork.style}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
