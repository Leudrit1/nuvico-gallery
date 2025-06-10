import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AddArtworkDialog from "@/components/AddArtworkDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Plus, Edit, Trash2, Eye, DollarSign, Palette, User } from "lucide-react";
import type { Artwork, User as UserType } from "@shared/schema";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const { data: myArtworks = [], isLoading: artworksLoading } = useQuery<Artwork[]>({
    queryKey: ["/api/my-artworks"],
    enabled: !!user
  });

  const deleteArtworkMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/artworks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-artworks"] });
      toast({
        title: "Success",
        description: "Artwork deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete artwork",
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<UserType>) => {
      await apiRequest("PATCH", "/api/auth/user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [user, authLoading, toast]);

  const handleDeleteArtwork = (id: number) => {
    if (confirm("Are you sure you want to delete this artwork?")) {
      deleteArtworkMutation.mutate(id);
    }
  };

  const handleBecomeArtist = () => {
    updateProfileMutation.mutate({ isArtist: true });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    total: myArtworks.length,
    available: myArtworks.filter(a => a.isAvailable).length,
    sold: myArtworks.filter(a => !a.isAvailable).length,
    revenue: myArtworks.filter(a => !a.isAvailable).reduce((sum, a) => sum + parseFloat(a.price), 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-charcoal mb-2">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-lg text-gray-600">
                Manage your artworks and profile here
              </p>
            </div>
            {user?.isArtist ? (
              <Button onClick={() => setAddDialogOpen(true)} className="warm-brown text-white hover:golden-brown">
                <Plus className="h-4 w-4 mr-2" />
                Add Artwork
              </Button>
            ) : (
              <Button onClick={handleBecomeArtist} className="warm-brown text-white hover:golden-brown">
                <User className="h-4 w-4 mr-2" />
                Become an Artist
              </Button>
            )}
          </div>

          {user?.isArtist && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Artworks</p>
                        <p className="text-3xl font-bold text-charcoal">{stats.total}</p>
                      </div>
                      <Palette className="h-8 w-8 text-warm-brown" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Available</p>
                        <p className="text-3xl font-bold text-green-600">{stats.available}</p>
                      </div>
                      <Eye className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Sold</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.sold}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{stats.sold}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Revenue</p>
                        <p className="text-3xl font-bold text-warm-brown">${stats.revenue.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-warm-brown" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Artworks Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>My Artworks</span>
                    <Button onClick={() => setAddDialogOpen(true)} size="sm" className="warm-brown text-white hover:golden-brown">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {artworksLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-soft-gray rounded-lg animate-pulse">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-300 rounded w-32"></div>
                              <div className="h-3 bg-gray-300 rounded w-24"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : myArtworks.length > 0 ? (
                    <div className="space-y-4">
                      {myArtworks.map((artwork) => (
                        <div key={artwork.id} className="flex items-center justify-between p-4 bg-soft-gray rounded-lg hover:bg-medium-gray/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <img
                              src={artwork.imageUrl}
                              alt={artwork.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{artwork.title}</h3>
                              <p className="text-sm text-gray-600">
                                {artwork.style} • ${parseFloat(artwork.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {artwork.isAvailable ? (
                              <Badge className="bg-green-100 text-green-800">Available</Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800">Sold</Badge>
                            )}
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteArtwork(artwork.id)}
                              disabled={deleteArtworkMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No artworks yet</h3>
                      <p className="text-gray-500 mb-6">Start by adding your first artwork to showcase your talent</p>
                      <Button onClick={() => setAddDialogOpen(true)} className="warm-brown text-white hover:golden-brown">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Artwork
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {!user?.isArtist && (
            <Card className="text-center py-16">
              <CardContent>
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">Become an Artist</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Join our community of talented artists and start showcasing your work to collectors worldwide.
                </p>
                <Button onClick={handleBecomeArtist} className="warm-brown text-white hover:golden-brown" size="lg">
                  <User className="h-4 w-4 mr-2" />
                  Become an Artist
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AddArtworkDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <Footer />
    </div>
  );
}
