'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  fetch,
  credentials: 'include', // very important to send cookies
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
