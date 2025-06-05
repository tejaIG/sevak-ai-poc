import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-semibold text-slate-900 mb-4">For Homeowners</h5>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Find Helpers</a></li>
              <li><a href="#" className="hover:text-slate-900">How it Works</a></li>
              <li><a href="#" className="hover:text-slate-900">Pricing</a></li>
              <li><a href="#" className="hover:text-slate-900">Safety</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900 mb-4">For Helpers</h5>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Join as Helper</a></li>
              <li><a href="#" className="hover:text-slate-900">Helper Resources</a></li>
              <li><a href="#" className="hover:text-slate-900">Training</a></li>
              <li><a href="#" className="hover:text-slate-900">Earnings</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900 mb-4">Support</h5>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Help Center</a></li>
              <li><a href="#" className="hover:text-slate-900">Contact Us</a></li>
              <li><a href="#" className="hover:text-slate-900">Safety Center</a></li>
              <li><a href="#" className="hover:text-slate-900">Trust & Safety</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900 mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">About Us</a></li>
              <li><a href="#" className="hover:text-slate-900">Careers</a></li>
              <li><a href="#" className="hover:text-slate-900">Press</a></li>
              <li><a href="#" className="hover:text-slate-900">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
              <Home className="text-white h-3 w-3" />
            </div>
            <span className="font-bold text-slate-900">Sevak AI</span>
          </div>
          <div className="text-sm text-slate-500">
            © 2024 Sevak AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
