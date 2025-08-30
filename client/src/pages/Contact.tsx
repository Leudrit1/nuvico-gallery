import { useEffect } from "react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Palette, 
  Users, 
  Shield, 
  Globe, 
  Heart,
  Star,
  Award,
  Zap,
  Building2,
  MessageCircle
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const { toast } = useToast();
  const [state, handleSubmit] = useForm("meoloyrn");

  // Shfaq toast vetëm një herë kur dërgimi ka sukses
  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }
  }, [state.succeeded, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-warm-brown to-golden-brown rounded-full mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-charcoal mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about our art platform, need help with your account, or want to learn more about selling your art? 
              Our dedicated team is here to support your artistic journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-warm-brown to-golden-brown text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="w-6 h-6" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-charcoal font-semibold">Full Name</Label>
                        <Input id="name" name="name" required className="mt-2 border-2 focus:border-warm-brown" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-charcoal font-semibold">Email</Label>
                        <Input id="email" type="email" name="email" required className="mt-2 border-2 focus:border-warm-brown" />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="type" className="text-charcoal font-semibold">Inquiry Type</Label>
                      <Select name="type">
                        <SelectTrigger className="mt-2 border-2 focus:border-warm-brown">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Question</SelectItem>
                          <SelectItem value="artist">Artist Support</SelectItem>
                          <SelectItem value="buyer">Buyer Support</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="artwork">Artwork Submission</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-charcoal font-semibold">Subject</Label>
                      <Input id="subject" name="subject" required className="mt-2 border-2 focus:border-warm-brown" />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-charcoal font-semibold">Message</Label>
                      <Textarea id="message" name="message" rows={6} required className="mt-2 border-2 focus:border-warm-brown" />
                      <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-warm-brown to-golden-brown text-white hover:from-golden-brown hover:to-warm-brown transform hover:scale-105 transition-all duration-200 py-6 text-lg font-semibold"
                      disabled={state.submitting}
                    >
                      {state.submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Information Cards */}
            <div className="space-y-6">
              {/* Business Hours */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-blue-800 text-lg">
                    <Clock className="w-5 h-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-semibold text-blue-800">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-semibold text-blue-800">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold text-blue-800">Closed</span>
                    </div>
                  </div>
                  <Badge className="mt-3 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    <Zap className="w-3 h-3 mr-1" />
                    Response within 24h
                  </Badge>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-green-800 text-lg">
                    <MapPin className="w-5 h-5" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">
                    Visit our gallery and experience art in person
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-800">Nuvico Art Gallery</p>
                    <p className="text-gray-600">123 Art District Street</p>
                    <p className="text-gray-600">Tirana, Albania 1001</p>
                  </div>
                  <Badge className="mt-3 bg-green-100 text-green-800 hover:bg-green-200">
                    <Building2 className="w-3 h-3 mr-1" />
                    Open for visits
                  </Badge>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-purple-800 text-lg">
                    <Phone className="w-5 h-5" />
                    Contact Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">+355 69 123 4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">info@nuvico-gallery.com</span>
                    </div>
                  </div>
                  <Badge className="mt-3 bg-purple-100 text-purple-800 hover:bg-purple-200">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Multiple channels
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Artist Support */}
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-amber-50 to-yellow-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-amber-800 mb-2">Artist Support</h3>
              <p className="text-sm text-gray-600">Get help with artwork submission, pricing, and promotion</p>
            </Card>

            {/* Community */}
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-pink-50 to-rose-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-pink-800 mb-2">Art Community</h3>
              <p className="text-sm text-gray-600">Connect with fellow artists and art enthusiasts</p>
            </Card>

            {/* Security */}
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-teal-800 mb-2">Secure Platform</h3>
              <p className="text-sm text-gray-600">Your data and transactions are protected</p>
            </Card>

            {/* Global Reach */}
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-orange-800 mb-2">Global Reach</h3>
              <p className="text-sm text-gray-600">Connect with art lovers worldwide</p>
            </Card>
          </div>

          {/* Why Choose Us Section */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-charcoal to-gray-800 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Why Choose Nuvico Gallery?</CardTitle>
              <p className="text-gray-300 text-lg">We're committed to making art accessible to everyone</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-warm-brown to-golden-brown rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality Artwork</h3>
                  <p className="text-gray-300">Curated selection of high-quality, authentic artworks</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-warm-brown to-golden-brown rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Artist-First</h3>
                  <p className="text-gray-300">Supporting artists with fair pricing and promotion</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-warm-brown to-golden-brown rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trusted Platform</h3>
                  <p className="text-gray-300">Secure transactions and verified sellers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
