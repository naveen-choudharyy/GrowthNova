export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'superadmin' | 'founder' | 'admin';
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  organization?: string;
  email?: string;
  preferredContact: 'email' | 'instagram' | 'website_message';
  service: string;
  budget: string;
  description: string;
  status: 'new' | 'contacted' | 'in_discussion' | 'converted' | 'closed';
  internalNotes?: string;
  estimatorDetails?: {
    complexity: string;
    featuresCount: number;
    scale: string;
    estimatedMin: number;
    estimatedMax: number;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MessageReply {
  id: string;
  senderName: string;
  senderRole: 'founder' | 'admin' | 'visitor';
  content: string;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  visitorName: string;
  visitorEmail?: string;
  initialMessage: string;
  isRead: boolean;
  status: 'unread' | 'read' | 'replied' | 'archived';
  replies: MessageReply[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Websites' | 'Instagram' | 'Branding' | 'Video Editing' | 'Graphic Design' | 'Marketing Campaigns';
  description: string;
  tags: string[];
  thumbnailUrl: string;
  externalUrl?: string;
  instagramUrl?: string;
  videoUrl?: string;
  isFeatured: boolean;
  isDemo: boolean;
  order: number;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  team: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  deliverables: string[];
  suitableFor: string[];
  pricingRange: {
    min: number;
    max: number;
    currency: string;
    unit: string;
  };
  iconName: string;
  isActive: boolean;
  order: number;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  organization?: string;
  email?: string;
  service: string;
  preferredDate: string;
  preferredTimeSlot: string;
  description: string;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Approved' | 'Completed' | 'Cancelled';
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteContent {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  about: {
    tagline: string;
    story: string;
    vision: string;
    mission: string;
    philosophy: string;
    approach: string;
  };
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
    category: string;
  }[];
  pricingRules: {
    baseRate: number;
    complexityMultiplier: Record<string, number>;
    scaleMultiplier: Record<string, number>;
    featurePrice: number;
    currency: string;
  };
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'enquiry' | 'message' | 'portfolio' | 'service' | 'consultation' | 'content' | 'auth';
  entityId?: string;
  actor: string;
  details: string;
  timestamp: string;
}
