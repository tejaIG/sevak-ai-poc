import { Shield, Handshake, Headphones } from "lucide-react";

export function TrustIndicators() {
  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Why Choose Sevak AI?</h3>
        <p className="text-slate-600">Connecting families with trusted domestic helpers since 2024</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="text-green-600 h-6 w-6" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Verified Helpers</h4>
          <p className="text-sm text-slate-600">All helpers undergo thorough background verification and skill assessment</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Handshake className="text-blue-600 h-6 w-6" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Perfect Matches</h4>
          <p className="text-sm text-slate-600">AI-powered matching based on your specific needs and preferences</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Headphones className="text-purple-600 h-6 w-6" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">24/7 Support</h4>
          <p className="text-sm text-slate-600">Round-the-clock customer support for any queries or concerns</p>
        </div>
      </div>
    </div>
  );
}
