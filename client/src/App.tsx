import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import ArtworkDetail from "@/pages/ArtworkDetail";
import Dashboard from "@/pages/Dashboard";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  return (
    <Switch>
      {/* Public routes - always accessible */}
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/artworks/:id" component={ArtworkDetail} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin route - always defined, but protected in component */}
      <Route path="/admin" component={Dashboard} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
