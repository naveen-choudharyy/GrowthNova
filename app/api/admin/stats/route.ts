import { NextRequest, NextResponse } from 'next/server';
import { readDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  const db = readDb();

  const totalEnquiries = db.enquiries.length;
  const newEnquiries = db.enquiries.filter((e) => e.status === 'new').length;

  const totalMessages = db.messages.length;
  const unreadMessages = db.messages.filter((m) => !m.isRead).length;

  const totalProjects = db.portfolioProjects.length;
  const activeProjects = db.portfolioProjects.filter((p) => p.isFeatured).length;

  const totalConsultations = db.consultations.length;
  const newConsultations = db.consultations.filter((c) => c.status === 'New').length;

  const recentActivity = (db.activityLogs || []).slice(0, 10);

  return NextResponse.json({
    metrics: {
      totalEnquiries,
      newEnquiries,
      totalMessages,
      unreadMessages,
      totalProjects,
      activeProjects,
      totalConsultations,
      newConsultations,
    },
    recentActivity,
    currentUser: user,
  });
}
