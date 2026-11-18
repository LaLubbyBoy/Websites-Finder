import React from 'react';
import {
  Search,
  Building2,
  Mail,
  Send,
  TrendingUp,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Company, BusinessProfile, GmailConfirmation } from '../types';

interface DashboardViewProps {
  companies: Company[];
  profile: BusinessProfile;
  confirmations: GmailConfirmation[];
  onNavigate: (tab: string) => void;
  onQuickSearch: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  companies,
  profile,
  confirmations,
  onNavigate,
  onQuickSearch,
}) => {
  const totalCompanies = companies.length;
  const noWebsiteCount = companies.filter(c => !c.website || c.websiteStatus === 'No Website').length;
  const poorWebsiteCount = companies.filter(c => c.websiteStatus && c.websiteStatus.includes('Poor') || c.websiteStatus.includes('Outdated')).length;
  const emailsDiscovered = companies.filter(c => c.businessEmail).length;
  const emailsSent = companies.filter(c => c.emailStatus === 'Sent & Delivered').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 p-8 border border-indigo-500/20 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI-Powered Business Intelligence & Outreach</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Discover Businesses with Website Gaps & Automate High-Converting Cold Outreach
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Real-time internet search discovers local companies with no websites, poor mobile experiences, or outdated designs. Our AI engine researches their social media, finds verified public business emails, and sends hyper-personalized outreach while instantly reporting to <span className="text-emerald-400 font-semibold">amaudeaghablessing20@gmail.com</span>.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('discovery')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              <span>Start Real-Time Search</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('campaigns')}
              className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center space-x-2 transition-all"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Generate Cold Emails</span>
            </button>
            <button
              onClick={onQuickSearch}
              className="px-6 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-sm border border-emerald-500/30 flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Search 100 Companies Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Discovered Businesses</span>
            <Building2 className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white">{totalCompanies}</div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Real Live Findings</span>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Website Opportunities</span>
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">{noWebsiteCount + poorWebsiteCount}</div>
          <div className="text-xs text-amber-300 font-medium">
            {noWebsiteCount} No Website • {poorWebsiteCount} Poor/Outdated
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Business Emails Found</span>
            <Mail className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{emailsDiscovered}</div>
          <div className="text-xs text-purple-300 font-medium">
            Verified via MX & Social Registry
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Emails Sent & Reported</span>
            <Send className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{emailsSent}</div>
          <div className="text-xs text-emerald-400 font-medium">
            Confirmation sent to Gmail target
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Companies Discovered */}
        <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Discovered Businesses</h2>
              <p className="text-xs text-slate-400">Live search results with website gap analysis</p>
            </div>
            <button
              onClick={() => onNavigate('companies')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
            >
              <span>View All ({totalCompanies})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {companies.slice(0, 4).map((comp) => (
              <div
                key={comp.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-sm">{comp.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      comp.websiteStatus === 'No Website'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {comp.websiteStatus}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center space-x-3">
                    <span>{comp.industry}</span>
                    <span>•</span>
                    <span>{comp.location}</span>
                    <span>•</span>
                    <span className="text-purple-300">{comp.businessEmail || 'No Email'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-indigo-400">Score: {comp.websiteScore}/100</div>
                  <button
                    onClick={() => onNavigate('campaigns')}
                    className="mt-1 px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition-all"
                  >
                    Draft Email
                  </button>
                </div>
              </div>
            ))}
            {companies.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Building2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No companies discovered yet. Start a real-time search!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Gmail Confirmations to amaudeaghablessing20@gmail.com */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Gmail Confirmations</h2>
              <p className="text-xs text-slate-400">Dispatched to target inbox</p>
            </div>
            <button
              onClick={() => onNavigate('confirmations')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {confirmations.slice(0, 3).map((conf) => (
              <div key={conf.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Delivered to Gmail</span>
                  </span>
                  <span className="text-[10px] text-slate-500">{new Date(conf.sentAt).toLocaleTimeString()}</span>
                </div>
                <div className="text-xs font-medium text-white">{conf.subject}</div>
                <div className="text-[11px] text-slate-400 truncate">To: {conf.to}</div>
              </div>
            ))}
            {confirmations.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Send className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-xs">No confirmation reports sent yet. Send your first cold email to trigger the audit report.</p>
              </div>
            )}
          </div>

          {/* Business Profile Quick Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">My Business Profile</span>
              <button
                onClick={() => onNavigate('profile')}
                className="text-xs text-indigo-400 hover:text-white font-semibold underline"
              >
                Edit
              </button>
            </div>
            <div className="text-sm font-semibold text-white">{profile.fullName}</div>
            <div className="text-xs text-slate-300">{profile.title} • {profile.companyName}</div>
            <div className="text-[11px] text-slate-400">{profile.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
