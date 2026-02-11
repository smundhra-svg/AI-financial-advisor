import { createClient } from "redis/dist/index.js";

const redisClient = createClient({
    url: process.env.REDIS_URL,
})

redisClient.on("error", (err)=> console.log("Redis Client Error",err));

await redisClient.connect();

export default redisClient;