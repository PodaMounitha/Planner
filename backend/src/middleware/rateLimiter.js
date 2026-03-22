import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // Upstash disabled due to ENOTFOUND errors
    next();
};

export default rateLimiter;