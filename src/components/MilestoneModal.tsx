import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Send, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Lock,
  Unlock,
  RotateCcw,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Proposal, Milestone, UserProfile, MilestoneStatus } from '../types';
import { InvoiceModal, InvoiceDetails } from './InvoiceModal';

interface MilestoneModalProps {
  proposal: Proposal | null;
  currentUser: UserProfile;
  onClose: () => void;
  onFundMilestone: (proposalId: string, milestoneId: string, amount: number) => void;
  onSubmitMilestoneDeliverable: (proposalId: string, milestoneId: string, notes: string, link: string) => void;
  onReleaseMilestonePayment: (proposalId: string, milestoneId: string, amount: number) => void;
  onRequestMilestoneChanges: (proposalId: string, milestoneId: string, feedback: string) => void;
  onOpenChatWithUser?: (participantId: string, proposalId?: string, projectId?: string) => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  proposal,
  currentUser,
  onClose,
  onFundMilestone,
  onSubmitMilestoneDeliverable,
  onReleaseMilestonePayment,
  onRequestMilestoneChanges,
  onOpenChatWithUser
}) => {
  if (!proposal) return null;

  const milestones: Milestone[] = proposal.milestones || [];
  const isClient = currentUser.role === 'client';

  // Submission State
  const [submittingMilestoneId, setSubmittingMilestoneId] = useState<string | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');

  // Revision State
  const [revisionMilestoneId, setRevisionMilestoneId] = useState<string | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetails | null>(null);

  // Calculations
  const totalBid = proposal.bidAmount;
  const fundedAmount = milestones
    .filter(m => m.status === 'funded' || m.status === 'in_progress' || m.status === 'submitted')
    .reduce((sum, m) => sum + m.amount, 0);
  const releasedAmount = milestones
    .filter(m => m.status === 'released' || m.status === 'approved')
    .reduce((sum, m) => sum + m.amount, 0);
  const pendingAmount = totalBid - (fundedAmount + releasedAmount);

  const completedPercent = totalBid > 0 ? Math.round((releasedAmount / totalBid) * 100) : 0;
  const fundedPercent = totalBid > 0 ? Math.round(((fundedAmount + releasedAmount) / totalBid) * 100) : 0;

  const handleDeliverableSubmit = (milestoneId: string) => {
    if (!submissionNotes.trim()) return;
    onSubmitMilestoneDeliverable(proposal.id, milestoneId, submissionNotes.trim(), submissionLink.trim());
    setSubmittingMilestoneId(null);
    setSubmissionNotes('');
    setSubmissionLink('');
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  const handleReleasePayment = (milestone: Milestone) => {
    onReleaseMilestonePayment(proposal.id, milestone.id, milestone.amount);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
  };

  const handleSendRevision = (milestoneId: string) => {
    if (!revisionFeedback.trim()) return;
    onRequestMilestoneChanges(proposal.id, milestoneId, revisionFeedback.trim());
    setRevisionMilestoneId(null);
    setRevisionFeedback('');
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'released':
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Paid & Released
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
            <Sparkles className="w-3 h-3 text-blue-600" />
            Deliverable Submitted
          </span>
        );
      case 'funded':
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
            <Lock className="w-3 h-3 text-teal-600" />
            Funded in Escrow
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3 h-3 text-slate-400" />
            Awaiting Escrow
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Project Milestone & Escrow Hub</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {proposal.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-md">{proposal.projectTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Financial Escrow Overview Card */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 block">Total Agreed Bid</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900">${totalBid.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-emerald-600 block">Funded in Escrow</span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-700">${fundedAmount.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-blue-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-blue-600 block">Paid & Released</span>
              <span className="text-base sm:text-lg font-extrabold text-blue-700">${releasedAmount.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 block">Remaining Pending</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-700">${Math.max(0, pendingAmount).toLocaleString()}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Overall Escrow & Milestone Completion</span>
              <span className="text-emerald-700">{completedPercent}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-600 transition-all duration-500" 
                style={{ width: `${completedPercent}%` }}
                title={`Released: ${completedPercent}%`}
              />
              <div 
                className="bg-teal-400 transition-all duration-500" 
                style={{ width: `${Math.max(0, fundedPercent - completedPercent)}%` }}
                title={`Funded in escrow: ${fundedPercent - completedPercent}%`}
              />
            </div>
            <div className="flex items-center gap-4 text-[10px] text-slate-500 pt-0.5">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Released to Freelancer
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span> Locked in Safe Escrow
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-200"></span> Pending Phase
              </span>
            </div>
          </div>
        </div>

        {/* Milestone List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Milestone Breakdown ({milestones.length} Phases)
          </h3>

          {milestones.length === 0 ? (
            <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl">
              <p className="text-xs">No individual milestones recorded for this proposal.</p>
            </div>
          ) : (
            milestones.map((ms, index) => {
              const isSubmitting = submittingMilestoneId === ms.id;
              const isRevising = revisionMilestoneId === ms.id;

              return (
                <div 
                  key={ms.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    ms.status === 'submitted'
                      ? 'border-blue-200 bg-blue-50/20'
                      : ms.status === 'released'
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : ms.status === 'funded'
                      ? 'border-teal-200 bg-teal-50/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-400">#{index + 1}</span>
                        <h4 className="text-sm font-bold text-slate-900">{ms.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{ms.description}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                      <span className="text-sm sm:text-base font-extrabold text-emerald-700">
                        ${ms.amount.toLocaleString()}
                      </span>
                      {getStatusBadge(ms.status)}
                    </div>
                  </div>

                  {/* Submission Details Banner if already submitted */}
                  {ms.submissionNotes && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          Freelancer Deliverable Proof:
                        </span>
                        {ms.submittedAt && (
                          <span className="text-[10px]">{new Date(ms.submittedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      <p className="text-slate-700 bg-slate-50 p-2 rounded-lg">{ms.submissionNotes}</p>
                      {ms.submissionLink && (
                        <a
                          href={ms.submissionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold underline text-[11px]"
                        >
                          <span>View Live Work Link / Repository</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Inline Submission Form for Freelancer */}
                  {isSubmitting && (
                    <div className="mt-3 p-4 bg-white rounded-xl border border-emerald-300 shadow-xs space-y-3 animate-in fade-in">
                      <h5 className="text-xs font-bold text-slate-900">Submit Work for Client Approval</h5>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Delivery Notes & Work Summary
                        </label>
                        <textarea
                          rows={2}
                          value={submissionNotes}
                          onChange={(e) => setSubmissionNotes(e.target.value)}
                          placeholder="Summarize what was completed, key highlights, and test notes..."
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-emerald-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Project Staging Link / Repo URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={submissionLink}
                          onChange={(e) => setSubmissionLink(e.target.value)}
                          placeholder="https://staging.myproject.app or https://github.com/..."
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-emerald-500 focus:bg-white"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSubmittingMilestoneId(null)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeliverableSubmit(ms.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-3 h-3" />
                          <span>Submit Deliverable</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Inline Revision Request Form for Client */}
                  {isRevising && (
                    <div className="mt-3 p-4 bg-white rounded-xl border border-amber-300 shadow-xs space-y-3 animate-in fade-in">
                      <h5 className="text-xs font-bold text-slate-900">Request Changes on this Milestone</h5>
                      <textarea
                        rows={2}
                        value={revisionFeedback}
                        onChange={(e) => setRevisionFeedback(e.target.value)}
                        placeholder="Explain specific adjustments or missing criteria before release..."
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-amber-500 focus:bg-white"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setRevisionMilestoneId(null)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendRevision(ms.id)}
                          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Send Revision Request</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Controls Footer per Milestone */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Est. Duration: {ms.deliveryDays} Days
                    </span>

                    <div className="flex items-center gap-2">
                      
                      {/* Completed / Released Milestone: Download Invoice Action */}
                      {(ms.status === 'released' || ms.status === 'approved') && (
                        <button
                          type="button"
                          onClick={() => {
                            const gross = ms.amount;
                            const fee = Math.round(gross * 0.1);
                            const net = gross - fee;
                            const invId = `INV-2026-${(ms.id || `MS${index+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-5).toUpperCase()}`;
                            setSelectedInvoice({
                              invoiceNumber: invId,
                              projectTitle: proposal.projectTitle,
                              projectCategory: proposal.category,
                              projectId: proposal.projectId,
                              milestoneId: ms.id,
                              milestoneTitle: ms.title,
                              milestoneDescription: ms.description,
                              submissionNotes: ms.submissionNotes,
                              clientName: proposal.clientName,
                              freelancerName: isClient ? 'Talent Partner' : currentUser.name,
                              freelancerEmail: isClient ? 'talent@lancly.io' : (currentUser.email || 'nitinisaini2005@gmail.com'),
                              freelancerLocation: isClient ? 'Global' : (currentUser.location || 'Jaipur, RJ'),
                              amount: gross,
                              feeAmount: fee,
                              netAmount: net,
                              releasedDate: ms.releasedAt || proposal.submittedAt
                            });
                          }}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Download Invoice</span>
                        </button>
                      )}

                      {/* Client Action 1: Fund Milestone */}
                      {isClient && ms.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => onFundMilestone(proposal.id, ms.id, ms.amount)}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Deposit ${ms.amount} into Escrow</span>
                        </button>
                      )}

                      {/* Client Action 2: Approve & Release Payment */}
                      {isClient && ms.status === 'submitted' && (
                        <>
                          <button
                            type="button"
                            onClick={() => setRevisionMilestoneId(ms.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                          >
                            Request Changes
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReleasePayment(ms)}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Approve & Release ${ms.amount}</span>
                          </button>
                        </>
                      )}

                      {/* Freelancer Action: Submit Work */}
                      {!isClient && (ms.status === 'funded' || ms.status === 'in_progress') && (
                        <button
                          type="button"
                          onClick={() => {
                            setSubmittingMilestoneId(ms.id);
                            setSubmissionNotes('');
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Submit Phase Deliverables</span>
                        </button>
                      )}

                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Escrow funds are 100% safeguarded until client approval</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenChatWithUser && (
              <button
                type="button"
                onClick={() => {
                  const targetUser = isClient ? proposal.freelancerId : (proposal.clientId || 'user-client-1');
                  onOpenChatWithUser(targetUser, proposal.id, proposal.projectId);
                  onClose();
                }}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Discuss in Chat
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close Hub
            </button>
          </div>
        </div>

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
