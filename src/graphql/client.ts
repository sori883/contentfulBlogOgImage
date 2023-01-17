import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from "@apollo/client/core";
import fetch from 'cross-fetch';

const CONTENTFUL_GRAPHQL_ENDPOINT = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;

export const client = new ApolloClient({
  link: new HttpLink({ uri: `${CONTENTFUL_GRAPHQL_ENDPOINT}`, fetch }),
  credentials: 'same-origin',
  cache: new InMemoryCache(),
});