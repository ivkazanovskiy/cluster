import { RequestHandler } from "express";
import { RedisClientType } from "../../types/redis.types";

export const cacheMiddleware = (client: RedisClientType) => {
  const middleware: RequestHandler<{ number: string }> = async (
    req,
    res,
    next
  ) => {
    const num = req.params.number;
    if (!num) return res.sendStatus(400);

    const result = await client.get(num);
    if (result) return res.status(200).json(Number(result));

    next();
  };

  return middleware;
};
