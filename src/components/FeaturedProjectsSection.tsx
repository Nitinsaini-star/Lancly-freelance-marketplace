import React from 'react';
import { 
  DollarSign, 
  Clock, 
  Calendar, 
  UserCheck, 
  Star, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  Send,
  CheckCircle2
} from 'lucide-react';
import { Project } from '../types';

interface FeaturedProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onToggleSave: (projectId: string) => void;
  savedProjectIds: string[];
  setCurrentTab: (tab: string) => void;
  onOpenPostProject: () => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onToggleSave,
  savedProjectIds,
  setCurrentTab,
  onOpenPostProject
}) => {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>High-Demand Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Client Projects
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Hand-picked verified client projects with competitive budgets, active hiring, and fast review timelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPostProject}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <span>Post a Project</span>
            </button>
            
            <button
              onClick={() => {
                setCurrentTab('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-emerald-600/20 cursor-pointer"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => {
            const isSaved = savedProjectIds.includes(project.id);

            return (
              <div
                key={project.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Metadata row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                        {project.category}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
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

                  {/* Project Title */}
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 mb-2"
                  >
                    {project.title}
                  </h3>

                  {/* Budget and Deadline Row */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 mb-3.5 pb-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-1 font-bold text-slate-900 text-sm">
                      <span className="text-emerald-600 font-extrabold">
                        {project.budgetType === 'fixed' 
                          ? `$${project.budgetMin.toLocaleString()} - $${project.budgetMax.toLocaleString()}`
                          : `$${project.budgetMin} - $${project.budgetMax}/hr`
                        }
                      </span>
                      <span className="text-[11px] font-normal text-slate-400">
                        ({project.budgetType === 'fixed' ? 'Fixed Price' : 'Hourly'})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.estimatedDuration}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Due: {project.deadline}</span>
                    </div>
                  </div>

                  {/* Snippet Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Required Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer: Client info & Apply CTA */}
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
                          <span title="Payment Verified">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="flex items-center text-amber-500 font-semibold">
                          ★ {project.client.rating}
                        </span>
                        <span>•</span>
                        <span>{project.proposalsCount} proposals</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    <span>Submit Proposal</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
