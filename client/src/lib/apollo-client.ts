'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  fetch,
  credentials: 'include', // very important to send cookies
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
