import React, { useState } from 'react';
import { 
  Briefcase, 
  Send, 
  Bookmark, 
  User, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  XCircle, 
  Edit3, 
  Save, 
  Trash2, 
  Eye, 
  Sparkles,
  TrendingUp,
  FileText,
  Sliders,
  Award,
  Calendar,
  MessageSquare,
  Layers,
  Lock,
  Unlock,
  ShieldCheck,
  ArrowRight,
  BarChart2,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, Proposal, UserProfile, UserRole, Milestone } from '../types';
import { EarningsOverviewChart } from './EarningsOverviewChart';
import { InvoiceModal, InvoiceDetails } from './InvoiceModal';

interface DashboardViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  projects: Project[];
  proposals: Proposal[];
  onSelectProject: (project: Project) => void;
  onOpenPostProject: () => void;
  onWithdrawProposal: (proposalId: string) => void;
  onUpdateProposalStatus: (proposalId: string, status: 'accepted' | 'rejected' | 'interviewing') => void;
  onToggleSave: (projectId: string) => void;
  savedProjects: Project[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onOpenMilestoneModal?: (proposal: Proposal) => void;
  onOpenChatWithUser?: (participantId: string, proposalId?: string, projectId?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  setUserProfile,
  projects,
  proposals,
  onSelectProject,
  onOpenPostProject,
  onWithdrawProposal,
  onUpdateProposalStatus,
  onToggleSave,
  savedProjects,
  showToast,
  onOpenMilestoneModal,
  onOpenChatWithUser
}) => {
  const isClient = userProfile.role === 'client';
  const [activeTab, setActiveTab] = useState<'contracts' | 'earnings' | 'proposals' | 'posted-projects' | 'saved' | 'profile'>(
    userProfile.role === 'freelancer' ? 'contracts' : 'contracts'
  );
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetails | null>(null);

  // Filter projects posted by current user
  const userPostedProjects = projects.filter(
    p => p.client.name.toLowerCase() === userProfile.name.toLowerCase() || 
         p.client.company.toLowerCase() === (userProfile.companyName || '').toLowerCase()
  );

  // Active contracts / accepted proposals
  const activeContracts = proposals.filter(p => p.status === 'accepted');

  // Profile Edit State
  const [editName, setEditName] = useState(userProfile.name);
  const [editTitle, setEditTitle] = useState(userProfile.title);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editHourlyRate, setEditHourlyRate] = useState(userProfile.hourlyRate);
  const [editExperienceLevel, setEditExperienceLevel] = useState(userProfile.experienceLevel);
  const [editLocation, setEditLocation] = useState(userProfile.location);
  const [editCompany, setEditCompany] = useState(userProfile.companyName);
  const [editSkills, setEditSkills] = useState(userProfile.skills.join(', '));
  const [profileSavedSuccess, setProfileSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = editSkills.split(',').map(s => s.trim()).filter(Boolean);
    
    setUserProfile(prev => ({
      ...prev,
      name: editName,
      title: editTitle,
      bio: editBio,
      hourlyRate: editHourlyRate,
      experienceLevel: editExperienceLevel,
      location: editLocation,
      companyName: editCompany,
      skills: skillsArray
    }));

    setProfileSavedSuccess(true);
    showToast('Profile updated successfully!', 'success');
    setTimeout(() => setProfileSavedSuccess(false), 3000);
  };

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Active Contract / Hired
          </span>
        );
      case 'interviewing':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Interviewing
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Declined
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Under Review
          </span>
        );
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Account Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-xs"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{userProfile.name}</h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                    {userProfile.role} Mode
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-0.5">{userProfile.title}</p>
                <p className="text-xs text-slate-500 mt-1">{userProfile.email} • {userProfile.location}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenPostProject}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Job</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

          </div>

          {/* Financial & Project Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('earnings')}
              className="p-3.5 bg-emerald-50/60 hover:bg-emerald-100/70 transition-all rounded-2xl border border-emerald-200/80 text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  Available Balance
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block mt-0.5">
                ${(userProfile.balance || 0).toLocaleString()}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contracts')}
              className="p-3.5 bg-teal-50/60 hover:bg-teal-100/70 transition-all rounded-2xl border border-teal-200/80 text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-800 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  Escrow Protected
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-teal-700 block mt-0.5">
                ${(userProfile.escrowLocked || 0).toLocaleString()}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('earnings')}
              className="p-3.5 bg-slate-50 hover:bg-emerald-50/40 transition-all rounded-2xl border border-slate-200/80 text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium block">
                  {isClient ? 'Total Spent' : 'Total Earned'}
                </span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block mt-0.5">
                ${(isClient ? userProfile.totalSpent : userProfile.totalEarned || 0).toLocaleString()}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contracts')}
              className="p-3.5 bg-slate-50 hover:bg-slate-100/80 transition-all rounded-2xl border border-slate-200/80 text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium block">Active Contracts</span>
                <Layers className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block mt-0.5">
                {activeContracts.length}
              </span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'contracts'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Active Contracts & Milestones ({activeContracts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'earnings'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Earnings Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'proposals'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>My Submitted Bids ({proposals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('posted-projects')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'posted-projects'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Client Posted Projects ({userPostedProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'saved'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved ({savedProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* Tab: Earnings Overview with Recharts */}
        {activeTab === 'earnings' && (
          <EarningsOverviewChart 
            proposals={proposals} 
            userProfile={userProfile} 
          />
        )}

        {/* Tab 0: Active Contracts & Milestones Tracker */}
        {activeTab === 'contracts' && (
          <div className="space-y-5">
            {/* Quick Earnings Overview CTA Banner */}
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-emerald-800/30">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Freelancer Earnings & Milestone Revenue Analytics</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      Recharts
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Visualize your monthly revenue trajectory, released milestone disbursements, and SafePay escrow pipeline.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('earnings')}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Open Earnings Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeContracts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No active milestone contracts yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When a client accepts a proposal or funds escrow milestones, active contracts will appear here for progress tracking and payments.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {activeContracts.map((contract) => {
                  const milestones = contract.milestones || [];
                  const released = milestones.filter(m => m.status === 'released' || m.status === 'approved').reduce((s, m) => s + m.amount, 0);
                  const funded = milestones.filter(m => m.status === 'funded' || m.status === 'in_progress' || m.status === 'submitted').reduce((s, m) => s + m.amount, 0);
                  const total = contract.bidAmount;
                  const progressPct = total > 0 ? Math.round((released / total) * 100) : 0;

                  return (
                    <div key={contract.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Active Contract
                            </span>
                            <span className="text-xs text-slate-400">
                              Started {new Date(contract.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                            {contract.projectTitle}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onOpenMilestoneModal?.(contract)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Layers className="w-4 h-4" />
                            <span>Milestones & Escrow Hub</span>
                          </button>

                          <button
                            onClick={() => {
                              const targetUser = isClient ? contract.freelancerId : (contract.clientId || 'user-client-1');
                              onOpenChatWithUser?.(targetUser, contract.id, contract.projectId);
                            }}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 text-emerald-600" />
                            <span>Chat</span>
                          </button>
                        </div>
                      </div>

                      {/* Escrow Progress Bar */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-700">Contract Completion: {progressPct}%</span>
                          <span className="text-emerald-700">${released.toLocaleString()} Paid of ${total.toLocaleString()} Total</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                          <div 
                            className="bg-emerald-600 transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          />
                          <div 
                            className="bg-teal-400 transition-all duration-300"
                            style={{ width: `${total > 0 ? (funded / total) * 100 : 0}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span>{milestones.length} Milestone Phases Defined</span>
                          <span>Escrow Locked: ${funded.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Milestone List Snapshot */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Phase Progression
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {milestones.map((ms, idx) => {
                            const isCompleted = ms.status === 'released' || ms.status === 'approved';
                            return (
                              <div key={ms.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-2">
                                <div className="truncate min-w-0">
                                  <p className="font-bold text-slate-900 truncate">#{idx + 1} {ms.title}</p>
                                  <p className="text-[10px] text-slate-400 capitalize">{ms.status.replace('_', ' ')}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="font-extrabold text-emerald-700">${ms.amount}</span>
                                  {isCompleted && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const gross = ms.amount;
                                        const fee = Math.round(gross * 0.1);
                                        const net = gross - fee;
                                        const invId = `INV-2026-${(ms.id || `MS${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-5).toUpperCase()}`;
                                        setSelectedInvoice({
                                          invoiceNumber: invId,
                                          projectTitle: contract.projectTitle,
                                          projectCategory: contract.category,
                                          projectId: contract.projectId,
                                          milestoneId: ms.id,
                                          milestoneTitle: ms.title,
                                          milestoneDescription: ms.description,
                                          submissionNotes: ms.submissionNotes,
                                          clientName: contract.clientName,
                                          freelancerName: userProfile.role === 'freelancer' ? userProfile.name : 'Talent Partner',
                                          freelancerEmail: userProfile.role === 'freelancer' ? userProfile.email : 'nitinisaini2005@gmail.com',
                                          freelancerLocation: userProfile.role === 'freelancer' ? (userProfile.location || 'Jaipur, RJ') : 'Jaipur, RJ',
                                          amount: gross,
                                          feeAmount: fee,
                                          netAmount: net,
                                          releasedDate: ms.releasedAt || contract.submittedAt
                                        });
                                      }}
                                      title="Download Printable Milestone Invoice"
                                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                      <Download className="w-3 h-3" />
                                      <span>Invoice</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Submitted Proposals */}
        {activeTab === 'proposals' && (
          <div className="space-y-4">
            {proposals.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No proposals submitted yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Explore open project listings and submit tailored proposals with custom milestones and timelines.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {proposals.map((prop) => {
                  const targetProject = projects.find(p => p.id === prop.projectId);

                  return (
                    <div
                      key={prop.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {prop.category}
                            </span>
                            <span className="text-xs text-slate-400">
                              Submitted {new Date(prop.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {prop.projectTitle}
                          </h3>
                        </div>

                        <div>
                          {getStatusBadge(prop.status)}
                        </div>
                      </div>

                      {/* Proposal details row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 block">Offered Bid</span>
                          <span className="text-emerald-700 font-extrabold text-sm">${prop.bidAmount}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Estimated Timeline</span>
                          <span className="text-slate-800 font-bold text-sm">{prop.deliveryDays} Days</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Client</span>
                          <span className="text-slate-800 font-bold text-sm">{prop.clientName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Milestone Phases</span>
                          <span className="text-slate-800 font-bold text-sm">{prop.milestones?.length || 0} Phases</span>
                        </div>
                      </div>

                      {/* Cover Letter excerpt */}
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Cover Letter & Strategy
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                          "{prop.coverLetter}"
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-3">
                          {targetProject && (
                            <button
                              onClick={() => onSelectProject(targetProject)}
                              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Listing</span>
                            </button>
                          )}

                          <button
                            onClick={() => onOpenMilestoneModal?.(prop)}
                            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Inspect Milestones</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const targetUser = isClient ? prop.freelancerId : (prop.clientId || 'user-client-1');
                              onOpenChatWithUser?.(targetUser, prop.id, prop.projectId);
                            }}
                            className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Message Client</span>
                          </button>

                          {prop.status !== 'accepted' && (
                            <button
                              onClick={() => onWithdrawProposal(prop.id)}
                              className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Withdraw</span>
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Posted Projects (Client Management) */}
        {activeTab === 'posted-projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Manage Your Posted Projects & Review Applicants</h3>
              <button
                onClick={onOpenPostProject}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Job</span>
              </button>
            </div>

            {userPostedProjects.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">You haven't posted any projects yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Post a freelance project with your requirements and receive proposals within minutes.
                </p>
                <button
                  onClick={onOpenPostProject}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm cursor-pointer"
                >
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userPostedProjects.map((proj) => {
                  const projectProposals = proposals.filter(pr => pr.projectId === proj.id);

                  return (
                    <div key={proj.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                              {proj.category}
                            </span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              Status: {proj.status.toUpperCase()}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mt-1">{proj.title}</h4>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-extrabold text-emerald-700 block">
                            ${proj.budgetMin} - ${proj.budgetMax}
                          </span>
                          <span className="text-[11px] text-slate-400">Deadline: {proj.deadline}</span>
                        </div>
                      </div>

                      {/* Proposals Applicants List */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Applicants & Bids ({projectProposals.length})
                          </h5>
                        </div>

                        {projectProposals.length === 0 ? (
                          <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500 border border-slate-100">
                            No bids received on this project yet.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {projectProposals.map((pr) => (
                              <div key={pr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <img src={pr.freelancerAvatar} alt={pr.freelancerName} className="w-10 h-10 rounded-xl object-cover" />
                                    <div>
                                      <h6 className="text-xs font-bold text-slate-900">{pr.freelancerName}</h6>
                                      <p className="text-[11px] text-slate-500">{pr.freelancerEmail}</p>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <span className="text-xs font-extrabold text-emerald-700 block">${pr.bidAmount}</span>
                                    <span className="text-[10px] text-slate-400">{pr.deliveryDays} Days timeline • {pr.milestones?.length || 0} Phases</span>
                                  </div>
                                </div>

                                <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100">
                                  "{pr.coverLetter}"
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                  <div className="flex items-center gap-2">
                                    {getStatusBadge(pr.status)}
                                    <button
                                      type="button"
                                      onClick={() => onOpenMilestoneModal?.(pr)}
                                      className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1 cursor-pointer"
                                    >
                                      <Layers className="w-3 h-3" />
                                      <span>View Milestones</span>
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => onOpenChatWithUser?.(pr.freelancerId, pr.id, pr.projectId)}
                                      className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Message</span>
                                    </button>

                                    {pr.status !== 'accepted' && (
                                      <>
                                        <button
                                          onClick={() => {
                                            onUpdateProposalStatus(pr.id, 'accepted');
                                            confetti({ particleCount: 70, spread: 60 });
                                            showToast(`Accepted ${pr.freelancerName}'s proposal!`, 'success');
                                          }}
                                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                                        >
                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                          <span>Accept & Fund</span>
                                        </button>
                                        <button
                                          onClick={() => {
                                            onUpdateProposalStatus(pr.id, 'rejected');
                                            showToast(`Declined proposal.`, 'info');
                                          }}
                                          className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                                        >
                                          Decline
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Projects */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedProjects.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No saved projects</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Bookmark interesting projects from the listing page to review and apply to them later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {savedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                          {project.category}
                        </span>
                        <button
                          onClick={() => onToggleSave(project.id)}
                          className="text-emerald-600 hover:text-slate-400 p-1"
                          title="Remove bookmark"
                        >
                          <Bookmark className="w-4 h-4 fill-emerald-600" />
                        </button>
                      </div>

                      <h4 
                        onClick={() => onSelectProject(project)}
                        className="text-base font-bold text-slate-900 hover:text-emerald-600 cursor-pointer mb-2"
                      >
                        {project.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-3">
                        <span className="text-emerald-700">
                          ${project.budgetMin} - ${project.budgetMax}
                        </span>
                        <span className="text-slate-400 font-normal">Due: {project.deadline}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="w-full py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      View & Submit Bid
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-3xl">
            <h3 className="text-base font-bold text-slate-900 mb-1">Freelancer & Client Profile Settings</h3>
            <p className="text-xs text-slate-500 mb-6">Manage your marketplace identity, rates, and skills.</p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    required
                    className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Hourly Rate ($/hr)</label>
                  <input
                    type="number"
                    min={10}
                    value={editHourlyRate}
                    onChange={(e) => setEditHourlyRate(Number(e.target.value))}
                    required
                    className="w-full p-2.5 bg-slate-50 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Experience Level</label>
                  <select
                    value={editExperienceLevel}
                    onChange={(e) => setEditExperienceLevel(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Company / Studio Name</label>
                <input
                  type="text"
                  value={editCompany}
                  onChange={(e) => setEditCompany(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={editSkills}
                  onChange={(e) => setEditSkills(e.target.value)}
                  placeholder="React, TypeScript, Tailwind CSS, Node.js"
                  className="w-full p-2.5 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Short Bio & Introduction</label>
                <textarea
                  rows={4}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3 bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Details</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};
