import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create a link to your GraphQL server
const link = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql" // ✅ use relative path on Vercel
      : "http://localhost:4000/graphql", // ✅ backend port in local dev, // Change to your server endpoint
  // headers: { Authorization: `Bearer ${token}` } // If auth is needed
});

// Initialize Apollo Client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
