'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  MessageSquare, 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  Archive, 
  Trash2, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck,
  CornerDownRight,
  Sparkles
} from 'lucide-react';
import { ConversationMessage } from '@/lib/types';

export default function AdminInboxPage() {
  const [conversations, setConversations] = useState<ConversationMessage[]>([]);
  const [activeConv, setActiveConv] = useState<ConversationMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const fetchMessages = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.append('status', statusFilter);
    if (search.trim()) params.append('search', search.trim());

    fetch(`/api/messages?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.messages) {
          setConversations(data.messages);
          if (data.messages.length > 0 && !activeConv) {
            setActiveConv(data.messages[0]);
          } else if (activeConv) {
            const updated = data.messages.find((m: ConversationMessage) => m.id === activeConv.id);
            if (updated) setActiveConv(updated);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleSelectConv = async (conv: ConversationMessage) => {
    setActiveConv(conv);
    if (!conv.isRead) {
      // Mark read automatically
      try {
        const res = await fetch(`/api/messages/${conv.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isRead: true, status: conv.status === 'unread' ? 'read' : conv.status }),
        });
        if (res.ok) {
          const data = await res.json();
          setConversations((prev) =>
            prev.map((c) => (c.id === conv.id ? data.conversation : c))
          );
          setActiveConv(data.conversation);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConv || !replyText.trim()) return;

    setSendingReply(true);
    try {
      const res = await fetch(`/api/messages/${activeConv.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyContent: replyText.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setActiveConv(data.conversation);
        setConversations((prev) =>
          prev.map((c) => (c.id === activeConv.id ? data.conversation : c))
        );
        setReplyText('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSendingReply(false);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'archived', isRead: true }),
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this message thread?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (activeConv?.id === id) setActiveConv(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h1 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-lime-400" />
              <span>Private Founder Inbox</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Encrypted direct channel for website visitors. Securely communicate with clients without exposing phone numbers.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-400">
            Dedicated Founder Access
          </span>
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchMessages()}
              placeholder="Search conversation text or visitor name..."
              className="glass-input w-full !pl-10 !text-xs !py-2.5"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-zinc-400 font-mono">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="glass-input !text-xs !py-2 bg-[#0e111a] cursor-pointer"
            >
              <option value="all">All Threads</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Split Inbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
          {/* Thread List Column */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-4 flex flex-col justify-between border border-white/[0.08]">
            <div className="space-y-2 overflow-y-auto max-h-[620px] pr-1">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 text-xs">
                  No conversations match your criteria.
                </div>
              ) : (
                conversations.map((conv) => {
                  const isSelected = activeConv?.id === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleSelectConv(conv)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-lime-400/10 border-lime-400/50 shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                          : conv.isRead
                          ? 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'
                          : 'bg-lime-950/20 border-lime-500/30 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-xs text-white truncate max-w-[180px]">
                          {conv.visitorName}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 mb-2 leading-relaxed">
                        {conv.initialMessage}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500">
                          ID: {conv.conversationId}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {!conv.isRead && (
                            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                          )}
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                            conv.status === 'unread'
                              ? 'bg-lime-400/20 text-lime-300'
                              : conv.status === 'replied'
                              ? 'bg-emerald-400/20 text-emerald-300'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {conv.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Active Conversation Detail & Reply Pane */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 flex flex-col justify-between border border-white/[0.08] relative">
            {activeConv ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Conversation Header */}
                  <div className="flex items-start justify-between pb-4 border-b border-white/[0.08] mb-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {activeConv.visitorName}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                        {activeConv.visitorEmail && (
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Mail className="w-3.5 h-3.5 text-lime-400" />
                            {activeConv.visitorEmail}
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-zinc-500">
                          Ref: {activeConv.id}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleArchive(activeConv.id)}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white"
                        title="Archive Conversation"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(activeConv.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        title="Delete Thread"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Message Thread Scroll */}
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 mb-6">
                    {/* Visitor Initial Message */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-lime-400" />
                          {activeConv.visitorName} (Visitor)
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {new Date(activeConv.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
                        {activeConv.initialMessage}
                      </p>
                    </div>

                    {/* Replies */}
                    {activeConv.replies && activeConv.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-4 rounded-2xl bg-lime-400/[0.07] border border-lime-400/20 text-xs ml-6"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-lime-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                            {rep.senderName} ({rep.senderRole === 'founder' ? 'Founder' : 'Administrator'})
                          </span>
                          <span className="font-mono text-[10px] text-zinc-400">
                            {new Date(rep.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
                          {rep.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Input Form */}
                <form onSubmit={handleSendReply} className="pt-4 border-t border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-lime-400">
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Send Founder Reply:</span>
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a professional response to this visitor..."
                    required
                    className="glass-input w-full !text-xs !py-3 resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500">
                      Replies are recorded in the conversation history and status updated to Replied.
                    </span>

                    <button
                      type="submit"
                      disabled={sendingReply}
                      className="btn-lime text-xs uppercase tracking-wider !py-2.5 !px-5 flex items-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                    >
                      {sendingReply ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Reply</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 text-zinc-500 text-xs">
                <MessageSquare className="w-10 h-10 mb-3 text-zinc-600" />
                <p>Select a message thread from the left to view the complete conversation and reply.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
