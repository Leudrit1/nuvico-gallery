import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Palette, LogIn } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("/api/auth/login", "POST", credentials);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      setLocation("/");
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
                <Palette className="h-8 w-8 text-warm-brown" />
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
                className="w-full h-12 bg-warm-brown hover:bg-golden-brown text-white font-semibold text-base transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button
                type="button"
                onClick={() => window.location.href = "/api/login"}
                className="w-full mt-4 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Login with Replit</span>
                </div>
              </Button>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">Demo Credentials</h3>
                <p className="text-sm text-gray-600">
                  <strong>Username:</strong> admin<br />
                  <strong>Password:</strong> password
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setLocation("/")}
                className="text-warm-brown hover:text-golden-brown font-medium transition-colors"
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