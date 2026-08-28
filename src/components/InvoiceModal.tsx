import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  User, 
  Calendar, 
  FileText, 
  DollarSign, 
  Briefcase,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export interface InvoiceDetails {
  invoiceNumber: string;
  projectTitle: string;
  projectCategory?: string;
  projectId?: string;
  milestoneId: string;
  milestoneTitle: string;
  milestoneDescription?: string;
  submissionNotes?: string;
  clientName: string;
  clientEmail?: string;
  freelancerName: string;
  freelancerEmail?: string;
  freelancerLocation?: string;
  amount: number;
  feeAmount: number;
  netAmount: number;
  releasedDate: string; // e.g. '2026-08-28' or ISO
}

interface InvoiceModalProps {
  invoice: InvoiceDetails | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `LANCLY MILESTONE PAYMENT INVOICE\nInvoice #: ${invoice.invoiceNumber}\nProject: ${invoice.projectTitle}\nMilestone: ${invoice.milestoneTitle}\nClient: ${invoice.clientName}\nFreelancer: ${invoice.freelancerName}\nDate: ${new Date(invoice.releasedDate).toLocaleDateString()}\nGross Amount: $${invoice.amount}\nEscrow Fee (10%): -$${invoice.feeAmount}\nNet Payout: $${invoice.netAmount}\nStatus: Paid & Released via Lancly SafePay Escrow`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(invoice.releasedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      
      {/* Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="print:hidden px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Official Milestone Payment Invoice</h3>
              <p className="text-[11px] text-slate-400">Reference: {invoice.invoiceNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              type="button"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy Summary text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              type="button"
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Area */}
        <div ref={printableRef} className="p-8 sm:p-10 space-y-8 bg-white text-slate-900">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                  L
                </div>
                <div>
                  <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                    Lanc<span className="text-emerald-600">ly</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 ml-2">
                    SafePay Escrow
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Lancly Technologies Inc. • Global Freelance Escrow Services
              </p>
              <p className="text-xs text-slate-400">
                100 Innovation Way, Suite 400 • San Francisco, CA 94105
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Tax & Payment Receipt
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {invoice.invoiceNumber}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paid & Released</span>
              </div>
            </div>
          </div>

          {/* Metadata Grid (Dates, Parties) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
            
            {/* Client Info */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                Billed To (Client)
              </span>
              <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{invoice.clientName}</span>
              </div>
              <p className="text-slate-500">
                {invoice.clientEmail || 'client.verified@lancly.marketplace'}
              </p>
              <p className="text-[11px] text-slate-400">
                Account Status: Verified Payment Method
              </p>
            </div>

            {/* Freelancer Info */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                Service Provider (Freelancer)
              </span>
              <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                <User className="w-4 h-4 text-teal-600" />
                <span>{invoice.freelancerName}</span>
              </div>
              <p className="text-slate-500">
                {invoice.freelancerEmail || 'nitinisaini2005@gmail.com'}
              </p>
              <p className="text-[11px] text-slate-400">
                Location: {invoice.freelancerLocation || 'Jaipur, RJ'} • Disbursed: {formattedDate}
              </p>
            </div>

          </div>

          {/* Project & Milestone Details Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Milestone Contract Itemization
              </span>
              <span className="text-xs text-slate-500">
                Payment Channel: <strong className="text-slate-700">SafePay Escrow</strong>
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Description & Project</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 px-4 space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {invoice.milestoneTitle}
                      </div>
                      <div className="text-slate-600 font-medium flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-600 inline" />
                        <span>Project: {invoice.projectTitle}</span>
                        {invoice.projectCategory && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold ml-1">
                            {invoice.projectCategory}
                          </span>
                        )}
                      </div>
                      {invoice.milestoneDescription && (
                        <p className="text-slate-500 text-[11px] pt-1">
                          Scope: {invoice.milestoneDescription}
                        </p>
                      )}
                      {invoice.submissionNotes && (
                        <p className="text-slate-500 text-[11px] italic bg-slate-50 p-2 rounded-lg mt-1">
                          Deliverable verification: "{invoice.submissionNotes}"
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center align-top">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Approved & Released
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right align-top font-extrabold text-slate-900 text-sm">
                      ${invoice.amount.toLocaleString()}.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calculation Breakdown Box */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-2">
            <div className="text-xs text-slate-500 space-y-2 max-w-sm">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Lancly Escrow Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                This document certifies that the above milestone phase deliverables were formally submitted by the freelancer, inspected, and approved for final escrow fund release by the client.
              </p>
            </div>

            <div className="w-full sm:w-72 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Milestone Gross Value:</span>
                <span className="font-bold text-slate-900">${invoice.amount.toLocaleString()}.00</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Lancly Escrow Fee (10%):</span>
                <span className="font-semibold text-rose-600">-${invoice.feeAmount.toLocaleString()}.00</span>
              </div>

              <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-slate-900">
                <span className="text-emerald-800">Net Disbursed Payout:</span>
                <span className="text-base text-emerald-700">${invoice.netAmount.toLocaleString()}.00</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>Transaction ID: tx_safe_{invoice.milestoneId.replace(/[^a-zA-Z0-9]/g, '')}_{Date.now().toString().slice(-4)}</span>
            <span>Generated electronically by Lancly Technologies Inc.</span>
          </div>

        </div>

        {/* Modal Bottom Actions (Hidden on print) */}
        <div className="print:hidden px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Print or export as PDF for accounting and tax records.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print Invoice</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
