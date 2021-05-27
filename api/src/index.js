import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import mongoose from "mongoose";
import http from "http";
import createApp from "./app";
import { DB_URI, DB_OPTIONS, REDIS_OPTIONS, API_PORT } from "./config";

(async () => {
  try {
    await mongoose.connect(DB_URI, DB_OPTIONS);

    const RedisStore = connectRedis(session);
    const store = new RedisStore({ client: new Redis(REDIS_OPTIONS) });
    const { app, server } = createApp(store);


    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    await new Promise((resolve) => httpServer.listen(API_PORT, resolve));

    console.log(
      `🚀 Server ready at http://localhost:${API_PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${API_PORT}${server.subscriptionsPath}`
    );
    return { server, app, httpServer };
  } catch (error) {
    console.log(error);
  }
})();
