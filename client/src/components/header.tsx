import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { LogOut, User, Menu, X } from "lucide-react";
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
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center space-x-2"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                SevakAI 🙌
              </h1>
            </button>
            <div className="hidden md:block ml-4">
              <span className="text-sm text-slate-500">India's smartest way to hire trusted helpers</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/coming-soon")}
                  className="text-slate-600 hover:text-slate-900"
                >
                  AI Features
                </Button>
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
                  onClick={() => setLocation("/coming-soon")}
                  className="text-slate-600 hover:text-slate-900"
                >
                  AI Features
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/login")}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setLocation("/signup")}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Get Started
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
              <Button
                variant="ghost"
                onClick={() => {
                  setLocation("/coming-soon");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left justify-start"
              >
                AI Features
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
                    className="w-full text-left justify-start"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setLocation("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    Get Started
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
