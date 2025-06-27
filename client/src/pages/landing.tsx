/** @jsxImportSource react */
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Search, 
  Phone, 
  Brain, 
  Users, 
  CheckCircle, 
  Star,
  Home,
  ChefHat,
  Baby,
  Car,
  Heart,
  Shirt,
  BookOpen,
  Shield,
  UserCheck
} from "lucide-react";

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
    icon: Home,
    active: true,
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    title: "Cooks & Chefs",
    description: "Skilled cooking professionals",
    icon: ChefHat,
    active: true,
    iconColor: "text-green-600"
  },
  {
    id: 3,
    title: "Nannies & Babysitters",
    description: "Trusted childcare specialists",
    icon: Baby,
    active: true,
    iconColor: "text-purple-600"
  },
  {
    id: 4,
    title: "Drivers",
    description: "Licensed & experienced drivers",
    icon: Car,
    active: true,
    iconColor: "text-red-600"
  },
  {
    id: 5,
    title: "Elderly Care",
    description: "Compassionate senior care",
    icon: Heart,
    active: true,
    iconColor: "text-pink-600"
  },
  {
    id: 6,
    title: "Laundry & Ironing",
    description: "Garment care specialists",
    icon: Shirt,
    active: false,
    iconColor: "text-blue-600"
  },
  {
    id: 7,
    title: "Tutors",
    description: "Educational support & coaching",
    icon: BookOpen,
    active: false,
    iconColor: "text-orange-600"
  },
  {
    id: 8,
    title: "Security Guards",
    description: "Trained security personnel",
    icon: Shield,
    active: false,
    iconColor: "text-gray-600"
  },
  {
    id: 9,
    title: "Personal Assistants",
    description: "Administrative & personal support",
    icon: UserCheck,
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
    icon: Brain
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo + Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/logos/logo90x90.png" 
                alt="Sevak AI Logo" 
                className="w-12 h-12 rounded-lg mr-3 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Sevak AI 🙌</h1>
                <p className="text-sm text-slate-600">powered by MetaNova AI</p>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              India's smartest way to hire trusted helpers
            </h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Empowering homes and workers with AI onboarding + verification. Our multilingual AI 
              voice agent interviews helpers over phone/WhatsApp, scoring candidates on reliability, 
              behavior, skills & trustworthiness.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input 
                  placeholder="What type of sevak do you need?"
                  className="pl-10 border-0 focus:ring-0 text-base h-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input 
                  placeholder="Enter your city"
                  className="pl-10 border-0 focus:ring-0 text-base h-12"
                />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 px-8 h-12 text-base font-semibold rounded-lg shadow-md">
                Find Sevaks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Helpers Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Discover Verified Helpers in Your Area
            </h2>
            <p className="text-lg text-slate-600">
              AI-verified maids, cooks, nannies, drivers & more — all background checked & skill-tested
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className={`relative hover:shadow-lg transition-all duration-200 ${
                  !category.active ? 'opacity-60' : 'hover:-translate-y-1'
                }`}>
                  {!category.active && (
                    <Badge className="absolute top-3 right-3 bg-orange-500 text-white z-10">
                      Coming Soon
                    </Badge>
                  )}
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center">
                      <Icon className={`h-8 w-8 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Sevak AI Works */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Sevak AI Works
            </h2>
            <p className="text-lg text-slate-600">
              AI-powered verification meets human trust in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="h-10 w-10 text-blue-900" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Sevaks */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Sevaks in Your Area
            </h2>
            <p className="text-lg text-slate-600">
              Meet some of our top-rated AI-verified professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSevaks.map((sevak) => (
              <Card key={sevak.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    {sevak.image ? (
                      <img 
                        src={sevak.image} 
                        alt={sevak.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                      />
                    ) : sevak.avatar ? (
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {sevak.avatar}
                      </div>
                    ) : (
                      <img 
                        src="/images/placeholder-avatar.svg" 
                        alt={sevak.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                      />
                    )}
                    <h3 className="font-semibold text-slate-900 mb-1">{sevak.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{sevak.rating}</span>
                      <span className="text-slate-500 text-sm">({sevak.totalRatings})</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-slate-500 text-sm mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{sevak.location}</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-3">
                      ₹{sevak.hourlyRate}/hr
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {sevak.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-slate-500 text-xs">
                      {sevak.tasksCompleted} tasks completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 