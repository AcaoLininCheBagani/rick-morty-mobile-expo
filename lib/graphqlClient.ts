import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://rickandmortyapi.com/graphql';

export const client = new GraphQLClient(GRAPHQL_ENDPOINT);