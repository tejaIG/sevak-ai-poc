import { useLocation } from "wouter";
import { ArrowLeft, Phone, Brain, Shield, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ComingSoon() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              SevakAI 🙌
            </h1>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Revolutionary AI Features Coming Soon!
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're building India's smartest platform for hiring trusted helpers. 
              Get ready for an AI-powered experience that will transform how you find domestic help.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    📞 AI Voice Agent
                  </h3>
                  <p className="text-slate-600">
                    Our multilingual AI will interview helpers over phone/WhatsApp, 
                    ensuring thorough vetting in Hindi, English, and regional languages.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    📋 ML Scoring
                  </h3>
                  <p className="text-slate-600">
                    Advanced machine learning algorithms will score candidates on 
                    reliability, behavior, skills & trustworthiness for perfect matches.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    🔍 Smart Verification
                  </h3>
                  <p className="text-slate-600">
                    Discover verified maids, cooks, nannies, drivers & more in your area 
                    with AI-powered background checks and skill verification.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    🧠 Personalized Matching
                  </h3>
                  <p className="text-slate-600">
                    AI learns your family preferences and requirements for faster, 
                    safer matches that perfectly suit your household needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50 mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  👩‍👧 Our Mission
                </h3>
                <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                  Focused on empowering women & underemployed skilled workers across India. 
                  We're building technology that creates opportunities, ensures fair wages, 
                  and provides dignified employment for millions of domestic workers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Coming Soon Timeline</h3>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                <div>
                  <span className="font-semibold">Phase 1 - Currently Live:</span> Houseowner onboarding & requirement collection
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <span className="font-semibold">Phase 2 - Q1 2024:</span> AI Voice Agent for helper interviews
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-4"></div>
                <div>
                  <span className="font-semibold">Phase 3 - Q2 2024:</span> ML scoring and smart matching system
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                <div>
                  <span className="font-semibold">Phase 4 - Q3 2024:</span> Full platform launch with mobile app
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Be the First to Experience SevakAI
            </h3>
            <p className="text-slate-600 mb-6">
              Join our early access program and be among the first families to benefit from AI-powered helper matching.
            </p>
            <Button
              onClick={() => setLocation("/signup")}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg"
            >
              Get Early Access
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <div className="flex justify-center items-center space-x-8 text-slate-500">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-sm">Trusted by 1000+ families</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-sm">100% Verified helpers</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-1" />
                <span className="text-sm">500+ Active helpers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 