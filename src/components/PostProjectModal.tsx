import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  DollarSign, 
  Calendar, 
  Clock, 
  Tag, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  Layers, 
  Plus, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, Category, UserProfile } from '../types';

interface PostProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  userProfile: UserProfile;
  onProjectCreated: (newProject: Project) => void;
}

export const PostProjectModal: React.FC<PostProjectModalProps> = ({
  isOpen,
  onClose,
  categories,
  userProfile,
  onProjectCreated
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Web & App Development');
  const [budgetType, setBudgetType] = useState<'fixed' | 'hourly'>('fixed');
  const [budgetMin, setBudgetMin] = useState<number>(1000);
  const [budgetMax, setBudgetMax] = useState<number>(2500);
  const [experienceLevel, setExperienceLevel] = useState<'Entry Level' | 'Intermediate' | 'Expert'>('Intermediate');
  const [estimatedDuration, setEstimatedDuration] = useState('2-3 Weeks');
  const [deadline, setDeadline] = useState('2026-10-15');
  const [scope, setScope] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Tailwind CSS']);
  const [skillInput, setSkillInput] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Clean, commented source code with modular architecture',
    'Responsive layouts verified across mobile and desktop devices'
  ]);
  const [deliverableInput, setDeliverableInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddDeliverable = () => {
    if (deliverableInput.trim()) {
      setDeliverables([...deliverables, deliverableInput.trim()]);
      setDeliverableInput('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || title.trim().length < 10) {
      setErrorMsg('Project title must be at least 10 characters long.');
      return;
    }
    if (!description.trim() || description.trim().length < 30) {
      setErrorMsg('Please write a detailed project description (at least 30 characters).');
      return;
    }
    if (skills.length === 0) {
      setErrorMsg('Please add at least one required skill.');
      return;
    }
    if (budgetMin <= 0 || budgetMax < budgetMin) {
      setErrorMsg('Please enter a valid budget range where max is greater than or equal to min.');
      return;
    }

    setIsSubmitting(true);

    const newProject: Project = {
      id: 'proj-' + Date.now(),
      title: title.trim(),
      category,
      categorySlug: category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      budgetType,
      budgetMin,
      budgetMax,
      description: description.slice(0, 180) + '...',
      fullDescription: description.trim(),
      requiredSkills: skills,
      deadline,
      estimatedDuration,
      experienceLevel,
      client: {
        name: userProfile.name,
        company: userProfile.companyName || userProfile.name + ' Studio',
        avatar: userProfile.avatar,
        location: userProfile.location || 'United States',
        rating: 5.0,
        reviewsCount: 1,
        totalSpent: budgetMax,
        hireRate: 100,
        memberSince: 'Just now',
        paymentVerified: true
      },
      status: 'open',
      proposalsCount: 0,
      featured: true,
      createdAt: new Date().toISOString(),
      deliverables: deliverables.length > 0 ? deliverables : undefined,
      scope
    };

    onProjectCreated(newProject);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Post a New Freelance Project</h2>
              <p className="text-xs text-slate-500">Reach thousands of top-rated talent worldwide</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Project Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Project Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build an E-Commerce Next.js App with Stripe and Tailwind"
              required
              className="w-full p-3 bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Category & Scope */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Category <span className="text-rose-500">*</span></label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none cursor-pointer font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Project Scope</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {(['Small', 'Medium', 'Large'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScope(s)}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      scope === s ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Type and Budget Range */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Budget Configuration</label>
              <div className="inline-flex p-0.5 bg-slate-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => setBudgetType('fixed')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    budgetType === 'fixed' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Fixed Price ($)
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetType('hourly')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    budgetType === 'hourly' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Hourly Rate ($/hr)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Minimum ({budgetType === 'fixed' ? '$' : '$/hr'})</label>
                <input
                  type="number"
                  min={10}
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full p-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Maximum ({budgetType === 'fixed' ? '$' : '$/hr'})</label>
                <input
                  type="number"
                  min={10}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full p-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Experience Level & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Estimated Duration</label>
              <input
                type="text"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                placeholder="e.g. 3-4 Weeks"
                className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Project Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Required Skills Tagging */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Required Skills & Technologies <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Type a skill and press Enter (e.g. React, Figma, Python)..."
                className="flex-1 p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="text-emerald-500 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Project Description & Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project goals, technical expectations, workflow, and what success looks like..."
              required
              className="w-full p-3 bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Key Deliverables */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Deliverables Checklist</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                placeholder="Add a milestone deliverable..."
                className="flex-1 p-2 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 outline-none"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                + Add
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <span>{item}</span>
                  <button type="button" onClick={() => handleRemoveDeliverable(idx)} className="text-rose-400 hover:text-rose-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing Job...' : 'Publish Project Listing Now'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
