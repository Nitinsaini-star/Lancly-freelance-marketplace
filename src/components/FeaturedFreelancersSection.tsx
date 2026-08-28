import React from 'react';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Mail,
  Zap
} from 'lucide-react';
import { Freelancer } from '../types';

interface FeaturedFreelancersSectionProps {
  freelancers: Freelancer[];
  onSelectFreelancer: (freelancer: Freelancer) => void;
  onOpenHireModal: (freelancer: Freelancer) => void;
  setCurrentTab: (tab: string) => void;
}

export const FeaturedFreelancersSection: React.FC<FeaturedFreelancersSectionProps> = ({
  freelancers,
  onSelectFreelancer,
  onOpenHireModal,
  setCurrentTab
}) => {
  const topFreelancers = freelancers.slice(0, 3);

  return (
    <section className="py-16 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Top 1% Global Talent</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Verified Freelancers
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Collaborate with battle-tested developers, designers, and domain specialists with proven track records.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentTab('freelancers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>Explore all freelancers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Freelancers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topFreelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header with Avatar & Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-emerald-500/30 transition-colors shadow-xs"
                    />
                    {freelancer.available ? (
                      <span 
                        title="Available for immediate hire" 
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"
                      />
                    ) : (
                      <span 
                        title="Currently busy" 
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-400 rounded-full border-2 border-white"
                      />
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900">
                      ${freelancer.hourlyRate}<span className="text-xs font-normal text-slate-500">/hr</span>
                    </span>
                    {freelancer.badge && (
                      <div className="mt-1">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {freelancer.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name & Title */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 
                      onClick={() => onSelectFreelancer(freelancer)}
                      className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      {freelancer.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-xs font-medium text-emerald-700 mt-0.5 line-clamp-1">
                    {freelancer.title}
                  </p>
                </div>

                {/* Location & Rating */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2.5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{freelancer.rating}</span>
                    <span className="text-slate-400 font-normal">({freelancer.reviewsCount})</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-slate-500 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{freelancer.location.split(',')[0]}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {freelancer.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {freelancer.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 4 && (
                    <span className="text-[11px] font-medium px-1 py-0.5 text-slate-400">
                      +{freelancer.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Mini Portfolio Preview */}
                {freelancer.portfolio.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Featured Portfolio</p>
                    <div className="grid grid-cols-2 gap-2">
                      {freelancer.portfolio.slice(0, 2).map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => onSelectFreelancer(freelancer)}
                          className="relative group/thumb rounded-lg overflow-hidden h-16 border border-slate-200 cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center p-1">
                            <span className="text-[10px] text-white font-medium text-center truncate">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectFreelancer(freelancer)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-emerald-500 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => onOpenHireModal(freelancer)}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Hire Talent</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
