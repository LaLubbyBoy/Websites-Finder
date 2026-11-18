import React, { useState } from 'react';
import { UserCheck, Save, CheckCircle2, Sparkles, Briefcase, Mail, Globe } from 'lucide-react';
import { BusinessProfile } from '../types';

interface BusinessProfileViewProps {
  profile: BusinessProfile;
  onSaveProfile: (profile: BusinessProfile) => void;
}

export const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({
  profile: initialProfile,
  onSaveProfile,
}) => {
  const [profile, setProfile] = useState<BusinessProfile>(initialProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        onSaveProfile(data.profile);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 border border-indigo-500/20 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>My Business Profile & Outreach Settings</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          MY BUSINESS PROFILE
        </h1>
        <p className="text-slate-300 text-sm">
          Configure your professional identity, services offered, portfolio credentials, and cold email preferences. The AI uses this data to personalize every outbound message.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal & Agency Information */}
        <div className="bg-slate-900/95 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <span>Personal & Professional Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Professional Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Professional Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Country & City</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="Country"
                />
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Company or Agency Name</label>
              <input
                type="text"
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Business Services Offered */}
        <div className="bg-slate-900/95 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Services You Offer</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { key: 'webDevelopment', label: 'Website Development' },
              { key: 'webRedesign', label: 'Website Redesign' },
              { key: 'ecommerce', label: 'E-commerce Development' },
              { key: 'seo', label: 'SEO & Optimization' },
              { key: 'maintenance', label: 'Website Maintenance' },
              { key: 'branding', label: 'Branding & Digital Marketing' },
            ].map((srv) => (
              <label
                key={srv.key}
                className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={(profile.services as any)[srv.key]}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      services: { ...profile.services, [srv.key]: e.target.checked }
                    })
                  }
                  className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-200">{srv.label}</span>
              </label>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">What other services do you provide?</label>
            <textarea
              rows={3}
              value={profile.services.custom}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  services: { ...profile.services, custom: e.target.value }
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Describe any specialized services, unique value propositions, or tech stacks..."
            />
          </div>
        </div>

        {/* Portfolio & Social Information */}
        <div className="bg-slate-900/95 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <span>Portfolio Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Portfolio Website</label>
              <input
                type="text"
                value={profile.portfolio.website}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    portfolio: { ...profile.portfolio, website: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">LinkedIn Profile</label>
              <input
                type="text"
                value={profile.portfolio.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    portfolio: { ...profile.portfolio, linkedin: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Previous Projects & Case Studies</label>
              <input
                type="text"
                value={profile.portfolio.projects}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    portfolio: { ...profile.portfolio, projects: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                placeholder="e.g. E-commerce luxury store, Real estate MLS portal, SaaS dashboard"
              />
            </div>
          </div>
        </div>

        {/* Email Preferences */}
        <div className="bg-slate-900/95 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            <span>Email Preferences & Signature</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Preferred Email Tone</label>
              <input
                type="text"
                value={profile.emailPreferences.tone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    emailPreferences: { ...profile.emailPreferences, tone: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Preferred Call to Action (CTA)</label>
              <input
                type="text"
                value={profile.emailPreferences.cta}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    emailPreferences: { ...profile.emailPreferences, cta: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Professional Email Signature</label>
              <textarea
                rows={4}
                value={profile.emailPreferences.signature}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    emailPreferences: { ...profile.emailPreferences, signature: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          {savedSuccess && (
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              <span>Profile successfully saved!</span>
            </div>
          )}
          <button
            type="submit"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 flex items-center space-x-2 transition-all"
          >
            <Save className="w-5 h-5" />
            <span>SAVE BUSINESS PROFILE</span>
          </button>
        </div>
      </form>
    </div>
  );
};
