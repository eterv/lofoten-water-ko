import { GraphQLResolveInfo } from 'graphql';
import { NextPage } from 'next';
import { GraphQLContext as GraphQLContextType } from '@/graphql/context';
import { NextRouter } from 'next/router';

export type Maybe<T> = T | null | undefined;
export type OrPromise<T> = Promise<T> | T;

export type FC<P> = React.FunctionComponent<FCProps<P>>;
export type FCBaseProps = {
  className?: string;
  children?: React.ReactNode;
};
export type FCProps<P> = FCBaseProps & P;

export type BaseLayout<P = Record<string, any>> = (
  props: BaseLayoutProps & P
) => React.ReactElement;
export type BaseLayoutProps = ChildrenProp & {
  pageInfo: PageInfo;
};

export type LayoutProps = {
  title?: string;
  layout?: BaseLayout;
};

export type Page<P = any> = NextPage<PageProps<P>> & {
  layoutProps?: LayoutProps;
};
export type PageInfo = {
  isHome: boolean;
  pageName: string;
  pathName: string;
  router: NextRouter;
};
export type PageProps<P> = PageInfo & P;

/**
 *  Props
 */
export type ChildrenProp = {
  children?: React.ReactNode;
};

export type ResolverResultWrapper<T> = Promise<T> | T;

/**
 *  GraphQL Type Definition
 */

export type GraphQLContext = GraphQLContextType;

export type Resolver<TResult, TParent = any, TContext = GraphQLContext, TArgs = any> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent = any, TContext = GraphQLContext, TArgs = any> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => OrPromise<TResult>;

export type ResolverFn2<TResult, TParent = any, TArgs = any> = (
  parent: TParent,
  args: TArgs,
  context: GraphQLContext,
  info: GraphQLResolveInfo
) => OrPromise<TResult>;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
