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
import { Mail, Phone, MapPin, Clock } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-charcoal mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our platform, need help with your account, or want to learn more about selling your art? We're here to help.
            </p>
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

            {/* Contact Information */}
            <div className="space-y-8">
              {/* ... pjesa tjetër e contact info mbetet njësoj */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
