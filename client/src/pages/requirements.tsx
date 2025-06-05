import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { requirementsSchema, type RequirementsFormData } from "@/lib/validations";
import { WORKING_DAYS, WORKING_HOURS, EXPERIENCE_LEVELS, LANGUAGES } from "@/lib/constants";
import { ProgressIndicator } from "@/components/progress-indicator";

export default function Requirements() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const userId = sessionStorage.getItem("userId");
  const basicRequirements = JSON.parse(sessionStorage.getItem("basicRequirements") || "{}");

  const form = useForm<RequirementsFormData>({
    resolver: zodResolver(requirementsSchema),
    defaultValues: {
      workingDays: [],
      workingHours: "",
      specificSkills: [],
      experienceRequired: "",
      languagePreferences: [],
      accommodationRequired: false,
      foodPreferences: "",
      backgroundCheckRequired: true,
    },
  });

  const createRequirementsMutation = useMutation({
    mutationFn: async (data: RequirementsFormData) => {
      const response = await apiRequest("POST", "/api/requirements", {
        userId: parseInt(userId!),
        ...basicRequirements,
        ...data,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Requirements Saved",
        description: "Moving to preferences step...",
      });
      setLocation("/preferences");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Save Requirements",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RequirementsFormData) => {
    createRequirementsMutation.mutate(data);
  };

  const saveProgress = () => {
    const formData = form.getValues();
    sessionStorage.setItem("requirementsProgress", JSON.stringify(formData));
    toast({
      title: "Progress Saved",
      description: "Your requirements have been saved successfully",
    });
  };

  if (!userId) {
    setLocation("/");
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressIndicator 
        currentStep={2} 
        totalSteps={4} 
        steps={['Registration', 'Requirements', 'Preferences', 'Review']} 
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Service Requirements</h2>
          <p className="text-slate-600">Tell us more about your specific needs and preferences.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Working Days */}
            <FormField
              control={form.control}
              name="workingDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Which days do you need help? *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {WORKING_DAYS.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(day.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, day.id]);
                              } else {
                                field.onChange(field.value?.filter((value) => value !== day.id));
                              }
                            }}
                          />
                        </FormControl>
                        <Label className="text-sm font-medium">{day.label}</Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Working Hours */}
            <FormField
              control={form.control}
              name="workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred working hours *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      {WORKING_HOURS.map((hour) => (
                        <div key={hour.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={hour.id} />
                          <Label className="text-sm">{hour.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience Required */}
            <FormField
              control={form.control}
              name="experienceRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience requirement *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Language Preferences */}
            <FormField
              control={form.control}
              name="languagePreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language preferences *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {LANGUAGES.map((language) => (
                      <div key={language.id} className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(language.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, language.id]);
                              } else {
                                field.onChange(field.value?.filter((value) => value !== language.id));
                              }
                            }}
                          />
                        </FormControl>
                        <Label className="text-sm font-medium">{language.label}</Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Food Preferences */}
            <FormField
              control={form.control}
              name="foodPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food preferences *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="veg" />
                        <Label>Vegetarian only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nonveg" />
                        <Label>Non-vegetarian only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" />
                        <Label>Both vegetarian and non-vegetarian</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Accommodation and Background Check */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="accommodationRequired"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Accommodation Required</FormLabel>
                      <div className="text-sm text-slate-600">
                        Helper needs to stay at your place
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backgroundCheckRequired"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Background Check</FormLabel>
                      <div className="text-sm text-slate-600">
                        Require verified background check
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setLocation("/")}
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
                disabled={createRequirementsMutation.isPending}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-purple-700"
              >
                {createRequirementsMutation.isPending ? "Saving..." : "Continue to Preferences"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
