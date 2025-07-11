/** @jsxImportSource react */
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const openWhatsApp = () => {
    const message = "Hi! I'm interested in SevakAI's services. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logos/logo90x90.png" 
                alt="SevakAI Logo" 
                className="w-8 h-8 rounded-lg object-contain"
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
              <div>
                <h3 className="font-bold text-lg">SevakAI</h3>
                <p className="text-xs text-slate-300">AI-Powered Help Hiring</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Hire trusted maids, cooks, drivers & nannies without the guesswork. 
              Verified, voice-onboarded helpers using AI, not WhatsApp groups.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('download-app')}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Download App
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-300">🏠 Maids & Housekeepers</span></li>
              <li><span className="text-slate-300">👨‍🍳 Cooks & Chefs</span></li>
              <li><span className="text-slate-300">👶 Nannies & Babysitters</span></li>
              <li><span className="text-slate-300">🚗 Drivers</span></li>
              <li><span className="text-slate-300">❤️ Elderly Care</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">Hyderabad, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">hello@sevakai.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={openWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white w-full rounded-lg"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400 mb-4 md:mb-0">
              © 2024 SevakAI. Built for fairness. Powered by AI. Trusted by families.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a>
            </div>
          </div>
          
          {/* Location Badge */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center bg-green-900 text-green-300 px-4 py-2 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              🟢 Now in Hyderabad | Expanding to Bengaluru, Chennai, and Dubai
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
