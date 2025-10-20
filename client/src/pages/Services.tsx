import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Truck, Sparkles, Package, Trash2, Shield, Boxes, Clock, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import { t, useLanguageChange } from "@/lib/i18n";

export default function Services() {
  useLanguageChange(); // Subscribe to language changes
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden pt-44 pb-40 min-h-[800px] bg-gradient-to-br from-warm-beige to-soft-gray">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/attached_assets/images/luke-heibert-gthSas4oYC0-unsplash.jpg')] bg-cover bg-center opacity-60"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-white mb-6">{t('services_title')}</h1>
              <p className="text-lg text-white/90 mb-8">{t('services_hero_p')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="warm-brown text-white hover:golden-brown px-8 py-3">{t('get_quote')}</Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="border-white text-black hover:bg-white hover:text-charcoal px-8 py-3">{t('browse_shop')}</Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img src="/attached_assets/images/pexels-karola-g-4498152.jpg" alt="Services preview" className="rounded-2xl shadow-2xl w-full h-[320px] sm:h-[420px] object-cover border border-soft-gray" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-golden-brown/20 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-brown/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline subtitle */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-charcoal">{t('services_tagline')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Truck className="h-6 w-6 text-warm-brown" /></div>
                <h3 className="font-semibold text-lg mb-2">Moving</h3>
                <p className="text-gray-600 text-sm">Local/long-distance, delicate items, offices, and apartments.</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Sparkles className="h-6 w-6 text-warm-brown" /></div>
                <h3 className="font-semibold text-lg mb-2">{t('cleaning')}</h3>
                <p className="text-gray-600 text-sm">Move-in/out deep cleaning for homes, offices, and storage.</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Package className="h-6 w-6 text-warm-brown" /></div>
                <h3 className="font-semibold text-lg mb-2">{t('storage')}</h3>
                <p className="text-gray-600 text-sm">Secure storage with flexible terms and itemized inventory.</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Trash2 className="h-6 w-6 text-warm-brown" /></div>
                <h3 className="font-semibold text-lg mb-2">{t('disposal')}</h3>
                <p className="text-gray-600 text-sm">Eco-friendly disposal and donation of unwanted items.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Text with image section */}
      <section className="py-16 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-charcoal mb-4">{t('special_handling_title')}</h2>
              <p className="text-gray-700 mb-4">{t('special_handling_p1')}</p>
              <p className="text-gray-700">{t('special_handling_p2')}</p>
              <div className="mt-6">
                <Link href="/contact">
                  <Button className="warm-brown text-white hover:golden-brown">{t('plan_move')}</Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img src="/attached_assets/images/pexels-ketut-subiyanto-4246109.jpg" alt="Careful packing and handling" className="rounded-2xl shadow-2xl w-full h-[320px] sm:h-[420px] object-cover border border-soft-gray" />
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift"><CardContent className="pt-6 text-center"><div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Shield className="h-6 w-6 text-warm-brown" /></div><h3 className="font-semibold text-lg mb-2">Insured & Reliable</h3><p className="text-gray-600 text-sm">Your belongings are protected with comprehensive coverage.</p></CardContent></Card>
            <Card className="hover-lift"><CardContent className="pt-6 text-center"><div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Clock className="h-6 w-6 text-warm-brown" /></div><h3 className="font-semibold text-lg mb-2">On-time Scheduling</h3><p className="text-gray-600 text-sm">Precise timings and efficient routing to meet deadlines.</p></CardContent></Card>
            <Card className="hover-lift"><CardContent className="pt-6 text-center"><div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Boxes className="h-6 w-6 text-warm-brown" /></div><h3 className="font-semibold text-lg mb-2">Packing Experts</h3><p className="text-gray-600 text-sm">Premium materials, labeled boxes, and careful handling.</p></CardContent></Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Ready to plan your move?</h2>
          <p className="text-lg text-gray-600 mb-6">Tell us about your inventory, dates, and destinations. We'll send a tailored quote.</p>
          <Link href="/contact"><Button className="warm-brown text-white hover:golden-brown px-8 py-3">Request a Quote</Button></Link>
        </div>
      </section>

      {/* Contact/Area */}
      <section className="py-16 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift"><CardContent className="pt-6 text-center"><div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><MapPin className="h-6 w-6 text-warm-brown" /></div><h3 className="font-semibold text-lg mb-2">Service Area</h3><p className="text-gray-600 text-sm">Berne • Thun • Interlaken • Zurich • Basel</p></CardContent></Card>
            <Card className="hover-lift"><CardContent className="pt-6 text-center"><div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Phone className="h-6 w-6 text-warm-brown" /></div><h3 className="font-semibold text-lg mb-2">Phone</h3><p className="text-gray-600 text-sm">+41 76 451 93 98</p></CardContent></Card>
            <Card className="hover-lift"><CardContent className="pt-6 text-center"><div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><Mail className="h-6 w-6 text-warm-brown" /></div><h3 className="font-semibold text-lg mb-2">Email</h3><p className="text-gray-600 text-sm">info@nuvico.ch</p></CardContent></Card>
            <Card className="hover-lift"><CardContent className="pt-6 text-center"><div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="h-6 w-6 text-warm-brown" /></div><h3 className="font-semibold text-lg mb-2">Availability</h3><p className="text-gray-600 text-sm">Mon-Sat: 8:00-18:00 • Emergencies by request</p></CardContent></Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


