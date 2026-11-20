import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { readDb } from './db';
import { AdminUser } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'growthnova_super_secure_jwt_secret_key_2025_anchal_komal';
const TOKEN_COOKIE_NAME = 'growthnova_admin_token';

export interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  role: 'superadmin' | 'founder' | 'admin';
}

export function signToken(user: AdminUser): string {
  const payload: TokenPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function getAuthUser(req: NextRequest): TokenPayload | null {
  // Check cookie first
  const cookie = req.cookies.get(TOKEN_COOKIE_NAME);
  if (cookie?.value) {
    const verified = verifyToken(cookie.value);
    if (verified) return verified;
  }

  // Check Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const verified = verifyToken(token);
    if (verified) return verified;
  }

  return null;
}

export function requireAdmin(req: NextRequest): { user: TokenPayload | null; errorResponse?: Response } {
  const user = getAuthUser(req);
  if (!user) {
    return {
      user: null,
      errorResponse: new Response(
        JSON.stringify({ error: 'Unauthorized. Admin authentication required.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      ),
    };
  }
  return { user };
}

export { TOKEN_COOKIE_NAME };
