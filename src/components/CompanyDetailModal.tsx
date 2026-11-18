import React from 'react';
import { X, Globe, Mail, MapPin, Building2, Sparkles, CheckCircle2, ShieldAlert, ExternalLink, Send } from 'lucide-react';
import { Company } from '../types';

interface CompanyDetailModalProps {
  company: Company | null;
  onClose: () => void;
  onDraftEmail: (company: Company) => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  onClose,
  onDraftEmail,
}) => {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-8 shadow-2xl space-y-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Building2 className="w-7 h-7 text-indigo-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white">{company.name}</h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                company.websiteStatus === 'No Website'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {company.websiteStatus}
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center space-x-3">
              <span>{company.industry}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{company.location}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Website & Score */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Website Audit Analysis</h3>
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline flex items-center space-x-1.5 text-sm font-semibold truncate"
              >
                <Globe className="w-4 h-4" />
                <span className="truncate">{company.website}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="text-red-400 font-semibold text-sm">No Official Website Found</div>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Website Quality Score:</span>
              <span className={`text-lg font-extrabold ${company.websiteScore < 40 ? 'text-red-400' : 'text-amber-400'}`}>
                {company.websiteScore}/100
              </span>
            </div>
          </div>

          {/* Business Email */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Email & Verification</h3>
            <div className="font-mono text-purple-300 font-bold text-sm">
              {company.businessEmail || 'No Public Business Email Found'}
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-300">Source:</strong> {company.emailSource}</div>
              <div><strong className="text-slate-300">Verification:</strong> {company.emailVerification}</div>
            </div>
          </div>
        </div>

        {/* Problems & Opportunity */}
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 space-y-2">
            <h3 className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Identified Website Problems & Gaps</span>
            </h3>
            <ul className="list-disc list-inside text-xs text-red-200/90 space-y-1">
              {(company.problems || []).map((prob, idx) => (
                <li key={idx}>{prob}</li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 space-y-2">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Digital Growth Opportunity</span>
            </h3>
            <p className="text-xs text-indigo-200 leading-relaxed">{company.opportunity}</p>
          </div>
        </div>

        {/* Social Media Profiles */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Social Media Investigation</h3>
          <div className="flex flex-wrap gap-3">
            {company.socials?.facebook && (
              <a href={company.socials.facebook} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5">
                <span>Facebook Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {company.socials?.instagram && (
              <a href={company.socials.instagram} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-pink-600/20 text-pink-300 border border-pink-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5">
                <span>Instagram Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {company.socials?.linkedin && (
              <a href={company.socials.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5">
                <span>LinkedIn Company Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex items-center justify-end space-x-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onDraftEmail(company);
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Generate & Draft Cold Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};
