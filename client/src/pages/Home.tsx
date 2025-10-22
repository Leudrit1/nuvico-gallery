import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { t, useLanguageChange } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import ArtworkCard from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Shield, Truck, Boxes, Palette, Image, Calendar } from "lucide-react";

export default function Home() {
  useLanguageChange(); // Subscribe to language changes

  const { data: artworks = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/artworks"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero - Art Gallery primary */}
      <section className="relative overflow-hidden pt-52 pb-48 min-h-[900px] bg-gradient-to-br from-warm-beige to-soft-gray">
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-60"
            style={{ backgroundImage: "url('/attached_assets/images/luke-heibert-gthSas4oYC0-unsplash.jpg'), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=80')" }}
          ></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('hero_title')}
                <span className="text-warm-brown"> NUVICO</span>
                <br />{t('hero_sub')}
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                {t('hero_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button className="warm-brown text-white hover:golden-brown px-8 py-3">
                    {t('explore_shop')}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-white text-black hover:bg-white hover:text-charcoal px-8 py-3">
                    {t('about_us')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img
                src="/attached_assets/images/rachel-crosby-pUANppRzCI4-unsplash.jpg"
                alt="Gallery interior preview"
                className="rounded-2xl shadow-2xl w-full h-[320px] sm:h-[420px] object-cover border border-soft-gray"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1582582429416-87f911af8ac9?auto=format&fit=crop&w=1200&q=80'; }}
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-golden-brown/20 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-brown/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services promo - Art Gallery Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">{t('home_art_gallery_services')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Curation, framing, delivery and private viewings to enhance your art experience.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('curation')}</h3>
                <p className="text-gray-600 text-sm">{t('curation_desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Image className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('framing')}</h3>
                <p className="text-gray-600 text-sm">{t('framing_desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('delivery')}</h3>
                <p className="text-gray-600 text-sm">{t('delivery_desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('private_viewing')}</h3>
                <p className="text-gray-600 text-sm">{t('private_viewing_desc')}</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/about">
              <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                {t('home_learn_more')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Art Gallery - show up to 6 items from Shop */}
      <section className="py-20 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-4">{t('our_art_gallery')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A glimpse from our Shop. Discover unique pieces ready for a new home.</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.slice(0, 6).map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                {t('see_more')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">{t('why_choose_us')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('why_choose_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('fully_insured')}</h3>
                <p className="text-gray-600 text-sm">{t('fully_insured_desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Boxes className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('packing_experts')}</h3>
                <p className="text-gray-600 text-sm">{t('packing_experts_desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('on_time_delivery')}</h3>
                <p className="text-gray-600 text-sm">{t('on_time_delivery_desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">{t('contact_service_area')}</h2>
            <p className="text-lg text-gray-600">
              {t('get_quote_schedule')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('service_area')}</h3>
                <p className="text-gray-600 text-sm">
                  Berne • Thun • Interlaken • Zurich • Basel
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('phone')}</h3>
                <p className="text-gray-600 text-sm">
                  +41 76 527 82 93
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('email')}</h3>
                <p className="text-gray-600 text-sm">
                  info@nuvico.ch
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-warm-brown" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('availability')}</h3>
                <p className="text-gray-600 text-sm">
                  Mon-Sat: 8:00-18:00 • Emergencies by request
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
                <Button className="warm-brown text-white hover:golden-brown px-8 py-3 mr-4">
                  {t('request_quote')}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white px-8 py-3">
                  {t('browse_shop')}
                </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
