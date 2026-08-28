import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  MapPin, 
  CheckCircle2, 
  RotateCcw, 
  ArrowUpDown, 
  Eye, 
  Zap, 
  DollarSign, 
  Sparkles,
  Award,
  Globe
} from 'lucide-react';
import { Freelancer, Category, FreelancerFilterState } from '../types';

interface FreelancerListingsProps {
  freelancers: Freelancer[];
  categories: Category[];
  filters: FreelancerFilterState;
  setFilters: React.Dispatch<React.SetStateAction<FreelancerFilterState>>;
  onSelectFreelancer: (freelancer: Freelancer) => void;
  onOpenHireModal: (freelancer: Freelancer) => void;
}

export const FreelancerListings: React.FC<FreelancerListingsProps> = ({
  freelancers,
  categories,
  filters,
  setFilters,
  onSelectFreelancer,
  onOpenHireModal
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredFreelancers = useMemo(() => {
    return freelancers.filter((fl) => {
      // Search query (matches name, title, bio, skills, location)
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = fl.name.toLowerCase().includes(q);
        const matchesTitle = fl.title.toLowerCase().includes(q);
        const matchesBio = fl.bio.toLowerCase().includes(q);
        const matchesSkills = fl.skills.some(s => s.toLowerCase().includes(q));
        const matchesLocation = fl.location.toLowerCase().includes(q);

        if (!matchesName && !matchesTitle && !matchesBio && !matchesSkills && !matchesLocation) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        if (fl.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Experience Level
      if (filters.experienceLevel && filters.experienceLevel !== 'all') {
        if (fl.experienceLevel !== filters.experienceLevel) {
          return false;
        }
      }

      // Min Rating
      if (filters.minRating > 0 && fl.rating < filters.minRating) {
        return false;
      }

      // Max Hourly Rate
      if (filters.maxHourlyRate > 0 && fl.hourlyRate > filters.maxHourlyRate) {
        return false;
      }

      // Available Only
      if (filters.availableOnly && !fl.available) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'jobs') {
        return b.jobsCompleted - a.jobsCompleted;
      }
      if (filters.sortBy === 'rate-low') {
        return a.hourlyRate - b.hourlyRate;
      }
      if (filters.sortBy === 'rate-high') {
        return b.hourlyRate - a.hourlyRate;
      }
      return 0;
    });
  }, [freelancers, filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      experienceLevel: 'all',
      minRating: 0,
      maxHourlyRate: 0,
      availableOnly: false,
      sortBy: 'rating'
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.experienceLevel && filters.experienceLevel !== 'all') count++;
    if (filters.minRating > 0) count++;
    if (filters.maxHourlyRate > 0) count++;
    if (filters.availableOnly) count++;
    return count;
  }, [filters]);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Freelancer Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Hire World-Class Talent
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Connect directly with verified developers, UI/UX designers, AI specialists, and marketers ready to join your team.
            </p>
          </div>
        </div>

        {/* Search and Top Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search talent by skills (e.g. React, Figma, SEO), name, or title..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sm:w-56">
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  aria-label="Sort freelancers by"
                  className="w-full py-3 px-3 pl-9 bg-slate-50 text-slate-800 text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none cursor-pointer appearance-none font-medium"
                >
                  <option value="rating">Sort: Highest Rating</option>
                  <option value="jobs">Sort: Most Jobs Done</option>
                  <option value="rate-low">Sort: Rate (Low to High)</option>
                  <option value="rate-high">Sort: Rate (High to Low)</option>
                </select>
                <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`lg:hidden px-4 py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeFiltersCount > 0 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                filters.category === 'all' || !filters.category
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Specialties ({freelancers.length})
            </button>
            {categories.map((c) => {
              const count = freelancers.filter(fl => fl.category.toLowerCase() === c.name.toLowerCase()).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setFilters(prev => ({ ...prev, category: c.name }))}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                    filters.category.toLowerCase() === c.name.toLowerCase()
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Filter Column */}
          <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:col-span-1 space-y-6`}>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>Talent Filters</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Availability Toggle */}
              <div className="pt-1">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">Available Now</span>
                    <span className="text-[11px] text-slate-500">Ready for immediate contract</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.availableOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, availableOnly: e.target.checked }))}
                    className="accent-emerald-600 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Expertise Level</label>
                <div className="space-y-1.5">
                  {['all', 'Entry Level', 'Intermediate', 'Expert'].map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="freelancerLevel"
                        checked={filters.experienceLevel === level || (level === 'all' && !filters.experienceLevel)}
                        onChange={() => setFilters(prev => ({ ...prev, experienceLevel: level }))}
                        className="accent-emerald-600 w-4 h-4 cursor-pointer"
                      />
                      <span>{level === 'all' ? 'All Experience Levels' : level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Minimum Rating</label>
                <div className="space-y-1.5">
                  {[
                    { label: 'Any Rating', value: 0 },
                    { label: '★ 4.8 & above', value: 4.8 },
                    { label: '★ 4.5 & above', value: 4.5 },
                    { label: '★ 4.0 & above', value: 4.0 }
                  ].map((r, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="ratingFilter"
                        checked={filters.minRating === r.value}
                        onChange={() => setFilters(prev => ({ ...prev, minRating: r.value }))}
                        className="accent-emerald-600 w-4 h-4 cursor-pointer"
                      />
                      <span className="flex items-center gap-1">{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Hourly Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700 uppercase tracking-wider">Max Hourly Rate</label>
                  <span className="font-bold text-emerald-600">
                    {filters.maxHourlyRate > 0 ? `$${filters.maxHourlyRate}/hr` : 'Any Rate'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Any', val: 0 },
                    { label: 'Under $50', val: 50 },
                    { label: 'Under $80', val: 80 },
                    { label: 'Under $100', val: 100 },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, maxHourlyRate: p.val }))}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        filters.maxHourlyRate === p.val
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Freelancers Grid */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Header Result Counter */}
            <div className="flex items-center justify-between text-xs text-slate-600 pb-2">
              <span className="font-semibold">
                Found <strong className="text-slate-900">{filteredFreelancers.length}</strong> matching professionals
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-emerald-600 font-semibold hover:text-emerald-700 underline cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredFreelancers.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No freelancers found</h3>
                  <p className="text-xs text-slate-500">
                    Try searching for different skills or adjusting your expertise and rate filters.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  Reset Talent Filters
                </button>
              </div>
            )}

            {/* Freelancer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFreelancers.map((freelancer) => (
                <div
                  key={freelancer.id}
                  className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Avatar, Name, Hourly Rate */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={freelancer.avatar}
                            alt={freelancer.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 group-hover:border-emerald-500/40 transition-colors shadow-xs"
                          />
                          {freelancer.available ? (
                            <span 
                              title="Available for projects" 
                              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"
                            />
                          ) : (
                            <span 
                              title="Currently in contract" 
                              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-slate-400 rounded-full border-2 border-white"
                            />
                          )}
                        </div>

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
                          <p className="text-xs text-slate-500 truncate max-w-[170px] sm:max-w-xs">
                            {freelancer.title}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-extrabold text-slate-900">
                          ${freelancer.hourlyRate}<span className="text-xs font-normal text-slate-500">/hr</span>
                        </span>
                        {freelancer.badge && (
                          <div className="mt-0.5">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {freelancer.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats bar */}
                    <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-500 my-3 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{freelancer.rating}</span>
                        <span className="text-slate-400 font-normal">({freelancer.reviewsCount} reviews)</span>
                      </div>
                      <span>•</span>
                      <span className="text-slate-700 font-medium">{freelancer.jobsCompleted} jobs completed</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">{freelancer.jobSuccessRate}% Success</span>
                    </div>

                    {/* Location & Languages */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{freelancer.location}</span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">
                        Avg response: {freelancer.responseHours}h
                      </span>
                    </div>

                    {/* Short Bio */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {freelancer.bio}
                    </p>

                    {/* Skills list */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {freelancer.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {freelancer.skills.length > 4 && (
                        <span className="text-[11px] font-medium px-1.5 py-0.5 text-slate-400">
                          +{freelancer.skills.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Portfolio Samples Thumbnail Preview */}
                    {freelancer.portfolio.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {freelancer.portfolio.slice(0, 2).map((item) => (
                          <div 
                            key={item.id}
                            onClick={() => onSelectFreelancer(freelancer)}
                            className="relative rounded-lg overflow-hidden h-16 border border-slate-200 cursor-pointer group/item"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center p-1">
                              <span className="text-[10px] text-white font-medium text-center truncate">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectFreelancer(freelancer)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-emerald-500 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Profile</span>
                    </button>

                    <button
                      onClick={() => onOpenHireModal(freelancer)}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Hire Freelancer</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
