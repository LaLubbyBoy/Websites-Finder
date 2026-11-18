import React, { useState } from 'react';
import { Mail, Send, Sparkles, CheckCircle2, Loader2, RefreshCw, Edit3, Building2 } from 'lucide-react';
import { Company, BusinessProfile } from '../types';

interface ColdEmailViewProps {
  companies: Company[];
  profile: BusinessProfile;
  onEmailSent: () => void;
  preselectedCompany?: Company | null;
}

export const ColdEmailView: React.FC<ColdEmailViewProps> = ({
  companies,
  profile,
  onEmailSent,
  preselectedCompany,
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    preselectedCompany ? preselectedCompany.id : (companies[0]?.id || '')
  );
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const handleGenerate = async (comp?: Company) => {
    const target = comp || currentCompany;
    if (!target) return;
    setIsGenerating(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: target, profile })
      });
      const data = await res.json();
      if (data.success && data.email) {
        setSubject(data.email.subject);
        setBody(data.email.body);
      } else {
        throw new Error(data.error || 'Failed to generate email');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error generating email');
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    if (currentCompany && !subject) {
      handleGenerate(currentCompany);
    }
  }, [selectedCompanyId]);

  const handleSend = async () => {
    if (!currentCompany) return;
    if (!currentCompany.businessEmail) {
      alert('This company does not have a verified public business email address.');
      return;
    }

    setIsSending(true);
    setSendSuccessMessage('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: currentCompany,
          email: { subject, body },
          profile
        })
      });
      const data = await res.json();
      if (data.success) {
        setSendSuccessMessage(data.message || 'Email successfully sent and confirmation report dispatched!');
        onEmailSent();
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 border border-indigo-500/20 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Cold Email Generator & Outreach System</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Personalized Cold Email Generator
        </h1>
        <p className="text-slate-300 text-sm">
          The AI synthesizes your business profile with the target company's website audit data to craft hyper-targeted outreach. Every successful submission automatically notifies <span className="text-emerald-400 font-semibold">amaudeaghablessing20@gmail.com</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Company Selector Sidebar */}
        <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Select Target Company</h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {companies.map((comp) => (
              <button
                key={comp.id}
                onClick={() => {
                  setSelectedCompanyId(comp.id);
                  setSubject('');
                  setBody('');
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  selectedCompanyId === comp.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold text-sm truncate">{comp.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{comp.industry} • {comp.location}</div>
                <div className="text-[10px] text-purple-300 font-mono mt-1 truncate">{comp.businessEmail || 'No Email Found'}</div>
              </button>
            ))}
            {companies.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Building2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No companies available. Discover companies first.</p>
              </div>
            )}
          </div>
        </div>

        {/* Email Editor & Preview */}
        <div className="lg:col-span-2 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          {currentCompany ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Target Recipient:</span>
                  <div className="text-sm font-mono font-bold text-purple-300">{currentCompany.businessEmail || 'No Email Available'}</div>
                </div>
                <button
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                  <span>Regenerate with AI</span>
                </button>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {sendSuccessMessage && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Email successfully sent & confirmation report dispatched!</span>
                  </div>
                  <div>{sendSuccessMessage}</div>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Subject Line</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Body (Fully Editable)</label>
                  <textarea
                    rows={12}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  Recipient: <span className="text-white font-medium">{currentCompany.name}</span>
                </div>
                <button
                  onClick={handleSend}
                  disabled={isSending || !currentCompany.businessEmail}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending & Reporting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SEND APPROVED EMAIL</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-24 text-slate-500">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>Please select a company to generate cold email.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
