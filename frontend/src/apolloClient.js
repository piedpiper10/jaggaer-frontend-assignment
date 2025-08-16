import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create a link to your GraphQL server
const link = new HttpLink({
  uri: ' http://127.0.0.1:3000/graphql', // Change to your server endpoint
  // headers: { Authorization: `Bearer ${token}` } // If auth is needed
});

// Initialize Apollo Client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
