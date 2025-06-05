import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle, Edit, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ProgressIndicator } from "@/components/progress-indicator";
import { HELPER_TYPES, TIMING_OPTIONS, BUDGET_RANGES, WORKING_DAYS, WORKING_HOURS, EXPERIENCE_LEVELS, LANGUAGES, PROXIMITY_OPTIONS, URGENCY_OPTIONS } from "@/lib/constants";

export default function Review() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const userId = sessionStorage.getItem("userId");

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/users/${userId}/complete`],
    enabled: !!userId,
  });

  const handleSubmit = () => {
    toast({
      title: "Application Submitted Successfully!",
      description: "We'll match you with verified helpers and send recommendations within 24 hours.",
    });
    
    // Clear session storage
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("basicRequirements");
    sessionStorage.removeItem("registrationProgress");
    sessionStorage.removeItem("requirementsProgress");
    sessionStorage.removeItem("preferencesProgress");
    
    // In a real app, you would redirect to a success page or dashboard
    setTimeout(() => {
      setLocation("/");
    }, 2000);
  };

  if (!userId) {
    setLocation("/");
    return null;
  }

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data?.user) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600">Error loading your information. Please try again.</p>
              <Button onClick={() => setLocation("/")} className="mt-4">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const { user, requirements } = data;

  const getHelperTypeLabels = (types: string[]) => {
    return types.map(type => HELPER_TYPES.find(t => t.id === type)?.label).filter(Boolean);
  };

  const getTimingLabel = (timing: string) => {
    return TIMING_OPTIONS.find(t => t.id === timing)?.label;
  };

  const getBudgetLabel = (budget: string) => {
    return BUDGET_RANGES.find(b => b.id === budget)?.label;
  };

  const getWorkingDaysLabels = (days: string[]) => {
    return days.map(day => WORKING_DAYS.find(d => d.id === day)?.label).filter(Boolean);
  };

  const getWorkingHoursLabel = (hours: string) => {
    return WORKING_HOURS.find(h => h.id === hours)?.label;
  };

  const getExperienceLabel = (exp: string) => {
    return EXPERIENCE_LEVELS.find(e => e.id === exp)?.label;
  };

  const getLanguageLabels = (languages: string[]) => {
    return languages.map(lang => LANGUAGES.find(l => l.id === lang)?.label).filter(Boolean);
  };

  const getProximityLabel = (proximity: string) => {
    return PROXIMITY_OPTIONS.find(p => p.id === proximity)?.label;
  };

  const getUrgencyLabel = (urgency: string) => {
    return URGENCY_OPTIONS.find(u => u.id === urgency)?.label;
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressIndicator 
        currentStep={4} 
        totalSteps={4} 
        steps={['Registration', 'Requirements', 'Preferences', 'Review']} 
      />

      <div className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Full Name</p>
                <p className="text-slate-900">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Email</p>
                <p className="text-slate-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Mobile</p>
                <p className="text-slate-900">+91 {user.mobile}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Location</p>
                <p className="text-slate-900">{user.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Helper Requirements */}
        {requirements && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Helper Requirements</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setLocation("/requirements")}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Helper Types</p>
                <div className="flex flex-wrap gap-2">
                  {getHelperTypeLabels(requirements.helperTypes).map((type) => (
                    <Badge key={type} variant="secondary">{type}</Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">Service Timing</p>
                  <p className="text-slate-900">{getTimingLabel(requirements.timing)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Budget Range</p>
                  <p className="text-slate-900">{getBudgetLabel(requirements.budget)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Working Days</p>
                  <div className="flex flex-wrap gap-1">
                    {getWorkingDaysLabels(requirements.workingDays || []).map((day) => (
                      <Badge key={day} variant="outline" className="text-xs">{day}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Working Hours</p>
                  <p className="text-slate-900">{getWorkingHoursLabel(requirements.workingHours || "")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Experience Required</p>
                  <p className="text-slate-900">{getExperienceLabel(requirements.experienceRequired || "")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {getLanguageLabels(requirements.languagePreferences || []).map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">Food Preferences</p>
                  <p className="text-slate-900 capitalize">{requirements.foodPreferences}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Accommodation Required</span>
                    <Badge variant={requirements.accommodationRequired ? "default" : "secondary"}>
                      {requirements.accommodationRequired ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Background Check</span>
                    <Badge variant={requirements.backgroundCheckRequired ? "default" : "secondary"}>
                      {requirements.backgroundCheckRequired ? "Required" : "Not Required"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preferences */}
        {requirements && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Preferences</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setLocation("/preferences")}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">Proximity Preference</p>
                  <p className="text-slate-900">{getProximityLabel(requirements.proximityPreference || "")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Urgency</p>
                  <p className="text-slate-900">{getUrgencyLabel(requirements.urgency || "")}</p>
                </div>
              </div>
              
              {requirements.additionalRequirements && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Additional Requirements</p>
                    <p className="text-slate-900 text-sm bg-slate-50 p-3 rounded-lg">
                      {requirements.additionalRequirements}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Final Actions */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-600 h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Ready to Submit</h3>
                <p className="text-green-700 text-sm">
                  Your application is complete. We'll analyze your requirements and send you verified helper recommendations within 24 hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline"
            onClick={() => setLocation("/preferences")}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Preferences
          </Button>
          
          <Button 
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Submit Application
          </Button>
        </div>
      </div>
    </main>
  );
}
