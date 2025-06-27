/** @jsxImportSource react */
import React, { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "./lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Landing from "@/pages/landing";
import Registration from "@/pages/registration";
import Requirements from "@/pages/requirements";
import Preferences from "@/pages/preferences";
import Review from "@/pages/review";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import ComingSoon from "@/pages/coming-soon";
import NotFound from "@/pages/not-found";

function Router() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Router useEffect: Setting up authentication...");
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      console.log("Initial session:", session?.user ? "User found" : "No user");
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      console.log("Auth state change:", session?.user ? "User logged in" : "User logged out");
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log("Router render: loading =", loading, "user =", user ? "authenticated" : "not authenticated");

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/logos/logo90x90.png" 
              alt="Sevak AI Logo" 
              className="w-12 h-12 rounded-lg mr-3 object-contain"
            />
            <h1 className="text-4xl font-bold text-slate-900">
              SevakAI 🙌
            </h1>
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Switch>
        {/* Public routes */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/coming-soon" component={ComingSoon} />
        
        {/* Home route - Landing page for non-authenticated, Registration for authenticated */}
        <Route path="/">
          {user ? <Registration /> : <Landing />}
        </Route>
        
        {/* Protected routes - redirect to login if not authenticated */}
        <Route path="/registration">
          {user ? <Registration /> : <Login />}
        </Route>
        <Route path="/requirements">
          {user ? <Requirements /> : <Login />}
        </Route>
        <Route path="/preferences">
          {user ? <Preferences /> : <Login />}
        </Route>
        <Route path="/review">
          {user ? <Review /> : <Login />}
        </Route>
        
        {/* Catch all */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  console.log("App component rendered");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
