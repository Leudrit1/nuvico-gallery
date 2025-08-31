import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { Palette, Users, Globe, Award } from "lucide-react";

export default function Gallery() {
  const { data: artworks = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/artworks"]
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-charcoal mb-6">NUVICO Collection</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our complete curated collection of contemporary artworks, featuring exceptional pieces that represent the finest in modern artistic expression
            </p>
          </div>

          {/* Collection Overview Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-warm-beige/30 rounded-xl border border-warm-brown/20">
                <Palette className="h-12 w-12 text-warm-brown mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-charcoal mb-2">Diverse Styles</h3>
                <p className="text-sm text-gray-600">From abstract to contemporary, discover unique artistic expressions</p>
              </div>
              
              <div className="text-center p-6 bg-soft-gray/30 rounded-xl border border-charcoal/20">
                <Users className="h-12 w-12 text-charcoal mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-charcoal mb-2">Global Artists</h3>
                <p className="text-sm text-gray-600">Featuring talented artists from around the world</p>
              </div>
              
              <div className="text-center p-6 bg-warm-beige/30 rounded-xl border border-warm-brown/20">
                <Globe className="h-12 w-12 text-warm-brown mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-charcoal mb-2">Curated Selection</h3>
                <p className="text-sm text-gray-600">Handpicked artworks for discerning collectors</p>
              </div>
              
              <div className="text-center p-6 bg-soft-gray/30 rounded-xl border border-charcoal/20">
                <Award className="h-12 w-12 text-charcoal mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-charcoal mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-600">Exceptional craftsmanship and artistic excellence</p>
              </div>
            </div>
          </div>

          {/* Collection Stats */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 border border-soft-gray">
              <div>
                <div className="text-2xl font-bold text-warm-brown">{artworks.length}</div>
                <div className="text-sm text-gray-600">Artworks</div>
              </div>
              <div className="w-px h-8 bg-soft-gray"></div>
              <div>
                <div className="text-2xl font-bold text-warm-brown">6+</div>
                <div className="text-sm text-gray-600">Styles</div>
              </div>
              <div className="w-px h-8 bg-soft-gray"></div>
              <div>
                <div className="text-2xl font-bold text-warm-brown">Worldwide</div>
                <div className="text-sm text-gray-600">Artists</div>
              </div>
            </div>
          </div>

          {/* Artworks Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-charcoal mb-6 text-center">Featured Artworks</h2>
          </div>

          {/* Artworks Display */}
          {isLoading ? (
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 rounded-xl mb-4 h-64"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : artworks.length > 0 ? (
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Collection Coming Soon</h3>
                <p className="text-gray-500">Our curated collection is being prepared. Check back soon for amazing artworks!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
