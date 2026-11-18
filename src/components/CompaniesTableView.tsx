import React, { useState } from 'react';
import {
  Building2,
  Globe,
  Mail,
  ExternalLink,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Send,
  Eye,
  Trash2
} from 'lucide-react';
import { Company } from '../types';

interface CompaniesTableViewProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
  onDraftEmail: (company: Company) => void;
  onDeleteCompany: (id: string) => void;
}

export const CompaniesTableView: React.FC<CompaniesTableViewProps> = ({
  companies,
  onSelectCompany,
  onDraftEmail,
  onDeleteCompany,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredCompanies = companies.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comp.businessEmail && comp.businessEmail.toLowerCase().includes(searchTerm.toLowerCase()));

    if (statusFilter === 'All') return matchesSearch;
    if (statusFilter === 'No Website') return matchesSearch && comp.websiteStatus === 'No Website';
    if (statusFilter === 'Poor Website') return matchesSearch && comp.websiteStatus.includes('Poor');
    if (statusFilter === 'Outdated Website') return matchesSearch && comp.websiteStatus.includes('Outdated');
    return matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCompanies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCompanies.map(c => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-xl font-extrabold text-white">Discovered Companies</h1>
          <p className="text-xs text-slate-400">
            Showing {filteredCompanies.length} of {companies.length} verified business records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies, emails, cities..."
              className="bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Website Statuses</option>
            <option value="No Website">No Website</option>
            <option value="Poor Website">Poor Website</option>
            <option value="Outdated Website">Outdated Website</option>
          </select>

          {selectedIds.length > 0 && (
            <button
              onClick={() => {
                alert(`Selected ${selectedIds.length} companies for bulk campaign generation.`);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Bulk Draft ({selectedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Professional Table */}
      <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredCompanies.length && filteredCompanies.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="p-4">Company Name</th>
                <th className="p-4">Industry & Location</th>
                <th className="p-4">Website & Status</th>
                <th className="p-4">Score</th>
                <th className="p-4">Business Email</th>
                <th className="p-4">Social Profiles</th>
                <th className="p-4">Email Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {filteredCompanies.map((comp) => {
                const isSelected = selectedIds.includes(comp.id);
                return (
                  <tr key={comp.id} className={`hover:bg-slate-800/40 transition-colors ${isSelected ? 'bg-indigo-950/20' : ''}`}>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(comp.id)}
                        className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{comp.name}</div>
                      <div className="text-[10px] text-slate-400">Discovered: {new Date(comp.discoveredAt).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-200 font-medium">{comp.industry}</div>
                      <div className="text-slate-400 text-[11px]">{comp.location}</div>
                    </td>
                    <td className="p-4">
                      {comp.website ? (
                        <a
                          href={comp.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline flex items-center space-x-1 truncate max-w-[180px]"
                        >
                          <Globe className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{comp.website}</span>
                        </a>
                      ) : (
                        <span className="text-red-400 font-medium">No Official Website</span>
                      )}
                      <div className="mt-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          comp.websiteStatus === 'No Website'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {comp.websiteStatus}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${comp.websiteScore < 40 ? 'text-red-400' : 'text-amber-400'}`}>
                        {comp.websiteScore}/100
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-purple-300">{comp.businessEmail || 'No Public Email'}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">{comp.emailSource}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {comp.socials?.facebook && (
                          <a href={comp.socials.facebook} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300" title="Facebook">
                            FB
                          </a>
                        )}
                        {comp.socials?.instagram && (
                          <a href={comp.socials.instagram} target="_blank" rel="noreferrer" className="text-pink-400 hover:text-pink-300" title="Instagram">
                            IG
                          </a>
                        )}
                        {comp.socials?.linkedin && (
                          <a href={comp.socials.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300" title="LinkedIn">
                            LI
                          </a>
                        )}
                        {!comp.socials?.facebook && !comp.socials?.instagram && !comp.socials?.linkedin && (
                          <span className="text-slate-500">None</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        comp.emailStatus === 'Sent & Delivered'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {comp.emailStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => onSelectCompany(comp)}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-all"
                        title="View Audit Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDraftEmail(comp)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all shadow-md"
                      >
                        Draft Email
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-slate-500">
                    <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No companies match your filter criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
