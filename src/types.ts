export interface BusinessProfile {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  title: string;
  companyName: string;
  services: {
    webDevelopment: boolean;
    webRedesign: boolean;
    ecommerce: boolean;
    seo: boolean;
    maintenance: boolean;
    branding: boolean;
    custom: string;
  };
  portfolio: {
    website: string;
    projects: string;
    links: string;
    linkedin: string;
  };
  emailPreferences: {
    tone: string;
    length: string;
    greeting: string;
    cta: string;
    signature: string;
  };
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  websiteStatus: string;
  websiteScore: number;
  problems: string[];
  opportunity: string;
  businessEmail: string;
  emailSource: string;
  emailVerification: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    tiktok: string;
  };
  researchStatus: string;
  emailStatus: string;
  discoveredAt: string;
}

export interface SendingRecord {
  id: string;
  companyName: string;
  companyEmail: string;
  subject: string;
  body: string;
  referenceId: string;
  dateSent: string;
  timeSent: string;
  deliveryProvider: string;
  status: string;
  confidence: string;
}

export interface GmailConfirmation {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
}
