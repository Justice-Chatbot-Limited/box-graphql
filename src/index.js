import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models from "./models";

dotenv.config();
const app = express();
app.use(cors());


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

const { GRAPHQL_URL } = process.env;
server.applyMiddleware({ app, path: GRAPHQL_URL });

app.listen({ port: process.env.PORT }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});
