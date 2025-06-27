/** @jsxImportSource react */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle, 
  Star,
  Phone,
  Mic,
  Shield,
  Users,
  Heart,
  MessageCircle,
  MapPin,
  Clock,
  Award,
  Zap,
  DollarSign,
  Download,
  ChevronRight,
  Globe,
  UserCheck,
  Headphones
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  trackFormSubmission, 
  trackButtonClick, 
  trackWhatsAppClick, 
  initScrollTracking,
  trackSectionView
} from "@/lib/analytics";

// Mock data for Featured Sevaks
const featuredSevaks = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 4.9,
    totalRatings: 127,
    location: "Bandra, Mumbai",
    hourlyRate: 350,
    skills: ["House Cleaning", "Organization"],
    tasksCompleted: 340,
    avatar: "PS",
    image: null
  },
  {
    id: 2,
    name: "Ravi Kumar",
    rating: 4.8,
    totalRatings: 203,
    location: "Koramangala, Bangalore",
    hourlyRate: 450,
    skills: ["Cooking", "North Indian"],
    tasksCompleted: 520,
    avatar: null,
    image: "/api/placeholder/64/64"
  },
  {
    id: 3,
    name: "Sunita Devi",
    rating: 5.0,
    totalRatings: 89,
    location: "Sector 14, Gurgaon",
    hourlyRate: 300,
    skills: ["Childcare", "Baby Sitting"],
    tasksCompleted: 280,
    avatar: null,
    image: "/api/placeholder/64/64"
  },
  {
    id: 4,
    name: "Mahesh Patil",
    rating: 4.7,
    totalRatings: 156,
    location: "Andheri, Mumbai",
    hourlyRate: 400,
    skills: ["Driving", "Car Care"],
    tasksCompleted: 410,
    avatar: null,
    image: "/api/placeholder/64/64"
  }
];

// Category data
const categories = [
  {
    id: 1,
    title: "Maids & Housekeeping",
    description: "Verified cleaning & household help",
    icon: MapPin,
    active: true,
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    title: "Cooks & Chefs",
    description: "Skilled cooking professionals",
    icon: MapPin,
    active: true,
    iconColor: "text-green-600"
  },
  {
    id: 3,
    title: "Nannies & Babysitters",
    description: "Trusted childcare specialists",
    icon: MapPin,
    active: true,
    iconColor: "text-purple-600"
  },
  {
    id: 4,
    title: "Drivers",
    description: "Licensed & experienced drivers",
    icon: MapPin,
    active: true,
    iconColor: "text-red-600"
  },
  {
    id: 5,
    title: "Elderly Care",
    description: "Compassionate senior care",
    icon: MapPin,
    active: true,
    iconColor: "text-pink-600"
  },
  {
    id: 6,
    title: "Laundry & Ironing",
    description: "Garment care specialists",
    icon: MapPin,
    active: false,
    iconColor: "text-blue-600"
  },
  {
    id: 7,
    title: "Tutors",
    description: "Educational support & coaching",
    icon: MapPin,
    active: false,
    iconColor: "text-orange-600"
  },
  {
    id: 8,
    title: "Security Guards",
    description: "Trained security personnel",
    icon: MapPin,
    active: false,
    iconColor: "text-gray-600"
  },
  {
    id: 9,
    title: "Personal Assistants",
    description: "Administrative & personal support",
    icon: MapPin,
    active: false,
    iconColor: "text-teal-600"
  }
];

const workflowSteps = [
  {
    step: 1,
    title: "AI Voice Interview",
    description: "Our multilingual AI agent calls helpers via phone/WhatsApp for comprehensive screening",
    icon: Phone
  },
  {
    step: 2,
    title: "ML Scoring & Verification",
    description: "Advanced algorithms score candidates on reliability, behavior, skills & trustworthiness",
    icon: Mic
  },
  {
    step: 3,
    title: "Smart Matching",
    description: "AI learns your family preferences for faster, safer matches with verified helpers",
    icon: Users
  },
  {
    step: 4,
    title: "Trusted Employment",
    description: "Connect with background-verified helpers who match your specific needs and location",
    icon: CheckCircle
  }
];

export default function Landing() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    address: '',
    helpType: '',
    language: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOtp] = useState('');

  // Initialize analytics tracking
  useEffect(() => {
    const cleanup = initScrollTracking();
    
    // Track section views using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              trackSectionView(sectionId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all main sections
    const sections = ['home', 'how-it-works', 'pricing', 'testimonials', 'join-beta', 'contact'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      cleanup?.();
      observer.disconnect();
    };
  }, []);

  const helpTypes = [
    'Maid/Housekeeper',
    'Cook/Chef', 
    'Nanny/Babysitter',
    'Driver',
    'Elderly Care',
    'Personal Assistant'
  ];

  const languages = [
    'English',
    'Hindi', 
    'Telugu',
    'Tamil',
    'Kannada',
    'Malayalam',
    'Bengali',
    'Marathi',
    'Gujarati'
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showOTPField) {
      // Track form step 1 - phone submission
      trackFormSubmission('beta_signup_step1');
      trackButtonClick('send_otp', 'join-beta');
      
      // First step: send OTP
      setIsSubmitting(true);
      // Simulate OTP sending
      setTimeout(() => {
        setShowOTPField(true);
        setIsSubmitting(false);
        toast({
          title: "OTP Sent! 📱",
          description: `Verification code sent to ${formData.phone}`,
        });
      }, 1000);
    } else {
      // Track form completion
      trackFormSubmission('beta_signup_complete', 100);
      trackButtonClick('verify_complete_signup', 'join-beta');
      
      // Second step: verify OTP and submit
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Welcome to SevakAI! 🎉",
          description: "Please download our app to complete your hiring journey.",
        });
        // Show app download section
        const downloadSection = document.getElementById('app-download');
        if (downloadSection) {
          downloadSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    trackButtonClick(`scroll_to_${sectionId}`, 'navigation');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    trackWhatsAppClick();
    const message = "Hi! I'm interested in SevakAI's services. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAppDownload = (platform: string) => {
    trackButtonClick(`download_${platform}`, 'app-download');
    // In a real app, these would be actual download links
    toast({
      title: `${platform} Download`,
      description: "App download will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Home */}
      <section id="home" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Hire Trusted Maids, Cooks, Drivers & Nannies. 
              <span className="text-orange-600"> Without the Guesswork.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-4xl mx-auto">
              Say goodbye to random referrals. SevakAI connects you with verified, voice-onboarded helpers — using AI, not WhatsApp groups.
            </p>
          </div>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-white text-slate-700 px-4 py-2 text-sm">
              ✅ Full-time | Part-time | One-time
            </Badge>
            <Badge variant="secondary" className="bg-white text-slate-700 px-4 py-2 text-sm">
              ✅ Verified profiles | No commissions
            </Badge>
            <Badge variant="secondary" className="bg-white text-slate-700 px-4 py-2 text-sm">
              ✅ Multilingual AI
            </Badge>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => scrollToSection('join-beta')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg mb-8"
          >
            Join the Beta
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Location Badge */}
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-medium">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            🟢 Now in Hyderabad. Expanding to Bengaluru, Chennai, and Dubai.
          </div>
        </div>
      </section>

      {/* Why SevakAI Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Smarter, Safer Hiring – Powered by AI
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">AI-Matched Helpers</h3>
                </div>
                <p className="text-slate-600">Find the right fit by skills, language & availability</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mic className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Voice Onboarding</h3>
                </div>
                <p className="text-slate-600">Helpers reply in their native language (100+ supported)</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold">Background Verified</h3>
                </div>
                <p className="text-slate-600">ID checks, face scans, and experience verified</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Interview Options</h3>
                </div>
                <p className="text-slate-600">You or we can pre-screen shortlisted helpers</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">No Commissions</h3>
                </div>
                <p className="text-slate-600">Pay helpers directly. They keep 100% of their earnings</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold">30-Day Match Guarantee</h3>
                </div>
                <p className="text-slate-600">No match? Full refund.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Hiring Help Should Be Simple. Here's How It Works:
            </h2>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
                  <h3 className="text-2xl font-semibold">Tell us what you need</h3>
                </div>
                <p className="text-slate-600 text-lg">via voice or quick form</p>
                <div className="bg-orange-50 p-4 rounded-lg mt-4">
                  <p className="text-orange-800 italic">"Need a Hindi-speaking cook for 6–9 PM near Gachibowli"</p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Headphones className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
                  <h3 className="text-2xl font-semibold">Get matched by our AI</h3>
                </div>
                <p className="text-slate-600 text-lg">Top 3 verified helpers based on your needs</p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Zap className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
                  <h3 className="text-2xl font-semibold">View profiles & hear voice answers</h3>
                </div>
                <p className="text-slate-600 text-lg">Audio/video interviews + skill tags + availability</p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Users className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">4</div>
                  <h3 className="text-2xl font-semibold">Choose how to interview</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600">→ Option 1: Schedule a video call</p>
                  <p className="text-slate-600">→ Option 2: Let us pre-screen and send a summary report</p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Phone className="h-16 w-16 text-green-500 mx-auto mb-4" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">5</div>
                  <h3 className="text-2xl font-semibold">Hire directly. Pay directly.</h3>
                </div>
                <p className="text-slate-600 text-lg">You discuss salary with helper and pay them fully</p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            One-Time Fee. No Hidden Charges.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="border-2 border-orange-200 shadow-xl">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-2xl text-orange-700">Basic Access</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>💳 Flat one-time fee to access SevakAI's verified helper pool</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>💸 You pay the helper directly — no salary cuts or commissions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>✅ 30-Day Money-Back Guarantee if no suitable match is found</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-xl">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl text-blue-700">Premium Screening</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>💬 Add-on Screening (Optional)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>🎥 We conduct detailed screening and share audio/video clips + summary</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>📊 Comprehensive helper evaluation report</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <p className="text-xl text-slate-700 font-medium">
              Built for fairness. Powered by AI. Trusted by families.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              What Families and Helpers Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">
                  "Found a reliable, trained nanny in under a day — with voice answers and full trust."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    R
                  </div>
                  <div>
                    <p className="font-semibold">Ramesh</p>
                    <p className="text-sm text-slate-500">Hyderabad</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">
                  "I gave my requirement in Telugu and got matched easily. No app confusion."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    R
                  </div>
                  <div>
                    <p className="font-semibold">Rajalakshmi</p>
                    <p className="text-sm text-slate-500">Elderly Care user</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">
                  "SevakAI helped me get 3 homes to work in. I'm treated well and paid fully."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    S
                  </div>
                  <div>
                    <p className="font-semibold">Sita</p>
                    <p className="text-sm text-slate-500">Helper</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Beta */}
      <section id="join-beta" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              We're in Beta – Get Early Access Now
            </h2>
          </div>

          <Card className="border-none shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-lg font-medium">📱 Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="name" className="text-lg font-medium">👤 Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-lg font-medium">🏠 Address (area & city) *</Label>
                  <Textarea
                    id="address"
                    placeholder="e.g., Gachibowli, Hyderabad"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="helpType" className="text-lg font-medium">🔽 Type of Help Needed *</Label>
                    <Select value={formData.helpType} onValueChange={(value) => setFormData({...formData, helpType: value})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type of help" />
                      </SelectTrigger>
                      <SelectContent>
                        {helpTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language" className="text-lg font-medium">🌐 Preferred Language (optional)</Label>
                    <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select preferred language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {showOTPField && (
                  <div>
                    <Label htmlFor="otp" className="text-lg font-medium">🔐 Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="mt-2"
                    />
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : showOTPField ? "Verify & Create Profile" : "Submit & Create Profile"}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">
                  ✅ After signup, you'll receive a link to download the SevakAI app on iOS or Play Store to complete your hiring journey.
                </p>
                <p className="text-sm text-slate-500">
                  Built for mobile. Backed by real people. Powered by our AI.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* App Download Section */}
      <section id="app-download" className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">Download SevakAI App</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleAppDownload('iOS')}
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl flex items-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download for iOS
            </Button>
            <Button 
              onClick={() => handleAppDownload('Android')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download for Android
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
            Need Help or Have Questions?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={openWhatsApp}>
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">💬 Chat on WhatsApp</h3>
                <p className="text-slate-600">Our AI Agent is available 24x7</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <Phone className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">📞 Call Us</h3>
                <button 
                  onClick={() => {
                    trackButtonClick('call_phone', 'contact');
                    window.location.href = 'tel:+919876543210';
                  }}
                  className="text-blue-600 font-medium mt-2 hover:underline"
                >
                  +91 98765 43210
                </button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <MapPin className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">📍 Office</h3>
                <p className="text-slate-600">Hyderabad, India</p>
                <p className="text-slate-500 text-sm mt-2">(Dubai & Chennai Coming Soon)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sticky CTA on Mobile */}
      <div className="fixed bottom-20 left-4 right-4 md:hidden z-40">
        <Button 
          onClick={() => scrollToSection('join-beta')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl shadow-2xl"
        >
          Join Beta - Get Started
        </Button>
      </div>
    </div>
  );
} 