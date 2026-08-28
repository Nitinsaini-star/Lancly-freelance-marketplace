import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Briefcase, 
  Users, 
  DollarSign, 
  Layers
} from 'lucide-react';
import { Category } from '../types';

interface HeroProps {
  categories: Category[];
  onSearch: (query: string, category: string, mode: 'projects' | 'freelancers') => void;
  onSelectCategory: (categoryName: string) => void;
  onOpenPostProject: () => void;
  setCurrentTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  categories,
  onSearch,
  onSelectCategory,
  onOpenPostProject,
  setCurrentTab
}) => {
  const [searchMode, setSearchMode] = useState<'projects' | 'freelancers'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCat, searchMode);
  };

  const popularTags = [
    { label: 'React', category: 'Web & App Development' },
    { label: 'Figma UI/UX', category: 'UI/UX & Brand Design' },
    { label: 'Python & LLMs', category: 'AI & Data Science' },
    { label: 'Technical Writing', category: 'Content & Copywriting' },
    { label: 'SEO Strategy', category: 'Digital Marketing & SEO' },
    { label: '3D Blender', category: 'Video & 3D Animation' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      
      {/* Decorative gradient glowing orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-inner mb-6 animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>The #1 Verified Freelance & Project Marketplace</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hire elite talent or land <br className="hidden sm:block" />
            your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">next dream project.</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Lancly connects vetted software engineers, designers, AI specialists, and marketers with fast-growing businesses. Simple bidding, verified escrow, zero hassle.
          </p>
        </div>

        {/* Dual Search & Filter Hub */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              id="hero-tab-find-work"
              type="button"
              onClick={() => setSearchMode('projects')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                searchMode === 'projects'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              💼 Find Projects to Bid On
            </button>
            <button
              id="hero-tab-find-talent"
              type="button"
              onClick={() => setSearchMode('freelancers')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                searchMode === 'freelancers'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              🧑‍💻 Hire Top Freelancers
            </button>
          </div>

          {/* Search Box */}
          <form 
            onSubmit={handleSubmit}
            className="p-2 sm:p-2.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchMode === 'projects' ? 'Search projects by keyword (e.g. React Dashboard, UI Design)...' : 'Search talent by skill (e.g. Figma, Python, Copywriting)...'}
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-900/90 text-white placeholder-slate-400 text-sm rounded-xl border border-slate-700/80 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all"
              />
            </div>

            <div className="sm:w-52">
              <select
                id="hero-category-select"
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                aria-label="Filter search by category"
                className="w-full py-3 sm:py-3.5 px-3 bg-slate-900/90 text-white text-sm rounded-xl border border-slate-700/80 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name} className="bg-slate-900 text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="hero-search-submit-btn"
              type="submit"
              className="py-3 sm:py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Skill Tags */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-500">Popular:</span>
            {popularTags.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchQuery(tag.label);
                  onSearch(tag.label, tag.category, searchMode);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>

        {/* Fast Action CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            id="hero-browse-projects-cta"
            onClick={() => {
              setCurrentTab('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Browse All Projects</span>
          </button>
          
          <button
            id="hero-post-job-cta"
            onClick={onOpenPostProject}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Post a Project for Free</span>
          </button>

          <button
            id="hero-find-talent-cta"
            onClick={() => {
              setCurrentTab('freelancers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Users className="w-4 h-4 text-teal-400" />
            <span>Hire Verified Talent</span>
          </button>
        </div>

        {/* Platform Stats Grid */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4,800+</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Verified Freelancers</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">$3.2M+</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Earned by Talent</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400">99.4%</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Job Satisfaction Rate</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">15 Min</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Avg First Proposal Time</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-medium uppercase tracking-wider">
          <span>Trusted by fast-moving teams worldwide</span>
          <div className="flex items-center gap-6 opacity-60">
            <span className="font-bold text-slate-400 tracking-normal text-sm">Vercel</span>
            <span className="font-bold text-slate-400 tracking-normal text-sm">Stripe</span>
            <span className="font-bold text-slate-400 tracking-normal text-sm">Shopify</span>
            <span className="font-bold text-slate-400 tracking-normal text-sm">Linear</span>
            <span className="font-bold text-slate-400 tracking-normal text-sm">Retool</span>
          </div>
        </div>

      </div>
    </section>
  );
};
