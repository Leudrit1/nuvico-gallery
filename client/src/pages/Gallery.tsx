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
    search: ""
  });

  const { data: artworks = [], isLoading } = useQuery<ArtworkWithArtist[]>({
    queryKey: ["/api/artworks", filters]
  });

  const styles = ["Abstract", "Landscape", "Portrait", "Contemporary", "Still Life", "Geometric"];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      style: "",
      minPrice: "",
      maxPrice: "",
      search: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-charcoal mb-4">Art Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exceptional artworks from talented artists worldwide
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
                  <SelectItem value="">All Styles</SelectItem>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
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

          {/* Artworks Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : artworks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4">
                <Filter className="h-16 w-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No artworks found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters} variant="outline">
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
