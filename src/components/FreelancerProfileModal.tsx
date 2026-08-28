import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Zap, 
  ExternalLink, 
  DollarSign, 
  Briefcase, 
  Award, 
  MessageSquare,
  Send,
  Sparkles
} from 'lucide-react';
import { Freelancer, Project } from '../types';

interface FreelancerProfileModalProps {
  freelancer: Freelancer | null;
  onClose: () => void;
  onOpenHireModal: (freelancer: Freelancer) => void;
  userProjects: Project[];
}

export const FreelancerProfileModal: React.FC<FreelancerProfileModalProps> = ({
  freelancer,
  onClose,
  onOpenHireModal,
  userProjects
}) => {
  if (!freelancer) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview');
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Profile Banner */}
        <div className="relative h-32 sm:h-40 bg-gradient-to-r from-slate-900 via-teal-900 to-emerald-900 p-6 flex justify-end items-start">
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Header Row with Avatar & Quick Actions */}
        <div className="px-6 sm:px-8 pb-4 relative border-b border-slate-100 bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl"
              />
              {freelancer.available ? (
                <span 
                  title="Available for immediate work" 
                  className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"
                />
              ) : (
                <span 
                  title="Currently busy" 
                  className="absolute bottom-1 right-1 w-5 h-5 bg-slate-400 rounded-full border-2 border-white"
                />
              )}
            </div>

            {/* Top Right Action */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenHireModal(freelancer)}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Hire / Contact</span>
              </button>
            </div>
          </div>

          {/* Name & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {freelancer.name}
              </h2>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {freelancer.badge && (
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {freelancer.badge}
                </span>
              )}
            </div>
            
            <p className="text-sm font-semibold text-emerald-700 mt-0.5">
              {freelancer.title}
            </p>

            {/* Meta tags bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 mt-3">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{freelancer.rating}</span>
                <span className="text-slate-400 font-normal">({freelancer.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{freelancer.location}</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-slate-900">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600 -mr-1" />
                <span>${freelancer.hourlyRate}/hour</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{freelancer.languages.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 pt-2 bg-white border-b border-slate-100 flex items-center gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Overview & Bio
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'portfolio'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Portfolio Samples</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
              {freelancer.portfolio.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Client Reviews</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
              {freelancer.reviews.length}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Performance Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div className="p-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-emerald-600">{freelancer.jobSuccessRate}%</span>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Job Success</p>
                </div>
                <div className="p-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{freelancer.totalEarnings}</span>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Total Earnings</p>
                </div>
                <div className="p-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{freelancer.jobsCompleted}</span>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Jobs Completed</p>
                </div>
                <div className="p-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-teal-600">{freelancer.onTimeRate}%</span>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">On-Time Rate</p>
                </div>
              </div>

              {/* Bio & Intro */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  About & Background
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-100">
                  {freelancer.bio}
                </p>
              </div>

              {/* Skills and Proficiency */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Technical Skills & Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Portfolio Preview */}
              {freelancer.portfolio.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Featured Work Samples
                    </h3>
                    <button
                      onClick={() => setActiveTab('portfolio')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                    >
                      View all ({freelancer.portfolio.length})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {freelancer.portfolio.map((item) => (
                      <div key={item.id} className="rounded-2xl overflow-hidden border border-slate-200 group">
                        <img src={item.image} alt={item.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform" />
                        <div className="p-3 bg-white">
                          <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {freelancer.portfolio.map((item) => (
                  <div 
                    key={item.id}
                    className="rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.tags.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-amber-500">{freelancer.rating}</span>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-600 font-medium">Based on {freelancer.reviewsCount} verified client ratings</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
                  100% Recommended
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {freelancer.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'} 
                          alt={rev.author}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{rev.author}</p>
                          <p className="text-[11px] text-slate-400">{rev.company || 'Enterprise Client'}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    <div className="text-[11px] text-emerald-700 font-semibold bg-slate-50 px-2.5 py-1 rounded-lg inline-block">
                      Project: {rev.projectTitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
