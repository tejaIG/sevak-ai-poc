/** @jsxImportSource react */
import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { LogOut, User, Menu, X, MapPin } from "lucide-react";
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

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Location */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center space-x-3"
            >
              <img 
                src="/logos/logo90x90.png" 
                alt="Sevak AI Logo" 
                className="w-8 h-8 rounded-lg object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-slate-900">Sevak AI</h1>
                <p className="text-xs text-slate-500">powered by MetaNova AI</p>
              </div>
            </button>
            
            {/* Location Indicator */}
            <div className="hidden md:flex items-center space-x-1 text-slate-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Mumbai, India</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/coming-soon")}
              className="text-slate-700 hover:text-slate-900 font-medium"
            >
              Find Sevaks
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation("/coming-soon")}
              className="text-slate-700 hover:text-slate-900 font-medium"
            >
              Become a Sevak
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation("/coming-soon")}
              className="text-slate-700 hover:text-slate-900 font-medium"
            >
              For Families
            </Button>
            
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/login")}
                  className="text-slate-700 hover:text-slate-900 font-medium flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Log in</span>
                </Button>
                <Button
                  onClick={() => setLocation("/signup")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md font-medium"
                >
                  Sign up
                </Button>
              </>
            )}
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
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="space-y-2">
              {/* Mobile Location */}
              <div className="flex items-center space-x-1 text-slate-600 px-3 py-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Mumbai, India</span>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => {
                  setLocation("/coming-soon");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left justify-start"
              >
                Find Sevaks
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setLocation("/coming-soon");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left justify-start"
              >
                Become a Sevak
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setLocation("/coming-soon");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left justify-start"
              >
                For Families
              </Button>
              
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-slate-600">
                    Signed in as: {user.email}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setLocation("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left justify-start flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Log in</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setLocation("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
