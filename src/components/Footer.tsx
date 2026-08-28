import React from 'react';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Github, 
  Twitter, 
  Linkedin, 
  RotateCcw
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenPostProject: () => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  onOpenPostProject,
  onResetData
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">Lanc<span className="text-emerald-400">ly</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier marketplace connecting forward-thinking businesses with world-class freelance developers, designers, AI engineers, and writers.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <a href="#github" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
              <a href="#twitter" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Escrow Protected Payments & Verified ID</span>
            </div>
          </div>

          {/* For Clients */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">For Clients</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={onOpenPostProject} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Post a Project
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('freelancers')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Find Top Talent
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('how-it-works')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Enterprise Hiring
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('projects')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Project Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">For Freelancers</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => setCurrentTab('projects')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Browse High-Budget Jobs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('dashboard')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Proposal Tracker
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('dashboard')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Build Profile & Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('how-it-works')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Freelance Success Tips
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support & Contact</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href="mailto:nitinisaini2005@gmail.com" className="hover:text-emerald-400 transition-colors">
                  nitinisaini2005@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 (Jaipur) • +1 (800) 555-LANC</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jaipur, RJ, India</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onResetData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Reset demo projects and proposals to initial state"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Lancly Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Trust & Safety</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
