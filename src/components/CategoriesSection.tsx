import React from 'react';
import { 
  Code, 
  Palette, 
  Cpu, 
  FileText, 
  TrendingUp, 
  Video, 
  ArrowRight, 
  Sparkles,
  Layers
} from 'lucide-react';
import { Category } from '../types';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
  setCurrentTab: (tab: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSelectCategory,
  setCurrentTab
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-6 h-6 text-emerald-600" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-purple-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-600" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-amber-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-rose-600" />;
      case 'Video':
        return <Video className="w-6 h-6 text-indigo-600" />;
      default:
        return <Layers className="w-6 h-6 text-emerald-600" />;
    }
  };

  const getBgClass = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-50 border-emerald-100 group-hover:border-emerald-300';
      case 'purple': return 'bg-purple-50 border-purple-100 group-hover:border-purple-300';
      case 'blue': return 'bg-blue-50 border-blue-100 group-hover:border-blue-300';
      case 'amber': return 'bg-amber-50 border-amber-100 group-hover:border-amber-300';
      case 'rose': return 'bg-rose-50 border-rose-100 group-hover:border-rose-300';
      case 'indigo': return 'bg-indigo-50 border-indigo-100 group-hover:border-indigo-300';
      default: return 'bg-slate-50 border-slate-100 group-hover:border-slate-300';
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Browse by Domain</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Project Categories
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Explore open opportunities or hire high-performing experts in specialized technical and creative domains.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentTab('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>View all 500+ listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.name)}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${getBgClass(category.color)}`}>
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    {category.projectCount} active jobs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                  {category.name}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Popular skill pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {category.popularSkills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-slate-50"
                    >
                      {skill}
                    </span>
                  ))}
                  {category.popularSkills.length > 4 && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 text-slate-400">
                      +{category.popularSkills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{category.freelancerCount} Available Pros</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore jobs <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
