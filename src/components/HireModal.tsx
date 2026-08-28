import React, { useState } from 'react';
import { X, Zap, DollarSign, Calendar, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Freelancer, Project } from '../types';

interface HireModalProps {
  freelancer: Freelancer | null;
  onClose: () => void;
  userProjects: Project[];
  onSendHireRequest: (freelancerName: string, projectTitle: string, amount: number, message: string) => void;
}

export const HireModal: React.FC<HireModalProps> = ({
  freelancer,
  onClose,
  userProjects,
  onSendHireRequest
}) => {
  if (!freelancer) return null;

  const [projectTitle, setProjectTitle] = useState(userProjects[0]?.title || '');
  const [budget, setBudget] = useState<number>(freelancer.hourlyRate * 20);
  const [message, setMessage] = useState(`Hi ${freelancer.name},\n\nWe were really impressed by your profile and past portfolio. We would love to invite you to discuss our upcoming project.`);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim()) {
      setErrorMsg('Please specify or select a project title.');
      return;
    }
    if (!budget || budget <= 0) {
      setErrorMsg('Please provide a valid budget amount.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please write an invitation message.');
      return;
    }

    setIsSubmitting(true);
    onSendHireRequest(freelancer.name, projectTitle, budget, message);
    
    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.6 }
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={freelancer.avatar} alt={freelancer.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Direct Hire / Invite</h3>
              <p className="text-xs text-emerald-700 font-medium">{freelancer.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Select or Name Your Project</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Modern Web Application Development"
              required
              className="w-full p-3 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Proposed Initial Budget ($ USD)</label>
            <div className="relative">
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                min={10}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
              />
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Freelancer standard rate: ${freelancer.hourlyRate}/hour</p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Invitation Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Send Project Invitation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
