import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

// 1. Apollo Server instance created
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 2. Standalone server started at 4000
const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀 Server ready at: ${url}`);