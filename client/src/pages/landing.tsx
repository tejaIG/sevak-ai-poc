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
    image: "/logos/logo90x90.png"
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
    image: "/logos/logo90x90.png"
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
    image: "/logos/logo90x90.png"
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
    const sections = ['home', 'how-it-works', 'pricing', 'testimonials', 'download-app', 'contact'];
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
      trackButtonClick('send_otp', 'download-app');
      
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
      trackButtonClick('verify_complete_signup', 'download-app');
      
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
            <p className="text-base text-slate-700 mb-8 max-w-4xl mx-auto">
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

          {/* Download App Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Download Our App</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#" 
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </a>
              <a 
                href="#" 
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-base font-medium">
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
                  <h3 className="text-lg font-semibold">AI-Matched Helpers</h3>
                </div>
                <p className="text-slate-600">Find the right fit by skills, language & availability</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mic className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold">Voice Onboarding</h3>
                </div>
                <p className="text-slate-600">Helpers reply in their native language (100+ supported)</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold">Background Verified</h3>
                </div>
                <p className="text-slate-600">ID checks, face scans, and experience verified</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold">Interview Options</h3>
                </div>
                <p className="text-slate-600">You or we can pre-screen shortlisted helpers</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold">No Commissions</h3>
                </div>
                <p className="text-slate-600">Pay helpers directly. They keep 100% of their earnings</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-orange-600 mr-3" />
                  <h3 className="text-lg font-semibold">30-Day Match Guarantee</h3>
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
                  <h3 className="text-lg font-semibold">Tell us what you need</h3>
                </div>
                <p className="text-slate-600">via voice or quick form</p>
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
                  <h3 className="text-lg font-semibold">Get matched by our AI</h3>
                </div>
                <p className="text-slate-600">Top 3 verified helpers based on your needs</p>
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
                  <h3 className="text-lg font-semibold">View profiles & hear voice answers</h3>
                </div>
                <p className="text-slate-600">Audio/video interviews + skill tags + availability</p>
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
                  <h3 className="text-lg font-semibold">Choose how to interview</h3>
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
                  <h3 className="text-lg font-semibold">Hire directly. Pay directly.</h3>
                </div>
                <p className="text-slate-600">You discuss salary with helper and pay them fully</p>
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
                <CardTitle className="text-lg text-orange-700">Basic Access</CardTitle>
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
                <CardTitle className="text-lg text-blue-700">Premium Screening</CardTitle>
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
            <p className="text-base text-slate-700 font-medium">
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

      {/* Download App */}
      <section id="download-app" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Download Our App
            </h2>
            <p className="text-base text-slate-600 mb-8">
              Get started today and connect with verified domestic helpers in your area
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a 
              href="#" 
              className="inline-flex items-center bg-black text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-sm">Download on the</div>
                <div className="text-base font-bold">App Store</div>
              </div>
            </a>
            <a 
              href="#" 
              className="inline-flex items-center bg-black text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-12 h-12 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-sm">Get it on</div>
                <div className="text-base font-bold">Google Play</div>
              </div>
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Coming Soon!</h3>
            <p className="text-base text-slate-600 mb-6">
              Our mobile app is currently in development. Sign up below to be notified when it's available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section id="app-download" className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-bold mb-6">Download SevakAI App</h3>
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
                <h3 className="text-lg font-semibold mb-2">💬 Chat on WhatsApp</h3>
                <p className="text-slate-600">Our AI Agent is available 24x7</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <Phone className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">📞 Call Us</h3>
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
                <h3 className="text-lg font-semibold mb-2">📍 Office</h3>
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
          onClick={() => scrollToSection('download-app')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl shadow-2xl"
        >
          Download App - Get Started
        </Button>
      </div>
    </div>
  );
} 