import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import ArtistCard from "@/components/ArtistCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Palette, Users, Globe, Award } from "lucide-react";
import type { ArtworkWithArtist, User } from "@shared/schema";

export default function Home() {
  const { data: featuredArtworks = [], isLoading: artworksLoading } = useQuery<ArtworkWithArtist[]>({
    queryKey: ["/api/artworks?featured=true"]
  });

  const { data: artists = [], isLoading: artistsLoading } = useQuery<User[]>({
    queryKey: ["/api/artists"]
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-warm-beige to-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
                Discover
                <span className="text-warm-brown"> Exceptional</span>
                <br />Art
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                NUVICO connects art enthusiasts with talented artists worldwide. Explore, collect, and invest in carefully curated paintings that speak to your soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gallery">
                  <Button className="warm-brown text-white hover:golden-brown px-8 py-3">
                    Explore Gallery
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                    Sell Your Art
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern art gallery interior" 
                className="rounded-2xl shadow-2xl w-full h-auto animate-float"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-golden-brown/20 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-brown/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Featured Artworks</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked masterpieces from our community of talented artists
            </p>
          </div>

          {artworksLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtworks.slice(0, 6).map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                View All Artworks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Featured Artists</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the talented creators behind our exceptional collection
            </p>
          </div>

          {artistsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {artists.slice(0, 4).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/artists">
              <Button className="warm-brown text-white hover:golden-brown px-8 py-3">
                Explore All Artists
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Stay Inspired</h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest artworks, artist stories, and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1"
            />
            <Button className="warm-brown text-white hover:golden-brown px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
