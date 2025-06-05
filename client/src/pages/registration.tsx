import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { MapPin, Save, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { registrationSchema, type RegistrationFormData } from "@/lib/validations";
import { HELPER_TYPES, TIMING_OPTIONS, BUDGET_RANGES } from "@/lib/constants";
import { ProgressIndicator } from "@/components/progress-indicator";
import { TrustIndicators } from "@/components/trust-indicators";

export default function Registration() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      location: "",
      helperTypes: [],
      timing: "",
      budget: "",
      acceptedTerms: false,
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      const response = await apiRequest("POST", "/api/users", {
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        location: data.location,
        acceptedTerms: data.acceptedTerms,
      });
      return response.json();
    },
    onSuccess: (user) => {
      // Store user ID and basic requirements data for next steps
      const formData = form.getValues();
      sessionStorage.setItem("userId", user.id.toString());
      sessionStorage.setItem("basicRequirements", JSON.stringify({
        helperTypes: formData.helperTypes,
        timing: formData.timing,
        budget: formData.budget,
      }));
      
      toast({
        title: "Registration Successful",
        description: "Moving to requirements step...",
      });
      
      setLocation("/requirements");
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    createUserMutation.mutate(data);
  };

  const saveProgress = () => {
    const formData = form.getValues();
    sessionStorage.setItem("registrationProgress", JSON.stringify(formData));
    toast({
      title: "Progress Saved",
      description: "Your information has been saved successfully",
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressIndicator 
        currentStep={1} 
        totalSteps={4} 
        steps={['Registration', 'Requirements', 'Preferences', 'Review']} 
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Let's get started</h2>
          <p className="text-slate-600">We need a few details to help you find the perfect domestic helper for your needs.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="px-4 py-3"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com" 
                        className="px-4 py-3"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Mobile Number */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number *</FormLabel>
                  <div className="flex">
                    <div className="flex items-center px-3 py-3 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50">
                      <span className="text-slate-600">🇮🇳 +91</span>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="Enter your mobile number" 
                        className="flex-1 rounded-l-none px-4 py-3"
                        {...field} 
                      />
                    </FormControl>
                  </div>
                  <p className="text-xs text-slate-500">We'll send you updates and helper recommendations via SMS</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="Enter your address or pincode" 
                        className="pl-10 px-4 py-3"
                        {...field} 
                      />
                    </FormControl>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Helper Types */}
            <FormField
              control={form.control}
              name="helperTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What type of help do you need? *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {HELPER_TYPES.map((type) => (
                      <div key={type.id} className="relative">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(type.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, type.id]);
                              } else {
                                field.onChange(field.value?.filter((value) => value !== type.id));
                              }
                            }}
                            className="sr-only peer"
                          />
                        </FormControl>
                        <Label 
                          htmlFor={type.id}
                          className="flex flex-col items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50 transition-all"
                        >
                          <i className={`${type.icon} text-2xl text-slate-400 mb-2`}></i>
                          <span className="text-sm font-medium text-slate-700">{type.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Timing */}
            <FormField
              control={form.control}
              name="timing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When do you need help? *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-3"
                    >
                      {TIMING_OPTIONS.map((option) => (
                        <div key={option.id} className="relative">
                          <RadioGroupItem value={option.id} className="sr-only peer" />
                          <Label 
                            htmlFor={option.id}
                            className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50 transition-all"
                          >
                            <div className="flex items-center">
                              <i className={`${option.icon} text-primary mr-3`}></i>
                              <div>
                                <div className="font-medium text-slate-900">{option.label}</div>
                                <div className="text-xs text-slate-500">{option.description}</div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget Range */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range (Monthly) *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 md:grid-cols-4 gap-3"
                    >
                      {BUDGET_RANGES.map((range) => (
                        <div key={range.id} className="relative">
                          <RadioGroupItem value={range.id} className="sr-only peer" />
                          <Label 
                            htmlFor={range.id}
                            className="block p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50 text-center transition-all"
                          >
                            <div className="font-semibold text-slate-900">{range.label}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Terms and Conditions */}
            <FormField
              control={form.control}
              name="acceptedTerms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-slate-600">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I consent to receiving SMS notifications about helper matches and service updates.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={saveProgress}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                Save & Continue Later
              </Button>
              
              <Button 
                type="submit" 
                disabled={createUserMutation.isPending}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-purple-700"
              >
                {createUserMutation.isPending ? "Creating Account..." : "Continue to Preferences"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <TrustIndicators />
    </main>
  );
}
