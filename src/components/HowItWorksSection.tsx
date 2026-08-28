import React, { useState } from 'react';
import { 
  FileEdit, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Search, 
  Send, 
  CheckCircle, 
  Trophy, 
  Sparkles,
  ArrowRight,
  Lock,
  MessageSquare
} from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenPostProject: () => void;
  setCurrentTab: (tab: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenPostProject,
  setCurrentTab
}) => {
  const [activeWorkflow, setActiveWorkflow] = useState<'client' | 'freelancer'>('client');

  const clientSteps = [
    {
      step: '01',
      title: 'Post a Project',
      desc: 'Define your project scope, budget range, and required technical skills. It takes under 2 minutes.',
      icon: <FileEdit className="w-6 h-6 text-emerald-600" />
    },
    {
      step: '02',
      title: 'Review Proposals',
      desc: 'Receive tailored bids from top freelancers. Compare ratings, verified portfolios, and price quotes.',
      icon: <Users className="w-6 h-6 text-emerald-600" />
    },
    {
      step: '03',
      title: 'Fund Secure Escrow',
      desc: 'Deposit milestone funds safely into platform escrow. Funds are only released when you approve deliverables.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      step: '04',
      title: 'Collaborate & Approve',
      desc: 'Direct communication, deliverable reviews, and release payments upon 100% satisfaction.',
      icon: <Trophy className="w-6 h-6 text-emerald-600" />
    }
  ];

  const freelancerSteps = [
    {
      step: '01',
      title: 'Create Your Profile',
      desc: 'Showcase your skills, past verified portfolio samples, hourly rates, and certifications.',
      icon: <CheckCircle className="w-6 h-6 text-teal-600" />
    },
    {
      step: '02',
      title: 'Discover Dream Jobs',
      desc: 'Filter hundreds of high-budget verified projects by category, technology stack, and budget type.',
      icon: <Search className="w-6 h-6 text-teal-600" />
    },
    {
      step: '03',
      title: 'Submit Winning Proposals',
      desc: 'Write custom cover letters, specify timeline and milestones, and propose your competitive price.',
      icon: <Send className="w-6 h-6 text-teal-600" />
    },
    {
      step: '04',
      title: 'Get Paid On Time',
      desc: 'Work with peace of mind. Guaranteed payment protection and instant payouts upon milestone approval.',
      icon: <CreditCard className="w-6 h-6 text-teal-600" />
    }
  ];

  const currentSteps = activeWorkflow === 'client' ? clientSteps : freelancerSteps;

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple, Transparent & Secure</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            How Lancly Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A frictionless marketplace built for seamless contracts, transparent bidding, and secure milestone escrow.
          </p>

          {/* Workflow Mode Switcher */}
          <div className="mt-6 inline-flex p-1 bg-slate-800 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveWorkflow('client')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkflow === 'client'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              For Clients (Hiring)
            </button>
            <button
              onClick={() => setActiveWorkflow('freelancer')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeWorkflow === 'freelancer'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              For Freelancers (Finding Work)
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((stepItem, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {stepItem.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-700 group-hover:text-emerald-400/80 transition-colors">
                    {stepItem.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {stepItem.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-700/50 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <span>Step {index + 1} of 4</span>
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-800 to-teal-950/60 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Lancly Escrow Protection Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every project is safeguarded. No surprise fees. Payment is released only when milestones are completed to your satisfaction.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeWorkflow === 'client' ? (
              <button
                onClick={onOpenPostProject}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Post a Project Now
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentTab('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Find Open Projects
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
