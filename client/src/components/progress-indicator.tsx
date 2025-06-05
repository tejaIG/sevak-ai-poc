import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Find Your Perfect Helper</h1>
        <span className="text-sm text-slate-500">Step {currentStep} of {totalSteps}</span>
      </div>
      
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-slate-500">
        {steps.map((step, index) => (
          <span 
            key={step}
            className={cn(
              "font-medium",
              index < currentStep ? "text-primary" : "text-slate-500"
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
