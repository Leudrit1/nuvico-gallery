import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Users, Globe, Award, Heart, Shield, Zap } from "lucide-react";
import { t, useLanguageChange } from '@/lib/i18n';
import { useState, useEffect } from "react";

export default function About() {
  useLanguageChange(); // Subscribe to language changes
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <h1 className="text-5xl font-bold text-charcoal mb-6">{t('about_title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about_description')}
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
              <h2 className="text-4xl font-bold text-charcoal mb-6">{t('our_story')}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('our_story_desc1')}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('our_story_desc2')}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">15+</div>
                  <div className="text-gray-600">{t('years_experience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">200+</div>
                  <div className="text-gray-600">{t('curated_works')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">25+</div>
                  <div className="text-gray-600">{t('exhibitions')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warm-brown mb-2">5000+</div>
                  <div className="text-gray-600">{t('visitors')}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charcoal mb-4">{t('our_values')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('our_values_desc')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{t('passion_for_art')}</h3>
                  <p className="text-gray-600">
                    {t('passion_for_art_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{t('authenticity')}</h3>
                  <p className="text-gray-600">
                    {t('authenticity_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{t('community')}</h3>
                  <p className="text-gray-600">
                    {t('community_desc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mission Section */}
          <section className="bg-warm-beige rounded-2xl p-12 mb-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-charcoal mb-6">{t('our_mission')}</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                {t('our_mission_desc')}
              </p>
              <Badge className="bg-warm-brown text-white px-6 py-2 text-sm">
                {t('connecting_art_hearts')}
              </Badge>
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charcoal mb-4">{t('why_choose_us')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('why_choose_us_desc')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('curated_collection')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('curated_collection_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('global_reach')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('global_reach_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('easy_platform')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('easy_platform_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('quality_assured')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('quality_assured_desc')}
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
