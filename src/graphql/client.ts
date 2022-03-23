import { isServer as isServerMethod } from '@/lib/utils';
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const isServer = isServerMethod();

function createIsomorphLink(): ApolloLink {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');
    const { context } = require('./context');
    return new SchemaLink({
      schema,
      context,
    });
  }
  const { HttpLink } = require('@apollo/client/link/http');
  return new HttpLink({
    uri: '/api/gate',
    credentials: 'same-origin',
  });
}

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: isServer,
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            contactList: {
              keyArgs: false,
              merge(_existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: any = null): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = { ...initialState, ...existingCache };

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/*
export function addApolloState(client: any, pageProps: any): any {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
*/

export function useApollo(initialState: any): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
