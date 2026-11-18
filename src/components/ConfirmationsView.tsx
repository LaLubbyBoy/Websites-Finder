import React from 'react';
import { Send, CheckCircle2, Clock, Mail, ExternalLink, Building2 } from 'lucide-react';
import { GmailConfirmation } from '../types';

interface ConfirmationsViewProps {
  confirmations: GmailConfirmation[];
}

export const ConfirmationsView: React.FC<ConfirmationsViewProps> = ({ confirmations }) => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 border border-emerald-500/20 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
          <Send className="w-3.5 h-3.5 text-emerald-400" />
          <span>Automatic Gmail Confirmation System</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Gmail Confirmation Reports to amaudeaghablessing20@gmail.com
        </h1>
        <p className="text-slate-300 text-sm">
          After every successful cold email submission, a detailed audit report containing company information, delivery status, email reference ID, and research metrics is automatically dispatched to <span className="text-emerald-400 font-semibold">amaudeaghablessing20@gmail.com</span>.
        </p>
      </div>

      {/* Confirmations List */}
      <div className="space-y-6">
        {confirmations.map((conf) => (
          <div
            key={conf.id}
            className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                    <span>Successfully Dispatched to Gmail</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{conf.subject}</h2>
                </div>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-300">Target Inbox:</strong> {conf.to}</div>
                <div><strong className="text-slate-300">Timestamp:</strong> {new Date(conf.sentAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmation Report Body & Audit Payload</h3>
              <pre className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {conf.body}
              </pre>
            </div>
          </div>
        ))}

        {confirmations.length === 0 && (
          <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-16 text-center space-y-4">
            <Send className="w-16 h-16 mx-auto text-slate-600 opacity-50" />
            <h3 className="text-lg font-bold text-white">No Confirmation Reports Yet</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Send your first approved cold email to a discovered company to trigger the automatic audit report delivery to <span className="text-emerald-400 font-semibold">amaudeaghablessing20@gmail.com</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
