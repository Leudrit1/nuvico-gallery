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
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Building2, Users } from "lucide-react";
import { t, useLanguageChange } from "@/lib/i18n";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  useLanguageChange(); // Subscribe to language changes

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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-charcoal mb-4">{t('contact_header')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('contact_us')}</p>
          </div>

          {/* Business Information Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Visit Our Gallery</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Experience art in person at our beautiful gallery space
                </p>
                <div className="text-sm text-warm-brown font-medium">
                  <p>Blümlisalpstrasse 24</p>
                  <p>3627 Heimberg, Switzerland</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Gallery Hours</h3>
                <p className="text-gray-600 text-sm mb-3">
                  We're open to welcome art enthusiasts and collectors
                </p>
                <div className="text-sm text-warm-brown font-medium">
                  <p>Mon-Fri: 10:00 AM - 7:00 PM</p>
                  
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Get In Touch</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Multiple ways to reach our team for support
                </p>
                <div className="text-sm text-warm-brown font-medium">
                  <p>+41 76 527 82 93</p>
                  <p>+41 79 782 50 77</p>
                  <p>info@nuvico.ch</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" name="email" required />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type">Inquiry Type</Label>
                    <Select name="type">
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="artist">Artist Support</SelectItem>
                        <SelectItem value="buyer">Buyer Support</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="moving-quote">Moving Quote</SelectItem>
                        <SelectItem value="moving-installation">Moving & Installation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={6} required />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full warm-brown text-white hover:golden-brown"
                    disabled={state.submitting}
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-warm-brown" />
                    About NUVICO - Art gallery & Moving services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    NUVICO - Art gallery & Moving services. We connect art lovers with exceptional pieces and offer professional moving, delivery and installation services.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-warm-brown" />
                      <span className="text-sm text-gray-600">Expert art consultants available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-warm-brown" />
                      <span className="text-sm text-gray-600">24/7 online support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-warm-brown" />
                      <span className="text-sm text-gray-600">Free parking available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warm-brown" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">
                    We value your time and strive to respond quickly to all inquiries.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">General inquiries:</span>
                      <span className="font-medium text-warm-brown">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technical support:</span>
                      <span className="font-medium text-warm-brown">Within 4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Urgent matters:</span>
                      <span className="font-medium text-warm-brown">Same day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
