import React, { useState } from 'react';
import { Search, MapPin, Building, Globe, Sparkles, AlertCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { BUSINESS_NICHES, WEBSITE_CONDITIONS } from '../data/niches';
import { Company } from '../types';

interface DiscoveryViewProps {
  onCompaniesFound: (companies: Company[]) => void;
  onNavigateToCompanies: () => void;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  onCompaniesFound,
  onNavigateToCompanies,
}) => {
  const [country, setCountry] = useState('United States');
  const [stateRegion, setStateRegion] = useState('California');
  const [city, setCity] = useState('San Francisco');
  const [specificLocation, setSpecificLocation] = useState('Financial District / Downtown');
  const [selectedNiche, setSelectedNiche] = useState('Real Estate Agencies');
  const [websiteCondition, setWebsiteCondition] = useState('All Website Problems');
  const [companyCount, setCompanyCount] = useState('10');
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [lastResultsCount, setLastResultsCount] = useState<number | null>(null);

  const handleSearch = async (overrideCount?: string) => {
    const countToUse = overrideCount || companyCount;
    setIsSearching(true);
    setSearchProgress(15);
    setStatusMessage('Connecting to real-time search engine & business registries...');

    try {
      setTimeout(() => setSearchProgress(45), 600);
      setTimeout(() => setSearchProgress(75), 1200);

      const res = await fetch('/api/search-companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: selectedNiche,
          location: `${city}, ${stateRegion}`,
          country,
          condition: websiteCondition,
          count: parseInt(countToUse, 10) || 10
        })
      });

      const data = await res.json();
      setSearchProgress(100);

      if (data.success && Array.isArray(data.companies)) {
        onCompaniesFound(data.companies);
        setLastResultsCount(data.companies.length);
        setStatusMessage(`Successfully discovered ${data.companies.length} verified real businesses!`);
      } else {
        throw new Error(data.error || 'Failed to retrieve companies');
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Error: ${err.message || 'Live search connection failed'}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 border border-indigo-500/20 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span>Real-Time Business Discovery Engine</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Configure Your Target Search Parameters
        </h1>
        <p className="text-slate-300 text-sm">
          Discover real companies with outdated or missing websites across 50+ high-demand niches, location filters, and website condition criteria.
        </p>
      </div>

      {/* Configuration Panel Form */}
      <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Country */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
              placeholder="e.g. United States, United Kingdom, Canada"
            />
          </div>

          {/* State / Region */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">State or Region</label>
            <input
              type="text"
              value={stateRegion}
              onChange={(e) => setStateRegion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
              placeholder="e.g. California, Ontario, London"
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
              placeholder="e.g. San Francisco, New York, Toronto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specific Location / Neighborhood */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Specific Location / Street (Optional)</label>
            <input
              type="text"
              value={specificLocation}
              onChange={(e) => setSpecificLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
              placeholder="e.g. Downtown, Financial District, Silicon Valley"
            />
          </div>

          {/* Business Niche Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Business Niche</label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
            >
              {BUSINESS_NICHES.map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Website Condition */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Website Condition Filter</label>
            <select
              value={websiteCondition}
              onChange={(e) => setWebsiteCondition(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
            >
              {WEBSITE_CONDITIONS.map((cond) => (
                <option key={cond.id} value={cond.id}>{cond.label}</option>
              ))}
            </select>
          </div>

          {/* Number of Companies */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Number of Companies to Find</label>
            <select
              value={companyCount}
              onChange={(e) => setCompanyCount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
            >
              <option value="10">10 companies</option>
              <option value="25">25 companies</option>
              <option value="50">50 companies</option>
              <option value="100">100 companies</option>
              <option value="250">250 companies</option>
              <option value="500">500 companies</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-800">
          <button
            onClick={() => handleSearch()}
            disabled={isSearching}
            className="flex-1 min-w-[220px] py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Searching Real Internet ({searchProgress}%)</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>SEARCH FOR COMPANIES</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleSearch('100')}
            disabled={isSearching}
            className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-bold text-sm flex items-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>SEARCH 100 COMPANIES</span>
          </button>

          <button
            onClick={() => handleSearch('50')}
            disabled={isSearching}
            className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-bold text-sm flex items-center space-x-2 transition-all"
          >
            <Building className="w-4 h-4 text-purple-400" />
            <span>FIND MORE COMPANIES</span>
          </button>
        </div>

        {/* Progress & Status */}
        {isSearching && (
          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-xs text-indigo-300 font-medium">
              <span>{statusMessage}</span>
              <span>{searchProgress}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${searchProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {lastResultsCount !== null && !isSearching && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-300">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold">Successfully discovered {lastResultsCount} verified businesses for {selectedNiche} in {city}!</span>
            </div>
            <button
              onClick={onNavigateToCompanies}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center space-x-1 hover:bg-emerald-500 transition-all shadow-md"
            >
              <span>View in Table</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
