import React from 'react';
import {
  LayoutDashboard,
  Search,
  Building2,
  UserCheck,
  Mail,
  Send,
  ShieldCheck,
  Sliders,
  Database,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  discoveredCount: number;
  sentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  discoveredCount,
  sentCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Overview', icon: LayoutDashboard },
    { id: 'discovery', label: 'Find & Search Companies', icon: Search, badge: 'Live AI' },
    { id: 'companies', label: 'Discovered Businesses', icon: Building2, count: discoveredCount },
    { id: 'profile', label: 'My Business Profile', icon: UserCheck },
    { id: 'campaigns', label: 'AI Cold Email & Campaigns', icon: Mail },
    { id: 'confirmations', label: 'Gmail Confirmations', icon: Send, count: sentCount, highlight: true },
    { id: 'integrations', label: 'API Integrations & Config', icon: Sliders },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Sparkles className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            LeadPulse AI
          </h1>
          <p className="text-xs text-indigo-400/80 font-medium">Business Discovery & Outreach</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Platform Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                {item.badge && (
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.highlight ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-indigo-300'}`}>
                    {item.count}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Target Notification Footer */}
      <div className="p-4 m-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-2">
        <div className="flex items-center justify-between text-indigo-300 font-semibold">
          <span className="flex items-center space-x-1.5">
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Target</span>
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Active</span>
        </div>
        <p className="text-slate-400 text-[11px] truncate" title="amaudeaghablessing20@gmail.com">
          amaudeaghablessing20@gmail.com
        </p>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Auto-reports dispatched on every successful cold email delivery.
        </p>
      </div>

      {/* Bottom Status */}
      <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-slate-950/40">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span>Live API Connected</span>
        </div>
        <span className="text-[10px] text-slate-500">v3.4 Pro</span>
      </div>
    </aside>
  );
};
