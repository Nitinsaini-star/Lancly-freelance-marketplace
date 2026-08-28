import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Star, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Bookmark, 
  AlertCircle,
  FileText,
  User,
  Mail,
  Layers,
  Award,
  Check,
  Plus,
  Trash2,
  MessageSquare,
  Zap,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, Proposal, UserProfile, Milestone } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  userProfile: UserProfile;
  onSubmitProposal: (proposalData: Omit<Proposal, 'id' | 'submittedAt' | 'status'>) => void;
  isSaved: boolean;
  onToggleSave: (projectId: string) => void;
  existingProposals: Proposal[];
  onOpenDirectChat?: (participantId: string, projectId?: string, projectTitle?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  userProfile,
  onSubmitProposal,
  isSaved,
  onToggleSave,
  existingProposals,
  onOpenDirectChat
}) => {
  if (!project) return null;

  const [activeModalTab, setActiveModalTab] = useState<'details' | 'proposal'>('details');
  
  // Proposal form state
  const [freelancerName, setFreelancerName] = useState(userProfile.name);
  const [freelancerEmail, setFreelancerEmail] = useState(userProfile.email);
  const [bidAmount, setBidAmount] = useState<number>(
    project.budgetType === 'fixed' ? (project.budgetMin || 1000) : 55
  );
  const [deliveryDays, setDeliveryDays] = useState<number>(14);
  const [coverLetter, setCoverLetter] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Milestones
  const [customMilestones, setCustomMilestones] = useState<Omit<Milestone, 'id' | 'status'>[]>([
    {
      title: 'Phase 1: Architecture, Wireframes & Setup',
      description: 'Initial system scaffolding, design token mapping, and core requirements baseline.',
      amount: Math.round(bidAmount * 0.4),
      deliveryDays: Math.max(2, Math.round(deliveryDays * 0.35))
    },
    {
      title: 'Phase 2: Core Implementation & Integrations',
      description: 'Main feature development, interactive components, and primary data workflows.',
      amount: Math.round(bidAmount * 0.4),
      deliveryDays: Math.max(3, Math.round(deliveryDays * 0.45))
    },
    {
      title: 'Phase 3: Testing, Polishing & Handover',
      description: 'Final QA validation, responsive polishing, documentation, and production launch handover.',
      amount: Math.round(bidAmount * 0.2),
      deliveryDays: Math.max(1, Math.round(deliveryDays * 0.2))
    }
  ]);

  // Platform fee calculation (10%)
  const platformFee = Math.round(bidAmount * 0.1);
  const netEarnings = Math.max(0, bidAmount - platformFee);

  // Sum of custom milestones
  const milestoneTotalSum = customMilestones.reduce((acc, m) => acc + (Number(m.amount) || 0), 0);
  const milestoneSumMatches = milestoneTotalSum === bidAmount;

  // Auto distribute milestones to match bid amount
  const handleAutoDistributeMilestones = () => {
    if (customMilestones.length === 0) return;
    const count = customMilestones.length;
    const perMilestone = Math.floor(bidAmount / count);
    const remainder = bidAmount - (perMilestone * count);

    setCustomMilestones(prev => 
      prev.map((m, idx) => ({
        ...m,
        amount: idx === 0 ? perMilestone + remainder : perMilestone
      }))
    );
  };

  const handleAddMilestone = () => {
    const remaining = Math.max(0, bidAmount - milestoneTotalSum);
    setCustomMilestones(prev => [
      ...prev,
      {
        title: `Phase ${prev.length + 1}: Additional Scope Deliverable`,
        description: 'Complete deliverables for this scheduled project phase.',
        amount: remaining > 0 ? remaining : 200,
        deliveryDays: 3
      }
    ]);
  };

  const handleRemoveMilestone = (index: number) => {
    if (customMilestones.length <= 1) return;
    setCustomMilestones(prev => prev.filter((_, i) => i !== index));
  };

  const handleMilestoneChange = (index: number, field: keyof Omit<Milestone, 'id' | 'status'>, value: any) => {
    setCustomMilestones(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };

  const applyCoverLetterTemplate = (templateType: 'expert' | 'speed' | 'fullstack') => {
    if (templateType === 'expert') {
      setCoverLetter(`Hi ${project.client.company || project.client.name},

I have extensive experience building scalable solutions tailored to ${project.category}. I have reviewed your requirements for "${project.title}" and can execute this with bulletproof code quality and clean architecture.

Key Highlights:
- Proficient in all required technologies: ${project.requiredSkills.slice(0, 4).join(', ')}
- Rigorous automated testing and responsive pixel-perfect implementation
- Transparent milestone updates with staging previews

Looking forward to collaborating with your team!`);
    } else if (templateType === 'speed') {
      setCoverLetter(`Hello!

I can deliver "${project.title}" rapidly within ${deliveryDays} days without compromising quality. I have ready-made patterns and architectures that allow me to start immediately and push regular staging updates.

Let's schedule a brief discussion so I can begin Phase 1 right away!`);
    } else {
      setCoverLetter(`Hi ${project.client.name},

I specialize in full-cycle digital development from architecture to deployment. For "${project.title}", I have broken down the timeline into ${customMilestones.length} verifiable phases to give you full visibility and escrow protection.

I am ready to get started immediately.`);
    }
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!freelancerName.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!freelancerEmail.trim() || !freelancerEmail.includes('@')) {
      setErrorMsg('Please provide a valid contact email.');
      return;
    }
    if (!coverLetter.trim() || coverLetter.trim().length < 25) {
      setErrorMsg('Please write a detailed cover letter (at least 25 characters) explaining why you are the best fit.');
      return;
    }
    if (!bidAmount || bidAmount <= 0) {
      setErrorMsg('Please enter a valid bid amount.');
      return;
    }
    if (!deliveryDays || deliveryDays <= 0) {
      setErrorMsg('Please enter valid estimated delivery days.');
      return;
    }

    // Prepare full milestones
    const finalizedMilestones: Milestone[] = customMilestones.map((m, idx) => ({
      id: `ms-${Date.now()}-${idx}`,
      title: m.title.trim() || `Milestone ${idx + 1}`,
      description: m.description.trim() || 'Milestone phase deliverable.',
      amount: Number(m.amount) || 100,
      deliveryDays: Number(m.deliveryDays) || 3,
      status: 'pending'
    }));

    setIsSubmitting(true);

    try {
      onSubmitProposal({
        projectId: project.id,
        projectTitle: project.title,
        category: project.category,
        clientName: project.client.name,
        clientId: 'user-client-1',
        freelancerId: userProfile.id,
        freelancerName: freelancerName.trim(),
        freelancerEmail: freelancerEmail.trim(),
        freelancerAvatar: userProfile.avatar,
        coverLetter: coverLetter.trim(),
        bidAmount,
        deliveryDays,
        milestones: finalizedMilestones,
        escrowFundedAmount: 0,
        releasedAmount: 0
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Something went wrong submitting your proposal. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {project.category}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {project.experienceLevel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDirectChat && (
              <button
                type="button"
                onClick={() => {
                  onOpenDirectChat('user-client-1', project.id, project.title);
                  onClose();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message Client</span>
              </button>
            )}

            <button
              onClick={() => onToggleSave(project.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                  : 'bg-white hover:bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save project'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs (Details vs Submit Proposal) */}
        <div className="px-6 pt-2 bg-white border-b border-slate-100 flex items-center gap-4">
          <button
            onClick={() => setActiveModalTab('details')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeModalTab === 'details'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Project Details & Scope
          </button>
          <button
            onClick={() => setActiveModalTab('proposal')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeModalTab === 'proposal'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Proposal & Milestones</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {activeModalTab === 'details' ? (
            <div className="space-y-6">
              
              {/* Title & Key Stats */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
                  {project.title}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Client Budget</span>
                    <span className="text-emerald-700 font-extrabold text-sm sm:text-base">
                      {project.budgetType === 'fixed' 
                        ? `$${project.budgetMin.toLocaleString()} - $${project.budgetMax.toLocaleString()}`
                        : `$${project.budgetMin} - $${project.budgetMax}/hr`
                      }
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Duration</span>
                    <span className="text-slate-800 font-bold text-sm sm:text-base flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {project.estimatedDuration}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Project Deadline</span>
                    <span className="text-slate-800 font-bold text-sm sm:text-base flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {project.deadline}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Proposals</span>
                    <span className="text-slate-800 font-bold text-sm sm:text-base">
                      {project.proposalsCount} Submitted
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Full Project Description
                </h3>
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-100">
                  {project.fullDescription || project.description}
                </div>
              </div>

              {/* Deliverables Checklist */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Expected Deliverables & Scope
                  </h3>
                  <div className="space-y-2">
                    {project.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Skills */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Required Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Verification Information Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  About the Client
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.client.avatar}
                      alt={project.client.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900">{project.client.company || project.client.name}</span>
                        {project.client.paymentVerified && (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          ★ {project.client.rating} ({project.client.reviewsCount} reviews)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {project.client.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs text-slate-600">
                    <p className="font-bold text-slate-900">${project.client.totalSpent.toLocaleString()}+ total spent</p>
                    <p className="text-slate-400">Member since {project.client.memberSince}</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Proposal & Milestone Bidding Form */
            <form onSubmit={handleProposalSubmit} className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-1">
                  <p className="font-bold">Project Bidding & Milestone Agreement</p>
                  <p className="text-emerald-700 leading-relaxed">
                    Set your own offered budget and delivery timeline. Divide the contract into verifiable milestone phases with escrow payments.
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={freelancerName}
                      onChange={(e) => setFreelancerName(e.target.value)}
                      placeholder="e.g. Nitin Saini"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Contact Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={freelancerEmail}
                      onChange={(e) => setFreelancerEmail(e.target.value)}
                      placeholder="e.g. nitinisaini2005@gmail.com"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Custom Bid Amount and Delivery Days */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Your Proposed Total Bid ($ USD) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={10}
                      value={bidAmount}
                      onChange={(e) => {
                        const newBid = Number(e.target.value);
                        setBidAmount(newBid);
                      }}
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-white text-slate-900 font-bold text-sm sm:text-base rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>10% Lancly escrow fee: -${platformFee}</span>
                    <span className="font-bold text-emerald-700">Take-home: ${netEarnings}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Your Proposed Delivery Timeline (Days) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={180}
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(Number(e.target.value))}
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-white text-slate-900 font-bold text-sm sm:text-base rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                    />
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">
                    Client's target deadline is <span className="font-semibold text-slate-800">{project.deadline}</span>
                  </p>
                </div>
              </div>

              {/* Milestone Breakdown Builder */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      Milestone Phases Breakdown ({customMilestones.length} Phases)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Clients release escrow payments as each milestone phase is delivered and approved.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAutoDistributeMilestones}
                      className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Balance Sum
                    </button>
                    <button
                      type="button"
                      onClick={handleAddMilestone}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Phase</span>
                    </button>
                  </div>
                </div>

                {/* Milestone Items List */}
                <div className="space-y-3">
                  {customMilestones.map((milestone, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-extrabold">
                            {idx + 1}
                          </span>
                          Phase Title
                        </span>
                        {customMilestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMilestone(idx)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove Milestone"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={milestone.title}
                            onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                            placeholder="e.g. Wireframes & Architecture Setup"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-emerald-500 outline-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <input
                              type="number"
                              min={10}
                              value={milestone.amount}
                              onChange={(e) => handleMilestoneChange(idx, 'amount', Number(e.target.value))}
                              placeholder="Amount $"
                              className="w-full pl-6 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-800 focus:border-emerald-500 outline-none"
                              required
                            />
                            <span className="absolute left-2 top-2 text-[11px] text-slate-400 font-bold">$</span>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              min={1}
                              value={milestone.deliveryDays}
                              onChange={(e) => handleMilestoneChange(idx, 'deliveryDays', Number(e.target.value))}
                              placeholder="Days"
                              className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:border-emerald-500 outline-none text-right"
                              required
                            />
                            <span className="absolute right-2 top-2 text-[10px] text-slate-400 pointer-events-none">d</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={milestone.description}
                          onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                          placeholder="Scope of work and deliverables included in this phase..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Milestone Summary & Balance Verification */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">Milestones Total:</span>
                    <span className={`font-extrabold ${milestoneSumMatches ? 'text-emerald-700' : 'text-amber-700'}`}>
                      ${milestoneTotalSum.toLocaleString()} / ${bidAmount.toLocaleString()}
                    </span>
                    {milestoneSumMatches ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <Check className="w-3 h-3" /> Balanced
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-700 font-bold">
                        (Diff: ${Math.abs(bidAmount - milestoneTotalSum)})
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>SafePay Escrow</span>
                  </div>
                </div>
              </div>

              {/* Cover Letter with Template Shortcuts */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Cover Letter & Solution Proposal <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Starters:</span>
                    <button
                      type="button"
                      onClick={() => applyCoverLetterTemplate('expert')}
                      className="text-[10px] font-bold text-emerald-700 hover:underline bg-emerald-50 px-2 py-0.5 rounded"
                    >
                      Expert Pitch
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoverLetterTemplate('speed')}
                      className="text-[10px] font-bold text-teal-700 hover:underline bg-teal-50 px-2 py-0.5 rounded"
                    >
                      Fast Sprint
                    </button>
                  </div>
                </div>
                <textarea
                  rows={5}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce your relevant experience, proposed technical approach, and how you will deliver each milestone phase..."
                  required
                  className="w-full p-3.5 bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Proposal...' : `Submit Proposal with ${customMilestones.length} Milestones ($${bidAmount})`}</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Modal Bottom Sticky Actions */}
        {activeModalTab === 'details' && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-900">{project.client.company || project.client.name}</span> is accepting bids now.
            </div>

            <button
              onClick={() => setActiveModalTab('proposal')}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Apply & Submit Bidding Proposal</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
