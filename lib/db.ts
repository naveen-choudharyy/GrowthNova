import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  AdminUser,
  Enquiry,
  ConversationMessage,
  PortfolioProject,
  ServiceItem,
  ConsultationRequest,
  WebsiteContent,
  ActivityLog,
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  adminUsers: AdminUser[];
  enquiries: Enquiry[];
  messages: ConversationMessage[];
  portfolioProjects: PortfolioProject[];
  services: ServiceItem[];
  consultations: ConsultationRequest[];
  content: WebsiteContent;
  activityLogs: ActivityLog[];
}

const defaultContent: WebsiteContent = {
  hero: {
    badge: 'Creative Digital Studio • Websites & Creative Media',
    headline: 'We Craft Websites & Content That Get Brands Noticed.',
    subheadline:
      'From modern, high-converting websites to viral Instagram reels and distinctive brand design. Simple, stunning, and built for growth.',
    primaryCtaText: 'See Our Work',
    secondaryCtaText: "Let's Connect",
  },
  about: {
    tagline: 'Your Vision. Our Strategy. Your Growth.',
    story:
      'GrowthNova was established with a clear mission: to bring together creative video editing, modern web development, and social media acceleration into a clean, unified digital studio led directly by founders Anchal Swami and Komal Swami.',
    vision:
      'To empower brands with standout digital aesthetics, high-performing websites, and high-retention short-form video content.',
    mission:
      'To build beautiful websites and viral social content that turn brand visions into real, measurable growth.',
    philosophy:
      'Clean aesthetics, rapid execution, and direct personal commitment to every client.',
    approach:
      'Strategy first, agile creative delivery, and ongoing growth.',
  },
  stats: [
    { label: 'Creative Disciplines', value: '5+', description: 'Web, Reels, Design, SEO & Social' },
    { label: 'Client Satisfaction', value: '99%', description: 'Punctual & dedicated collaboration' },
    { label: 'Active Projects', value: '50+', description: 'Brands & creators worldwide' },
  ],
  faqs: [
    {
      question: 'How do I start a project with GrowthNova?',
      answer: 'Simply send us a quick note through our Connect form or message us on Instagram (@littleluxefinds.co19).',
      category: 'General',
    },
    {
      question: 'Where are my project enquiries forwarded?',
      answer: 'All client enquiries are sent directly to founder Anchal Swami at swamianchal047@gmail.com.',
      category: 'Inquiries',
    },
  ],
  pricingRules: {
    baseRate: 25000,
    complexityMultiplier: { standard: 1.0, advanced: 1.6, enterprise: 2.5 },
    scaleMultiplier: { startup: 1.0, growing: 1.4, established: 2.2 },
    featurePrice: 4000,
    currency: 'INR',
  },
};

const defaultServices: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'reels-video-editing',
    title: 'Reels & Video Editing',
    team: 'Video Production Team',
    shortDescription: 'Viral Instagram Reels, YouTube Shorts, and brand promo edits with high retention and trend audio sync.',
    fullDescription: 'We edit dynamic short-form and promo videos designed to stop thumbs and maximize viewer engagement.',
    benefits: ['High retention pacing', 'Trend audio & sound FX', 'Subtitles & animations'],
    deliverables: ['Vertical 9:16 edits', 'Sound design & leveling', 'Motion titles'],
    suitableFor: ['Creators', 'Brands', 'E-commerce'],
    pricingRange: { min: 15000, max: 60000, currency: 'INR', unit: 'per batch / month' },
    iconName: 'Film',
    isActive: true,
    order: 1,
  },
  {
    id: 'srv-2',
    slug: 'instagram-growth',
    title: 'Instagram Account Growth',
    team: 'Social Media Team',
    shortDescription: 'Aesthetic grid curation, content planning, and organic follower growth strategies.',
    fullDescription: 'Comprehensive management of your Instagram presence from visual aesthetic to consistent posting.',
    benefits: ['Curated grid aesthetic', 'Active audience reach', 'Brand authority'],
    deliverables: ['Monthly calendar', 'Hashtag & caption strategy', 'Post design'],
    suitableFor: ['Businesses', 'Personal Brands', 'Shops'],
    pricingRange: { min: 20000, max: 70000, currency: 'INR', unit: 'per month' },
    iconName: 'Instagram',
    isActive: true,
    order: 2,
  },
  {
    id: 'srv-3',
    slug: 'web-development',
    title: 'Websites & Landing Pages',
    team: 'Web Development Team',
    shortDescription: 'Sub-second speed business websites and landing pages engineered with Next.js and React.',
    fullDescription: 'Custom, modern, mobile-responsive websites that convert visitors into customers.',
    benefits: ['Sub-second speed', 'Mobile-first design', 'High conversion funnels'],
    deliverables: ['Responsive website', 'Lead capture forms', 'Domain & SSL setup'],
    suitableFor: ['Startups', 'Businesses', 'Portfolios'],
    pricingRange: { min: 25000, max: 100000, currency: 'INR', unit: 'per project' },
    iconName: 'Code',
    isActive: true,
    order: 3,
  },
];

const defaultProjects: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Instagram Creative Edit — Part 01',
    category: 'Video Editing',
    description: 'Original short-form Instagram edit with dynamic pacing, sound design, and viral audio synchronization.',
    tags: ['Instagram Reel', 'Short-Form', 'Sound FX'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '/videos/instagram/instagram-edit-01.mp4',
    isFeatured: true,
    isDemo: false,
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    title: 'Instagram Aesthetic Reel — Part 02',
    category: 'Instagram',
    description: 'High-engagement social media reel crafted for audience growth and aesthetic visual appeal.',
    tags: ['Reels Growth', 'Social Strategy', 'Aesthetic Edit'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '/videos/instagram/instagram-edit-02.mp4',
    instagramUrl: 'https://www.instagram.com/littleluxefinds.co19/',
    isFeatured: true,
    isDemo: false,
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-3',
    title: 'Cinematic Video Editing Showcase',
    category: 'Video Editing',
    description: 'Original cinematic promo edit demonstrating seamless cuts, color grading, and commercial storytelling.',
    tags: ['Cinematic Edit', 'Promo Video', 'Color Grading'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '/videos/editing/video-editing.mp4',
    isFeatured: true,
    isDemo: false,
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-4',
    title: 'Apex Financial Platform',
    category: 'Websites',
    description: 'High-performance dark glassmorphism fintech website with responsive UX and sub-second page loads.',
    tags: ['Next.js', 'Fintech', 'Modern UI'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    externalUrl: 'https://growthnova.com/showcase/apex',
    isFeatured: true,
    isDemo: false,
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-5',
    title: 'Aura Botanicals Luxury Identity',
    category: 'Branding',
    description: 'Minimalist brand identity system, custom vector logo typography, packaging, and digital collateral.',
    tags: ['Brand Identity', 'Logo Design', 'Luxury Packaging'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    isFeatured: true,
    isDemo: false,
    order: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-6',
    title: 'Zenith Health SaaS Platform',
    category: 'Websites',
    description: 'Modern healthcare portal with responsive booking flow and accessible user interface.',
    tags: ['Web Application', 'Responsive', 'Clean UI'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    externalUrl: 'https://growthnova.com/showcase/zenith',
    isFeatured: true,
    isDemo: false,
    order: 6,
    createdAt: new Date().toISOString(),
  },
];

function getInitialDb(): DatabaseSchema {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('GrowthNova2025!', salt);

  const adminUsers: AdminUser[] = [
    {
      id: 'usr-anchal',
      name: 'Anchal Swami',
      email: 'anchal@growthnova.com',
      passwordHash,
      role: 'founder',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'usr-komal',
      name: 'Komal Swami',
      email: 'komal@growthnova.com',
      passwordHash,
      role: 'founder',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'usr-admin',
      name: 'GrowthNova SuperAdmin',
      email: 'admin@growthnova.com',
      passwordHash,
      role: 'superadmin',
      createdAt: new Date().toISOString(),
    },
  ];

  return {
    adminUsers,
    enquiries: [],
    messages: [],
    portfolioProjects: defaultProjects,
    services: defaultServices,
    consultations: [],
    content: defaultContent,
    activityLogs: [],
  };
}

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialDb();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }

    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw) as DatabaseSchema;
    // Ensure portfolio projects include the new video files
    data.portfolioProjects = defaultProjects;
    return data;
  } catch (error) {
    console.error('Error reading database file:', error);
    return getInitialDb();
  }
}

export function writeDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database file:', error);
    throw error;
  }
}

export function logActivity(
  action: string,
  entityType: ActivityLog['entityType'],
  actor: string,
  details: string,
  entityId?: string
) {
  try {
    const db = readDb();
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      entityType,
      entityId,
      actor,
      details,
      timestamp: new Date().toISOString(),
    };
    db.activityLogs.unshift(newLog);
    if (db.activityLogs.length > 100) {
      db.activityLogs = db.activityLogs.slice(0, 100);
    }
    writeDb(db);
  } catch (e) {
    console.error('Failed to log activity:', e);
  }
}
