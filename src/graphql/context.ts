import { UserInputError } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import yup from '@/lib/validator/yup';
import { LoadResult, loadMiddlewares } from '@/server/loaders';
import { checkAuthToken } from '@/classes/auth/auth.lib';
import { JwtUser } from '@/classes/user/user.schema';

export type GraphQLContextArgs = {
  req?: MicroRequest;
  res?: ServerResponse;
};

export type GraphQLContext = LoadResult &
  GraphQLContextArgs & {
    ip: string;
    user: JwtUser | null;
  };

export const context = async (ctx: GraphQLContextArgs): Promise<GraphQLContext> => {
  const loadedResult = await loadMiddlewares();
  if (!loadedResult.isLoaded) {
    console.error('Loading Failure!');
  }

  const ip = ctx.req?.headers['x-forwarded-for']?.toString() || ctx.req?.socket.remoteAddress || '';

  // 로그인 데이터 가져오기
  const user = checkAuthToken(ctx.req as MicroRequest);

  return { ...ctx, ...loadedResult, ip, user };
};

export const validateWithYup = async (shape: any, data: any): Promise<boolean> => {
  const schema = yup.object().shape(shape);
  try {
    await schema.validate(data);
  } catch (err) {
    throw new UserInputError(err.errors[0], { info: err });
  }
  return true;
};
