'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Inbox, 
  MessageSquare, 
  Briefcase, 
  Layers, 
  Calendar, 
  FileEdit, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ExternalLink, 
  Menu, 
  X,
  Bell
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadMsgCount, setUnreadMsgCount] = useState<number>(0);
  const [newEnquiryCount, setNewEnquiryCount] = useState<number>(0);

  useEffect(() => {
    // Check auth
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => router.push('/admin/login'));

    // Fetch dashboard badge counts
    fetch('/api/admin/stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.metrics) {
          setUnreadMsgCount(data.metrics.unreadMessages || 0);
          setNewEnquiryCount(data.metrics.newEnquiries || 0);
        }
      })
      .catch(() => {});
  }, [router, pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox, badge: newEnquiryCount },
    { name: 'Founder Inbox', href: '/admin/inbox', icon: MessageSquare, badge: unreadMsgCount },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
    { name: 'Services', href: '/admin/services', icon: Layers },
    { name: 'Consultations', href: '/admin/consultations', icon: Calendar },
    { name: 'Website Content', href: '/admin/content', icon: FileEdit },
    { name: 'Settings & Users', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/[0.08] bg-[#090b12] flex-shrink-0 min-h-screen p-5 justify-between">
        <div>
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3 mb-8 px-2 group">
            <div className="w-9 h-9 rounded-xl bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400 font-display font-black text-base shadow-[0_0_15px_rgba(204,255,0,0.2)]">
              GN
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-white">
                Growth<span className="text-lime-400">Nova</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400 block -mt-1 uppercase tracking-wider">
                Founder Portal
              </span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-lime-400/15 text-lime-300 border border-lime-400/30 shadow-[0_0_15px_rgba(204,255,0,0.15)] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-zinc-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime-400 text-black font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-white/[0.08]">
          {currentUser && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-lime-400/20 border border-lime-400/30 flex items-center justify-center text-lime-400 font-bold text-xs">
                  {currentUser.name?.[0]}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-white block truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-mono text-lime-400/80 uppercase">
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
              title="Open Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1.5 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/[0.08] bg-[#090b12]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-400/20 text-lime-400 flex items-center justify-center font-bold text-xs">
            GN
          </div>
          <span className="font-display font-bold text-white text-base">Admin Dashboard</span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/[0.04] text-zinc-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-[#090b12] border-b border-white/[0.08] space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-white/[0.05]"
            >
              <span>{item.name}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-400 text-black font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <Link href="/" target="_blank" className="text-xs text-zinc-400">
              Open Public Site
            </Link>
            <button onClick={handleLogout} className="text-xs text-red-400">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Content Canvas */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}
