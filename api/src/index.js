import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import schemaDirectives from "./directives";
import mongoose from "mongoose";
import {
  IS_PROD,
  DB_URI,
  DB_OPTIONS,
  REDIS_OPTIONS,
  API_PORT,
  SESS_OPTIONS,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
} from "./config";

(async () => {
  try {
    await mongoose.connect(DB_URI, DB_OPTIONS);

    const app = express();
    app.disable("x-powered-by");
    const RedisStore = connectRedis(session);
    // const store = new RedisStore({ client: new Redis(REDIS_OPTIONS) });

    const store = new RedisStore({ REDIS_OPTIONS });

    app.use(
      session({
        store,
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME),
          sameSite: true,
          secure: IS_PROD,
        },
      })
    );
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: !IS_PROD,
      context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({ app });

    app.listen({ port: API_PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${API_PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();
