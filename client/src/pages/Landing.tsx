import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Users, Globe, Award } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige to-soft-gray">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-warm-brown">NUVICO</div>
            <Button onClick={handleLogin} className="warm-brown text-white hover:golden-brown">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
                Discover
                <span className="text-warm-brown"> Exceptional</span>
                <br />Art
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                NUVICO connects art enthusiasts with talented artists worldwide. Explore, collect, and invest in carefully curated paintings that speak to your soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleLogin} className="warm-brown text-white hover:golden-brown px-8 py-3">
                  Explore Gallery
                </Button>
                <Button onClick={handleLogin} variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                  Sell Your Art
                </Button>
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Why Choose NUVICO?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our community of artists and art lovers from around the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Curated Collection</h3>
                <p className="text-gray-600 text-sm">
                  Handpicked artworks from talented artists worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Artist Community</h3>
                <p className="text-gray-600 text-sm">
                  Connect with artists and collectors in our vibrant community
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
                <p className="text-gray-600 text-sm">
                  Artists from over 50 countries showcase their work
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
                <p className="text-gray-600 text-sm">
                  Every artwork is verified for authenticity and quality
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-warm-brown mb-2">500+</div>
              <div className="text-gray-600">Artists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warm-brown mb-2">2,400+</div>
              <div className="text-gray-600">Artworks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warm-brown mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warm-brown mb-2">98%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-6">Ready to Start Your Art Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of artists and collectors who trust NUVICO for authentic art experiences
          </p>
          <Button onClick={handleLogin} size="lg" className="warm-brown text-white hover:golden-brown px-8 py-4 text-lg">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold text-warm-brown mb-4">NUVICO</div>
          <p className="text-gray-300 mb-6">
            Connecting artists and collectors through exceptional art experiences.
          </p>
          <p className="text-gray-400 text-sm">© 2024 NUVICO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
