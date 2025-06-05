import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { preferencesSchema, type PreferencesFormData } from "@/lib/validations";
import { PROXIMITY_OPTIONS, URGENCY_OPTIONS } from "@/lib/constants";
import { ProgressIndicator } from "@/components/progress-indicator";

export default function Preferences() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const userId = sessionStorage.getItem("userId");

  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      proximityPreference: "",
      urgency: "",
      additionalRequirements: "",
    },
  });

  const updateRequirementsMutation = useMutation({
    mutationFn: async (data: PreferencesFormData) => {
      const response = await apiRequest("PATCH", `/api/requirements/${userId}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Preferences Saved",
        description: "Moving to review step...",
      });
      setLocation("/review");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Save Preferences",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PreferencesFormData) => {
    updateRequirementsMutation.mutate(data);
  };

  const saveProgress = () => {
    const formData = form.getValues();
    sessionStorage.setItem("preferencesProgress", JSON.stringify(formData));
    toast({
      title: "Progress Saved",
      description: "Your preferences have been saved successfully",
    });
  };

  if (!userId) {
    setLocation("/");
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressIndicator 
        currentStep={3} 
        totalSteps={4} 
        steps={['Registration', 'Requirements', 'Preferences', 'Review']} 
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Additional Preferences</h2>
          <p className="text-slate-600">Final details to help us find the perfect match for you.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Proximity Preference */}
            <FormField
              control={form.control}
              name="proximityPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How far should the helper live from your location? *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      {PROXIMITY_OPTIONS.map((option) => (
                        <div key={option.id} className="relative">
                          <RadioGroupItem value={option.id} className="sr-only peer" />
                          <Label 
                            htmlFor={option.id}
                            className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50 transition-all"
                          >
                            <div className="font-medium text-slate-900">{option.label}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Urgency */}
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How urgently do you need a helper? *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      {URGENCY_OPTIONS.map((option) => (
                        <div key={option.id} className="relative">
                          <RadioGroupItem value={option.id} className="sr-only peer" />
                          <Label 
                            htmlFor={option.id}
                            className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50 transition-all"
                          >
                            <div className="font-medium text-slate-900">{option.label}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Requirements */}
            <FormField
              control={form.control}
              name="additionalRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional requirements or special instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific requirements, special instructions, or additional information you'd like to share..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <div className="text-sm text-slate-500">
                    This helps us find helpers who are the best fit for your unique needs.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Information Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <i className="fas fa-info text-blue-600 text-xs"></i>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">What happens next?</h4>
                  <p className="text-sm text-blue-700">
                    After you complete this form, our AI will analyze your requirements and match you with verified helpers in your area. You'll receive personalized recommendations within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setLocation("/requirements")}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={saveProgress}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Progress
              </Button>
              
              <Button 
                type="submit" 
                disabled={updateRequirementsMutation.isPending}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-purple-700"
              >
                {updateRequirementsMutation.isPending ? "Saving..." : "Review & Submit"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
