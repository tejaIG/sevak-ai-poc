import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/supabase";

const phoneRegex = /^[6-9]\d{9}$/;

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().regex(phoneRegex, "Please enter a valid 10-digit mobile number"),
  location: z.string().min(3, "Please enter your location"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  acceptedTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      location: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await signUp(data.email, data.password, {
        full_name: data.fullName,
        mobile: data.mobile,
        location: data.location,
      });
      
      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (authData.user) {
        toast({
          title: "Welcome to SevakAI! 🙌",
          description: "Account created successfully. Please check your email to verify your account.",
        });
        setLocation("/login");
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* SevakAI Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            SevakAI 🙌
          </h1>
          <p className="text-slate-600 mt-2">Join thousands of happy families</p>
          <p className="text-sm text-slate-500 mt-1">Empowering homes and workers with AI</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Create Account</h2>
            <p className="text-slate-600">Start your journey to find trusted helpers</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    {...form.register("fullName")}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                </div>
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-600">{form.formState.errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    {...form.register("email")}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 py-2 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50">
                    <span className="text-slate-600 text-sm">🇮🇳 +91</span>
                  </div>
                  <div className="relative flex-1">
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter mobile number"
                      className="rounded-l-none pl-10"
                      {...form.register("mobile")}
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  </div>
                </div>
                {form.formState.errors.mobile && (
                  <p className="text-sm text-red-600">{form.formState.errors.mobile.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, State"
                    className="pl-10"
                    {...form.register("location")}
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                </div>
                {form.formState.errors.location && (
                  <p className="text-sm text-red-600">{form.formState.errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    {...form.register("password")}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    {...form.register("confirmPassword")}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptedTerms"
                  checked={form.watch("acceptedTerms")}
                  onCheckedChange={(checked) => form.setValue("acceptedTerms", checked as boolean)}
                />
                <Label htmlFor="acceptedTerms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Privacy Policy</span>
                </Label>
              </div>
              {form.formState.errors.acceptedTerms && (
                <p className="text-sm text-red-600">{form.formState.errors.acceptedTerms.message}</p>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <button
                onClick={() => setLocation("/login")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          </CardFooter>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-6 text-xs text-slate-500">
            <div className="flex items-center">
              <span className="mr-1">🔒</span>
              Secure & Private
            </div>
            <div className="flex items-center">
              <span className="mr-1">✨</span>
              AI-Powered
            </div>
            <div className="flex items-center">
              <span className="mr-1">👩‍👧</span>
              Women Empowerment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 