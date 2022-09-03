import * as redis from "redis";

export type RedisClientType = ReturnType<typeof redis.createClient>; // 🤷 RedisClientType throws a TS error
