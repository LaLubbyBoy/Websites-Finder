import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Search, Mail, AlertTriangle, Activity, Database } from 'lucide-react';

export const AdminView: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalSearches: 24,
    totalCompaniesDiscovered: 148,
    emailsGenerated: 89,
    emailsSent: 34,
    deliverabilityRate: '98.5%',
    systemErrors: 0
  });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 border border-purple-500/20 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Secure Administrative Dashboard</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          System Monitoring & Administration
        </h1>
        <p className="text-slate-300 text-sm">
          Review overall platform search telemetry, API query limits, email delivery rates, and audit logs.
        </p>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Searches Run</span>
            <Search className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.totalSearches}</div>
          <div className="text-xs text-indigo-300">Live internet queries executed</div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Companies Discovered</span>
            <Database className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.totalCompaniesDiscovered}</div>
          <div className="text-xs text-purple-300">Verified business prospects</div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Cold Emails Sent</span>
            <Mail className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.emailsSent}</div>
          <div className="text-xs text-emerald-400">Deliverability: {stats.deliverabilityRate}</div>
        </div>
      </div>
    </div>
  );
};
