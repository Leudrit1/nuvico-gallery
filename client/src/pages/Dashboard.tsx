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
import { Plus, Edit, Trash2, Palette } from "lucide-react";
import type { Artwork } from "@shared/schema";

// Define User type locally
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isArtist?: boolean;
  profileImageUrl?: string | null;
};

export default function Dashboard() {
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Type assertion for user
  const typedUser = user as User | null;

  const { data: myArtworks = [], isLoading: artworksLoading } = useQuery<Artwork[]>({
    queryKey: ["/api/my-artworks"],
    enabled: !!typedUser
  });

  const deleteArtworkMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/artworks/${id}`, "DELETE");
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
    mutationFn: async (data: Partial<User>) => {
      await apiRequest("/api/auth/user", "PATCH", data);
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

  const addArtworkMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("/api/artworks", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-artworks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/artworks"] });
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
        description: "Failed to create artwork",
        variant: "destructive",
      });
    },
  });

  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!authLoading) {
      if (!typedUser) {
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
      
      if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges. Redirecting to homepage...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        return;
      }
    }
  }, [typedUser, authLoading, isAdmin, toast]);

  const handleDeleteArtwork = (id: number) => {
    if (confirm("Are you sure you want to delete this artwork?")) {
      deleteArtworkMutation.mutate(id);
    }
  };

  const handleBecomeArtist = () => {
    updateProfileMutation.mutate({ isArtist: true });
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-charcoal mb-2">
                Welcome back, {typedUser?.firstName}!
              </h1>
              <p className="text-lg text-gray-600">
                {myArtworks.length > 0 
                  ? `You have ${myArtworks.length} artwork${myArtworks.length === 1 ? '' : 's'} in your gallery`
                  : "Manage your artworks and profile here"
                }
              </p>
            </div>
            <Button onClick={() => setAddDialogOpen(true)} className="warm-brown text-white hover:golden-brown">
              <Plus className="h-4 w-4 mr-2" />
              Add Artwork
            </Button>
          </div>

          {typedUser?.isArtist && (
            <>
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

          {!typedUser?.isArtist && myArtworks.length === 0 && (
            <Card className="text-center py-16">
              <CardContent>
                <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">Start Creating</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Begin your artistic journey by adding your first artwork to showcase your talent to collectors worldwide.
                </p>
                <Button onClick={() => setAddDialogOpen(true)} className="warm-brown text-white hover:golden-brown" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Artwork
                </Button>
              </CardContent>
            </Card>
          )}

          {!typedUser?.isArtist && myArtworks.length > 0 && (
            <>
              {/* Artworks Section for non-artist users */}
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
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      <AddArtworkDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      <Footer />
    </div>
  );
}