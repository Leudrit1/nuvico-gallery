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
import { Palette, Users, Globe, Award, MapPin, Phone, Mail, Clock, Shield, Heart } from "lucide-react";
import type { ArtworkWithArtist, User } from "@shared/schema";

export default function Home() {
  const { data: featuredArtworks = [], isLoading: artworksLoading } = useQuery<ArtworkWithArtist[]>({
    queryKey: ["/api/artworks", { featured: true }]
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
                Welcome to
                <span className="text-warm-brown"> NUVICO</span>
                <br />Art Gallery
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                NUVICO showcases exceptional contemporary artworks and unique paintings. Discover our carefully curated collection from talented artists around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gallery">
                  <Button className="warm-brown text-white hover:golden-brown px-8 py-3">
                    View Our Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                    About Us
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
            <h2 className="text-4xl font-bold text-charcoal mb-4">Our Featured Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exceptional artworks carefully selected to showcase the finest contemporary art
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
                Explore Full Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Showcase */}
      <section className="py-20 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Why Choose NUVICO</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience excellence in contemporary art curation and gallery services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Curated Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Every piece in our collection is carefully selected for its artistic merit and quality
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Global Perspective</h3>
                <p className="text-gray-600 text-sm">
                  Featuring contemporary works from established and emerging artists worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Professional Service</h3>
                <p className="text-gray-600 text-sm">
                  Expert consultation and personalized service for collectors and art enthusiasts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Art Experience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">The NUVICO Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in a world where art meets excellence, and every visit becomes a memorable journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Passionate Curation</h3>
                <p className="text-gray-600 text-sm">
                  Each artwork tells a story, carefully selected to inspire and move our visitors
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community Connection</h3>
                <p className="text-gray-600 text-sm">
                  Join a vibrant community of artists, collectors, and art enthusiasts
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Authenticity Guaranteed</h3>
                <p className="text-gray-600 text-sm">
                  Every piece comes with provenance and authenticity certification
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Visit Our Gallery</h2>
            <p className="text-lg text-gray-600">
              Discover exceptional art in our beautifully curated space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-600 text-sm">
                  123 Art District<br />
                  Gallery Quarter<br />
                  City Center, 12345
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-gray-600 text-sm">
                  +1 (555) 123-4567<br />
                  Mon-Fri: 9AM-6PM<br />
                  Sat-Sun: 10AM-5PM
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-600 text-sm">
                  info@nuvico.art<br />
                  gallery@nuvico.art<br />
                  curator@nuvico.art
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hours</h3>
                <p className="text-gray-600 text-sm">
                  Monday - Friday: 10AM-7PM<br />
                  Saturday: 10AM-6PM<br />
                  Sunday: 11AM-5PM
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="warm-brown text-white hover:golden-brown px-8 py-3 mr-4">
                Get Directions
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                Book Private Viewing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
