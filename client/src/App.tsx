import React, { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "./lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session?.user ? "User found" : "No user");
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            SevakAI 🙌
          </h1>
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
        
        {/* Protected routes - redirect to login if not authenticated */}
        <Route path="/">
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
