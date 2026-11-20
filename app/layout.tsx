import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WebsiteMessenger from '@/components/common/WebsiteMessenger';

export const metadata: Metadata = {
  title: 'GrowthNova — Creative Studio & Digital Agency',
  description:
    'GrowthNova crafts high-converting websites, viral Reels, social media growth, and visual identities. Founded by Anchal Swami and Komal Swami.',
  keywords: [
    'GrowthNova',
    'Creative Studio',
    'Web Development',
    'Instagram Reels Editing',
    'Social Media Growth',
    'Brand Identity Design',
  ],
  authors: [{ name: 'GrowthNova Studio' }],
  creator: 'GrowthNova',
  openGraph: {
    title: 'GrowthNova — Creative Studio & Digital Agency',
    description:
      'We craft high-converting websites, viral reels, and standout brand identities.',
    url: 'https://growthnova.com',
    siteName: 'GrowthNova',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#070406] text-zinc-100 antialiased selection:bg-rose-600 selection:text-white">
        {/* Ambient atmospheric cherry & ruby glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-rose-600/18 blur-[150px] animate-pulse-glow" />
          <div className="absolute top-[35%] -right-24 h-[550px] w-[550px] rounded-full bg-red-700/15 blur-[160px]" />
          <div className="absolute top-[70%] -left-20 h-[500px] w-[500px] rounded-full bg-rose-800/14 blur-[150px]" />
          <div className="absolute inset-0 bg-grid-ambient opacity-60" />
        </div>

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Quick Connect / Founder Messenger */}
        <WebsiteMessenger />
      </body>
    </html>
  );
}
