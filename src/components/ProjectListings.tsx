import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  DollarSign, 
  Clock, 
  Calendar, 
  Bookmark, 
  Send, 
  CheckCircle2, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  PlusCircle, 
  Sparkles,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { Project, Category, ProjectFilterState } from '../types';

interface ProjectListingsProps {
  projects: Project[];
  categories: Category[];
  filters: ProjectFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ProjectFilterState>>;
  onSelectProject: (project: Project) => void;
  onToggleSave: (projectId: string) => void;
  savedProjectIds: string[];
  onOpenPostProject: () => void;
}

export const ProjectListings: React.FC<ProjectListingsProps> = ({
  projects,
  categories,
  filters,
  setFilters,
  onSelectProject,
  onToggleSave,
  savedProjectIds,
  onOpenPostProject
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search query filter (matches title, description, skills, category)
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesDesc = project.description.toLowerCase().includes(q);
        const matchesCat = project.category.toLowerCase().includes(q);
        const matchesSkills = project.requiredSkills.some(s => s.toLowerCase().includes(q));
        const matchesClient = project.client.name.toLowerCase().includes(q) || (project.client.company && project.client.company.toLowerCase().includes(q));
        
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesSkills && !matchesClient) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        if (project.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Budget Type filter
      if (filters.budgetType !== 'all') {
        if (project.budgetType !== filters.budgetType) {
          return false;
        }
      }

      // Experience Level filter
      if (filters.experienceLevel && filters.experienceLevel !== 'all') {
        if (project.experienceLevel !== filters.experienceLevel) {
          return false;
        }
      }

      // Min/Max Budget filter
      if (filters.minBudget > 0 && project.budgetMax < filters.minBudget) {
        return false;
      }
      if (filters.maxBudget > 0 && project.budgetMin > filters.maxBudget) {
        return false;
      }

      // Status filter
      if (filters.status && filters.status !== 'all') {
        if (project.status !== filters.status) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'budget-high') {
        return b.budgetMax - a.budgetMax;
      }
      if (filters.sortBy === 'budget-low') {
        return a.budgetMin - b.budgetMin;
      }
      if (filters.sortBy === 'proposals-low') {
        return a.proposalsCount - b.proposalsCount;
      }
      if (filters.sortBy === 'proposals-high') {
        return b.proposalsCount - a.proposalsCount;
      }
      return 0;
    });
  }, [projects, filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      budgetType: 'all',
      minBudget: 0,
      maxBudget: 0,
      experienceLevel: 'all',
      status: 'all',
      sortBy: 'newest'
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.budgetType !== 'all') count++;
    if (filters.experienceLevel && filters.experienceLevel !== 'all') count++;
    if (filters.minBudget > 0 || filters.maxBudget > 0) count++;
    if (filters.status && filters.status !== 'all') count++;
    return count;
  }, [filters]);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Client Job Board</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Explore Freelance Projects
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Browse {projects.length} curated opportunities with clear deliverables, guaranteed escrow, and direct client communication.
            </p>
          </div>

          <button
            onClick={onOpenPostProject}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Project</span>
          </button>
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
                placeholder="Search projects by title, keywords, or required skills..."
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
            <div className="sm:w-56 flex items-center gap-2">
              <div className="relative w-full">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  aria-label="Sort projects by"
                  className="w-full py-3 px-3 pl-9 bg-slate-50 text-slate-800 text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none cursor-pointer appearance-none font-medium"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="budget-high">Sort: Budget (High to Low)</option>
                  <option value="budget-low">Sort: Budget (Low to High)</option>
                  <option value="proposals-low">Sort: Least Proposals</option>
                  <option value="proposals-high">Sort: Most Proposals</option>
                </select>
                <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Mobile filter toggle & View mode toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`lg:hidden flex-1 sm:flex-none px-4 py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  activeFiltersCount > 0 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Quick Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                filters.category === 'all' || !filters.category
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Categories ({projects.length})
            </button>
            {categories.map((c) => {
              const count = projects.filter(p => p.category.toLowerCase() === c.name.toLowerCase()).length;
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

        {/* Main Content Layout: Sidebar Filters + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters / Mobile Drawer */}
          <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:col-span-1 space-y-6`}>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>Filter Options</span>
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

              {/* Budget Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Budget Type</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(['all', 'fixed', 'hourly'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, budgetType: type }))}
                      className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                        filters.budgetType === type
                          ? 'bg-white text-emerald-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Experience Level</label>
                <div className="space-y-1.5">
                  {['all', 'Entry Level', 'Intermediate', 'Expert'].map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="experienceLevel"
                        checked={filters.experienceLevel === level || (level === 'all' && !filters.experienceLevel)}
                        onChange={() => setFilters(prev => ({ ...prev, experienceLevel: level }))}
                        className="accent-emerald-600 w-4 h-4 cursor-pointer"
                      />
                      <span>{level === 'all' ? 'All Experience Levels' : level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Budget Filter</label>
                <div className="space-y-1.5">
                  {[
                    { label: 'Any Budget', min: 0, max: 0 },
                    { label: 'Under $500', min: 0, max: 500 },
                    { label: '$500 - $1,500', min: 500, max: 1500 },
                    { label: '$1,500 - $3,000', min: 1500, max: 3000 },
                    { label: '$3,000+', min: 3000, max: 0 },
                  ].map((range, idx) => {
                    const isSelected = filters.minBudget === range.min && filters.maxBudget === range.max;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFilters(prev => ({ ...prev, minBudget: range.min, maxBudget: range.max }))}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Status */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status</label>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Statuses' },
                    { id: 'open', label: 'Open (Accepting Bids)' },
                    { id: 'in-progress', label: 'In Progress' }
                  ].map((st) => (
                    <label
                      key={st.id}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="projectStatus"
                        checked={filters.status === st.id}
                        onChange={() => setFilters(prev => ({ ...prev, status: st.id }))}
                        className="accent-emerald-600 w-4 h-4 cursor-pointer"
                      />
                      <span>{st.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Area: Listings */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Results Count & Active Filters summary */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pb-2">
              <span className="font-semibold">
                Showing <strong className="text-slate-900">{filteredProjects.length}</strong> of {projects.length} projects
              </span>

              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Active filters:</span>
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-emerald-600 hover:text-emerald-700 underline font-semibold cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No projects match your filters</h3>
                  <p className="text-xs text-slate-500">
                    Try broadening your search query, selecting different categories, or resetting the budget ranges.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Projects Container (Grid or List) */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'space-y-4'}>
              {filteredProjects.map((project) => {
                const isSaved = savedProjectIds.includes(project.id);

                return (
                  <div
                    key={project.id}
                    className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Category & Status badges */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                            {project.category}
                          </span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {project.experienceLevel}
                          </span>
                          {project.featured && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                              ★ Featured
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(project.id);
                          }}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isSaved 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 border-slate-200'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save project'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600' : ''}`} />
                        </button>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 mb-2"
                      >
                        {project.title}
                      </h3>

                      {/* Budget and Deadline Row */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 mb-3 pb-3 border-b border-slate-100">
                        <div className="font-bold text-slate-900 text-sm">
                          <span className="text-emerald-600 font-extrabold">
                            {project.budgetType === 'fixed' 
                              ? `$${project.budgetMin.toLocaleString()} - $${project.budgetMax.toLocaleString()}`
                              : `$${project.budgetMin} - $${project.budgetMax}/hr`
                            }
                          </span>
                          <span className="text-[11px] font-normal text-slate-400 ml-1">
                            ({project.budgetType})
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{project.estimatedDuration}</span>
                        </div>

                        <div className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Due: {project.deadline}</span>
                        </div>
                      </div>

                      {/* Snippet Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={project.client.avatar}
                          alt={project.client.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {project.client.company || project.client.name}
                            </span>
                            {project.client.paymentVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            ★ {project.client.rating} ({project.proposalsCount} bids)
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
                      >
                        <span>Details & Bid</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
