import express from "express";
import * as redis from "redis";
import { fib } from "../func/fib";
import { cacheMiddleware } from "./middlewares/cache-redis.middleware";

const app = express();
const client = redis.createClient(); // by default: localhost:6379
const PORT = 3000;

async function bootstrap() {
  await client.connect();
  app.get("/:number", cacheMiddleware(client), async (req, res) => {
    const num = Number(req.params.number);
    const result = fib(num);
    await client.set(num.toString(), result, { EX: 60 }); // ttl = 60 seconds

    return res.status(200).json(result);
  });
  app.listen(PORT, () =>
    console.log(`Express-worker ${process.pid} started server on port ${PORT}`)
  );
}

bootstrap();
