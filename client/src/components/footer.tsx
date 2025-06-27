/** @jsxImportSource react */
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Left Section - Brand */}
          <div className="lg:col-span-1">
                         <div className="flex items-center space-x-3 mb-4">
               <img 
                 src="/logos/logo90x90.png" 
                 alt="Sevak AI Logo" 
                 className="w-8 h-8 rounded-lg object-contain"
               />
              <div>
                <h3 className="font-bold text-lg">Sevak AI 🙌</h3>
                <p className="text-xs text-blue-200">powered by MetaNova AI</p>
              </div>
            </div>
            <p className="text-sm text-blue-100 mb-6 leading-relaxed">
              India's smartest way to hire trusted helpers. Empowering homes and workers with 
              AI-powered verification and multilingual support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Middle Section - Sevak Categories */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Sevak Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Maids & Housekeeping</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Cooks & Chefs</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Nannies & Childcare</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Drivers</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Elderly Care</a></li>
            </ul>
          </div>

          {/* Right Section - Support */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">AI Verification Process</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Background Checks</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Women Empowerment</a></li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Stay Connected</h4>
            <p className="text-sm text-blue-100 mb-4">
              Get updates on verified sevaks and AI-powered matching in your area.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your mobile number"
                className="bg-blue-800 border-blue-700 text-white placeholder-blue-300 flex-1"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-6">
          <div className="text-center">
            <p className="text-sm text-blue-200">
              © 2024 Sevak AI powered by MetaNova AI. Empowering women & skilled workers across India. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
