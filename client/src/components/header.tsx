import { Link } from "wouter";
import { Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Home className="text-white h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-slate-900">Sevak AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-slate-600 hover:text-slate-900 font-medium">
              How it Works
            </Link>
            <Link href="#" className="text-slate-600 hover:text-slate-900 font-medium">
              Find Helpers
            </Link>
            <Link href="#" className="text-slate-600 hover:text-slate-900 font-medium">
              Become a Helper
            </Link>
            <Button className="bg-primary text-white hover:bg-blue-700">
              Sign In
            </Button>
          </nav>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-6 w-6 text-slate-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}
