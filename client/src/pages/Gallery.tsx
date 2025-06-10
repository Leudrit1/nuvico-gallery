import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import type { ArtworkWithArtist } from "@shared/schema";

export default function Gallery() {
  const [filters, setFilters] = useState({
    style: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sortBy: "newest"
  });

  const { data: artworks = [], isLoading } = useQuery<ArtworkWithArtist[]>({
    queryKey: ["/api/artworks", filters]
  });

  const styles = ["Abstract", "Landscape", "Portrait", "Contemporary", "Still Life", "Geometric"];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: value === "all" ? "" : value 
    }));
  };

  const clearFilters = () => {
    setFilters({
      style: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "newest"
    });
  };

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

          {/* Filters */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search artworks..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filters.style} onValueChange={(value) => handleFilterChange("style", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Styles</SelectItem>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Min Price"
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-[120px]"
              />

              <Input
                placeholder="Max Price"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-[120px]"
              />

              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.style && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange("style", "")}>
                  Style: {filters.style} ×
                </Badge>
              )}
              {filters.minPrice && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange("minPrice", "")}>
                  Min: ${filters.minPrice} ×
                </Badge>
              )}
              {filters.maxPrice && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange("maxPrice", "")}>
                  Max: ${filters.maxPrice} ×
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => handleFilterChange("search", "")}>
                  Search: "{filters.search}" ×
                </Badge>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="mb-8">
            <p className="text-sm text-gray-600">
              {isLoading ? "Loading..." : `${artworks.length} artworks found`}
            </p>
          </div>

          {/* Artworks Display */}
          {isLoading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="break-inside-avoid animate-pulse mb-8">
                  <div className={`bg-gray-300 rounded-xl mb-4 ${i % 3 === 0 ? 'h-80' : i % 3 === 1 ? 'h-64' : 'h-72'}`}></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : artworks.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8">
              {artworks.map((artwork, index) => (
                <div key={artwork.id} className="break-inside-avoid mb-8">
                  <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-white text-lg mb-1">{artwork.title}</h3>
                      <p className="text-white/80 text-sm mb-2">{artwork.style} • {artwork.medium}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">${artwork.price}</span>
                        <div className="flex gap-1">
                          <span className="text-white/60 text-xs">{artwork.width}" × {artwork.height}"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6">
                <Filter className="h-20 w-20 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-3">No artworks found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                We couldn't find any artworks matching your current filters. Try adjusting your search criteria.
              </p>
              <Button onClick={clearFilters} variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
