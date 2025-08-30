import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { LogIn, ExternalLink } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { refetch } = useAuth();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("/api/auth/login", "POST", credentials);
      return await response.json();
    },
    onSuccess: async (userData) => {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      
      // Invalidate and refetch auth query to update the UI
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      await refetch();
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        setLocation("/");
      }, 100);
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige to-soft-gray flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-warm-brown/10 rounded-2xl flex items-center justify-center">
                <LogIn className="h-8 w-8 text-warm-brown" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-charcoal mb-2">
              Welcome to <span className="text-warm-brown">NUVICO</span>
            </CardTitle>
            <p className="text-gray-600">Sign in to access your art gallery dashboard</p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="h-12 px-4 border-gray-300 focus:border-warm-brown focus:ring-warm-brown"
                  disabled={loginMutation.isPending}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 px-4 border-gray-300 focus:border-warm-brown focus:ring-warm-brown"
                  disabled={loginMutation.isPending}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-warm-brown via-golden-brown to-warm-brown hover:from-golden-brown hover:via-warm-brown hover:to-golden-brown text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 border-2 border-warm-brown/20"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In to Gallery</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setLocation("/")}
                className="px-4 py-2 rounded-lg border-2 border-warm-brown/20 text-warm-brown hover:bg-warm-brown hover:text-white font-medium transition-all duration-200 hover:shadow-md"
              >
                ← Back to Gallery
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}