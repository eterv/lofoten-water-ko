/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticationError } from 'apollo-server-micro';
import { checkAuth } from '@/classes/auth/auth.lib';
import { addUser, findUser, findUsers } from '@/classes/user/user.lib';
import {
  JwtUser,
  SignInArgs,
  SignInPayload,
  SignUpArgs,
  SignUpPayload,
  User,
} from '@/classes/user/user.schema';
import { Maybe, ResolverFn2 } from '@/lib/types';
import { UserRules } from '@/lib/validator/yup';
import { validateWithYup } from '@/graphql/context';
import { removeAuthTokenCookie, setAuthTokenCookie } from '@/lib/utils/cookie';
import { ServerResponse } from 'http';

type Resolvers<TParent = any> = {
  Query: {
    userCurrent: ResolverFn2<Maybe<User>, TParent>;
    viewer: ResolverFn2<Maybe<User>, TParent, { name: string }>;
    viewers: ResolverFn2<User[], TParent>;
  };
  Mutation: {
    signIn: ResolverFn2<SignInPayload, TParent, { user: SignInArgs }>;
    signOut: ResolverFn2<boolean, TParent, { user: SignInArgs }>;
    signUp: ResolverFn2<SignInPayload, TParent, { user: SignUpArgs }>;
  };
};

export const userResolvers: Resolvers = {
  Query: {
    async userCurrent(_, _args, ctx) {
      if (!ctx.user) return null;

      const user = ctx.user as JwtUser;

      return {
        id: user.id,
        uid: user.uid,
        name: user.name,
        isAdmin: user.isAdmin,
      };
    },

    async viewer(_: any, args): Promise<User | null> {
      try {
        return findUser({ name: args?.name || '최광원' });
      } catch (e) {
        throw new AuthenticationError('');
      }
    },

    async viewers(_: any, args): Promise<User[]> {
      try {
        return findUsers({ name: args?.name || '' });
      } catch (e) {
        throw new AuthenticationError('');
      }
    },
  },

  Mutation: {
    async signIn(_: any, args, { res }): Promise<SignInPayload> {
      await validateWithYup(
        {
          uid: UserRules.uid,
          pw: UserRules.pw,
        },
        args.user
      );

      // 아이디, 비밀번호가 일치하는 유저를 찾는다
      const user = await checkAuth(args.user.uid as string, args.user.pw as string);
      // N 회사 예시 :: 가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
      const msg = '잘못된 아이디 또는 비밀번호입니다';
      if (!user) throw new AuthenticationError(msg);

      const token = user.generateToken();
      setAuthTokenCookie(res as ServerResponse, token);

      return {
        token,
        user,
      };
    },

    async signOut(_, _args, { res }): Promise<boolean> {
      removeAuthTokenCookie(res as ServerResponse);
      return true;
    },

    async signUp(_: any, args): Promise<SignUpPayload> {
      const token = 'token';
      const user = await addUser(args.user);

      // 현재 사용 금지

      return {
        token,
        user,
      };
    },
  },
};
