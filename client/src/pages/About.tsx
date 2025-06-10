import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Users, Globe, Award, Heart, Shield, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <h1 className="text-5xl font-bold text-charcoal mb-6">About NUVICO</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              NUVICO Gallery is a premier destination for contemporary art, featuring a carefully curated collection of exceptional works. Our gallery showcases outstanding pieces that represent the finest in modern artistic expression and craftsmanship.
            </p>
          </section>

          {/* Story Section */}
          <section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Artist workspace with easel and paintings" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Palette className="h-8 w-8 text-warm-brown" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-charcoal mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                NUVICO Gallery was established with a vision to create an exceptional space for contemporary art appreciation. Our collection features carefully selected works that demonstrate outstanding artistic merit and creative vision.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We are dedicated to presenting art that inspires, challenges, and enriches the cultural landscape, providing our visitors with meaningful encounters with contemporary artistic expression.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">200+</div>
                  <div className="text-gray-600">Curated Works</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">25+</div>
                  <div className="text-gray-600">Exhibitions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">5000+</div>
                  <div className="text-gray-600">Visitors</div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charcoal mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at NUVICO
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Passion for Art</h3>
                  <p className="text-gray-600">
                    We believe art has the power to inspire, heal, and connect people across cultures and boundaries.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Authenticity</h3>
                  <p className="text-gray-600">
                    Every artwork on our platform is verified for quality and authenticity by our expert curators.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Community</h3>
                  <p className="text-gray-600">
                    We foster a supportive community where artists and collectors can connect and grow together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mission Section */}
          <section className="bg-warm-beige rounded-2xl p-12 mb-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-charcoal mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                To democratize the art world by providing a platform where exceptional art is discoverable, artists are fairly compensated, and collectors can build meaningful collections that reflect their personal journey and aesthetic vision.
              </p>
              <Badge className="bg-warm-brown text-white px-6 py-2 text-sm">
                Connecting Art & Hearts Worldwide
              </Badge>
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charcoal mb-4">Why Choose NUVICO?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                What makes us different from other art marketplaces
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
                    Every piece is hand-selected by our team of art experts
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
                    Connect with artists and collectors from around the world
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Easy Platform</h3>
                  <p className="text-gray-600 text-sm">
                    Intuitive tools for buying, selling, and managing your art
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
                    100% authentic artworks with quality guarantee
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
