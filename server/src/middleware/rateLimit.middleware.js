import rateLimit from "express-rate-limit";

// Limit login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 attempts per IP
  message: {
    status: "fail",
    message: "Too many login attempts. Try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// import RedisStore from "rate-limit-redis";
// import Redis from "ioredis";

// const redisClient = new Redis(process.env.REDIS_URL);

// export const loginLimiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.call(...args),
//   }),
//   windowMs: 15 * 60 * 1000,
//   max: 5,
// });
