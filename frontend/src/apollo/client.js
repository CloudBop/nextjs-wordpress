import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  uri: "localhost:8020",
  cache: new InMemoryCache()
});
