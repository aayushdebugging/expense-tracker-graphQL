import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { buildContext } from "graphql-passport";

import mergedResolvers from './resolvers/index.js';
import mergedTypeDefs from './typeDefs/index.js';

import { connectDB } from "./db/db.js";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();
const app = express();
const httpServer = http.createServer(app);

app.use(passport.initialize());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(
  '/graphql',
  cors({
    origin: "http://localhost:3000",
    credentials: true
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();
console.log(`🚀 Server ready at http://localhost:4000/`);
