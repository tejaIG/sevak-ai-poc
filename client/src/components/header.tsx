/** @jsxImportSource react */
import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { LogOut, User, Menu, X, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase, signOut, getCurrentUser } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser().then(setUser);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
      setLocation("/login");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in SevakAI's services. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-start">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-3"
            >
              <img 
                src="/logos/logo90x90.png" 
                alt="SevakAI Logo" 
                className="w-8 h-8 rounded-lg object-contain"
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
              <div className="text-left">
                <h1 className="text-xl font-bold text-slate-900">SevakAI</h1>
                <p className="text-xs text-slate-500">AI-Powered Help Hiring</p>
              </div>
            </button>
            
            {/* Location Badge */}
            <div className="hidden lg:flex items-center ml-6 space-x-1 text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
              <MapPin className="h-3 w-3" />
              <span className="font-medium">Now in Hyderabad</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors"
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors"
            >
              Contact Us
            </button>
            
            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection('app-download')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md font-medium"
            >
              Join Beta
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 bg-white">
            <div className="space-y-2">
              {/* Mobile Location */}
              <div className="flex items-center space-x-1 text-green-700 bg-green-50 px-3 py-2 rounded-lg mx-3 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Now in Hyderabad</span>
              </div>
              
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                FAQs
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Contact Us
              </button>
              
              <div className="px-3 pt-2">
                <Button
                  onClick={() => scrollToSection('download-app')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Download App
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
