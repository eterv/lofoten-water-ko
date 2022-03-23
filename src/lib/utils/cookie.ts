import { MicroRequest } from 'apollo-server-micro/dist/types';
import { parse, serialize } from 'cookie';
import { ServerResponse } from 'http';
import { isEnvProd } from '.';

const AUTH_TOKEN = 'at01';

export const MAX_AGE = 60 * 60 * 6; // 6 hours

export function getAuthTokenCookie(req: MicroRequest): any {
  const cookies = parseCookies(req);
  return cookies[AUTH_TOKEN];
}

export function parseCookies(req: MicroRequest): Record<string, any> {
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function removeAuthTokenCookie(res: ServerResponse): void {
  const cookie = serialize(AUTH_TOKEN, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function setAuthTokenCookie(res: ServerResponse, token: string): void {
  const cookie = serialize(AUTH_TOKEN, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: isEnvProd(),
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}
