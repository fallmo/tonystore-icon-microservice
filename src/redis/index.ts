import redis from "redis";
import { Request, Response, NextFunction } from "express";

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient({ port: +REDIS_PORT });

export const redisCache = (req: Request, res: Response, next: NextFunction) => {
  const url: string = req.params.url;
  client.get(url, (err, data) => {
    if (err) throw err;
    if (!data) return next();
    let img = Buffer.from(data, "binary");
    res.end(img);
  });
};

export const redisSet = (key: string, value: string) => {
  let expire: number = 60 * 60 * 24 * 7;
  client.setex(key, expire, value);
};
client.on("connect", () => console.log("Connected to Redis"));
