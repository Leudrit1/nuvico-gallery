import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { User, Artwork } from "@shared/schema";

interface ArtistCardProps {
  artist: User;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { data: artworks = [] } = useQuery<Artwork[]>({
    queryKey: [`/api/artworks?artist=${artist.id}`]
  });

  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="text-center group cursor-pointer">
        <img
          src={artist.profileImageUrl || `https://ui-avatars.com/api/?name=${artist.firstName}+${artist.lastName}&size=128`}
          alt={`${artist.firstName} ${artist.lastName}`}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform shadow-lg"
        />
        <h3 className="font-semibold text-lg mb-1 group-hover:text-warm-brown transition-colors">
          {artist.firstName} {artist.lastName}
        </h3>
        {artist.bio && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {artist.bio}
          </p>
        )}
        <p className="text-warm-brown text-sm font-medium">
          {artworks.length} Artworks
        </p>
      </div>
    </Link>
  );
}
