import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { DiscoveryView } from './components/DiscoveryView';
import { CompaniesTableView } from './components/CompaniesTableView';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { BusinessProfileView } from './components/BusinessProfileView';
import { ColdEmailView } from './components/ColdEmailView';
import { ConfirmationsView } from './components/ConfirmationsView';
import { IntegrationsView } from './components/IntegrationsView';
import { AdminView } from './components/AdminView';
import { Company, BusinessProfile, GmailConfirmation } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [profile, setProfile] = useState<BusinessProfile>({
    fullName: 'Alex Morgan',
    email: 'alex@digitalgrowthagency.com',
    phone: '+1 (555) 382-9102',
    country: 'United States',
    city: 'San Francisco, CA',
    title: 'Senior Growth & Web Engineering Consultant',
    companyName: 'Digital Growth Scale Agency',
    services: {
      webDevelopment: true,
      webRedesign: true,
      ecommerce: true,
      seo: true,
      maintenance: true,
      branding: true,
      custom: 'High-converting landing pages, lightning-fast Next.js apps, automated lead funnels.'
    },
    portfolio: {
      website: 'https://digitalgrowthagency.com',
      projects: 'SaaS Dashboard, E-Commerce Luxury Store, Real Estate Portal',
      links: 'https://github.com/alexgrowth, https://linkedin.com/in/alexmorgan-growth',
      linkedin: 'https://linkedin.com/in/alexmorgan-growth'
    },
    emailPreferences: {
      tone: 'Professional, warm, and value-focused',
      length: 'Concise (under 150 words)',
      greeting: 'Dear [Company Name] Team,',
      cta: 'Would you be open to a 10-minute audit call this Thursday?',
      signature: 'Best regards,\nAlex Morgan\nSenior Growth Consultant\nDigital Growth Scale Agency'
    }
  });
  const [confirmations, setConfirmations] = useState<GmailConfirmation[]>([]);
  const [selectedCompanyModal, setSelectedCompanyModal] = useState<Company | null>(null);
  const [preselectedEmailCompany, setPreselectedEmailCompany] = useState<Company | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.companies) setCompanies(data.companies);
      })
      .catch(console.error);

    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.profile) setProfile(data.profile);
      })
      .catch(console.error);

    fetch('/api/confirmations')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.confirmations) setConfirmations(data.confirmations);
      })
      .catch(console.error);
  }, []);

  const handleCompaniesFound = (newCompanies: Company[]) => {
    setCompanies(prev => [...newCompanies, ...prev]);
  };

  const handleEmailSent = () => {
    // Refresh confirmations and companies
    fetch('/api/confirmations')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.confirmations) setConfirmations(data.confirmations);
      })
      .catch(console.error);

    fetch('/api/companies')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.companies) setCompanies(data.companies);
      })
      .catch(console.error);
  };

  const handleDraftEmail = (company: Company) => {
    setPreselectedEmailCompany(company);
    setCurrentTab('campaigns');
  };

  const handleDeleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  const sentCount = confirmations.length;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        discoveredCount={companies.length}
        sentCount={sentCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-slate-900/50 backdrop-blur border-b border-slate-800 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">LeadPulse AI Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs font-bold text-white">{profile.fullName}</div>
              <div className="text-[11px] text-slate-400">{profile.companyName}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
              {profile.fullName.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          {currentTab === 'dashboard' && (
            <DashboardView
              companies={companies}
              profile={profile}
              confirmations={confirmations}
              onNavigate={setCurrentTab}
              onQuickSearch={() => setCurrentTab('discovery')}
            />
          )}

          {currentTab === 'discovery' && (
            <DiscoveryView
              onCompaniesFound={handleCompaniesFound}
              onNavigateToCompanies={() => setCurrentTab('companies')}
            />
          )}

          {currentTab === 'companies' && (
            <CompaniesTableView
              companies={companies}
              onSelectCompany={setSelectedCompanyModal}
              onDraftEmail={handleDraftEmail}
              onDeleteCompany={handleDeleteCompany}
            />
          )}

          {currentTab === 'profile' && (
            <BusinessProfileView
              profile={profile}
              onSaveProfile={setProfile}
            />
          )}

          {currentTab === 'campaigns' && (
            <ColdEmailView
              companies={companies}
              profile={profile}
              onEmailSent={handleEmailSent}
              preselectedCompany={preselectedEmailCompany}
            />
          )}

          {currentTab === 'confirmations' && (
            <ConfirmationsView
              confirmations={confirmations}
            />
          )}

          {currentTab === 'integrations' && (
            <IntegrationsView />
          )}

          {currentTab === 'admin' && (
            <AdminView />
          )}
        </div>
      </main>

      {/* Company Detail Modal */}
      {selectedCompanyModal && (
        <CompanyDetailModal
          company={selectedCompanyModal}
          onClose={() => setSelectedCompanyModal(null)}
          onDraftEmail={handleDraftEmail}
        />
      )}
    </div>
  );
}
