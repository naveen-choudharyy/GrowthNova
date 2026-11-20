import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { PortfolioProject } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  const db = readDb();
  let list = db.portfolioProjects || [];

  if (category && category !== 'All') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (featured === 'true') {
    list = list.filter((p) => p.isFeatured);
  }

  list.sort((a, b) => a.order - b.order);

  return NextResponse.json({ projects: list });
}

export async function POST(req: NextRequest) {
  const { user, errorResponse } = requireAdmin(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const {
      title,
      category,
      description,
      tags,
      thumbnailUrl,
      externalUrl,
      instagramUrl,
      videoUrl,
      isFeatured,
      isDemo,
      order,
    } = body;

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: 'Title, category, and description are required.' },
        { status: 400 }
      );
    }

    const db = readDb();
    const newProject: PortfolioProject = {
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      category,
      description: description.trim(),
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [],
      thumbnailUrl:
        thumbnailUrl?.trim() ||
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      externalUrl: externalUrl?.trim() || undefined,
      instagramUrl: instagramUrl?.trim() || undefined,
      videoUrl: videoUrl?.trim() || undefined,
      isFeatured: !!isFeatured,
      isDemo: isDemo !== undefined ? !!isDemo : true,
      order: Number(order) || (db.portfolioProjects.length + 1),
      createdAt: new Date().toISOString(),
    };

    db.portfolioProjects.push(newProject);
    writeDb(db);

    logActivity(
      'Portfolio Project Added',
      'portfolio',
      user!.name,
      `Added project "${newProject.title}" in ${newProject.category}`,
      newProject.id
    );

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error('Portfolio create error:', error);
    return NextResponse.json({ error: 'Failed to create portfolio project' }, { status: 500 });
  }
}
