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

export default function Gallery() {
  const [filters, setFilters] = useState({
    style: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sortBy: "newest"
  });

  const { data: artworks = [], isLoading } = useQuery<any[]>({
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
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Artworks Found</h3>
                <p className="text-gray-500">We couldn't find any artworks matching your criteria. Try adjusting your filters.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
