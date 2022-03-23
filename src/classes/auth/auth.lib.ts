import { MicroRequest } from 'apollo-server-micro/dist/types';
import { verify } from 'jsonwebtoken';
import { JwtUser, User, UserDocument, UserModel } from '@/classes/user/user.schema';
import { jwtSecret } from '@/config';
import { getAuthTokenCookie } from '@/lib/utils/cookie';
import { IncomingMessage } from 'http';

export async function checkAuth(uid: string, pw: string): Promise<UserDocument | null> {
  const user = await UserModel.findByUid(uid);
  if (!user) return null;

  const isPwMatched = await user.matchPassword(pw);
  if (!isPwMatched) return null;

  return user;
}

export function checkAuthToken(req: MicroRequest): JwtUser | null {
  if (!req) return null;

  const token = getAuthTokenCookie(req);
  if (!token) return null;

  let decoded;
  try {
    decoded = verify(token, `${jwtSecret}`) as JwtUser;
  } catch (e) {
    // 토큰 검증 실패
    return null;
  }

  return decoded;
}

export function getCurrentUser(req: IncomingMessage): User | null {
  const jwtUser = checkAuthToken(req);
  if (!jwtUser) return null;

  return {
    id: jwtUser.id,
    uid: jwtUser.uid,
    name: jwtUser.name,
    isAdmin: jwtUser.isAdmin,
  };
}
